import { useIsDesktop } from "@/hooks/use-media-query";

/**
 * Motion props for a scroll-triggered entrance (opacity + upward travel only —
 * see `components/effects/Reveal.tsx` for the rationale). Use this directly on
 * elements that need to carry their own extra motion props (e.g. `whileHover`).
 *
 * `initial` is identical on server and client and across viewport sizes —
 * Motion only reads it on first render, so anything viewport-dependent lives in
 * `viewport` / `transition`, which are re-read after hydration.
 */
export type RevealOptions = {
  /** Upward travel in px. */
  y?: number;
  /** Seconds. */
  delay?: number;
  /** Seconds (capped shorter on phones). */
  duration?: number;
  /** IntersectionObserver margin, px (negative = trigger later). */
  margin?: number;
};

const EASE = [0.22, 1, 0.36, 1] as const;

/** Motion props for elements that need to carry their own extra motion props. */
export function useRevealProps({
  y = 20,
  delay = 0,
  duration = 0.9,
  margin = -80,
}: RevealOptions = {}) {
  const desktop = useIsDesktop();
  return {
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: `${desktop ? margin : -40}px` },
    transition: {
      duration: desktop ? duration : Math.min(duration, 0.7),
      delay: desktop ? delay : Math.min(delay, 0.15),
      ease: EASE,
    },
  };
}
