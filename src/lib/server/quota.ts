/** Upstash Redis REST quotas. No chat messages, names, emails or raw IP addresses are saved. */
import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

export const MAX_GROQ_CALLS = 5;
const PERIOD = 24 * 60 * 60;
const COOKIE = "imran_ai_visitor";

function secret() { return process.env.CHAT_VISITOR_SECRET ?? ""; }
function sign(id: string): string { return createHmac("sha256", secret()).update(id).digest("hex"); }
function cookieId(request: Request): string | null {
  if (!secret()) return null;
  const value = request.headers.get("cookie")?.split(";").map((s) => s.trim()).find((s) => s.startsWith(`${COOKIE}=`))?.slice(COOKIE.length + 1);
  if (!value) return null;
  const [id, mac] = value.split(".");
  if (!id || !/^[a-f0-9]{32}$/.test(id) || !mac || !/^[a-f0-9]{64}$/.test(mac)) return null;
  const expected = Buffer.from(sign(id), "hex");
  const got = Buffer.from(mac, "hex");
  return timingSafeEqual(expected, got) ? id : null;
}
function cookieHeader(id: string): string {
  const signed = `${id}.${sign(id)}`;
  return `${COOKIE}=${signed}; Path=/; Max-Age=${PERIOD}; HttpOnly; SameSite=Lax${process.env.NODE_ENV === "production" ? "; Secure" : ""}`;
}
export function visitor(request: Request) {
  const previous = cookieId(request);
  const id = previous ?? randomBytes(16).toString("hex");
  return { id, setCookie: !previous && secret() ? cookieHeader(id) : undefined };
}
function redisConfigured() {
  return !!(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN && secret());
}
export function isGroqEnabled() { return redisConfigured() && !!process.env.GROQ_API_KEY; }
const keyFor = (id: string) => `imran:groq:v1:${createHmac("sha256", secret()).update(id).digest("hex")}`;

async function redis(command: unknown[]): Promise<unknown> {
  const response = await fetch(process.env.UPSTASH_REDIS_REST_URL!, {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(command),
    signal: AbortSignal.timeout(5000),
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Quota provider unavailable");
  const json = await response.json() as { result?: unknown; error?: string };
  if (json.error || json.result === undefined) throw new Error("Quota provider rejected request");
  return json.result;
}

const RESERVE_SCRIPT = `
local k=KEYS[1]
local max=tonumber(ARGV[1])
local seconds=tonumber(ARGV[2])
local current=tonumber(redis.call('GET',k) or '0')
if current >= max then return {0,current,redis.call('TTL',k)} end
current=redis.call('INCR',k)
if current==1 then redis.call('EXPIRE',k,seconds) end
return {1,current,redis.call('TTL',k)}
`;
const THROTTLE_SCRIPT = `
local k=KEYS[1]
local max=tonumber(ARGV[1])
local current=tonumber(redis.call('GET',k) or '0')
if current >= max then return 0 end
current=redis.call('INCR',k)
if current==1 then redis.call('EXPIRE',k,60) end
return 1
`;
export type QuotaStatus = { remaining: number; used: number; resetInSeconds: number; aiAvailable: boolean };
export async function quotaStatus(id: string): Promise<QuotaStatus> {
  if (!isGroqEnabled()) return { remaining: 0, used: 0, resetInSeconds: 0, aiAvailable: false };
  const key = keyFor(id);
  const snapshot = await redis(["EVAL", "return {tonumber(redis.call('GET',KEYS[1]) or '0'),redis.call('TTL',KEYS[1])}", "1", key]);
  if (!Array.isArray(snapshot) || snapshot.length !== 2) throw new Error("Invalid quota snapshot");
  const [raw, ttl] = snapshot.map(Number);
  const used = Math.min(MAX_GROQ_CALLS, Math.max(0, raw));
  return { remaining: MAX_GROQ_CALLS - used, used, resetInSeconds: Math.max(0, ttl), aiAvailable: true };
}
export async function reserveGroqCall(id: string): Promise<{ allowed: boolean; status: QuotaStatus }> {
  if (!isGroqEnabled()) return { allowed: false, status: await quotaStatus(id) };
  const output = await redis(["EVAL", RESERVE_SCRIPT, "1", keyFor(id), String(MAX_GROQ_CALLS), String(PERIOD)]);
  if (!Array.isArray(output) || output.length !== 3) throw new Error("Invalid quota response");
  const [flag, count, ttl] = output.map(Number);
  const used = Math.min(MAX_GROQ_CALLS, Math.max(0, count));
  return { allowed: flag === 1, status: { remaining: MAX_GROQ_CALLS - used, used, resetInSeconds: Math.max(0, ttl), aiAvailable: true } };
}
export async function canProcessRequest(id: string): Promise<boolean> {
  // Includes direct TF-IDF traffic, not only Groq. 20 requests per visitor/minute.
  if (!redisConfigured()) return true; // Retrieval remains functional without credentials.
  const key = `imran:requests:v1:${createHmac("sha256", secret()).update(id).digest("hex")}`;
  return Number(await redis(["EVAL", THROTTLE_SCRIPT, "1", key, "20"])) === 1;
}
