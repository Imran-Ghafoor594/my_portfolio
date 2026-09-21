import { useEffect, useRef } from "react";

/**
 * Soft glow that trails the mouse (desktop, fine pointers only).
 *
 * Performance notes:
 *  - No listeners and no rAF loop at all on touch devices.
 *  - `pointermove` only stores the target; the eased position is applied to a
 *    `transform` in a rAF loop that *stops* once the glow has caught up, so an
 *    idle mouse costs nothing.
 *  - The glow is a radial gradient — already soft — so it doesn't need the
 *    `blur-3xl` + `mix-blend-screen` it used to carry (a 600px blurred, blended
 *    layer re-composited every frame while it moved).
 */
const SIZE = 600;

export function MouseGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let x = tx;
    let y = ty;
    let raf = 0;

    const paint = () => {
      el.style.transform = `translate3d(${x - SIZE / 2}px, ${y - SIZE / 2}px, 0)`;
    };
    const tick = () => {
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      paint();
      raf = Math.abs(tx - x) > 0.3 || Math.abs(ty - y) > 0.3 ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      tx = e.clientX;
      ty = e.clientY;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    paint();
    el.dataset.ready = "1";
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-10 hidden rounded-full opacity-0 transition-opacity duration-700 data-[ready=1]:opacity-40 md:block"
      style={{
        width: SIZE,
        height: SIZE,
        background:
          "radial-gradient(circle at center, oklch(0.7 0.22 265 / 0.35), oklch(0.62 0.24 305 / 0.18) 40%, transparent 70%)",
      }}
    />
  );
}
