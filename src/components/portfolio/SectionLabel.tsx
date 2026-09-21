import { Reveal } from "@/components/effects/Reveal";

export function SectionLabel({ index, label }: { index: string; label: string }) {
  return (
    <Reveal
      y={8}
      duration={0.9}
      margin={-40}
      className="group inline-flex items-center gap-3 rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1.5 transition-colors hover:border-white/[0.16] hover:bg-white/[0.06]"
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full rounded-full bg-[oklch(0.75_0.2_265)] opacity-70 md:animate-ping" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gradient-to-br from-[oklch(0.8_0.18_265)] to-[oklch(0.65_0.22_305)] shadow-[0_0_10px_oklch(0.75_0.2_265)]" />
      </span>
      <span className="font-mono-tight text-[10px] uppercase tracking-[0.32em] text-white/80 transition-colors group-hover:text-white sm:text-[11px]">
        <span className="text-white/50">{index}</span>
        <span className="mx-2 text-white/20">/</span>
        {label}
      </span>
    </Reveal>
  );
}
