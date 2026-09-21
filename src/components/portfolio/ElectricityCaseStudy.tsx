import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Github, Database, BrainCircuit, BarChart3, Zap, FlaskConical, Lightbulb, FileSpreadsheet } from "lucide-react";
import { motion } from "motion/react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { CustomCursor } from "@/components/effects/CustomCursor";
import { MouseGlow } from "@/components/effects/MouseGlow";
import { SmoothScroll } from "@/components/effects/SmoothScroll";
import electricityImg from "@/assets/proj-electricity.jpg";

const accent = "oklch(0.78 0.15 220)";

const stats = [
  ["R² score", "0.9641"],
  ["MAE", "1.57 kWh"],
  ["RMSE", "1.98 kWh"],
  ["Models compared", "07"],
];

const models = [
  ["Linear Regression", "0.9641", "1.57 kWh", "Best"],
  ["Ridge Regression", "—", "—", "Compared"],
  ["Decision Tree", "—", "—", "Compared"],
  ["Random Forest", "—", "—", "Compared"],
  ["Gradient Boosting", "—", "—", "Compared"],
  ["XGBoost", "—", "—", "Compared"],
  ["SVR", "—", "—", "Compared"],
];

export function ElectricityCaseStudy() {
  return (
    <div className="case-study-page min-h-screen overflow-x-clip bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-aurora" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-grid" />
      <SmoothScroll /><CustomCursor /><MouseGlow /><Navbar />
      <main>
        <section className="relative mx-auto max-w-[1400px] px-6 pb-20 pt-32 md:px-10 md:pb-32 md:pt-40">
          <Link to="/" hash="work" className="group inline-flex items-center gap-2 font-mono-tight text-[10px] uppercase tracking-[0.28em] text-white/45 hover:text-white">
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" /> Back to selected work
          </Link>
          <div className="mt-12 grid grid-cols-12 gap-10 lg:mt-20 lg:gap-16">
            <div className="col-span-12 min-w-0 lg:col-span-8">
              <div className="flex flex-wrap items-center gap-3 font-mono-tight text-[10px] uppercase tracking-[0.28em] text-white/45">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent, boxShadow: `0 0 14px ${accent}` }} /> Machine Learning <span className="text-white/20">/</span> Energy Optimization
              </div>
              <h1 className="font-display mt-6 max-w-5xl text-balance text-[clamp(3.2rem,8vw,8.2rem)] font-medium leading-[0.84] tracking-[-0.055em]">Smart Electricity <span className="text-gradient">Consumption</span></h1>
              <p className="mt-8 max-w-3xl text-balance text-xl leading-relaxed text-white/65 md:text-2xl">A household energy prediction system that turns appliance usage and household behavior into consumption forecasts, bill estimates, peak-usage alerts, and actionable savings recommendations.</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href="https://github.com/Imran-Ghafoor594/smart_electricity_consumption_prediction" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black hover:-translate-y-0.5 transition-transform"><Github className="h-4 w-4" /> GitHub <ArrowUpRight className="h-4 w-4" /></a>
              </div>
            </div>
            <div className="col-span-12 min-w-0 lg:col-span-4 lg:self-end">
              <div className="glass rounded-3xl p-6 md:p-7">
                <div className="font-mono-tight text-[10px] uppercase tracking-[0.28em] text-white/40">Project snapshot</div>
                <div className="mt-3 font-display text-2xl text-white">Forecast → explain → optimize</div>
                <p className="mt-3 text-sm leading-relaxed text-white/55">A complete ML lifecycle built around a self-created, physically consistent household energy dataset and a Flask prediction interface.</p>
                <div className="mt-6 grid grid-cols-2 gap-3">{stats.map(([label, value]) => <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.025] p-4"><div className="font-display text-xl text-white">{value}</div><div className="mt-1 font-mono-tight text-[9px] uppercase tracking-[0.2em] text-white/35">{label}</div></div>)}</div>
              </div>
            </div>
          </div>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }} className="mt-16 overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/20 shadow-[0_40px_120px_-50px_rgba(0,0,0,.9)] md:mt-24 md:rounded-[2rem]">
            <img src={electricityImg} alt="Smart Electricity Consumption project preview" className="block h-auto w-full object-cover" />
          </motion.div>
        </section>

        <section className="mx-auto max-w-[1200px] px-6 py-20 md:px-10 md:py-28">
          <CaseSection eyebrow="01 / The problem" title="A bill tells you what you used. The system should help explain what to change.">
            <p>The project focuses on household daily electricity consumption and converts appliance usage, household characteristics, seasonality and outdoor temperature into a prediction that can be acted on before the next bill arrives.</p>
          </CaseSection>

          <CaseSection eyebrow="02 / Dataset & pipeline" title="From raw household inputs to a reproducible prediction pipeline.">
            <div className="grid gap-3 md:grid-cols-5"><Flow icon={Database} label="600 records" detail="14 input features" /><Flow icon={FlaskConical} label="Preprocess" detail="IQR · encoding · scaling" /><Flow icon={BrainCircuit} label="Feature engineer" detail="5 derived features" /><Flow icon={BarChart3} label="Compare" detail="7 regressors" /><Flow icon={Zap} label="Serve" detail="Flask prediction app" /></div>
            <p className="mt-7">The dataset is explicitly documented as self-created synthetic data rather than a public Kaggle/UCI dataset. The pipeline handles missing values, duplicates, IQR-based outlier winsorization, categorical encoding and feature scaling before model training.</p>
          </CaseSection>

          <CaseSection eyebrow="03 / Feature engineering" title="Features were designed around household behavior, not just raw appliance hours.">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <Feature icon={Zap} title="High_Power_Appliance_Hours" text="Aggregates usage from the appliances with the largest consumption impact." />
              <Feature icon={Zap} title="Cooling_Load_Index" text="Captures the combined effect of cooling demand and environmental conditions." />
              <Feature icon={BarChart3} title="Consumption_Per_Member" text="Normalizes household consumption against family size." />
              <Feature icon={BarChart3} title="Is_Weekend" text="Encodes the behavioral difference between working days and weekends." />
              <Feature icon={BarChart3} title="Rooms_Per_Member" text="Adds a household-size/space relationship to the model input." />
            </div>
          </CaseSection>

          <CaseSection eyebrow="04 / Model comparison" title="Seven regression algorithms were evaluated before selecting the production model.">
            <div className="overflow-x-auto rounded-3xl border border-white/10 bg-white/[0.02]"><table className="w-full min-w-[680px] border-collapse text-left"><thead><tr className="border-b border-white/10 font-mono-tight text-[9px] uppercase tracking-[0.2em] text-white/35"><th className="px-5 py-4">Model</th><th className="px-5 py-4">R²</th><th className="px-5 py-4">MAE</th><th className="px-5 py-4">Status</th></tr></thead><tbody className="text-sm text-white/70">{models.map((row) => <tr key={row[0]} className="border-b border-white/8 last:border-0">{row.map((cell, i) => <td key={i} className={`px-5 py-4 ${i === 0 ? "font-medium text-white" : ""} ${cell === "Best" ? "text-white" : ""}`}>{cell}</td>)}</tr>)}</tbody></table></div>
            <p className="mt-5 text-sm leading-relaxed text-white/45">The repository documents Linear Regression as the best-performing model with R² 0.9641, MAE 1.57 kWh, RMSE 1.98 kWh, and 5-fold cross-validation R² of 0.9624 ± 0.0072. The full comparison remains available in the repository's model-performance report.</p>
          </CaseSection>

          <CaseSection eyebrow="05 / Prediction product" title="The model is exposed as a household-facing decision tool, not just a notebook.">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"><Feature icon={Zap} title="Daily consumption" text="Predicts household daily electricity usage from the supplied household and appliance inputs." /><Feature icon={BarChart3} title="Monthly estimate" text="Converts the prediction into an estimated monthly usage and bill view." /><Feature icon={Lightbulb} title="Recommendations" text="Generates personalized energy-saving suggestions and estimates potential savings." /><Feature icon={Zap} title="Peak usage" text="Flags expected peak-usage hours to make high-demand behavior visible." /><Feature icon={BarChart3} title="Efficiency score" text="Returns an energy-efficiency score on a 0–100 scale." /><Feature icon={FileSpreadsheet} title="Reports" text="Includes consolidated Excel reporting for model performance, features and business insights." /></div>
          </CaseSection>

          <CaseSection eyebrow="06 / Engineering decisions" title="Interpretability and realistic assumptions mattered as much as the score.">
            <div className="grid gap-3 md:grid-cols-3"><Decision title="Synthetic, but structured" text="The dataset was self-created with physically consistent relationships instead of pure random noise, including AC usage behavior tied to temperature and season." /><Decision title="Interpretability" text="Linear Regression became the selected model despite more complex alternatives being tested, keeping the household-facing prediction layer easier to reason about." /><Decision title="Tariff-aware design" text="Billing is implemented as a tiered/blended approximation rather than hardcoding one country's tariff table." /></div>
          </CaseSection>

          <CaseSection eyebrow="07 / Limitations & next steps" title="The current system is a solid ML application, with clear paths toward production data.">
            <div className="grid gap-3 md:grid-cols-2"><Decision title="Live weather" text="Future work includes automatically filling outdoor temperature from a live weather API." /><Decision title="Explainable predictions" text="SHAP-based per-prediction explanations are planned for deeper model transparency." /><Decision title="Real smart-meter data" text="Sub-hourly or time-series smart-meter ingestion would improve peak-hour detection and realism." /><Decision title="Deployment hardening" text="Docker packaging and hyperparameter optimization are listed as future improvements." /></div>
          </CaseSection>

          <section className="border-t border-white/10 py-16 md:py-24"><div className="grid gap-8 md:grid-cols-12 md:gap-12"><div className="md:col-span-4"><div className="font-mono-tight text-[10px] uppercase tracking-[0.3em] text-white/35">08 / Tech stack</div><h2 className="font-display mt-4 text-3xl font-medium leading-tight tracking-[-0.03em] text-white md:text-4xl">The implementation layer.</h2></div><div className="md:col-span-8"><div className="flex flex-wrap gap-2">{["Python","Pandas","NumPy","Scikit-learn","XGBoost","Matplotlib","Seaborn","Flask","Jupyter","openpyxl"].map((item) => <span key={item} className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/65">{item}</span>)}</div></div></div></section>

          <section className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-7 md:p-10"><div className="max-w-3xl"><div className="font-mono-tight text-[10px] uppercase tracking-[0.3em] text-white/35">Project evidence</div><h2 className="font-display mt-4 text-4xl tracking-[-0.04em] text-white md:text-6xl">The complete analysis, reports and application live in the repository.</h2><p className="mt-5 text-base leading-relaxed text-white/55">The repository includes the executed ML notebook, trained model artifacts, evaluation reports, feature importance, visuals, documentation and Flask application.</p><div className="mt-8 flex flex-wrap gap-3"><a href="https://github.com/Imran-Ghafoor594/smart_electricity_consumption_prediction" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black hover:-translate-y-0.5 transition-transform"><Github className="h-4 w-4" /> View GitHub <ArrowUpRight className="h-4 w-4" /></a><Link to="/" hash="work" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3.5 text-sm text-white hover:-translate-y-0.5 transition-transform">Back to projects <ArrowLeft className="h-4 w-4" /></Link></div></div></section>
        </section>
      </main><Footer />
    </div>
  );
}

