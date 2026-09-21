import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Github, Camera, BrainCircuit, Server, ShieldCheck, Layers3, BarChart3 } from "lucide-react";
import { motion } from "motion/react";
import plantScanImg from "@/assets/proj-plantscan.jpg";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { CustomCursor } from "@/components/effects/CustomCursor";
import { MouseGlow } from "@/components/effects/MouseGlow";
import { SmoothScroll } from "@/components/effects/SmoothScroll";

const accent = "oklch(0.75 0.18 165)";

const stats = [
  ["Best accuracy", "98%"],
  ["Classes", "38"],
  ["Models trained", "03"],
  ["Inference", "Flask"],
];

const stack = [
  "Python", "TensorFlow", "Keras", "EfficientNetB0", "MobileNetV2", "ResNet50",
  "OpenCV", "Scikit-learn", "Flask", "HTML / CSS / JavaScript",
];

export function PlantScanCaseStudy() {
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
          <Link to="/" hash="work" className="group inline-flex items-center gap-2 font-mono-tight text-[10px] uppercase tracking-[0.28em] text-white/45 transition-colors hover:text-white">
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            Back to selected work
          </Link>

          <div className="mt-12 grid grid-cols-12 gap-10 lg:mt-20 lg:gap-16">
            <div className="col-span-12 min-w-0 lg:col-span-8">
              <div className="flex flex-wrap items-center gap-3 font-mono-tight text-[10px] uppercase tracking-[0.28em] text-white/45">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent, boxShadow: `0 0 14px ${accent}` }} />
                Computer Vision · Deep Learning
                <span className="text-white/20">/</span>
                Plant Disease Detection
              </div>
              <h1 className="font-display mt-6 max-w-5xl text-balance text-[clamp(3.4rem,8vw,8.5rem)] font-medium leading-[0.84] tracking-[-0.055em]">
                PlantScan <span className="text-gradient">AI</span>
              </h1>
              <p className="mt-8 max-w-3xl text-balance text-xl leading-relaxed text-white/65 md:text-2xl">
                Deep-learning powered plant disease diagnosis from a leaf image, with model comparison and a camera-ready Flask application.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href="https://github.com/Imran-Ghafoor594/plant_disease_detection" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black transition-transform hover:-translate-y-0.5">
                  <Github className="h-4 w-4" /> GitHub <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="col-span-12 min-w-0 lg:col-span-4 lg:self-end">
              <div className="glass rounded-3xl p-6 md:p-7">
                <div className="font-mono-tight text-[10px] uppercase tracking-[0.28em] text-white/40">Project snapshot</div>
                <div className="mt-3 font-display text-2xl text-white">Transfer learning → shipped app</div>
                <p className="mt-3 text-sm leading-relaxed text-white/55">
                  Three CNN backbones were trained and evaluated. EfficientNetB0 and MobileNetV2 share the same 38-class dataset and are the interchangeable models exposed by the application.
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
            <img src={plantScanImg} alt="PlantScan AI project preview" className="block h-auto w-full object-cover" />
          </motion.div>
        </section>

        <section className="mx-auto max-w-[1200px] px-6 py-20 md:px-10 md:py-28">
          <CaseSection eyebrow="01 / The problem" title="A leaf image should be enough to start a diagnosis.">
            <p>
              Plant disease identification can be slow when a grower has to rely on manual inspection or specialist access. PlantScan AI turns a leaf photo into a model-backed diagnosis report with confidence, symptoms, treatment and prevention information.
            </p>
          </CaseSection>

          <CaseSection eyebrow="02 / The ML approach" title="Transfer learning across three CNN backbones.">
            <p>
              The project uses ImageNet-pretrained CNN backbones and a two-phase training recipe: first train a new classification head with the backbone frozen, then unfreeze the last 30 layers and fine-tune at a low learning rate. Images are resized to 224×224 with augmentation and an 80/20 train-validation split.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <Feature icon={BrainCircuit} title="EfficientNetB0" text="38-class PlantVillage-color model; 98% final accuracy and the app's default model." />
              <Feature icon={Layers3} title="MobileNetV2" text="38-class PlantVillage-color model; 95% final accuracy and a smaller/faster alternative." />
              <Feature icon={BarChart3} title="ResNet50" text="96% on a separate 15-class PlantVillage subset; not directly comparable to the other two." />
            </div>
          </CaseSection>

          <CaseSection eyebrow="03 / Model comparison" title="The numbers are only useful when the datasets match.">
            <div className="overflow-x-auto rounded-3xl border border-white/10 bg-white/[0.02]">
              <table className="w-full min-w-[720px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-white/10 font-mono-tight text-[9px] uppercase tracking-[0.2em] text-white/35">
                    <th className="px-5 py-4">Model</th><th className="px-5 py-4">Dataset</th><th className="px-5 py-4">Classes</th><th className="px-5 py-4">Params</th><th className="px-5 py-4">Accuracy</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-white/70">
                  {[
                    ["EfficientNetB0", "PlantVillage-color", "38", "4.1M", "98%"],
                    ["MobileNetV2", "PlantVillage-color", "38", "2.3M", "95%"],
                    ["ResNet50", "PlantVillage subset", "15", "23.6M", "96%"],
                  ].map((row) => (
                    <tr key={row[0]} className="border-b border-white/8 last:border-0">
                      {row.map((cell, i) => <td key={i} className={`px-5 py-4 ${i === 0 ? "font-medium text-white" : ""}`}>{cell}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-white/45">
              ResNet50 was trained on a different, smaller dataset containing 15 classes from Pepper, Potato and Tomato. Its 96% result should therefore not be presented as a direct head-to-head win or loss against the 38-class EfficientNetB0 and MobileNetV2 models.
            </p>
          </CaseSection>

          <CaseSection eyebrow="04 / Product pipeline" title="From camera frame to diagnosis report.">
            <div className="glass overflow-hidden rounded-3xl p-5 md:p-8">
              <div className="grid gap-3 md:grid-cols-5">
                <ArchStep icon={Camera} label="Input" detail="Upload or live camera" />
                <ArchStep icon={ShieldCheck} label="Quality gate" detail="Brightness · sharpness · motion" />
                <ArchStep icon={BrainCircuit} label="Inference" detail="Selected .keras model" />
                <ArchStep icon={Server} label="Flask API" detail="Prediction + confidence" />
                <ArchStep icon={Layers3} label="Report" detail="Symptoms · treatment · prevention" />
              </div>
            </div>
            <p className="mt-6">
              The live camera path uses the browser camera API and canvas capture, then sends the captured frame through the same inference pipeline as an uploaded image. A lightweight browser-side quality check can auto-capture once the frame is well-lit, sharp and steady.
            </p>
          </CaseSection>

          <CaseSection eyebrow="05 / Engineering decisions" title="Why the production dropdown only exposes two models.">
            <p>
              EfficientNetB0 and MobileNetV2 were trained on the same 38-class dataset and share the same class mapping, so they are safe interchangeable choices in the application. ResNet50 is intentionally excluded from that selector because its 15-class dataset uses a different label mapping; wiring it into the same selector without separate handling could produce incorrect labels.
            </p>
            <div className="mt-8 grid gap-3 md:grid-cols-3">
              <Decision title="Default" text="EfficientNetB0 because it reached 98% on the shared 38-class evaluation." />
              <Decision title="Alternative" text="MobileNetV2 at 95%, useful when a smaller/faster backbone is preferred." />
              <Decision title="Separated" text="ResNet50 remains part of the research comparison, not the shared production selector." />
            </div>
          </CaseSection>

          <CaseSection eyebrow="06 / Tech stack" title="A compact computer-vision stack from training to inference.">
            <div className="flex flex-wrap gap-2">
              {stack.map((item) => <span key={item} className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-mono-tight text-[10px] uppercase tracking-[0.18em] text-white/60">{item}</span>)}
            </div>
          </CaseSection>

          <CaseSection eyebrow="07 / Results" title="98% on the shared 38-class evaluation.">
            <div className="grid gap-4 md:grid-cols-3">
              <Result value="98%" label="EfficientNetB0 accuracy" detail="38 classes · PlantVillage-color" />
              <Result value="95%" label="MobileNetV2 accuracy" detail="38 classes · PlantVillage-color" />
              <Result value="96%" label="ResNet50 accuracy" detail="15 classes · separate dataset" />
            </div>
          </CaseSection>

          <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025] p-7 md:p-12">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-20" style={{ background: accent }} />
            <div className="relative">
              <div className="font-mono-tight text-[10px] uppercase tracking-[0.3em] text-white/40">Explore the implementation</div>
              <h2 className="font-display mt-4 max-w-3xl text-[clamp(2.3rem,5vw,4.5rem)] font-medium leading-[0.95] tracking-[-0.04em]">
                The model comparison is only the beginning.
              </h2>
              <p className="mt-5 max-w-2xl text-white/55">
                Explore the training notebooks, Flask inference service, camera workflow and full model-comparison report in the repository.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="https://github.com/Imran-Ghafoor594/plant_disease_detection" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black hover:-translate-y-0.5 transition-transform">
                  <Github className="h-4 w-4" /> View GitHub <ArrowUpRight className="h-4 w-4" />
                </a>
                <Link to="/" hash="work" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3.5 text-sm text-white hover:-translate-y-0.5 transition-transform">
                  Back to projects <ArrowLeft className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function CaseSection({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-white/10 py-16 md:py-24">
      <div className="grid gap-8 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-4"><div className="font-mono-tight text-[10px] uppercase tracking-[0.3em] text-white/35">{eyebrow}</div><h2 className="font-display mt-4 text-3xl font-medium leading-tight tracking-[-0.03em] text-white md:text-4xl">{title}</h2></div>
        <div className="text-base leading-relaxed text-white/65 md:col-span-8 md:text-lg">{children}</div>
      </div>
    </section>
  );
}

function Feature({ icon: Icon, title, text }: { icon: React.ComponentType<{ className?: string }>; title: string; text: string }) {
  return <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5"><Icon className="h-5 w-5" style={{ color: accent }} /><div className="mt-4 font-display text-lg text-white">{title}</div><p className="mt-2 text-sm leading-relaxed text-white/45">{text}</p></div>;
}

function ArchStep({ icon: Icon, label, detail }: { icon: React.ComponentType<{ className?: string }>; label: string; detail: string }) {
  return <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4"><Icon className="h-4 w-4" style={{ color: accent }} /><div className="mt-4 font-mono-tight text-[10px] uppercase tracking-[0.18em] text-white/70">{label}</div><div className="mt-1 text-xs leading-relaxed text-white/40">{detail}</div></div>;
}

function Decision({ title, text }: { title: string; text: string }) {
  return <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5"><div className="font-mono-tight text-[10px] uppercase tracking-[0.25em] text-white/35">{title}</div><p className="mt-3 text-sm leading-relaxed text-white/55">{text}</p></div>;
}

function Result({ value, label, detail }: { value: string; label: string; detail: string }) {
  return <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-6"><div className="font-display text-4xl text-white">{value}</div><div className="mt-3 text-sm font-medium text-white/75">{label}</div><div className="mt-1 font-mono-tight text-[9px] uppercase tracking-[0.18em] text-white/30">{detail}</div></div>;
}
