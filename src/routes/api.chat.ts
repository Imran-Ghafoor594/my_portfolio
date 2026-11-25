import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { answerQuestion } from "@/lib/server/assistant";
import { visitor, canProcessRequest, quotaStatus } from "@/lib/server/quota";

const questionSchema = z.object({ question: z.string().trim().min(2).max(500) }).strict();
const headers = { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store, private", "X-Content-Type-Options": "nosniff" };
function json(data: unknown, status: number, cookie?: string) {
  return new Response(JSON.stringify(data), { status, headers: { ...headers, ...(cookie ? { "Set-Cookie": cookie } : {}) } });
}
function originValid(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return request.headers.get("sec-fetch-site") !== "cross-site";
  return origin === new URL(request.url).origin;
}
export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const guest = visitor(request);
        const quota = await quotaStatus(guest.id).catch(() => ({ remaining: 0, used: 0, resetInSeconds: 0, aiAvailable: false }));
        return json({ quota }, 200, guest.setCookie);
      },
      POST: async ({ request }) => {
        if (!originValid(request)) return json({ error: "Cross-origin requests are not allowed." }, 403);
        if (Number(request.headers.get("content-length") ?? 0) > 4096) return json({ error: "Request too large." }, 413);
        const guest = visitor(request);
        let body: unknown;
        try { body = await request.json(); } catch { return json({ error: "Invalid JSON." }, 400, guest.setCookie); }
        const parsed = questionSchema.safeParse(body);
        if (!parsed.success) return json({ error: "Question must be 2–500 characters." }, 400, guest.setCookie);
        try {
          if (!await canProcessRequest(guest.id)) return json({ error: "Too many requests. Please try again shortly." }, 429, guest.setCookie);
          const response = await answerQuestion(parsed.data.question, guest.id);
          return json(response, 200, guest.setCookie);
        } catch {
          // Do not log the user's message or upstream content.
          return json({ error: "The assistant is temporarily unavailable." }, 503, guest.setCookie);
        }
      },
    },
  },
});
