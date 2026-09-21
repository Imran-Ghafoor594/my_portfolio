import type { CSSProperties } from "react";

/** Type-safe way to set CSS custom properties from inline styles. */
export function cssVars(vars: Record<`--${string}`, string | number>): CSSProperties {
  return vars as CSSProperties;
}
