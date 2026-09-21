import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Desktop smooth scrolling (Lenis).
 *
 * Why the old setup felt slow: it passed `duration: 0.9` *and* `easing` *and*
 * `lerp`. In Lenis, a duration+easing pair wins over lerp, so every wheel tick
 * became a 0.9s ease-out animation that restarted on the next tick — the page
 * always trailed the wheel by most of a second. Here only `lerp` is set, which
 * gives a fast exponential glide: ~83ms time-constant, ~250ms to settle.
 *
 * Only runs for mouse/trackpad users who haven't asked for reduced motion.
 * Touch devices keep native scrolling (immediate, with the browser's own
 * inertia), and `html:not(.lenis)` in styles.css keeps native smooth anchor
 * jumps there. Re-evaluated live if the input mode or motion preference changes.
 */

const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

export function SmoothScroll() {
  useEffect(() => {
    const mq = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    let lenis: Lenis | null = null;
    let removeClickHandler: (() => void) | null = null;

    const start = () => {
      if (lenis) return;
      const instance = new Lenis({
        lerp: 0.2,
        smoothWheel: true,
        wheelMultiplier: 1,
        syncTouch: false,
        autoRaf: true,
      });
      lenis = instance;

      // In-page anchors (nav links, "Explore Work", …) glide with a short timed
      // ease instead of the wheel's lerp — a long jump across the page should
      // take ~1s, not snap and not crawl. The browser's own hash jump is
      // cancelled so it can't fight Lenis.
      const onClick = (e: MouseEvent) => {
        if (e.defaultPrevented || e.button !== 0) return;
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        const target = e.target instanceof Element ? e.target : null;
        const a = target?.closest<HTMLAnchorElement>("a[href^='#']");
        if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
        const hash = a.getAttribute("href") ?? "";
        if (hash !== "#" && !document.getElementById(decodeURIComponent(hash.slice(1)))) return;
        e.preventDefault();
        instance.scrollTo(hash === "#" ? 0 : hash, { duration: 1.1, easing: easeOutExpo });
      };
      document.addEventListener("click", onClick);
      removeClickHandler = () => document.removeEventListener("click", onClick);
    };

    const stop = () => {
      removeClickHandler?.();
      removeClickHandler = null;
      lenis?.destroy();
      lenis = null;
    };

    const sync = () => (mq.matches ? start() : stop());
    sync();
    mq.addEventListener("change", sync);
    return () => {
      mq.removeEventListener("change", sync);
      stop();
    };
  }, []);

  return null;
}
