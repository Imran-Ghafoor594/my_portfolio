import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Github, ExternalLink, Database, ShieldCheck, Map, BrainCircuit, Server, Layers3 } from "lucide-react";
import { motion } from "motion/react";
import cropHeatCover from "@/assets/cropheat-case.svg";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { CustomCursor } from "@/components/effects/CustomCursor";
import { MouseGlow } from "@/components/effects/MouseGlow";
import { SmoothScroll } from "@/components/effects/SmoothScroll";

const accent = "oklch(0.78 0.18 45)";

const stats = [
  ["Risk output", "0–100"],
  ["Risk factors", "06"],
  ["Supported crops", "04"],
  ["API", "FortyGuard"],
];

const stack = [
  "Next.js 15",
  "React 19",
  "TypeScript",
  "Tailwind CSS",
  "FastAPI",
  "Python 3.12",
  "Leaflet",
  "Recharts",
  "SQLite",
  "Anthropic API",
];

export function CropHeatCaseStudy() {
  return (
    <div className="case-study-page min-h-screen overflow-x-clip bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-aurora" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-grid" />
      <SmoothScroll />
      <CustomCursor />
      <MouseGlow />
      <Navbar />

      <main>
        <section className="relative mx-auto max-w-[1400px] px-6 pb-20 pt-32 md:px-10 md:pb-32 md:pt-40">
          <Link
            to="/"
            hash="work"
            className="group inline-flex items-center gap-2 font-mono-tight text-[10px] uppercase tracking-[0.28em] text-white/45 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            Back to selected work
          </Link>

          <div className="mt-12 grid grid-cols-12 gap-10 lg:mt-20 lg:gap-16">
            <div className="col-span-12 min-w-0 lg:col-span-8">
              <div className="flex flex-wrap items-center gap-3 font-mono-tight text-[10px] uppercase tracking-[0.28em] text-white/45">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent, boxShadow: `0 0 14px ${accent}` }} />
                FortyGuard Hackathon
                <span className="text-white/20">/</span>
                Climate Tech · AgriTech
              </div>
              <h1 className="font-display mt-6 max-w-5xl text-balance text-[clamp(3.4rem,8vw,8.5rem)] font-medium leading-[0.84] tracking-[-0.055em]">
                CropHeat <span className="text-gradient">AI</span>
              </h1>
              <p className="mt-8 max-w-3xl text-balance text-xl leading-relaxed text-white/65 md:text-2xl">
                Turning hyperlocal climate intelligence into crop-specific heat-risk decisions.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href="https://cropheat-ai.vercel.app/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black transition-transform hover:-translate-y-0.5">
                  Live Demo <ArrowUpRight className="h-4 w-4" />
                </a>
                <a href="https://github.com/Imran-Ghafoor594/cropheat-ai" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3.5 text-sm text-white transition-all hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.08]">
                  <Github className="h-4 w-4" /> GitHub
                </a>
              </div>
            </div>

            <div className="col-span-12 min-w-0 lg:col-span-4 lg:self-end">
              <div className="glass rounded-3xl p-6 md:p-7">
                <div className="font-mono-tight text-[10px] uppercase tracking-[0.28em] text-white/40">Built for</div>
                <div className="mt-3 font-display text-2xl text-white">FortyGuard Hackathon</div>
                <p className="mt-3 text-sm leading-relaxed text-white/55">
                  An explainable hybrid risk engine combining live geospatial temperature intelligence with crop and growth-stage sensitivity.
                </p>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {stats.map(([label, value]) => (
                    <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
                      <div className="font-display text-xl text-white">{value}</div>
                      <div className="mt-1 font-mono-tight text-[9px] uppercase tracking-[0.2em] text-white/35">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }} className="mt-16 overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/20 shadow-[0_40px_120px_-50px_rgba(0,0,0,.9)] md:mt-24 md:rounded-[2rem]">
            <img src={cropHeatCover} alt="Abstract CropHeat AI heat-risk system preview" className="block h-auto w-full" />
          </motion.div>
        </section>

        <section className="mx-auto max-w-[1200px] px-6 py-20 md:px-10 md:py-28">
          <CaseSection eyebrow="01 / The problem" title="Weather data is not the same as crop risk.">
            <p>
              Farmers and agronomists can get generic forecasts, but a headline temperature does not answer whether the heat is dangerous for a specific crop at a specific growth stage. CropHeat AI was built to turn field-level climate intelligence into an interpretable risk decision.
            </p>
          </CaseSection>

          <CaseSection eyebrow="02 / The solution" title="A transparent risk pipeline, not a black box.">
            <p>
              CropHeat AI combines FortyGuard&apos;s hyperlocal temperature intelligence with sourced crop heat-sensitivity thresholds. The system produces a 0–100 risk score, exposes the factors contributing to that score, and then provides a plain-language advisory.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <Feature icon={Map} title="Hyperlocal data" text="Temperature, exceedance and persistence heatmaps from FortyGuard." />
              <Feature icon={Layers3} title="Six factors" text="Temperature, exposure, persistence, humidity/wet-bulb, crop sensitivity and growth stage." />
              <Feature icon={ShieldCheck} title="Explainable" text="Transparent weighted scoring with sourced thresholds rather than invented values." />
            </div>
          </CaseSection>

          <CaseSection eyebrow="03 / Architecture" title="From geospatial API to field-level decision.">
            <div className="glass overflow-hidden rounded-3xl p-5 md:p-8">
              <div className="grid gap-3 md:grid-cols-5">
                <ArchStep icon={Map} label="FortyGuard" detail="Heatmaps + environmental data" />
                <ArchStep icon={Server} label="FastAPI" detail="Service orchestration" />
                <ArchStep icon={Database} label="Cache + Guard" detail="SQLite + credit protection" />
                <ArchStep icon={BrainCircuit} label="Risk Engine" detail="0–100 explainable score" />
                <ArchStep icon={Layers3} label="Dashboard" detail="Map + timeline + advisory" />
              </div>
              <div className="mt-7 grid gap-3 text-center font-mono-tight text-[9px] uppercase tracking-[0.2em] text-white/30 sm:grid-cols-2">
                <div className="rounded-xl border border-white/8 bg-white/[0.02] px-4 py-3">Frontend: Next.js · React · TypeScript</div>
                <div className="rounded-xl border border-white/8 bg-white/[0.02] px-4 py-3">Backend: FastAPI · Python · SQLite</div>
              </div>
            </div>
          </CaseSection>

          <CaseSection eyebrow="04 / FortyGuard integration" title="The API stays behind the backend boundary.">
            <p>
              FortyGuard calls are isolated behind the backend service layer. The frontend never talks directly to FortyGuard, and the API key stays on the server. Heatmap calls are cached and shared by region, while environmental parameters are sampled selectively to conserve credits.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <Evidence value="31.887°C" label="verified minimum" />
              <Evidence value="33.1424°C" label="verified maximum" />
              <Evidence value="2.46 h" label="mean exposure above 35°C" />
            </div>
            <p className="mt-4 text-xs leading-relaxed text-white/35">These values are documented in the project README as personally verified FortyGuard outputs, not fabricated application metrics.</p>
          </CaseSection>

          <CaseSection eyebrow="05 / AI advisory" title="The LLM explains the score — it does not calculate it.">
            <p>
              When an Anthropic API key is available, the advisory layer receives the already-computed risk score, severity level, and contributing factors and turns them into plain-language recommendations. If the LLM is unavailable, a deterministic rule-based fallback takes over and is explicitly labeled as such.
            </p>
          </CaseSection>

          <CaseSection eyebrow="06 / Engineering decisions" title="Built with constraints in mind.">
            <div className="grid gap-4 md:grid-cols-2">
              <Decision title="Credit-aware" text="One shared regional heatmap is preferred over a request per field; caching and a budget guard reduce unnecessary API consumption." />
              <Decision title="Honest data states" text="The UI distinguishes LIVE, CACHED, DEMO DATA and SIMULATED instead of presenting synthetic data as live." />
              <Decision title="Deterministic fallback" text="Core risk scoring does not depend on an LLM being available, so the product remains usable when advisory generation fails." />
              <Decision title="Source-backed thresholds" text="Crop heat-sensitivity thresholds are documented with agronomy references rather than invented for the demo." />
            </div>
          </CaseSection>

          <CaseSection eyebrow="07 / Stack" title="The system stack.">
            <div className="flex flex-wrap gap-2">
              {stack.map((item) => <span key={item} className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-mono-tight text-[10px] uppercase tracking-[0.18em] text-white/65">{item}</span>)}
            </div>
          </CaseSection>

          <CaseSection eyebrow="08 / Limitations" title="What is intentionally not claimed yet.">
            <div className="grid gap-4 md:grid-cols-2">
              <Decision title="Fixed AOI" text="The current demo uses a small fixed San Jose, California region sized for the FortyGuard Basic-tier heatmap cap." />
              <Decision title="Partial simulation" text="The what-if simulator currently varies temperature; exposure and persistence are not yet wired to a full live recomputation." />
              <Decision title="LLM smoke test" text="Live Anthropic calls are implemented but were not smoke-tested with a funded key in the build environment; the rule fallback is confirmed working." />
              <Decision title="Field join" text="The current heatmap-to-field mapping uses nearest-centroid matching; polygon area-weighting is a planned improvement." />
            </div>
          </CaseSection>

          <section className="mt-24 border-t border-white/10 pt-12 md:mt-32 md:pt-16">
            <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="font-mono-tight text-[10px] uppercase tracking-[0.3em] text-white/35">Explore the build</div>
                <h2 className="font-display mt-3 text-4xl tracking-tight md:text-5xl">See the system in action.</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href="https://cropheat-ai.vercel.app/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black">Live Demo <ExternalLink className="h-4 w-4" /></a>
                <a href="https://github.com/Imran-Ghafoor594/cropheat-ai" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3.5 text-sm text-white"><Github className="h-4 w-4" /> Source</a>
              </div>
            </div>
            <Link to="/" hash="work" className="mt-8 inline-flex items-center gap-2 font-mono-tight text-[10px] uppercase tracking-[0.28em] text-white/40 hover:text-white"><ArrowLeft className="h-3.5 w-3.5" /> Back to all projects</Link>
          </section>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function CaseSection({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-white/10 py-16 md:py-24 first:border-t-0 first:pt-0">
      <div className="grid gap-8 lg:grid-cols-[280px_1fr] lg:gap-16">
        <div>
          <div className="font-mono-tight text-[10px] uppercase tracking-[0.28em] text-white/35">{eyebrow}</div>
        </div>
        <div>
          <h2 className="font-display text-balance text-3xl tracking-tight md:text-5xl">{title}</h2>
          <div className="mt-6 max-w-4xl space-y-5 text-[15px] leading-[1.85] text-white/60 md:text-lg">{children}</div>
        </div>
      </div>
    </section>
  );
}

function Feature({ icon: Icon, title, text }: { icon: typeof Map; title: string; text: string }) {
  return <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5"><Icon className="h-5 w-5" style={{ color: accent }} /><div className="mt-5 font-display text-xl text-white">{title}</div><p className="mt-2 text-sm leading-relaxed text-white/45">{text}</p></div>;
}

function ArchStep({ icon: Icon, label, detail }: { icon: typeof Map; label: string; detail: string }) {
  return <div className="relative rounded-2xl border border-white/10 bg-white/[0.025] p-5"><Icon className="h-5 w-5 text-white/60" /><div className="mt-5 font-display text-lg text-white">{label}</div><p className="mt-2 text-xs leading-relaxed text-white/40">{detail}</p></div>;
}

function Evidence({ value, label }: { value: string; label: string }) {
  return <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5"><div className="font-display text-2xl text-white">{value}</div><div className="mt-2 font-mono-tight text-[9px] uppercase tracking-[0.2em] text-white/35">{label}</div></div>;
}

function Decision({ title, text }: { title: string; text: string }) {
  return <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5"><div className="font-display text-xl text-white">{title}</div><p className="mt-2 text-sm leading-relaxed text-white/45">{text}</p></div>;
}
