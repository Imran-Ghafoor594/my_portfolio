import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, Calendar, GraduationCap } from "lucide-react";
import { Reveal } from "@/components/effects/Reveal";
import { experience, type Experience as ExperienceEntry } from "@/data/experience";
import { SectionLabel } from "./SectionLabel";

export function Experience() {
  const railRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 70%", "end 60%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="relative py-20 md:py-32 lg:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        {/* Section intro — engineering log framing */}
        <div className="grid grid-cols-12 items-end gap-y-8 lg:gap-x-8">
          <div className="col-span-12 lg:col-span-8">
            <SectionLabel index="03" label="Trajectory Engineering log" />
            <Reveal
              as="h2"
              y={20}
              duration={1.2}
              delay={0.05}
              margin={-100}
              className="font-display mt-8 max-w-3xl text-balance text-[clamp(2.25rem,6vw,5.25rem)] font-medium leading-[0.92] tracking-[-0.04em] text-white"
            >
              An engineering path, <span className="text-gradient">logged like commits.</span>
            </Reveal>
            <Reveal
              as="p"
              y={16}
              duration={1}
              delay={0.15}
              margin={-100}
              className="mt-6 max-w-xl text-balance text-[15px] leading-relaxed text-white/55 md:text-base"
            >
              Every internship is a checkpoint — real teams, real datasets, systems shipped
              end-to-end.
            </Reveal>
          </div>

          {/* Live status monitor */}
          <Reveal
            y={20}
            duration={1}
            delay={0.25}
            margin={-100}
            className="glass col-span-12 flex items-center justify-between gap-6 rounded-2xl p-5 lg:col-span-4"
          >
            <div>
              <div className="font-mono-tight text-[10px] uppercase tracking-[0.36em] text-white/45">
                Currently
              </div>
              <div className="mt-2 flex items-start gap-2.5">
                <span className="relative flex h-2 w-2 shrink-0 mt-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399]" />
                </span>

                <div className="font-display text-[15px] font-medium text-white">
                  <div>Pursuing Bachelor's in Artificial Intelligence</div>
                  <div className="mt-1 text-white/60">
                    GCI World 2026 Participant — Matsuo & Iwasawa Laboratory, The University of
                    Tokyo
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-mono-tight text-[10px] uppercase tracking-[0.36em] text-white/45">
                Roles
              </div>
              <div className="mt-1 font-display text-3xl font-medium tracking-[-0.03em] text-white">
                {String(experience.length).padStart(2, "0")}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Timeline */}
        <div ref={railRef} className="relative mt-24 md:mt-32">
          {/* Rail — background */}
          <div className="pointer-events-none absolute left-6 top-0 bottom-0 w-px bg-white/[0.06] md:left-1/2 md:-translate-x-1/2" />
          {/* Rail — glowing progress line */}
          <motion.div
            style={{ scaleY: lineScale }}
            className="pointer-events-none absolute left-6 top-0 bottom-0 w-px origin-top md:left-1/2 md:-translate-x-1/2"
          >
            <div
              className="h-full w-full"
              style={{
                background:
                  "linear-gradient(to bottom, oklch(0.75 0.2 265 / 0.9), oklch(0.62 0.24 305 / 0.7), transparent)",
                boxShadow:
                  "0 0 12px oklch(0.7 0.22 265 / 0.6), 0 0 32px oklch(0.7 0.22 265 / 0.35)",
              }}
            />
          </motion.div>

          <div className="space-y-14 md:space-y-28">
            {experience.map((exp, i) => (
              <ExperienceItem key={exp.company} exp={exp} index={i} />
            ))}
          </div>
        </div>

        {/* Education — compact, sits alongside the work timeline rather than
            getting its own section */}
        {/* <Reveal
          y={20}
          duration={0.9}
          margin={-100}
          className="glass mt-16 flex flex-col items-start gap-5 rounded-2xl p-6 sm:flex-row sm:items-center sm:justify-between md:mt-20"
        > */}
        {/* <div className="flex items-center gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[oklch(0.78_0.16_265)]">
              <GraduationCap className="h-5 w-5" strokeWidth={1.75} />
            </span>
            <div>
              <div className="font-mono-tight text-[10px] uppercase tracking-[0.36em] text-white/45">
                Education
              </div>
              <div className="mt-1.5 font-display text-[17px] font-medium text-white">
                BS Artificial Intelligence
              </div>
              <div className="mt-0.5 text-[13px] text-white/55">
                Riphah International University, Pakistan
              </div>
            </div>
          </div> */}
        {/* </Reveal> */}
      </div>
    </section>
  );
}

