import { useSyncExternalStore } from "react";

/**
 * SSR-safe media query hook.
 *
 * Returns `false` on the server and during hydration, then the real value —
 * so server HTML and the first client render always match. Built on
 * `useSyncExternalStore`, so it re-renders only when the query result flips.
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** Tablet-and-up layouts. Matches Tailwind's `md` breakpoint. */
export const useIsDesktop = () => useMediaQuery("(min-width: 768px)");

/** A real mouse/trackpad is the primary pointer (not a touch screen). */
export const useFinePointer = () => useMediaQuery("(hover: hover) and (pointer: fine)");
