import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { useLocation } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUp,
  Bot,
  ExternalLink,
  FileText,
  Mic,
  MicOff,
  MessageCircle,
  Send,
  Sparkles,
  Square,
  Volume2,
  X,
} from "lucide-react";
import { RESUME_URL } from "@/data/site";
type ChatLink = { label: string; href: string; external?: boolean };

const QUESTION_LIMIT = 5;
const EXAMPLE = "Which project best shows Imran's computer vision skills?";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
  link?: ChatLink;
  method?: "retrieval" | "groq" | "unknown" | "quota_limited" | "error";
};

type QuotaStatus = { used: number; remaining: number; resetInSeconds: number; aiAvailable: boolean };
type ApiAnswer = { answer: string; method: ChatMessage["method"]; link?: ChatLink; quota: QuotaStatus };

type BrowserSpeechResultEvent = {
  results: ArrayLike<ArrayLike<{ transcript: string }>>;
};

type BrowserSpeechRecognition = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: ((event: BrowserSpeechResultEvent) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

type SpeechWindow = Window & {
  SpeechRecognition?: new () => BrowserSpeechRecognition;
  webkitSpeechRecognition?: new () => BrowserSpeechRecognition;
};

function RemainingRing({ remaining }: { remaining: number }) {
  const radius = 15;
  const circumference = 2 * Math.PI * radius;
  const fraction = remaining / QUESTION_LIMIT;

  return (
    <div
      className="imran-chat-remaining"
      role="status"
      aria-label={`${remaining} of ${QUESTION_LIMIT} AI-assisted answers remaining`}
      title={`${remaining} of ${QUESTION_LIMIT} AI-assisted answers remaining`}
    >
      <svg aria-hidden="true" width="38" height="38" viewBox="0 0 38 38">
        <circle cx="19" cy="19" r={radius} fill="none" stroke="rgba(255,255,255,.11)" strokeWidth="3" />
        <circle
          cx="19"
          cy="19"
          r={radius}
          fill="none"
          stroke={remaining === 0 ? "#fa9c9c" : "#ab95ff"}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - fraction)}
          transform="rotate(-90 19 19)"
        />
        <text x="19" y="22.5" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="600">
          {remaining}
        </text>
      </svg>
      <span className="imran-chat-remaining-label">left</span>
    </div>
  );
}

