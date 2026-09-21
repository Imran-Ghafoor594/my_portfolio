import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Github } from "lucide-react";
import { useRevealProps } from "@/hooks/use-reveal-props";
import { useIsDesktop } from "@/hooks/use-media-query";
import { featuredProjects, otherProjects, type Project } from "@/data/projects";
import { SectionLabel } from "./SectionLabel";

const accentVar = (accent: string) => ({ ["--blob" as never]: accent });

export function FeaturedProjects() {
  return (
    <section id="work" className="relative py-20 md:py-32 lg:py-40">
      <div
        aria-hidden
        className="glow-blob pointer-events-none absolute left-1/2 top-40 h-[600px] w-[900px] -translate-x-1/2"
        style={{ ["--blob" as never]: "oklch(0.7 0.22 265 / 0.22)" }}
      />
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-12 items-end gap-y-8 lg:gap-x-8">
          <div className="col-span-12 lg:col-span-8">
            <SectionLabel index="02" label="Selected work" />
            <h2 className="font-display mt-8 max-w-3xl text-balance text-[clamp(2.25rem,6.4vw,6rem)] font-medium leading-[0.9] tracking-[-0.04em]">
              Four systems, <span className="text-gradient">built beyond the classroom.</span>
            </h2>
            <p className="mt-6 max-w-xl text-balance text-base leading-relaxed text-white/55 md:text-lg">
              Each project below started with a real problem, shipped as a working system, and left
              a measurable trace.
            </p>
          </div>
          <div className="col-span-12 flex items-center gap-6 lg:col-span-4 lg:justify-end">
            <div className="hidden h-24 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent md:block" />
            <div className="font-mono-tight text-[11px] uppercase tracking-[0.3em] text-white/50">
              <div>Case studies</div>
              <div className="mt-2 font-display text-4xl font-medium tracking-[-0.03em] text-white">
                {String(featuredProjects.length).padStart(2, "0")}
              </div>
              <div className="mt-2 text-white/40">2024 — 2026</div>
            </div>
          </div>
        </div>

        <div className="mt-16 md:mt-28">
          {featuredProjects.map((p, i) => (
            <ProjectCase key={p.n} project={p} index={i} isLast={i === featuredProjects.length - 1} />
          ))}
        </div>

        <div className="mt-24 border-t border-white/10 pt-12 md:mt-32 md:pt-16">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="font-mono-tight text-[10px] uppercase tracking-[0.3em] text-white/40">Other builds</div>
              <h3 className="font-display mt-3 text-3xl font-medium tracking-[-0.035em] text-white md:text-5xl">Smaller systems, still shipped.</h3>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-white/45 md:text-right">
              Earlier experiments stay visible without competing with the four projects that best represent my current engineering range.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {otherProjects.map((project) => (
              <OtherBuild key={project.n} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function OtherBuild({ project }: { project: Project }) {
  return (
    <article className="glass group relative overflow-hidden rounded-[1.5rem] border border-white/[0.08] p-4 transition-transform duration-500 hover:-translate-y-1 md:p-5">
      <div className="flex gap-4">
        <div className="h-24 w-28 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-black/30 sm:h-28 sm:w-36">
          <img src={project.image} alt={`${project.name} preview`} loading="lazy" className="h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-mono-tight text-[9px] uppercase tracking-[0.28em] text-white/35">{project.year} · {project.status}</div>
          <h4 className="font-display mt-2 text-xl font-medium leading-tight tracking-[-0.025em] text-white md:text-2xl">{project.name}</h4>
          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-white/45 md:text-sm">{project.tagline}</p>
          <a href={project.github} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1.5 font-mono-tight text-[9px] uppercase tracking-[0.2em] text-white/65 transition-colors hover:text-white">GitHub <Github className="h-3 w-3" /></a>
        </div>
      </div>
    </article>
  );
}

function ProjectCase({
  project,
  index,
  isLast,
}: {
  project: Project;
  index: number;
  isLast: boolean;
}) {
  const flipped = index % 2 === 1;
  const isDesktop = useIsDesktop();
  const ref = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const reveal = useRevealProps({ y: 60, duration: 1.3, margin: -120 });

  // Parallax is desktop-only and transform-only. The image no longer changes
  // scale with scroll (it sits at a fixed 1.15 to leave room for the travel).
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const numberY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  // Mouse-tracked spotlight on the image (CSS variables — no React state).
  const onImageMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = imageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--px", `${((e.clientX - rect.left) / rect.width) * 100}%`);
    el.style.setProperty("--py", `${((e.clientY - rect.top) / rect.height) * 100}%`);
  };

  return (
    <motion.article ref={ref} {...reveal} className="group relative">
      {/* Case header rail */}
      <div className="mb-8 flex items-center gap-4 md:mb-14 md:gap-6">
        <motion.div
          style={isDesktop ? { y: numberY } : undefined}
          className="font-display text-[clamp(3.25rem,10vw,9rem)] font-medium leading-none tracking-[-0.06em]"
        >
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(140deg, ${project.accent} 0%, oklch(1 0 0 / 0.9) 55%, oklch(1 0 0 / 0.15) 100%)`,
            }}
          >
            {project.n}
          </span>
        </motion.div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3 font-mono-tight text-[10px] uppercase tracking-[0.3em] text-white/45 md:tracking-[0.36em]">
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ background: project.accent, boxShadow: `0 0 12px ${project.accent}` }}
            />
            Case / {project.year} · {project.status}
          </div>
          <h3 className="font-display mt-3 text-balance text-[clamp(1.75rem,4.4vw,4rem)] font-medium leading-[0.98] tracking-[-0.035em]">
            {project.name}
          </h3>
          <p className="mt-3 max-w-2xl text-balance text-[15px] leading-relaxed text-white/60 md:text-lg">
            {project.tagline}
          </p>
        </div>
      </div>

      {/* Main body */}
      <div className="grid grid-cols-12 items-start gap-y-8 lg:gap-16">
        {/* Image */}
        <div className={`relative col-span-12 lg:col-span-7 ${flipped ? "lg:order-2" : ""}`}>
          <div
            ref={imageRef}
            onMouseMove={onImageMove}
            className="relative"
            style={{ ["--px" as never]: "50%", ["--py" as never]: "50%" }}
          >
            {/* Ambient accent glow (radial gradient — no blur filter) */}
            <div
              aria-hidden
              className="glow-blob pointer-events-none absolute -inset-24 opacity-30 transition-opacity duration-700 group-hover:opacity-70"
              style={accentVar(project.accent)}
            />
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[1.5rem] border border-white/[0.08] shadow-[0_40px_100px_-40px_oklch(0_0_0_/_0.9)] transition-[border-color] duration-700 group-hover:border-white/25 md:rounded-[2rem]">
              <motion.img
                src={project.image}
                alt={`${project.name} — cover`}
                loading="lazy"
                decoding="async"
                width={1200}
                height={750}
                style={isDesktop ? { y: imgY } : undefined}
                className="absolute inset-0 h-full w-full object-cover transition-[filter] duration-700 md:scale-[1.15] md:will-change-transform md:group-hover:brightness-110 md:group-hover:saturate-125"
              />
              {/* Tone gradients */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/40" />

              {/* Mouse spotlight */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 md:group-hover:opacity-100"
                style={{
                  background: `radial-gradient(360px circle at var(--px) var(--py), ${project.accent.replace(")", " / 0.25)")}, transparent 60%)`,
                }}
              />

              {/* Top-left case chip */}
              <div className="absolute left-3 top-3 flex items-center gap-2 md:left-5 md:top-5">
                <span className="rounded-full border border-white/10 bg-black/45 px-3 py-1.5 font-mono-tight text-[10px] uppercase tracking-[0.24em] text-white/85 md:tracking-[0.32em]">
                  ● Case / {project.n}
                </span>
                <span className="hidden rounded-full border border-white/10 bg-black/40 px-3 py-1.5 font-mono-tight text-[10px] uppercase tracking-[0.32em] text-white/70 md:inline-flex">
                  {project.year}
                </span>
              </div>

              {/* Top-right role chip */}
              <div className="absolute right-3 top-3 md:right-5 md:top-5">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 font-mono-tight text-[10px] uppercase tracking-[0.2em] text-white/80 md:tracking-[0.28em]">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: project.accent, boxShadow: `0 0 10px ${project.accent}` }}
                  />
                  {project.role}
                </span>
              </div>

              {/* Bottom title + CTA */}
              <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-6 md:inset-x-6 md:bottom-6">
                <div>
                  <div className="font-mono-tight text-[10px] uppercase tracking-[0.34em] text-white/55">
                    {project.status}
                  </div>
                  <div className="font-display mt-1 text-xl font-medium text-white md:text-3xl">
                    {project.name}
                  </div>
                </div>
                {project.caseStudy ? (
                  <Link to={project.caseStudy} className="hidden translate-y-2 items-center gap-2 rounded-full border border-white/10 bg-black/50 px-4 py-2 text-xs text-white opacity-0 transition-all duration-500 md:inline-flex md:group-hover:translate-y-0 md:group-hover:opacity-100">
                    Read case study <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                ) : null}
              </div>

              {/* Inner accent glow */}
              <div
                className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-0 transition-opacity duration-700 md:group-hover:opacity-100"
                style={{ boxShadow: `inset 0 0 90px ${project.accent}` }}
              />
            </div>

            {/* Metrics strip under image */}
            <div className="mt-4 grid grid-cols-3 gap-2 md:mt-5 md:gap-3">
              {project.metrics.map((m) => (
                <div
                  key={m.label}
                  className="glass group/metric relative overflow-hidden rounded-2xl px-3 py-3 transition-[translate] duration-500 hover:-translate-y-0.5 md:px-4 md:py-4"
                >
                  <div
                    aria-hidden
                    className="glow-blob pointer-events-none absolute -inset-x-6 -bottom-16 h-24 opacity-40 transition-opacity duration-500 group-hover/metric:opacity-90"
                    style={accentVar(project.accent)}
                  />
                  <div className="relative font-mono-tight text-[9px] uppercase tracking-[0.2em] text-white/45 md:text-[10px] md:tracking-[0.28em]">
                    {m.label}
                  </div>
                  <div className="relative mt-1 font-display text-base font-medium tracking-[-0.02em] text-white sm:text-2xl md:text-3xl">
                    {m.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: Problem / Solution / Tech / CTAs */}
        <div className={`col-span-12 lg:col-span-5 ${flipped ? "lg:order-1" : ""}`}>
          <div className="space-y-6">
            <div className="glass relative overflow-hidden rounded-2xl p-5 md:p-6">
              <div className="font-mono-tight text-[10px] uppercase tracking-[0.32em] text-white/45">
                The problem
              </div>
              <p className="mt-3 text-balance text-[15px] leading-relaxed text-white/75 md:text-base">
                {project.problem}
              </p>
            </div>
            <div className="glass relative overflow-hidden rounded-2xl p-5 md:p-6">
              <div
                aria-hidden
                className="glow-blob pointer-events-none absolute -right-16 -top-16 h-40 w-40 opacity-40"
                style={accentVar(project.accent)}
              />
              <div className="relative font-mono-tight text-[10px] uppercase tracking-[0.32em] text-white/45">
                The solution
              </div>
              <p className="relative mt-3 text-balance text-[15px] leading-relaxed text-white/85 md:text-base">
                {project.solution}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <div className="font-mono-tight text-[10px] uppercase tracking-[0.32em] text-white/45">
              Technology
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="group/tech relative isolate overflow-hidden rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono-tight text-[10.5px] uppercase tracking-[0.16em] text-white/75 transition-all duration-500 hover:-translate-y-0.5 hover:border-white/30 hover:text-white md:text-[11px] md:tracking-[0.2em]"
                >
                  <span
                    className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover/tech:opacity-100"
                    style={{
                      background: `radial-gradient(circle at 50% 120%, ${project.accent}, transparent 70%)`,
                    }}
                  />
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3 md:mt-10">
            {project.caseStudy ? (
              <Link
                to={project.caseStudy}
                className="group/btn relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black shadow-[0_10px_40px_-10px_rgba(255,255,255,0.4)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-[0_20px_60px_-10px_rgba(255,255,255,0.5)]"
              >
                <span className="relative">Read case study</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover/btn:translate-x-0.5" />
              </Link>
            ) : (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="group/btn relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black shadow-[0_10px_40px_-10px_rgba(255,255,255,0.4)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-[0_20px_60px_-10px_rgba(255,255,255,0.5)]"
              >
                <span className="relative">View project</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover/btn:translate-x-0.5" />
              </a>
            )}
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="group/btn inline-flex items-center gap-2 rounded-full border border-white/[0.14] bg-white/[0.04] px-5 py-3.5 text-sm text-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.09]"
            >
              <Github className="h-4 w-4" /> View source
            </a>
          </div>
        </div>
      </div>

      {/* Cinematic divider between cases */}
      {!isLast && (
        <div className="relative mt-20 md:mt-32">
          <div className="mx-auto h-px w-full max-w-4xl bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          <div className="mt-6 flex items-center justify-center gap-3 font-mono-tight text-[10px] uppercase tracking-[0.5em] text-white/30">
            <span className="h-px w-8 bg-white/20" />
            Next case
            <span className="h-px w-8 bg-white/20" />
          </div>
        </div>
      )}
    </motion.article>
  );
}
