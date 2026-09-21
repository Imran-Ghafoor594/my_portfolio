import { Reveal } from "@/components/effects/Reveal";

/** Positioning statement right after the hero. */
export function Calibration() {
  return (
    <section
      id="calibration"
      className="relative flex min-h-[92vh] w-full items-center overflow-hidden py-24 md:py-40"
    >
      <div className="relative mx-auto flex w-full max-w-[1200px] flex-col items-center px-6 text-center md:px-10">
        <Reveal
          y={12}
          duration={1}
          margin={-100}
          className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5"
        >
          <span className="font-mono-tight text-[10px] uppercase tracking-[0.32em] text-white/60 sm:text-[11px]">
            01 / Calibration
          </span>
        </Reveal>

        <Reveal
          as="h2"
          y={20}
          duration={1.3}
          delay={0.1}
          margin={-100}
          className="font-display mt-8 max-w-5xl text-balance text-[clamp(2.25rem,7vw,6rem)] font-medium leading-[0.95] tracking-[-0.045em] text-white md:mt-10"
        >
          I Build AI Systems That <span className="text-gradient">Solve Real-World Problems.</span>
        </Reveal>

        <Reveal
          as="p"
          y={20}
          duration={1.2}
          delay={0.35}
          margin={-100}
          className="mt-8 max-w-2xl text-balance text-base leading-relaxed text-white/60 sm:text-lg md:mt-10 md:text-xl"
        >
          I'm an AI Engineer passionate about Machine Learning, Deep Learning, Computer Vision, NLP,
          and Generative AI. I focus on building production-ready AI solutions that combine research
          with real-world impact.
        </Reveal>

        <Reveal
          y={20}
          duration={1.2}
          delay={0.55}
          margin={-100}
          className="group relative mt-12 md:mt-14"
        >
          {/* Soft halo behind the pill (radial gradient — no blur filter). */}
          <span
            aria-hidden
            className="glow-blob pointer-events-none absolute -inset-10 opacity-40 transition-opacity duration-700 group-hover:opacity-70"
            style={{ ["--blob" as never]: "oklch(0.7 0.22 265 / 0.5)" }}
          />
          <div className="relative inline-flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-5 py-4 transition-[translate,border-color,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.06] sm:px-6">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[oklch(0.75_0.2_265)] md:animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[oklch(0.75_0.2_265)] shadow-[0_0_14px_oklch(0.75_0.2_265)]" />
            </span>
            <div className="flex flex-col items-start text-left">
              <span className="font-mono-tight text-[10px] uppercase tracking-[0.28em] text-white/50">
                Currently
              </span>
              <span className="mt-0.5 text-sm font-medium text-white sm:text-[15px]">
                BS AI Student{" "}
                <span className="text-white/60">— Riphah International University</span>
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
