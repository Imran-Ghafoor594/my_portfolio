import { motion, type HTMLMotionProps } from "motion/react";
import { useRevealProps, type RevealOptions } from "@/hooks/use-reveal-props";

/**
 * Scroll-triggered entrance used across the page.
 *
 * Replaces ~30 copies of `initial={{ opacity, y, filter: "blur(...)" }}`.
 * The old version animated `filter: blur()` on everything from a 20px heading
 * to a 1500px-tall project card; animating a blur filter over large areas is
 * one of the costliest things a browser can do mid-scroll (and it left
 * `filter: blur(0px)` behind, keeping each element on its own GPU layer).
 * This one animates opacity + transform only.
 *
 * Intensity follows the device: full duration/delay on desktop; shorter,
 * lighter transitions on phones. Reduced-motion users are handled globally by
 * `<MotionConfig reducedMotion="user">` (transforms become instant, content is
 * still revealed).
 *
 * Note: `initial` is deliberately identical on server and client (and across
 * viewport sizes) — Motion only reads it on first render, so anything
 * viewport-dependent has to live in `viewport` / `transition`, which are
 * re-read after hydration.
 */

const TAGS = {
  div: motion.div,
  h2: motion.h2,
  p: motion.p,
  li: motion.li,
  span: motion.span,
  article: motion.article,
} as const;

type RevealProps = RevealOptions &
  Omit<
    HTMLMotionProps<"div">,
    "initial" | "animate" | "whileInView" | "viewport" | "transition"
  > & {
    as?: keyof typeof TAGS;
  };

export function Reveal({ as = "div", y, delay, duration, margin, ...rest }: RevealProps) {
  const props = useRevealProps({ y, delay, duration, margin });
  const Tag = TAGS[as] as typeof motion.div;
  return <Tag {...props} {...rest} />;
}