function CaseSection({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) { return <section className="border-t border-white/10 py-16 md:py-24"><div className="grid gap-8 md:grid-cols-12 md:gap-12"><div className="md:col-span-4"><div className="font-mono-tight text-[10px] uppercase tracking-[0.3em] text-white/35">{eyebrow}</div><h2 className="font-display mt-4 text-3xl font-medium leading-tight tracking-[-0.03em] text-white md:text-4xl">{title}</h2></div><div className="text-base leading-relaxed text-white/65 md:col-span-8 md:text-lg">{children}</div></div></section>; }
function Flow({ icon: Icon, label, detail }: { icon: React.ComponentType<{ className?: string }>; label: string; detail: string }) { return <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4"><Icon className="h-4 w-4" style={{ color: accent }} /><div className="mt-4 font-mono-tight text-[10px] uppercase tracking-[0.18em] text-white/70">{label}</div><div className="mt-1 text-xs leading-relaxed text-white/40">{detail}</div></div>; }
function Feature({ icon: Icon, title, text }: { icon: React.ComponentType<{ className?: string }>; title: string; text: string }) { return <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5"><Icon className="h-5 w-5" style={{ color: accent }} /><div className="mt-4 font-display text-lg text-white">{title}</div><p className="mt-2 text-sm leading-relaxed text-white/45">{text}</p></div>; }
function Decision({ title, text }: { title: string; text: string }) { return <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5"><div className="font-mono-tight text-[10px] uppercase tracking-[0.25em] text-white/35">{title}</div><p className="mt-3 text-sm leading-relaxed text-white/55">{text}</p></div>; }
