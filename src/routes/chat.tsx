import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowUp,
  Bot,
  ExternalLink,
  FileText,
  Mic,
  MicOff,
  RotateCcw,
  Send,
  Sparkles,
  Square,
  Volume2,
} from "lucide-react";
import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";

// This page reuses the existing /api/chat route (TF-IDF + Groq + Redis).
// Chat text is only kept in component state; the backend keeps quota metadata.

type ChatLink = { label: string; href: string; external?: boolean };
type Method = "retrieval" | "groq" | "unknown" | "quota_limited" | "error";
type ChatMessage = {
  id: number;
  role: "user" | "assistant";
  text: string;
  link?: ChatLink;
  method?: Method;
};
type Quota = {
  used: number;
  remaining: number;
  resetInSeconds: number;
  aiAvailable: boolean;
};
type Answer = { answer: string; method: Method; link?: ChatLink; quota: Quota };
type VoiceEvent = { results: ArrayLike<ArrayLike<{ transcript: string }>> };
type VoiceRecognition = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: VoiceEvent) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};
type VoiceWindow = Window & {
  SpeechRecognition?: new () => VoiceRecognition;
  webkitSpeechRecognition?: new () => VoiceRecognition;
};

const STARTER = "Which project best demonstrates Imran's AI skills?";
const MAX_GROQ_CALLS = 5;

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "Ask Imran AI | Imran Ghafoor" },
      {
        name: "description",
        content: "Ask Imran's AI assistant about his skills, education, internships and projects.",
      },
      { name: "robots", content: "index,follow" },
    ],
  }),
  component: StandaloneChatPage,
});

function RemainingRing({ remaining }: { remaining: number }) {
  const fraction = Math.max(0, Math.min(1, remaining / MAX_GROQ_CALLS));
  const circumference = 2 * Math.PI * 18;
  return (
    <div
      className="flex items-center gap-2 text-xs text-[#ada7c4]"
      aria-label={`${remaining} AI-assisted answers left`}
      title={`${remaining} of ${MAX_GROQ_CALLS} AI-assisted answers left`}
    >
      <svg width="42" height="42" viewBox="0 0 44 44" aria-hidden="true">
        <circle cx="22" cy="22" r="18" fill="none" stroke="#312b44" strokeWidth="3.5" />
        <circle
          cx="22" cy="22" r="18" fill="none" stroke="#b29aff" strokeWidth="3.5"
          strokeLinecap="round" strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - fraction)}
          transform="rotate(-90 22 22)"
        />
        <text x="22" y="26" fontSize="13" textAnchor="middle" fill="#fff" fontWeight="600">
          {remaining}
        </text>
      </svg>
      <span className="hidden sm:inline">AI left</span>
    </div>
  );
}

function StandaloneChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [voiceError, setVoiceError] = useState("");
  const [listening, setListening] = useState(false);
  const [speakingId, setSpeakingId] = useState<number | null>(null);
  const [quota, setQuota] = useState<Quota>({
    used: 0, remaining: 0, resetInSeconds: 0, aiAvailable: false,
  });

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const pendingRef = useRef<AbortController | null>(null);
  const voiceRef = useRef<VoiceRecognition | null>(null);
  const generation = useRef(0);
  const idCounter = useRef(0);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/chat", { credentials: "same-origin", cache: "no-store", signal: controller.signal })
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((data: { quota: Quota }) => {
        if (!controller.signal.aborted) setQuota(data.quota);
      })
      .catch(() => {});

    return () => {
      controller.abort();
      generation.current += 1;
      pendingRef.current?.abort();
      voiceRef.current?.stop();
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy, notice]);

  function stopAudio() {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    setSpeakingId(null);
  }

  function newChat() {
    generation.current += 1;
    pendingRef.current?.abort();
    pendingRef.current = null;
    voiceRef.current?.stop();
    stopAudio();
    setListening(false);
    setMessages([]);
    setDraft("");
    setBusy(false);
    setNotice("");
    setVoiceError("");
    inputRef.current?.focus();
    // Intentionally does not reset the server-side Groq quota.
  }

  async function sendQuestion(raw: string) {
    const question = raw.trim().slice(0, 500);
    if (question.length < 2 || pendingRef.current) return;
    stopAudio();
    setVoiceError("");
    setNotice("");
    setDraft("");
    idCounter.current += 1;
    const messageId = idCounter.current * 2;
    const currentGeneration = generation.current;
    setMessages((previous) => [...previous, { id: messageId, role: "user", text: question }]);
    setBusy(true);

    const controller = new AbortController();
    pendingRef.current = controller;
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        credentials: "same-origin",
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
        signal: controller.signal,
      });
      if (!response.ok) {
        throw new Error(response.status === 429
          ? "Too many requests. Please try again shortly."
          : "The assistant is temporarily unavailable. Please try again.");
      }
      const result = (await response.json()) as Answer;
      if (controller.signal.aborted || currentGeneration !== generation.current) return;
      setQuota(result.quota);
      setMessages((previous) => [
        ...previous,
        { id: messageId + 1, role: "assistant", text: result.answer, link: result.link, method: result.method },
      ]);
    } catch (error) {
      if (controller.signal.aborted || currentGeneration !== generation.current) return;
      setNotice(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      if (pendingRef.current === controller) pendingRef.current = null;
      if (currentGeneration === generation.current) setBusy(false);
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendQuestion(draft);
  }
  function keyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      void sendQuestion(draft);
    }
  }

  function toggleMic() {
    if (listening) {
      voiceRef.current?.stop();
      setListening(false);
      return;
    }
    const browser = window as VoiceWindow;
    const Recognition = browser.SpeechRecognition ?? browser.webkitSpeechRecognition;
    if (!Recognition) {
      setVoiceError("Speech recognition isn't available in this browser. Please type your question.");
      return;
    }
    try {
      stopAudio();
      setVoiceError("");
      const recognition = new Recognition();
      recognition.lang = "en-US";
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.onresult = (event) => {
        const transcript = event.results[0]?.[0]?.transcript?.trim();
        if (transcript) setDraft(transcript.slice(0, 500));
        inputRef.current?.focus();
      };
      recognition.onerror = () => {
        setVoiceError("Microphone access failed. Please type instead.");
        setListening(false);
      };
      recognition.onend = () => setListening(false);
      voiceRef.current = recognition;
      recognition.start();
      setListening(true);
    } catch {
      setVoiceError("Unable to start voice input.");
      setListening(false);
    }
  }

  function toggleSpeak(message: ChatMessage) {
    if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
      setVoiceError("Read-aloud is not supported in this browser.");
      return;
    }
    if (speakingId === message.id) {
      stopAudio();
      return;
    }
    stopAudio();
    const utterance = new SpeechSynthesisUtterance(message.text);
    utterance.lang = "en-US";
    utterance.rate = 0.96;
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);
    window.speechSynthesis.speak(utterance);
    setSpeakingId(message.id);
  }

  const showRing = quota.aiAvailable && quota.used >= 3;
  const limitReached = quota.aiAvailable && quota.remaining === 0;

  return (
    <main
      className="relative flex h-[100dvh] min-h-[420px] flex-col overflow-hidden bg-[#090914] text-[#f3efff]"
      style={{ fontFamily: '"Inter", sans-serif', cursor: "default" }}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(110,80,180,.15),transparent_58%)]" />

      <header className="relative z-10 shrink-0 border-b border-white/10 bg-[#100f1d]/90 px-4 py-3 sm:px-8">
        <div className="mx-auto flex max-w-5xl items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-violet-300/20 bg-violet-400/15 text-violet-200">
            <Bot size={21} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 text-sm font-semibold tracking-wide">
              Imran AI <Sparkles size={13} className="text-violet-300" />
            </div>
            <p className="text-[11px] text-[#aaa2c0]">Personal portfolio assistant</p>
          </div>
          {showRing && <RemainingRing remaining={quota.remaining} />}
          <button
            type="button" onClick={newChat} title="Clear this conversation"
            className="flex h-9 items-center gap-1.5 rounded-lg border border-white/10 px-3 text-xs text-[#d5cce9] transition hover:border-violet-300/30 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-300"
          >
            <RotateCcw size={14} /> <span className="hidden sm:inline">New chat</span>
          </button>
          <Link
            to="/"
            className="flex h-9 items-center gap-1.5 rounded-lg bg-white px-3 text-xs font-semibold text-[#171323] transition hover:bg-[#e8e0ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-300"
          >
            <ArrowLeft size={14} /> <span className="hidden sm:inline">Portfolio</span>
          </Link>
        </div>
      </header>

      <section
        ref={scrollRef} data-lenis-prevent
        aria-label="Conversation" role="log" aria-live="polite"
        className="relative z-10 min-h-0 flex-1 touch-pan-y overflow-y-auto overscroll-contain px-4 py-7 [scrollbar-color:#4a3b69_transparent] sm:px-6"
        style={{ scrollbarWidth: "thin" }}
      >
        <div className="mx-auto w-full max-w-3xl space-y-6">
          {messages.length === 0 && (
            <div className="mx-auto mt-[min(9vh,80px)] max-w-xl text-center">
              <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl border border-violet-300/20 bg-violet-400/15 text-violet-200 shadow-[0_0_45px_rgba(137,95,220,.13)]">
                <Bot size={28} />
              </div>
              <div className="mb-3 text-[11px] font-medium uppercase tracking-[.25em] text-violet-300">Meet Imran's assistant</div>
              <h1 className="mb-3 text-3xl font-semibold tracking-tight sm:text-4xl">Hey there! <span aria-hidden="true">👋</span></h1>
              <p className="mx-auto max-w-md text-sm leading-7 text-[#bcb5cc]">
                I'm Imran AI. Ask me about his education, AI projects, technical skills, internships or professional experience.
              </p>
              <p className="mx-auto mt-5 max-w-md rounded-xl border border-violet-300/15 bg-violet-300/5 px-4 py-3 text-xs leading-6 text-[#c9bddc]">
                {quota.aiAvailable
                  ? "Quick portfolio facts don't use your allowance. You also have 5 AI-assisted answers per 24 hours for complex questions."
                  : "I can answer questions from Imran's verified portfolio. AI-assisted explanations may be temporarily unavailable."}
              </p>
              <button
                type="button" onClick={() => { setDraft(STARTER); inputRef.current?.focus(); }}
                className="mt-6 flex w-full items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[.035] px-4 py-3 text-left text-xs text-[#e0d6f2] transition hover:border-violet-300/30 hover:bg-violet-300/10"
              >
                <span><span className="mb-1 block text-[10px] uppercase tracking-widest text-[#948aad]">Try asking</span>{STARTER}</span>
                <ArrowUp size={15} className="shrink-0 text-violet-300" />
              </button>
            </div>
          )}

          {messages.map((message) => (
            <div key={message.id} className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              {message.role === "assistant" && (
                <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-xl border border-violet-300/15 bg-violet-300/10 text-violet-200"><Bot size={16} /></span>
              )}
              <div className="min-w-0 max-w-[85%] sm:max-w-[78%]">
                <p className={`whitespace-pre-wrap break-words rounded-2xl border px-4 py-3 text-[13px] leading-7 ${
                  message.role === "user"
                    ? "rounded-tr-sm border-violet-300/20 bg-[#53417f] text-white"
                    : "rounded-tl-sm border-white/[.07] bg-[#1b1929] text-[#e1dbea]"
                }`}>{message.text}</p>
                {message.role === "assistant" && (
                  <div className="mt-2 flex flex-wrap items-center gap-4">
                    <button
                      type="button" onClick={() => toggleSpeak(message)}
                      className="inline-flex items-center gap-1.5 text-[11px] text-[#ada3c5] hover:text-violet-200"
                      aria-label={speakingId === message.id ? "Stop reading answer" : "Read answer aloud"}
                    >
                      {speakingId === message.id ? <Square size={13} /> : <Volume2 size={15} />}
                      {speakingId === message.id ? "Stop" : "Listen"}
                    </button>
                    {message.link && ((message.link.href.startsWith("/") && !message.link.href.startsWith("//")) || /^https:\/\//i.test(message.link.href)) && (
                      <a
                        href={message.link.href}
                        target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[11px] text-violet-300 hover:text-violet-100"
                      >
                        <FileText size={14} /> {message.link.label} <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
          {busy && (
            <p className="pl-11 text-xs text-[#b5a9d4]" role="status">Searching Imran's portfolio…</p>
          )}
          {notice && <p role="alert" className="rounded-lg border border-red-300/20 bg-red-300/10 px-4 py-3 text-xs text-red-200">{notice}</p>}
          {limitReached && (
            <div className="mx-auto max-w-lg rounded-xl border border-violet-300/15 bg-violet-300/5 px-4 py-4 text-center text-xs leading-6 text-[#cfc5e1]">
              The 5 AI-assisted answers have been used. You can still ask quick factual questions from Imran's portfolio.
            </div>
          )}
        </div>
      </section>

      <footer className="relative z-10 shrink-0 bg-gradient-to-t from-[#090914] via-[#090914] to-[#090914]/90 px-4 pb-[max(14px,env(safe-area-inset-bottom))] pt-3 sm:px-6">
        <div className="mx-auto max-w-3xl">
          {voiceError && <p role="status" className="mb-2 text-xs text-red-200">{voiceError}</p>}
          <form
            onSubmit={submit}
            className="flex items-end gap-2 rounded-2xl border border-violet-300/20 bg-[#201d30] p-2 shadow-[0_12px_50px_rgba(0,0,0,.35)] focus-within:border-violet-300/50"
          >
            <label htmlFor="standalone-chat-input" className="sr-only">Ask about Imran</label>
            <textarea
              id="standalone-chat-input" ref={inputRef} rows={1} maxLength={500}
              value={draft} onChange={(event) => setDraft(event.target.value)}
              onKeyDown={keyDown} disabled={busy}
              placeholder="Ask anything about Imran…"
              className="max-h-28 min-h-11 min-w-0 flex-1 resize-none overflow-y-auto bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-[#8e859f]"
            />
            <button
              type="button" onClick={toggleMic} disabled={busy}
              aria-label={listening ? "Stop voice input" : "Use microphone"}
              className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl transition hover:bg-white/10 ${listening ? "bg-pink-700 text-white" : "text-[#c9bde1]"}`}
            >{listening ? <MicOff size={18} /> : <Mic size={18} />}</button>
            <button
              type="submit" disabled={busy || draft.trim().length < 2}
              aria-label="Send message"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-violet-500 text-white transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-40"
            ><Send size={17} /></button>
          </form>
          <p className="mt-2 text-center text-[10px] text-[#898199]">
            Private conversation · Messages cleared on exit or refresh · Groq quota remains shared
          </p>
        </div>
      </footer>
    </main>
  );
}
