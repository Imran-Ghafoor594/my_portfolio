import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useFinePointer } from "@/hooks/use-media-query";

type Props = {
  href: string;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
  "aria-label"?: string;
};

/** Button that leans toward the cursor. Plain link on touch devices. */
export function MagneticButton(props: Props) {
  const fine = useFinePointer();
  return fine ? <MagneticLink {...props} /> : <PlainLink {...props} />;
}

function PlainLink({ href, external, className, children, ...rest }: Props) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={`hover-sheen ${className ?? ""}`}
      {...rest}
    >
      {children}
    </a>
  );
}

function MagneticLink({ href, external, className, children, ...rest }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 180, damping: 18, mass: 0.6 });
  const y = useSpring(my, { stiffness: 180, damping: 18, mass: 0.6 });
  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set((e.clientX - rect.left - rect.width / 2) * 0.28);
    my.set((e.clientY - rect.top - rect.height / 2) * 0.4);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };
  return (
    <motion.a
      ref={ref}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x, y }}
      className={`hover-sheen will-change-transform ${className ?? ""}`}
      {...rest}
    >
      {children}
    </motion.a>
  );
}
