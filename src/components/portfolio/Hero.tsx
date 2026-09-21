import { useRef, type CSSProperties } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { ArrowRight, FileText, Github, Linkedin } from "lucide-react";
import { NeuralBackground } from "@/components/effects/NeuralBackground";
import { useIsDesktop } from "@/hooks/use-media-query";
import { useHeroVideo } from "@/hooks/use-hero-video";
import { GITHUB_URL, LINKEDIN_URL, RESUME_URL } from "@/data/site";
import { HeroBackdrop } from "./HeroBackdrop";
import { HeroAudioToggle } from "./HeroAudioToggle";
import { MagneticButton } from "./MagneticButton";

const FIRST_NAME = "IMRAN";
const LAST_NAME = "GHAFOOR";

/** CSS custom property helper for the staggered entrance delays. */
const delay = (seconds: number) => ({ "--delay": `${seconds}s` }) as CSSProperties;

/**
 * Hero: video (or poster) + name + title. Nothing else competes with it —
 * the floating terminal/dashboard and the corner HUD text are gone.
 * Entrance animations are CSS (see `hero-rise` in styles.css) so they run from
 * first paint and cost no JS.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const isDesktop = useIsDesktop();
  const { videoRef, videoActive, audioOn, toggleAudio } = useHeroVideo(ref);
  const inView = useInView(ref, { margin: "200px" });

  // Scroll-linked fade/drift of the text — opacity + transform only, desktop only.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const audioOpacity = useTransform(scrollYProgress, [0, 0.6, 0.9], [1, 1, 0]);
  const audioY = useTransform(scrollYProgress, [0, 1], [0, 24]);

  const orbPause = inView ? "" : "[animation-play-state:paused]";

  return (
    <section ref={ref} id="top" className="relative min-h-[100svh] w-full overflow-hidden bg-black">
      <HeroBackdrop videoRef={videoRef} videoActive={videoActive} />

      {/* Ambient orbs (desktop): soft radial gradients drifting via transform only,
          paused while the hero is off-screen. No blur filter needed. */}
      <div
        aria-hidden
        className="hero-fade pointer-events-none absolute inset-0 z-[1] hidden md:block"
        style={{ "--dur": "2.2s" } as CSSProperties}
      >
        <div
          className={`animate-orb-a absolute left-[-6%] top-[10%] h-[560px] w-[560px] rounded-full ${orbPause}`}
          style={{
            background: "radial-gradient(circle, oklch(0.7 0.22 265 / 0.22), transparent 60%)",
          }}
        />
        <div
          className={`animate-orb-b absolute bottom-[8%] right-[-4%] h-[640px] w-[640px] rounded-full ${orbPause}`}
          style={{
            background: "radial-gradient(circle, oklch(0.65 0.24 305 / 0.2), transparent 60%)",
          }}
        />
      </div>

      {/* Neural node network (desktop/tablet; the component skips itself on phones) */}
      <div className="absolute inset-0 z-[1] hidden md:block">
        <NeuralBackground />
      </div>

      {/* Identity — bottom-anchored on phones (face stays clear above), vertically centred on desktop */}
      <motion.div
        style={isDesktop ? { y: contentY, opacity: contentOpacity } : undefined}
        className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1400px] flex-col justify-end px-6 pb-14 pt-28 lg:justify-center md:px-10 md:pb-16 md:pt-32"
      >
        <div className="flex max-w-full flex-col items-start text-left md:max-w-[56%]">
          <div
            className="hero-rise inline-flex max-w-full items-center gap-2.5 rounded-3xl border border-white/[0.1] bg-black/30 px-3.5 py-1.5 shadow-[0_8px_40px_-12px_oklch(0.7_0.22_265_/_0.5)] sm:rounded-full md:px-4"
            style={delay(0)}
          >
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[oklch(0.75_0.2_265)] md:animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[oklch(0.75_0.2_265)]" />
            </span>
            <span className="font-mono-tight text-[9.5px] uppercase leading-relaxed tracking-[0.2em] text-white/75 sm:text-[11px] sm:tracking-[0.36em]">
              Open to work
            </span>
          </div>

          <h1
            aria-label="Imran Ghafoor"
            className="font-display mt-6 max-w-[12ch] text-balance text-[clamp(2.75rem,13vw,4.5rem)] font-medium leading-[0.86] tracking-[-0.045em] text-white md:mt-8 md:text-[clamp(2.75rem,7.2vw,6.5rem)]"
          >
            <span aria-hidden className="block">
              {FIRST_NAME.split("").map((ch, i) => (
                <span
                  key={`f-${i}`}
                  className="hero-letter inline-block"
                  style={delay(0.3 + i * 0.045)}
                >
                  {ch}
                </span>
              ))}
            </span>
            <span aria-hidden className="block">
              {LAST_NAME.split("").map((ch, i) => (
                <span
                  key={`l-${i}`}
                  className="hero-letter inline-block bg-clip-text text-transparent"
                  style={{
                    ...delay(0.55 + i * 0.045),
                    backgroundImage:
                      "linear-gradient(100deg, oklch(0.98 0 0) 0%, oklch(0.82 0.14 265) 45%, oklch(0.72 0.22 305) 100%)",
                  }}
                >
                  {ch}
                </span>
              ))}
            </span>
          </h1>

          {/* Title */}
          <div className="hero-rise mt-6 flex items-center gap-4 md:mt-8" style={delay(1.05)}>
            <span
              aria-hidden
              className="h-px w-10 md:w-16"
              style={{
                background:
                  "linear-gradient(to right, oklch(0.85 0.14 265 / 0.9), oklch(0.75 0.22 305 / 0.9))",
              }}
            />
            <p className="font-display text-[0.8rem] font-medium uppercase tracking-[0.42em] text-white/90 sm:text-sm md:text-base md:tracking-[0.5em]">
              AI & ML Engineer
            </p>
          </div>

          <p
            className="hero-rise mt-5 max-w-[34ch] text-balance text-[15px] leading-relaxed text-white/65 sm:text-lg md:mt-6 md:max-w-[38ch]"
            style={delay(1.2)}
          >
            Building intelligent systems that
            <span className="text-white"> · solve real-world problems</span>.
          </p>

          <div
            className="hero-rise mt-8 flex flex-wrap items-center gap-2.5 sm:gap-3 md:mt-10"
            style={delay(1.4)}
          >
            <MagneticButton
              href="#work"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-5 py-3.5 text-sm sm:px-6 font-medium text-black shadow-[0_10px_40px_-10px_rgba(255,255,255,0.5),0_0_60px_-10px_oklch(0.75_0.22_265_/_0.5)] hover:shadow-[0_20px_60px_-10px_rgba(255,255,255,0.6),0_0_80px_-10px_oklch(0.75_0.22_305_/_0.6)] md:px-7 md:py-4"
            >
              <span className="relative z-10">Explore Work</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </MagneticButton>
            <div className="mx-1 hidden h-6 w-px bg-white/10 sm:block" />
            <MagneticButton
              href={GITHUB_URL}
              external
              aria-label="GitHub"
              className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.1] bg-black/25 text-white/70 transition-all hover:border-white/25 hover:bg-white/[0.08] hover:text-white"
            >
              <Github className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton
              href={LINKEDIN_URL}
              external
              aria-label="LinkedIn"
              className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.1] bg-black/25 text-white/70 transition-all hover:border-white/25 hover:bg-white/[0.08] hover:text-white"
            >
              <Linkedin className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton
              href={RESUME_URL}
              external
              className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.03] text-white/70 backdrop-blur-xl transition-all hover:border-white/25 hover:bg-white/[0.08] hover:text-white"
              aria-label="Resume"
            >
              <FileText className="h-4 w-4" />
            </MagneticButton>
          </div>
        </div>
      </motion.div>

      {videoActive && (
        <HeroAudioToggle
          audioOn={audioOn}
          onToggle={toggleAudio}
          style={isDesktop ? { opacity: audioOpacity, y: audioY } : undefined}
        />
      )}

      {/* Scroll cue (desktop) */}
      <div
        className="hero-fade pointer-events-none absolute inset-x-0 bottom-6 z-10 hidden flex-col items-center gap-3 md:flex"
        style={{ "--delay": "1.8s", "--dur": "1s" } as CSSProperties}
      >
        <span className="font-mono-tight text-[10px] uppercase tracking-[0.5em] text-white/50">
          Scroll to explore
        </span>
        <span className="relative flex h-12 w-[1.5px] overflow-hidden rounded-full bg-white/[0.08]">
          <span
            className="animate-scroll-cue absolute inset-x-0 top-0 h-4 rounded-full"
            style={{
              background:
                "linear-gradient(to bottom, oklch(0.85 0.12 265), oklch(0.7 0.22 305 / 0.6), transparent)",
              boxShadow: "0 0 12px oklch(0.75 0.2 265 / 0.7)",
            }}
          />
        </span>
      </div>
    </section>
  );
}
