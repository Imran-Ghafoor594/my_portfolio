import { Award, ExternalLink, GitBranch, Github } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/effects/Reveal";
import { certifications, ghStats, languageBreakdown, stackGroups } from "@/data/architecture";
import { GITHUB_URL, GITHUB_USER } from "@/data/site";
import { SectionLabel } from "./SectionLabel";

export function Architecture() {
  return (
    <section id="architecture" className="relative py-20 md:py-32 lg:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        {/* Section intro */}
        <div className="grid grid-cols-12 gap-y-8 lg:gap-x-8">
          <div className="col-span-12 lg:col-span-7">
            <SectionLabel index="04" label="Technical Architecture" />
            <Reveal
              as="h2"
              y={20}
              duration={0.9}
              className="font-display mt-8 text-balance text-[clamp(2.25rem,6vw,5rem)] font-medium leading-[0.95] tracking-[-0.035em] text-white"
            >
              Behind <span className="text-gradient">the intelligence.</span>
            </Reveal>
          </div>
          <Reveal
            as="p"
            y={20}
            duration={0.9}
            delay={0.1}
            className="col-span-12 max-w-md self-end text-[15px] leading-relaxed text-white/60 lg:col-span-5"
          >
            A live look at the systems behind the systems — repositories, stack, certifications, and
            internships wired together like a dashboard.
          </Reveal>
        </div>

        {/* Asymmetric grid */}
        <div className="mt-14 grid grid-cols-12 gap-y-6 md:mt-20 lg:gap-x-6">
          {/* MODULE 1 · GitHub dashboard */}
          <ArchPanel className="col-span-12" label="01 · GitHub dashboard">
            <div className="grid grid-cols-12 items-start gap-y-6 lg:gap-x-6">
              {/* Profile card */}
              <div className="col-span-12 flex items-center gap-5 lg:col-span-5">
                <div className="relative shrink-0">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -inset-8 rounded-full"
                    style={{
                      background:
                        "radial-gradient(closest-side, oklch(0.75 0.2 265 / 0.38), oklch(0.62 0.24 305 / 0.2) 60%, transparent)",
                    }}
                  />
                  <img
                    src={`https://github.com/${GITHUB_USER}.png?size=200`}
                    alt="Imran Ghafoor · GitHub avatar"
                    width={112}
                    height={112}
                    loading="lazy"
                    className="relative h-24 w-24 rounded-2xl border border-white/15 object-cover shadow-[0_20px_60px_-20px_oklch(0.15_0.05_265_/_0.9)]"
                  />
                  <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-[oklch(0.14_0.02_265)] bg-emerald-400 shadow-[0_0_10px_#34d399]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.14_0.02_265)]" />
                  </span>
                </div>
                <div className="min-w-0">
                  <div className="font-mono-tight text-[10px] uppercase tracking-[0.32em] text-white/45">
                    @{GITHUB_USER}
                  </div>
                  <div className="font-display mt-1 truncate text-[22px] font-medium text-white">
                    Imran Ghafoor
                  </div>
                  <p className="mt-2 max-w-xs text-[13px] leading-relaxed text-white/60">
                    AI Engineer building ML, deep learning, and AI-powered systems.
                  </p>
                </div>
              </div>

              {/* Stats grid */}
              <div className="col-span-12 grid grid-cols-1 gap-2 min-[420px]:grid-cols-3 lg:col-span-7">
                {ghStats.map((s) => (
                  <div
                    key={s.label}
                    className="group/stat relative flex min-w-0 items-baseline justify-between gap-3 overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.02] px-2.5 py-3 transition-all duration-500 hover:-translate-y-0.5 min-[420px]:block sm:px-3 hover:border-white/20"
                  >
                    <span
                      aria-hidden
                      className="glow-blob pointer-events-none absolute -inset-x-4 -bottom-10 h-20 opacity-0 transition-opacity duration-500 group-hover/stat:opacity-100"
                      style={{ ["--blob" as never]: "oklch(0.7 0.22 265 / 0.5)" }}
                    />
                    <div className="relative font-mono-tight text-[9px] uppercase tracking-[0.12em] text-white/40 sm:tracking-[0.24em]">
                      {s.label}
                    </div>
                    <div className="relative font-display text-2xl font-medium tracking-[-0.02em] text-white min-[420px]:mt-1">
                      {s.value}
                    </div>
                    <div className="relative font-mono-tight text-[9px] uppercase tracking-[0.2em] text-emerald-300/80 min-[420px]:mt-1">
                      {s.trend}
                    </div>
                  </div>
                ))}
              </div>

              {/* Language breakdown */}
              <div className="col-span-12">
                <div className="mb-3 flex items-center justify-between">
                  <div className="font-mono-tight text-[10px] uppercase tracking-[0.32em] text-white/45">
                    Languages
                  </div>
                  <div className="font-mono-tight text-[10px] uppercase tracking-[0.32em] text-white/40">
                    Aggregate
                  </div>
                </div>
                <div className="flex h-2 w-full overflow-hidden rounded-full border border-white/[0.08] bg-white/[0.02]">
                  {languageBreakdown.map((l) => (
                    <div
                      key={l.name}
                      className="h-full transition-all duration-700"
                      style={{
                        width: `${l.pct}%`,
                        background: l.color,
                        boxShadow: `0 0 12px ${l.color}`,
                      }}
                      aria-label={`${l.name} ${l.pct}%`}
                    />
                  ))}
                </div>
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                  {languageBreakdown.map((l) => (
                    <div
                      key={l.name}
                      className="flex items-center gap-2 font-mono-tight text-[11px] text-white/70"
                    >
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ background: l.color, boxShadow: `0 0 8px ${l.color}` }}
                      />
                      <span className="text-white/85">{l.name}</span>
                      <span className="text-white/40">{l.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="col-span-12 flex flex-wrap gap-2.5">
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[oklch(0.7_0.22_265)] to-[oklch(0.62_0.24_305)] px-4 py-2.5 text-[13px] font-medium text-white shadow-[0_0_36px_oklch(0.7_0.22_265_/_0.45)] transition-transform hover:scale-[1.03]"
                >
                  <Github className="h-3.5 w-3.5" /> Visit profile
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
                <a
                  href={`${GITHUB_URL}?tab=repositories`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-[13px] font-medium text-white/85 transition-all hover:border-white/25 hover:bg-white/[0.08] hover:text-white"
                >
                  <GitBranch className="h-3.5 w-3.5" /> Browse repos
                </a>
              </div>
            </div>
          </ArchPanel>

          {/* MODULE 2 · Tech stack */}
          <ArchPanel className="col-span-12 lg:col-span-8" label="02 · Tech stack">
            <div className="space-y-8">
              {stackGroups.map((g, gi) => (
                <div key={g.title}>
                  <div className="flex items-center justify-between">
                    <div className="font-mono-tight text-[10px] uppercase tracking-[0.32em] text-white/45">
                      {g.title}
                    </div>
                    <div className="font-mono-tight text-[10px] uppercase tracking-[0.24em] text-white/30">
                      {String(g.items.length).padStart(2, "0")} items
                    </div>
                  </div>
                  <div className="mt-2 h-px w-full bg-gradient-to-r from-white/10 to-transparent" />
                  <div className="mt-4 flex flex-wrap gap-2.5">
                    {g.items.map((name, i) => (
                      <Reveal
                        as="span"
                        key={name}
                        y={12}
                        duration={0.55}
                        delay={gi * 0.05 + i * 0.025}
                        margin={-60}
                        className="group relative overflow-hidden rounded-full border border-white/[0.09] bg-white/[0.03] px-3.5 py-1.5 font-display text-[13px] text-white/85 transition-[translate,border-color,background-color,color,box-shadow] duration-500 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.06] hover:text-white hover:shadow-[0_0_24px_oklch(0.7_0.22_265_/_0.4)]"
                      >
                        <span
                          className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                          style={{
                            background:
                              "radial-gradient(circle at 30% 30%, oklch(0.7 0.22 265 / 0.28), transparent 70%)",
                          }}
                        />
                        <span className="relative">{name}</span>
                      </Reveal>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ArchPanel>

          {/* MODULE 5 · Certifications */}
          <ArchPanel className="col-span-12 lg:col-span-4" label="03 · Certifications">
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {certifications.map((c, i) => (
                <Reveal
                  as="li"
                  key={c.title}
                  y={10}
                  duration={0.6}
                  delay={i * 0.05}
                  margin={-60}
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] transition-all duration-500 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.05]"
                >
                  <span
                    aria-hidden
                    className="glow-blob pointer-events-none absolute -right-10 -top-10 h-24 w-24 opacity-0 transition-opacity duration-500 group-hover:opacity-80"
                    style={{ ["--blob" as never]: "oklch(0.7 0.22 265 / 0.5)" }}
                  />
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`View ${c.title} certificate (opens in a new tab)`}
                    className="relative flex items-start gap-3 p-4"
                  >
                    <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04]">
                      <Award className="h-4 w-4 text-[oklch(0.82_0.16_265)]" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="font-display text-[14px] font-medium leading-tight text-white">
                        {c.title}
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono-tight text-[10px] uppercase tracking-[0.24em] text-white/45">
                        <span className="truncate">{c.issuer}</span>
                        <span className="h-1 w-1 shrink-0 rounded-full bg-white/20" />
                        <span className="shrink-0">{c.date}</span>
                      </div>
                      <div className="mt-2 inline-flex items-center gap-1 font-mono-tight text-[10px] uppercase tracking-[0.24em] text-white/60 transition-colors group-hover:text-white">
                        View Certificate{" "}
                        <ExternalLink className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </a>
                </Reveal>
              ))}
            </ul>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="group mt-5 inline-flex items-center gap-1.5 font-mono-tight text-[10px] uppercase tracking-[0.28em] text-white/50 transition-colors hover:text-white"
            >
              Verify credentials{" "}
              <ExternalLink className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </ArchPanel>
        </div>
      </div>
    </section>
  );
}

function ArchPanel({
  children,
  className = "",
  label,
}: {
  children: React.ReactNode;
  className?: string;
  label: string;
}) {
  return (
    <Reveal
      y={30}
      duration={0.9}
      className={`glass group relative overflow-hidden rounded-3xl p-5 sm:p-6 md:p-8 ${className}`}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{ boxShadow: "inset 0 0 60px oklch(0.7 0.22 265 / 0.14)" }}
      />
      <div className="font-mono-tight text-[10px] uppercase tracking-[0.32em] text-white/40">
        {label}
      </div>
      <div className="mt-6">{children}</div>
    </Reveal>
  );
}
