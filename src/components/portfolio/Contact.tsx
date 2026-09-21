import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { Reveal } from "@/components/effects/Reveal";
import { useRevealProps } from "@/hooks/use-reveal-props";
import { EMAIL, GITHUB_URL, LINKEDIN_URL, RESUME_URL } from "@/data/site";
import { SectionLabel } from "./SectionLabel";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      // Fallback silently — button still gives visual confirmation.
    }
    setCopied(true);
    if (copyTimer.current) clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopied(false), 2000);
  };

  useEffect(
    () => () => {
      if (copyTimer.current) clearTimeout(copyTimer.current);
    },
    [],
  );

  return (
    <section
      id="contact"
      aria-labelledby="transmission-heading"
      className="relative py-20 md:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center">
            <SectionLabel index="06" label="Transmission" />
          </div>
          <Reveal
            as="h2"
            id="transmission-heading"
            y={24}
            duration={1}
            className="font-display mt-8 text-balance text-[clamp(2.25rem,7vw,6rem)] font-medium leading-[0.92] tracking-[-0.04em] text-white"
          >
            Let&rsquo;s build something <span className="text-gradient">intelligent together.</span>
          </Reveal>
          <Reveal
            as="p"
            y={16}
            duration={0.9}
            delay={0.12}
            className="mx-auto mt-6 max-w-2xl text-balance text-[15px] leading-relaxed text-white/60 md:text-base"
          >
            I&rsquo;m always interested in AI, Machine Learning, Generative AI, and Computer Vision
            opportunities where technology creates meaningful impact.
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:mt-20 lg:grid-cols-4">
          <ChannelCard
            index={0}
            icon={Mail}
            label="Email"
            value={EMAIL}
            ariaLabel={`Copy email address ${EMAIL}`}
            actionLabel="Copy Email"
            copied={copied}
            onClick={onCopy}
          />
          <ChannelCard
            index={1}
            icon={Github}
            label="GitHub"
            value="Imran-Ghafoor594"
            href={GITHUB_URL}
            ariaLabel="Visit GitHub profile (opens in a new tab)"
            actionLabel="Visit GitHub"
          />
          <ChannelCard
            index={2}
            icon={Linkedin}
            label="LinkedIn"
            value="in/imranghafoor56"
            href={LINKEDIN_URL}
            ariaLabel="Open LinkedIn profile (opens in a new tab)"
            actionLabel="Open LinkedIn"
          />
          <ChannelCard
            index={3}
            icon={Download}
            label="Resume"
            value="Imran_Ghafoor.pdf"
            href={RESUME_URL}
            ariaLabel="Open resume PDF in a new tab"
            actionLabel="Download Resume"
          />
        </div>
      </div>
    </section>
  );
}

type ChannelCardProps = {
  index: number;
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  label: string;
  value: string;
  href?: string;
  download?: boolean;
  actionLabel: string;
  ariaLabel: string;
  copied?: boolean;
  onClick?: () => void;
};

function ChannelCard({
  index,
  icon: Icon,
  label,
  value,
  href,
  download,
  actionLabel,
  ariaLabel,
  copied,
  onClick,
}: ChannelCardProps) {
  const shared =
    "glass hover-sheen group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl p-7 text-left focus-visible:outline-none";

  const content = (
    <>
      <div
        aria-hidden
        className="glow-blob pointer-events-none absolute -right-28 -top-28 h-60 w-60 opacity-50 transition-opacity duration-700 group-hover:opacity-100"
        style={{ ["--blob" as never]: "oklch(0.7 0.22 265 / 0.3)" }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ boxShadow: "inset 0 0 60px oklch(0.7 0.22 265 / 0.2)" }}
      />

      <div className="relative flex items-start justify-between">
        <span
          className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[0.04] transition-colors duration-500 group-hover:bg-white/[0.08]"
          aria-hidden="true"
        >
          <Icon className="h-4.5 w-4.5 text-white/85" aria-hidden />
        </span>
        <ArrowUpRight
          className="h-4 w-4 text-white/30 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
          aria-hidden
        />
      </div>

      <div className="relative mt-10">
        <div className="font-mono-tight text-[10px] uppercase tracking-[0.28em] text-white/50">
          {label}
        </div>
        <div className="font-display mt-2 truncate text-[17px] font-medium text-white md:text-lg">
          {value}
        </div>

        <div className="mt-5 inline-flex items-center gap-1.5 font-mono-tight text-[11px] uppercase tracking-[0.22em] text-white/60 transition-colors duration-300 group-hover:text-white">
          <span className="relative inline-block min-w-[92px]">
            <span
              className={`inline-block transition-all duration-300 ${
                copied ? "opacity-0 -translate-y-1 blur-[4px]" : "opacity-100 translate-y-0 blur-0"
              }`}
            >
              {actionLabel}
            </span>
            <span
              aria-live="polite"
              className={`absolute inset-0 inline-flex items-center gap-1 text-[oklch(0.85_0.18_155)] transition-all duration-300 ${
                copied ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-1 blur-[4px]"
              }`}
            >
              ✓ Copied
            </span>
          </span>
        </div>
      </div>
    </>
  );

  const reveal = useRevealProps({ y: 40, duration: 1.1, delay: index * 0.12 });
  const motionProps = {
    ...reveal,
    whileHover: {
      y: -6,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  if (onClick) {
    return (
      <motion.button
        type="button"
        onClick={onClick}
        aria-label={ariaLabel}
        className={shared}
        {...motionProps}
      >
        {content}
      </motion.button>
    );
  }
  return (
    <motion.a
      href={href}
      target={download ? undefined : "_blank"}
      rel="noreferrer"
      download={download || undefined}
      aria-label={ariaLabel}
      className={shared}
      {...motionProps}
    >
      {content}
    </motion.a>
  );
}
