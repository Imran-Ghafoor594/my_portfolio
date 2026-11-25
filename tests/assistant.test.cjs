/** Deterministic assistant tests; no real Redis/Groq keys or external calls. */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { createRequire } = require('node:module');
const ts = require('typescript');

// Transpile only the small, server-only, dependency-free modules into an isolated CJS test fixture.
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'imran-ai-tests-'));
fs.writeFileSync(path.join(temp, 'package.json'), '{"type":"commonjs"}');
const codeRoot = path.join(__dirname, '..', 'src', 'lib', 'server');
for (const name of ['knowledge', 'retrieval', 'quota', 'assistant']) {
  const code = fs.readFileSync(path.join(codeRoot, `${name}.ts`), 'utf8');
  const output = ts.transpileModule(code, { fileName: `${name}.ts`, compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS } });
  fs.writeFileSync(path.join(temp, `${name}.js`), output.outputText);
}
const load = createRequire(path.join(temp, 'index.js'));
const { searchKnowledge, asksForUnverifiedPersonalFact, needsSynthesis } = load('./retrieval.js');
const { answerQuestion } = load('./assistant.js');
const { quotaStatus, visitor } = load('./quota.js');

process.env.CHAT_VISITOR_SECRET = '0123456789abcdef0123456789abcdef';
process.env.GROQ_API_KEY = 'fixture-only';
process.env.UPSTASH_REDIS_REST_URL = 'https://fake.upstash.invalid';
process.env.UPSTASH_REDIS_REST_TOKEN = 'fixture-only';
const db = new Map();
let groqCalls = 0;
// Each call is synchronous until its promise resolves, representing Redis script atomicity.
global.fetch = async (url, options) => {
  if (String(url).includes('upstash')) {
    const [command, scriptOrKey, , key, maxStr] = JSON.parse(options.body);
    let result = null;
    if (command === 'EVAL') {
      const current = db.get(key) || 0;
      if (scriptOrKey.startsWith('return {tonumber')) result = [current, current ? 86400 : -2];
      else if (scriptOrKey.includes('local seconds')) {
        const max = Number(maxStr);
        if (current >= max) result = [0, current, 86400];
        else { db.set(key, current + 1); result = [1, current + 1, 86400]; }
      } else {
        if (current >= Number(maxStr)) result = 0;
        else { db.set(key, current + 1); result = 1; }
      }
    } else if (command === 'GET') result = db.get(scriptOrKey) || null;
    else if (command === 'TTL') result = db.has(scriptOrKey) ? 86400 : -2;
    return { ok: true, json: async () => ({ result }) };
  }
  if (String(url).includes('api.groq.com')) {
    groqCalls += 1;
    return { ok: true, json: async () => ({ choices: [{ message: { content: 'Imran demonstrates applied ML experience through documented projects and internships.' } }] }) };
  }
  throw new Error(`Unexpected URL: ${url}`);
};

test('extractive search, grounded fallback and 5-Groq-call allowance', async (t) => {
  const visitorId = 'visitor-abc';
  await t.test('retrieval ranks approved education and PlantScan facts', () => {
    assert.equal(searchKnowledge('Where did Imran study?')[0].entry.id, 'profile.education');
    assert.equal(searchKnowledge('What is PlantScan?')[0].entry.id, 'project.plantscan');
    assert.equal(asksForUnverifiedPersonalFact('Does he prefer remote work?'), true);
    assert.equal(needsSynthesis('Compare his computer vision and climate projects'), true);
  });
  await t.test('direct education answer does not spend a Groq request', async () => {
    const output = await answerQuestion('Where did Imran study?', visitorId);
    assert.equal(output.method, 'retrieval');
    assert.match(output.answer, /Riphah International University/);
    assert.equal(output.quota.remaining, 5);
    assert.equal(groqCalls, 0);
  });
  await t.test('unverified preferences and unrelated questions do not call Groq', async () => {
    assert.equal((await answerQuestion('Does Imran prefer remote work?', visitorId)).method, 'unknown');
    assert.equal((await answerQuestion('Can you tell me the weather forecast?', visitorId)).method, 'unknown');
    assert.equal(groqCalls, 0);
  });
  await t.test('complex questions spend at most five Groq calls', async () => {
    for (let i = 0; i < 5; i++) {
      const output = await answerQuestion('How do his AI internships relate to the technical solutions in his projects?', visitorId);
      assert.equal(output.method, 'groq');
      assert.equal(output.quota.remaining, 4 - i);
    }
    const sixth = await answerQuestion('Compare the engineering decisions across his applied ML projects', visitorId);
    assert.equal(sixth.method, 'quota_limited');
    assert.equal(groqCalls, 5);
    assert.equal((await quotaStatus(visitorId)).remaining, 0);
  });
  await t.test('retrieval keeps working after five Groq calls', async () => {
    const output = await answerQuestion('What is PlantScan?', visitorId);
    assert.equal(output.method, 'retrieval');
    assert.match(output.answer, /EfficientNetB0/);
    assert.equal(groqCalls, 5);
  });
  await t.test('visitor identifier uses a signed, HttpOnly cookie', () => {
    const id = visitor(new Request('https://imranghafoor.vercel.app/api/chat'));
    assert.match(id.setCookie || '', /HttpOnly/);
    const r2 = visitor(new Request('https://imranghafoor.vercel.app/api/chat', { headers: { cookie: id.setCookie.split(';')[0] } }));
    assert.equal(id.id, r2.id);
    assert.equal(r2.setCookie, undefined);
  });
  await t.test('chat text is never stored in browser sessionStorage/localStorage', () => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'src/components/chat/ChatWidget.tsx'), 'utf8');
    assert.doesNotMatch(code, /sessionStorage|localStorage/);
    assert.match(code, /setMessages\(\[\]\)/);
    assert.match(code, /data-lenis-prevent/);
  });
});
