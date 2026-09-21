import { useEffect, useRef, useState } from "react";

/**
 * Custom cursor ring + dot (fine pointers, motion allowed).
 *
 * The ring eases toward the pointer in a rAF loop that stops when it has
 * caught up. The interactive-element check only runs when the hovered element
 * actually changes, and the ring no longer carries a `backdrop-filter`
 * (a 2px blur that had to be recomputed every frame it moved).
 */
export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let raf = 0;
    let hovering = false;
    let lastTarget: EventTarget | null = null;

    const loop = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = Math.abs(x - rx) > 0.3 || Math.abs(y - ry) > 0.3 ? requestAnimationFrame(loop) : 0;
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x = e.clientX;
      y = e.clientY;
      if (ring.current) ring.current.dataset.ready = "1";
      if (dot.current) dot.current.dataset.ready = "1";
      if (dot.current) dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (e.target !== lastTarget) {
        lastTarget = e.target;
        const t = e.target as HTMLElement | null;
        const isInteractive = !!t?.closest?.(
          "a, button, [role='button'], input, textarea, label, summary",
        );
        if (isInteractive !== hovering) {
          hovering = isInteractive;
          if (ring.current) ring.current.dataset.hover = hovering ? "1" : "0";
        }
      }
      if (!raf) raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.classList.add("has-custom-cursor");
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  if (!enabled) return null;
  return (
    <>
      <div
        ref={ring}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] -ml-4 opacity-0 data-[ready='1']:opacity-100 -mt-4 h-8 w-8 rounded-full border border-white/25 transition-[width,height,margin,background,border-color,box-shadow] duration-300 ease-out data-[hover='1']:-ml-6 data-[hover='1']:-mt-6 data-[hover='1']:h-12 data-[hover='1']:w-12 data-[hover='1']:border-white/50 data-[hover='1']:bg-white/[0.06] data-[hover='1']:shadow-[0_0_40px_oklch(0.7_0.22_265_/_0.45)]"
      />
      <div
        ref={dot}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[101] -ml-[3px] opacity-0 data-[ready='1']:opacity-100 -mt-[3px] h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_12px_oklch(0.78_0.2_265_/_0.9)]"
      />
    </>
  );
}
