import { ArrowLeft, ArrowUpRight, Database, Github, LockKeyhole, Server, Users } from "lucide-react";
import { Link } from "@tanstack/react-router";

const features = [
  ["Admin portal", "Manage students, courses, marks and semester fees from one workflow."],
  ["Student portal", "Enroll in courses, view published results and CGPA, edit profile and review fees."],
  ["Authentication", "Session-based login separates admin and student access paths."],
  ["Academic workflow", "Assignment, midterm and final marks feed automatic grade calculation before results are published."],
];

export function EduPredictCaseStudy() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white">
      <section className="relative border-b border-white/10 px-5 pb-16 pt-28 sm:px-6 md:px-10 md:pb-24 md:pt-36">
        <div className="mx-auto max-w-6xl">
          <Link to="/" hash="work" className="inline-flex items-center gap-2 font-mono-tight text-[10px] uppercase tracking-[0.25em] text-white/45 transition-colors hover:text-white"><ArrowLeft className="h-3.5 w-3.5" /> Back to projects</Link>
          <div className="mt-12 max-w-5xl md:mt-16">
            <div className="flex flex-wrap gap-2 font-mono-tight text-[9px] uppercase tracking-[0.22em] text-white/45">
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">Database Systems</span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">Full-Stack</span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">Flask + MySQL</span>
            </div>
            <h1 className="font-display mt-6 max-w-4xl text-[clamp(3rem,9vw,7.5rem)] font-medium leading-[0.88] tracking-[-0.055em]">EduPredict</h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/55 sm:text-xl md:text-2xl">A full-stack university portal that turns student, course, marks, results and fee workflows into one structured database-driven system.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="https://github.com/Imran-Ghafoor594/edu-predict" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black transition-transform hover:-translate-y-0.5"><Github className="h-4 w-4" /> View GitHub <ArrowUpRight className="h-4 w-4" /></a>
              <Link to="/" hash="work" className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-6 py-3.5 text-sm text-white transition-transform hover:-translate-y-0.5">Back to projects</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-6 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">
          <Metric icon={<Users />} label="Portals" value="2" note="Admin + Student" />
          <Metric icon={<Database />} label="Database" value="MySQL" note="Structured academic records" />
          <Metric icon={<Server />} label="Backend" value="Flask" note="Python web application" />
        </div>
      </section>

      <section className="px-5 pb-14 sm:px-6 md:px-10 md:pb-24">
        <div className="mx-auto max-w-6xl">
          <SectionKicker>01 — The problem</SectionKicker>
          <div className="mt-5 grid gap-8 lg:grid-cols-2 lg:gap-16">
            <h2 className="font-display text-4xl font-medium leading-[0.95] tracking-[-0.04em] md:text-6xl">Academic records are a workflow, not just a table.</h2>
            <p className="text-base leading-relaxed text-white/55 md:text-lg">Student records, courses, enrollments, marks, results and fees are connected. EduPredict was built to model those relationships and expose the workflows through separate admin and student portals instead of treating each record as an isolated form.</p>
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-6 md:px-10 md:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionKicker>02 — The system</SectionKicker>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {features.map(([title, text]) => <Feature key={title} title={title} text={text} />)}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-6 md:px-10 md:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionKicker>03 — Architecture</SectionKicker>
          <div className="mt-8 overflow-x-auto rounded-[1.5rem] border border-white/10 bg-white/[0.025] p-4 sm:p-6">
            <div className="min-w-[680px] grid grid-cols-4 gap-3">
              <ArchCard title="Browser" text="HTML · CSS · JavaScript" />
              <ArchCard title="Flask" text="Routes · Sessions · Logic" />
              <ArchCard title="Database layer" text="Queries · CRUD · Schema" />
              <ArchCard title="MySQL" text="Students · Courses · Marks · Fees" />
            </div>
            <div className="mt-4 grid min-w-[680px] grid-cols-4 gap-3 text-center font-mono-tight text-[9px] uppercase tracking-[0.2em] text-white/25">
              <div>↓</div><div>↓</div><div>↓</div><div>↓</div>
            </div>
          </div>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/45">The project structure separates the Flask application, database connection/query layer, SQL schema and role-specific templates. The repository documents this structure directly.</p>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-6 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          <div>
            <SectionKicker>04 — Role-based workflows</SectionKicker>
            <div className="mt-7 space-y-4">
              <Workflow title="Admin" items={["Create/delete student credentials", "Manage courses and instructors", "Enter marks and calculate grades", "Publish results", "Set semester fees"]} />
              <Workflow title="Student" items={["Log in with admin-created credentials", "Enroll/drop courses", "View results and CGPA", "Edit profile", "Review semester fee"]} />
            </div>
          </div>
          <div className="glass rounded-[1.5rem] border border-white/10 p-6 sm:p-8">
            <LockKeyhole className="h-6 w-6 text-white/60" />
            <h3 className="font-display mt-5 text-3xl font-medium tracking-[-0.035em]">Authentication is part of the product.</h3>
            <p className="mt-4 text-sm leading-relaxed text-white/50 md:text-base">Flask sessions are used to keep admin and student workflows separated. Students do not self-register; their access is created through the admin workflow.</p>
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-6 md:px-10 md:py-24">
        <div className="mx-auto max-w-6xl rounded-[1.5rem] border border-white/10 bg-white/[0.025] p-6 sm:p-8 md:p-10">
          <SectionKicker>05 — Tech stack</SectionKicker>
          <div className="mt-7 flex flex-wrap gap-2">
            {['Python', 'Flask', 'MySQL', 'HTML', 'CSS', 'JavaScript', 'Flask Sessions'].map(t => <span key={t} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white/65">{t}</span>)}
          </div>
          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-white/45">EduPredict is intentionally presented as a Database Systems / full-stack engineering project rather than an AI project. Its value in the portfolio is showing backend, database, authentication and application-workflow capability alongside the AI/ML projects.</p>
        </div>
      </section>

      <section className="px-5 pb-20 pt-4 sm:px-6 md:px-10 md:pb-32">
        <div className="mx-auto max-w-6xl border-t border-white/10 pt-10">
          <p className="max-w-2xl text-sm leading-relaxed text-white/40">Built as an academic project and documented in the public repository.</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a href="https://github.com/Imran-Ghafoor594/edu-predict" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black"><Github className="h-4 w-4" /> Open repository <ArrowUpRight className="h-4 w-4" /></a>
            <Link to="/" hash="work" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm text-white"><ArrowLeft className="h-4 w-4" /> Back to all projects</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function SectionKicker({ children }: { children: React.ReactNode }) { return <div className="font-mono-tight text-[10px] uppercase tracking-[0.3em] text-white/35">{children}</div>; }
function Metric({ icon, label, value, note }: { icon: React.ReactNode; label: string; value: string; note: string }) { return <div className="glass rounded-[1.25rem] border border-white/10 p-5 sm:p-6"><div className="flex items-center gap-2 text-white/45">{icon && <span className="h-4 w-4">{icon}</span>}<span className="font-mono-tight text-[9px] uppercase tracking-[0.25em]">{label}</span></div><div className="font-display mt-5 break-words text-3xl font-medium tracking-[-0.04em] text-white sm:text-4xl">{value}</div><div className="mt-2 text-xs text-white/35">{note}</div></div>; }
function Feature({ title, text }: { title: string; text: string }) { return <div className="glass rounded-[1.25rem] border border-white/10 p-5 sm:p-6"><h3 className="font-display text-xl font-medium tracking-[-0.025em] text-white sm:text-2xl">{title}</h3><p className="mt-3 text-sm leading-relaxed text-white/50">{text}</p></div>; }
function ArchCard({ title, text }: { title: string; text: string }) { return <div className="rounded-2xl border border-white/10 bg-black/30 p-4"><div className="font-mono-tight text-[9px] uppercase tracking-[0.2em] text-white/35">{title}</div><div className="mt-3 text-sm text-white/70">{text}</div></div>; }
function Workflow({ title, items }: { title: string; items: string[] }) { return <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.025] p-5 sm:p-6"><h3 className="font-display text-2xl font-medium text-white">{title}</h3><ul className="mt-4 grid gap-2">{items.map(item => <li key={item} className="text-sm leading-relaxed text-white/50">• {item}</li>)}</ul></div>; }