/** Recruiter-first assistant. No chat content is saved to browser/server storage. */
export function ChatWidget() {
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [quota, setQuota] = useState<QuotaStatus>({ used: 0, remaining: 0, resetInSeconds: 0, aiAvailable: false });
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [listening, setListening] = useState(false);
  const [voiceError, setVoiceError] = useState("");
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<BrowserSpeechRecognition | null>(null);
  const idRef = useRef(0);
  const requestRef = useRef<AbortController | null>(null);
  const generationRef = useRef(0);

  // Only usage metadata is requested; messages are never persisted.
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/chat", { cache: "no-store", credentials: "same-origin", signal: controller.signal })
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((data: { quota: QuotaStatus }) => { if (!controller.signal.aborted) setQuota(data.quota); })
      .catch(() => {});
    return () => controller.abort();
  }, [open]);

  useEffect(() => {
    const isHomepage = location.pathname === "/";
    const update = () => {
      setVisible(!isHomepage || window.scrollY > Math.max(320, window.innerHeight * 0.68));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [location.pathname]);

  // Any client-side route navigation closes the assistant and discards its conversation.
  const initialRoute = useRef(location.href);
  useEffect(() => {
    if (initialRoute.current !== location.href) {
      initialRoute.current = location.href;
      requestRef.current?.abort();
      generationRef.current += 1;
      setOpen(false);
      setMessages([]);
      setDraft("");
      setBusy(false);
      recognitionRef.current?.stop();
      setListening(false);
      setSpeakingId(null);
      setNotice("");
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    }
  }, [location.href]);

  // GitHub README CTA can open the assistant directly using /?chat=open.
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("chat") === "open") {
      setVisible(true);
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    if (open) {
      const frame = requestAnimationFrame(() => inputRef.current?.focus());
      return () => cancelAnimationFrame(frame);
    }
    return undefined;
  }, [open]);

  useEffect(() => {
    if (open) scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [open, messages]);

  useEffect(() => {
    const handleEsc = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape" && open) closeChat();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
    // closeChat only calls refs, setters, and window speech APIs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(
    () => () => {
      requestRef.current?.abort();
      recognitionRef.current?.stop();
      document.documentElement.classList.remove("imran-chat-pointer-over");
      if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
    },
    [],
  );

  const remaining = quota.remaining;
  const limitReached = quota.aiAvailable && remaining === 0;
  const showRing = quota.aiAvailable && quota.used >= 3; // Third GROQ call, not third user question.

  function stopSpeaking() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
    setSpeakingId(null);
  }

  function closeChat() {
    generationRef.current += 1;
    requestRef.current?.abort();
    requestRef.current = null;
    recognitionRef.current?.stop();
    setListening(false);
    stopSpeaking();
    setMessages([]);
    setDraft("");
    setNotice("");
    setVoiceError("");
    setBusy(false);
    setOpen(false);
    document.documentElement.classList.remove("imran-chat-pointer-over");
    window.requestAnimationFrame(() => launcherRef.current?.focus());
  }

  async function sendQuestion(raw: string) {
    const text = raw.trim().slice(0, 500);
    if (!text || busy) return;
    stopSpeaking();
    setVoiceError("");
    setNotice("");
    setDraft("");
    const time = Date.now();
    idRef.current += 1;
    const sequence = generationRef.current;
    setMessages((current) => [...current, { id: `${time}-${idRef.current}-user`, role: "user", text }]);
    setBusy(true);
    const controller = new AbortController();
    requestRef.current = controller;
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ question: text }),
        signal: controller.signal,
        cache: "no-store",
      });
      if (!response.ok) throw new Error(response.status === 429 ? "Too many requests. Please try again shortly." : "The assistant is temporarily unavailable.");
      const reply = await response.json() as ApiAnswer;
      if (controller.signal.aborted || sequence !== generationRef.current) return;
      setQuota(reply.quota);
      setMessages((current) => [...current, {
        id: `${time}-${idRef.current}-reply`, role: "assistant", text: reply.answer,
        link: reply.link, method: reply.method,
      }]);
    } catch (error) {
      if (controller.signal.aborted || sequence !== generationRef.current) return;
      setNotice(error instanceof Error ? error.message : "The assistant is temporarily unavailable.");
    } finally {
      if (sequence === generationRef.current) setBusy(false);
      if (requestRef.current === controller) requestRef.current = null;
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sendQuestion(draft);
  }

  function onInputKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendQuestion(draft);
    }
  }

  function toggleMicrophone() {
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }
    const browser = window as SpeechWindow;
    const SpeechRecognition = browser.SpeechRecognition ?? browser.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setVoiceError("Voice typing isn't supported in this browser. You can still type your question.");
      return;
    }
    try {
      stopSpeaking();
      setVoiceError("");
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.onresult = (event) => {
        const transcript = event.results[0]?.[0]?.transcript?.trim();
        if (transcript) setDraft(transcript.slice(0, 500));
        // Voice recognition fills the draft; it never spends a question by itself.
        inputRef.current?.focus();
      };
      recognition.onerror = () => {
        setListening(false);
        setVoiceError("Microphone access didn't work. Try typing instead.");
      };
      recognition.onend = () => setListening(false);
      recognitionRef.current = recognition;
      recognition.start();
      setListening(true);
    } catch {
      setListening(false);
      setVoiceError("Unable to start the microphone. Try typing instead.");
    }
  }

  function toggleSpeech(message: ChatMessage) {
    if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
      setVoiceError("Read-aloud is unavailable in this browser.");
      return;
    }
    if (speakingId === message.id) {
      stopSpeaking();
      return;
    }
    stopSpeaking();
    const utterance = new SpeechSynthesisUtterance(message.text);
    utterance.lang = "en-US";
    utterance.rate = 0.96;
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);
    window.speechSynthesis.speak(utterance);
    setSpeakingId(message.id);
  }

  return (
    <div
      className="imran-chat-root"
      data-chat-open={open}
      onPointerEnter={() => document.documentElement.classList.add("imran-chat-pointer-over")}
      onPointerLeave={() => document.documentElement.classList.remove("imran-chat-pointer-over")}
    >
      {!open && visible && (
        <button
          ref={launcherRef}
          type="button"
          className="imran-chat-launcher"
          onClick={() => setOpen(true)}
          aria-label="Open Ask Imran AI portfolio assistant"
          aria-haspopup="dialog"
        >
          <span className="imran-chat-launcher-icon"><MessageCircle size={19} strokeWidth={1.9} /></span>
          <span className="imran-chat-launcher-text">Ask Imran AI</span>
          <span className="imran-chat-launcher-dot" aria-hidden="true" />
        </button>
      )}

      {open && (
        <section
          className="imran-chat-panel"
          role="dialog"
          aria-label="Ask Imran AI portfolio assistant"
          aria-modal="false"
          data-lenis-prevent
        >
          <header className="imran-chat-header">
            <span className="imran-chat-avatar"><Bot size={21} strokeWidth={1.7} /></span>
            <div className="imran-chat-identity">
              <div className="imran-chat-title">Imran AI <Sparkles size={13} aria-hidden="true" /></div>
              <div className="imran-chat-subtitle"><span className="imran-chat-status" /> Portfolio assistant</div>
            </div>
            {showRing && <RemainingRing remaining={remaining} />}
            <button type="button" className="imran-chat-icon-button imran-chat-close" onClick={closeChat} aria-label="Close assistant">
              <X size={19} />
            </button>
          </header>

          <div className="imran-chat-messages" data-lenis-prevent ref={scrollRef} role="log" aria-live="polite" aria-relevant="additions text">
            <div className="imran-chat-welcome">
              <div className="imran-chat-eyebrow"><Sparkles size={13} aria-hidden="true" /> WELCOME TO MY PORTFOLIO</div>
              <h2>Hey there! <span aria-hidden="true">👋</span></h2>
              <p>I'm Imran's AI portfolio assistant. I can guide you through his projects, skills and experience.</p>
              <div className="imran-chat-welcome-limit">
                <span className="imran-chat-welcome-icon"><MessageCircle size={15} /></span>
                <span>Explore my portfolio with direct answers. {quota.aiAvailable ? <>You also have <strong>5 AI-assisted answers per 24 hours</strong> for complex questions.</> : <>AI-assisted responses will be available once the service is configured.</>}</span>
              </div>
              {messages.length === 0 && (
                <button type="button" className="imran-chat-tip" onClick={() => { setDraft(EXAMPLE); inputRef.current?.focus(); }}>
                  <span className="imran-chat-tip-label">TRY ASKING</span>
                  <span className="imran-chat-tip-query">“{EXAMPLE}” <ArrowUp size={13} aria-hidden="true" /></span>
                </button>
              )}
            </div>

            {messages.map((message) => (
              <div key={message.id} className={`imran-chat-message ${message.role === "user" ? "imran-chat-message-user" : "imran-chat-message-assistant"}`}>
                {message.role === "assistant" && <span className="imran-chat-response-avatar"><Bot size={13} /></span>}
                <div className="imran-chat-bubble-wrap">
                  <div className="imran-chat-bubble">{message.text}</div>
                  {message.link && (
                    <a
                      href={message.link.href}
                      target={message.link.external || message.link.href.startsWith("https://") ? "_blank" : undefined}
                      rel={message.link.external || message.link.href.startsWith("https://") ? "noopener noreferrer" : undefined}
                      className="imran-chat-link-card"
                    >
                      <span><FileText size={15} aria-hidden="true" /></span>
                      <span>{message.link.label}</span>
                      <ExternalLink size={14} aria-hidden="true" />
                    </a>
                  )}
                  {message.role === "assistant" && (
                    <button
                      type="button"
                      className="imran-chat-speak"
                      aria-label={speakingId === message.id ? "Stop speaking answer" : "Read answer aloud"}
                      onClick={() => toggleSpeech(message)}
                    >
                      {speakingId === message.id ? <Square size={12} /> : <Volume2 size={15} />}
                      {speakingId === message.id ? "Stop audio" : "Listen to answer"}
                    </button>
                  )}
                </div>
              </div>
            ))}

            {busy && <div className="imran-chat-loading" role="status">Looking through Imran's portfolio…</div>}
            {notice && <div className="imran-chat-voice-error" role="alert">{notice}</div>}
            {limitReached && (
              <div className="imran-chat-complete" role="status">
                <span className="imran-chat-complete-icon"><Sparkles size={18} /></span>
                <h3>AI assistance used for today</h3>
                <p>My 5 Groq-assisted answers are used up for now. You can still ask factual questions answered directly from Imran's portfolio, or get in touch.</p>
                <div className="imran-chat-complete-actions">
                  <a href="/#work">Explore work <ArrowRight size={14} /></a>
                  <a href={RESUME_URL} target="_blank" rel="noopener noreferrer">View resume <ExternalLink size={14} /></a>
                </div>

              </div>
            )}
          </div>

          <div className="imran-chat-footer">
            {voiceError && <p className="imran-chat-voice-error" role="status">{voiceError}</p>}
            <form className="imran-chat-compose" onSubmit={onSubmit}>
              <label htmlFor="imran-chat-question" className="sr-only">Your question about Imran</label>
              <textarea
                id="imran-chat-question"
                ref={inputRef}
                rows={1}
                maxLength={500}
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={onInputKeyDown}
                placeholder="Ask about Imran..."
                disabled={busy}
              />
              <button
                type="button"
                onClick={toggleMicrophone}
                disabled={busy}
                className={`imran-chat-compose-mic ${listening ? "is-listening" : ""}`}
                aria-label={listening ? "Stop voice input" : "Speak your question"}
                title={listening ? "Stop listening" : "Voice input"}
              >
                {listening ? <MicOff size={18} /> : <Mic size={18} />}
              </button>
              <button
                type="submit"
                className="imran-chat-send"
                aria-label="Send question"
                disabled={busy || !draft.trim()}
                title="Send question"
              >
                <Send size={16} />
              </button>
            </form>
            <div className="imran-chat-footnote"><span className="imran-chat-footnote-dot" /> Private session · Conversation is cleared when you close the chat</div>
          </div>
        </section>
      )}
    </div>
  );
}
