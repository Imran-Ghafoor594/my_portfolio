import { useState } from "react";
import { motion, type MotionStyle } from "motion/react";

type Props = { audioOn: boolean; onToggle: () => void; style?: MotionStyle };

/** Floating "Listen to Intro" pill. First tap/hover expands it; second tap toggles audio. */
export function HeroAudioToggle({ audioOn, onToggle, style }: Props) {
  const [expanded, setExpanded] = useState(false);
  return (
    <motion.div
      style={style}
      className="pointer-events-none absolute bottom-24 right-5 z-20 sm:bottom-6 sm:right-6 md:bottom-8 md:right-10"
    >
      <button
        type="button"
        onClick={() => (expanded ? onToggle() : setExpanded(true))}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        aria-pressed={audioOn}
        aria-label={audioOn ? "Mute introduction" : "Listen to introduction"}
        className="hero-rise group pointer-events-auto relative inline-flex items-center overflow-hidden rounded-full border border-white/[0.12] bg-black/55 transition-colors hover:border-white/25 hover:bg-black/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.75_0.2_265)]/60 active:scale-95"
        style={
          {
            "--delay": "1.4s",
            boxShadow:
              "0 6px 24px -10px oklch(0.55 0.22 265 / 0.5), inset 0 1px 0 oklch(1 0 0 / 0.06)",
            padding: expanded ? "6px 12px 6px 8px" : "6px",
          } as React.CSSProperties
        }
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-40"
          style={{
            background:
              "conic-gradient(from 120deg, oklch(0.75 0.2 265 / 0.5), oklch(0.7 0.24 305 / 0.5), transparent 55%, oklch(0.75 0.2 265 / 0.5))",
          }}
        />
        <span className="relative flex h-4 w-4 items-center justify-center">
          <span className="text-[0.72rem] leading-none">{audioOn ? "🔇" : "🎧"}</span>
          {!audioOn && !expanded && (
            <span className="absolute -right-0.5 -top-0.5 flex h-1 w-1">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[oklch(0.78_0.2_265)]/80" />
              <span className="relative inline-flex h-1 w-1 rounded-full bg-[oklch(0.78_0.2_265)]" />
            </span>
          )}
        </span>
        <motion.span
          initial={false}
          animate={{
            width: expanded ? "auto" : 0,
            opacity: expanded ? 1 : 0,
            marginLeft: expanded ? 8 : 0,
          }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden whitespace-nowrap font-mono-tight text-[9.5px] uppercase tracking-[0.24em] text-white/85"
        >
          {audioOn ? "Mute Intro" : "Listen to Intro"}
        </motion.span>
      </button>
    </motion.div>
  );
}
