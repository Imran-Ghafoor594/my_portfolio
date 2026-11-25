/** Tiny, dependency-free TF-IDF retrieval for a curated public profile. */
import { knowledge, type KnowledgeEntry } from "./knowledge";

const STOP = new Set("a an and are as at be by can did do does for from have has he her his how i imran is it me my of on or our she show tell the their them there these they this to was were what when where which who why with you your about please some more give details explain".split(" "));

function tokens(text: string): string[] {
  return (text.toLowerCase().normalize("NFKD").match(/[a-z0-9]+/g) ?? [])
    .map((word) => word.length > 4 && word.endsWith("ies") ? word.slice(0, -3) + "y" : word)
    .map((word) => word.length > 4 && word.endsWith("s") ? word.slice(0, -1) : word)
    .filter((word) => word.length > 1 && !STOP.has(word));
}

const documents = knowledge.flatMap((entry) => entry.questions.map((question) => ({ entry, question })));
const documentTokens = documents.map(({ question }) => tokens(question));
const df = new Map<string, number>();
for (const doc of documentTokens) for (const token of new Set(doc)) df.set(token, (df.get(token) ?? 0) + 1);
const idf = (token: string) => Math.log(1 + (documents.length + 1) / (1 + (df.get(token) ?? 0)));
function tfidf(words: string[]) {
  const map = new Map<string, number>();
  for (const token of words) map.set(token, (map.get(token) ?? 0) + 1);
  let norm = 0;
  for (const [token, count] of map) {
    const weighted = (1 + Math.log(count)) * idf(token);
    map.set(token, weighted);
    norm += weighted * weighted;
  }
  const length = Math.sqrt(norm) || 1;
  for (const [token, score] of map) map.set(token, score / length);
  return map;
}
const vectors = documentTokens.map(tfidf);

export type SearchHit = { entry: KnowledgeEntry; score: number };
export function searchKnowledge(question: string): SearchHit[] {
  const q = tfidf(tokens(question));
  const map = new Map<string, SearchHit>();
  vectors.forEach((vector, i) => {
    let score = 0;
    for (const [term, value] of q) score += value * (vector.get(term) ?? 0);
    const { entry } = documents[i];
    if (score > (map.get(entry.id)?.score ?? 0)) map.set(entry.id, { entry, score });
  });
  return [...map.values()].sort((a, b) => b.score - a.score).slice(0, 5);
}

export function isPortfolioQuestion(question: string) {
  const q = question.toLowerCase();
  return /\bimran\b|\bhim\b|\bhis\b|\bhe\b|education|degree|university|study|skill|work|hire|job|career|intern|project|cv\b|resume|portfolio|contact|email|tech|ml\b|ai\b|computer vision|remote|onsite|hybrid|relocat|location|available|python|flask|tensorflow|plant|crop|electric|prediction|riphah|neurofive|teyzix|decode|jarvis|roboimmi|edupredict/.test(q);
}
export function asksForUnverifiedPersonalFact(question: string) {
  const q = question.toLowerCase();
  // Public city is supported, but we must not infer a residential address or recruiting preferences.
  return /(?:full|home|street|residential|house)\s+(?:address|location)|(?:prefer|preferred|willing|relocat|work from home|remote|hybrid|onsite|on-site|salary|marital|age|birthday|date of birth|religion|nationality|passport|favorite|favourite|family|married|relationship)/.test(q)
    && !/(?:open to|interested in)\s+(?:ai|ml|machine learning)\s+internship/.test(q);
}

/** Comparative / evaluative requests need several facts combined, not one pasted answer. */
export function needsSynthesis(question: string) {
  return /\b(compare|contrast|comparison|difference|different|similar|suitab|fit for|strength|evaluate|recommend|why would|how do .* relate|relate to|combine|versus| vs\b)\b/i.test(question);
}
