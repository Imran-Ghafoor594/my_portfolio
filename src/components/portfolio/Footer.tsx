export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-10">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-3 px-6 text-center md:flex-row md:px-10 md:text-left">
        <div className="flex flex-col items-center gap-1 md:flex-row md:items-baseline md:gap-3">
          <span className="font-display text-[13px] font-medium tracking-[0.02em] text-white">
            IMRAN GHAFOOR
          </span>
          <span className="font-mono-tight text-[10px] uppercase tracking-[0.28em] text-white/50">
            AI Engineer · Pakistan
          </span>
        </div>
        <div className="font-mono-tight text-[10px] uppercase tracking-[0.24em] text-white/45">
          © 2026 · Built with Next.js, TypeScript &amp; Framer Motion
        </div>
      </div>
    </footer>
  );
}
