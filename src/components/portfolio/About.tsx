import { MapPin } from "lucide-react";
import { Reveal } from "@/components/effects/Reveal";
import { SectionLabel } from "./SectionLabel";

export function About() {
  return (
    <section id="about" className="relative py-20 md:py-32 lg:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionLabel index="02" label="About" />
        <div className="mt-10 grid grid-cols-12 gap-y-10 lg:gap-x-10 md:mt-16">
          <div className="col-span-12 lg:col-span-8">
            <Reveal
              as="h2"
              y={30}
              duration={1}
              margin={-100}
              className="font-display text-balance text-[clamp(1.25rem,2.6vw,2.25rem)] font-medium leading-[1.3] tracking-[-0.02em] text-white/85 md:leading-[1.25]"
            >
              I design and ship <span className="text-gradient">production-grade AI systems</span> —
              from data pipelines to inference. My focus is computer vision, generative agents, and
              applied ML that survives contact with real users. I care about latency, evaluation,
              and interfaces that make intelligence feel effortless. Currently focused on my studies
              and open to internship opportunities in AI and machine learning.
            </Reveal>
          </div>
          <div className="col-span-12 space-y-4 lg:col-span-4">
            <div className="glass rounded-2xl p-5">
              <div className="font-mono-tight text-[10px] uppercase tracking-[0.28em] text-white/50">
                Based in
              </div>
              <div className="mt-2 flex items-center gap-2 font-display text-xl text-white">
                <MapPin className="h-4 w-4 text-[oklch(0.75_0.2_265)]" /> Lahore, Pakistan
              </div>
            </div>
            <div className="glass rounded-2xl p-5">
              <div className="font-mono-tight text-[10px] uppercase tracking-[0.28em] text-white/50">
                What I Offer
              </div>
              <div className="mt-3 space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[oklch(0.75_0.2_265)] shadow-[0_0_8px_oklch(0.75_0.2_265)]" />
                  <span className="font-display text-[15px] text-white">
                    Machine Learning Engineering
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[oklch(0.7_0.22_265)] shadow-[0_0_8px_oklch(0.7_0.22_265)]" />
                  <span className="font-display text-[15px] text-white">AI Engineering</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[oklch(0.62_0.24_305)] shadow-[0_0_8px_oklch(0.62_0.24_305)]" />
                  <span className="font-display text-[15px] text-white">Data Science</span>
                </div>
              </div>
            </div>
            <div className="glass rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-mono-tight text-[10px] uppercase tracking-[0.28em] text-white/50">
                    Status
                  </div>
                  <div className="mt-2 font-display text-xl text-white">Open to Internships</div>
                </div>
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70 md:animate-ping" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_16px_#34d399]" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