function ExperienceItem({ exp, index }: { exp: ExperienceEntry; index: number }) {
  const right = index % 2 === 1;
  return (
    <div className="relative grid grid-cols-1 items-start gap-6 md:grid-cols-2 md:gap-16">
      {/* Node on the spine */}
      <motion.span
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-140px" }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-6 top-6 z-10 flex h-4 w-4 -translate-x-1/2 items-center justify-center md:left-1/2 md:top-8"
      >
        <motion.span
          initial={{ scale: 0.4, opacity: 0.9 }}
          whileInView={{ scale: 2.6, opacity: 0 }}
          viewport={{ once: true, margin: "-140px" }}
          transition={{ duration: 1.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute h-4 w-4 rounded-full bg-[oklch(0.75_0.2_265)]"
        />
        <span className="relative h-2.5 w-2.5 rounded-full bg-[oklch(0.78_0.16_265)] shadow-[0_0_18px_oklch(0.7_0.22_265),0_0_36px_oklch(0.7_0.22_265_/_0.4)]" />
      </motion.span>

      {/* Card */}
      <Reveal
        y={40}
        duration={1.1}
        margin={-120}
        className={`pl-14 md:pl-0 ${right ? "md:col-start-2 md:pl-12" : "md:pr-12"}`}
      >
        <article
          className={`group relative isolate overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] p-5 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.05] hover:shadow-[0_40px_100px_-30px_oklch(0.7_0.22_265_/_0.45)] sm:p-6 md:p-8 ${right ? "" : "md:text-right"
            }`}
        >
          {/* Ambient hover glow */}
          <span
            aria-hidden
            className="glow-blob pointer-events-none absolute -inset-6 -z-10 opacity-0 transition-opacity duration-700 group-hover:opacity-60"
            style={{ ["--blob" as never]: "oklch(0.7 0.22 265 / 0.45)" }}
          />
          {/* Top accent line */}
          <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          {/* Case index */}
          <div
            className={`flex items-center gap-3 font-mono-tight text-[10px] uppercase tracking-[0.36em] text-white/40 ${right ? "" : "md:justify-end"}`}
          >
            <span>Log #{String(index + 1).padStart(2, "0")}</span>
            {exp.focus ? (
              <>
                <span className="h-px w-6 bg-white/15" />
                <span className="text-white/60">{exp.focus}</span>
              </>
            ) : null}
          </div>

          {/* Duration + current badge */}
          <div
            className={`mt-5 flex items-center gap-3 font-mono-tight text-[10px] uppercase tracking-[0.28em] text-white/50 ${right ? "" : "md:justify-end"
              }`}
          >
            <Calendar className="h-3 w-3" />
            <span>{exp.duration}</span>
            {exp.current ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2 py-0.5 text-[9px] tracking-[0.22em] text-emerald-300">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
                </span>
                Live
              </span>
            ) : null}
          </div>

          {/* Role */}
          <h3 className="font-display mt-4 text-2xl font-medium leading-tight tracking-[-0.025em] text-white md:text-[2rem]">
            {exp.role}
          </h3>

          {/* Company */}
          <div
            className={`mt-2 flex items-center gap-2 text-sm text-white/70 ${right ? "" : "md:justify-end"
              }`}
          >
            <span
              className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-white/10 bg-white/[0.04] font-mono-tight text-[10px] font-medium uppercase tracking-[0.1em] text-white/80"
              aria-hidden
            >
              {exp.company
                .split(" ")
                .map((w) => w[0])
                .slice(0, 2)
                .join("")}
            </span>
            <span className="text-white/90">{exp.company}</span>
          </div>

          {/* Description */}
          <p className="mt-6 text-[15px] leading-relaxed text-white/65">{exp.description}</p>

          {/* Metrics */}
          {exp.metrics ? (
            <div
              className={`mt-6 grid grid-cols-1 gap-2 sm:grid-cols-3 ${right ? "" : "md:text-right"}`}
            >
              {exp.metrics.map((m) => (
                <div
                  key={m.label}
                  className="flex min-w-0 items-baseline justify-between gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] px-3 py-2.5 transition-colors duration-500 group-hover:border-white/15 sm:block"
                >
                  <div className="font-mono-tight text-[9px] uppercase tracking-[0.26em] text-white/40">
                    {m.label}
                  </div>
                  <div className="font-display text-sm font-medium text-white sm:mt-1">
                    {m.value}
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {/* Tech badges */}
          <div className={`mt-6 flex flex-wrap gap-2 ${right ? "" : "md:justify-end"}`}>
            {exp.tech.map((t) => (
              <span
                key={t}
                className="group/tag relative rounded-full border border-white/[0.1] bg-white/[0.03] px-3 py-1 font-mono-tight text-[11px] uppercase tracking-[0.18em] text-white/70 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-white/25 hover:bg-white/[0.06] hover:text-white hover:shadow-[0_0_20px_oklch(0.7_0.22_265_/_0.35)]"
              >
                {t}
              </span>
            ))}
          </div>

          {exp.link ? (
            <div className={`mt-5 flex ${right ? "" : "md:justify-end"}`}>
              <a
                href={exp.link.url}
                target="_blank"
                rel="noreferrer"
                className="group/link inline-flex items-center gap-1.5 font-mono-tight text-[11px] uppercase tracking-[0.24em] text-white/60 transition-colors hover:text-white"
              >
                {exp.link.label}
                <ArrowUpRight className="h-3 w-3 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
              </a>
            </div>
          ) : null}
        </article>
      </Reveal>

      {/* Spacer on opposite column for desktop alignment */}
      <div
        className={
          right
            ? "hidden md:block md:col-start-1 md:row-start-1"
            : "hidden md:block md:col-start-2 md:row-start-1"
        }
      />
    </div>
  );
}
