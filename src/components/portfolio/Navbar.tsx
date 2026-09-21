import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { MOBILE_NAV_LINKS, NAV_LINKS } from "@/data/site";

const SECTION_IDS = MOBILE_NAV_LINKS.map((l) => l.id);

/** Tracks which section is under the middle of the viewport. */
function useActiveSection() {
  const [active, setActive] = useState("top");
  useEffect(() => {
    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (e): e is HTMLElement => !!e,
    );
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return active;
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile menu: lock page scroll, close on Escape / when resized up to desktop.
  useEffect(() => {
    if (!menuOpen) return;
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = "hidden";
    firstLinkRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const mql = window.matchMedia("(min-width: 768px)");
    const onResize = () => mql.matches && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    mql.addEventListener("change", onResize);
    return () => {
      html.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      mql.removeEventListener("change", onResize);
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
    menuButtonRef.current?.focus({ preventScroll: true });
  };

  const solid = scrolled && !menuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500 ${
        solid
          ? "border-b border-white/[0.06] bg-black/80 md:bg-black/50 md:backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 md:h-20 md:px-10">
        <a
          href="#top"
          onClick={() => menuOpen && setMenuOpen(false)}
          className="group inline-flex items-center gap-2.5"
        >
          <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-[oklch(0.75_0.2_265)] to-[oklch(0.62_0.24_305)] font-display text-[13px] font-semibold text-white shadow-[0_0_24px_oklch(0.7_0.22_265_/_0.5)]">
            IG
          </span>
          <span className="font-mono-tight text-[10.5px] uppercase tracking-[0.22em] text-white/75 transition-colors group-hover:text-white sm:text-[11px] sm:tracking-[0.28em]">
            Imran Ghafoor
          </span>
        </a>

        {/* Desktop pill navigation */}
        <div className="hidden items-center gap-0.5 rounded-full border border-white/[0.06] bg-white/[0.02] p-1 backdrop-blur-md md:flex">
          {NAV_LINKS.map((l) => {
            const isActive = active === l.id;
            return (
              <a
                key={l.id}
                href={`#${l.id}`}
                className={`relative rounded-full px-4 py-1.5 text-[12.5px] font-medium tracking-[-0.005em] transition-colors duration-300 ${
                  isActive ? "text-white" : "text-white/55 hover:text-white/90"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-0 rounded-full bg-white/[0.07] shadow-[inset_0_0_0_1px_oklch(1_0_0_/_0.08),0_0_24px_oklch(0.7_0.22_265_/_0.25)]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{l.label}</span>
              </a>
            );
          })}
        </div>

        <a
          href="#contact"
          className="group hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[13px] font-medium text-white/90 backdrop-blur-md transition-all hover:border-white/20 hover:bg-white/[0.08] hover:text-white md:inline-flex"
        >
          Let's talk
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>

        {/* Mobile menu button */}
        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => (menuOpen ? closeMenu() : setMenuOpen(true))}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="inline-flex h-10 items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] pl-4 pr-3.5 font-mono-tight text-[11px] uppercase tracking-[0.26em] text-white/90 md:hidden"
        >
          {menuOpen ? "Close" : "Menu"}
          <span aria-hidden className="relative block h-2.5 w-4">
            <span
              className={`absolute left-0 h-px w-4 bg-current transition-all duration-300 ${
                menuOpen ? "top-1/2 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 h-px w-4 bg-current transition-all duration-300 ${
                menuOpen ? "top-1/2 -rotate-45" : "bottom-0"
              }`}
            />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            data-lenis-prevent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 -z-10 flex flex-col justify-center bg-[oklch(0.12_0.02_265)] px-6 pb-10 pt-20 md:hidden"
          >
            <nav aria-label="Mobile">
              <ul className="divide-y divide-white/[0.07] border-y border-white/[0.07]">
                {MOBILE_NAV_LINKS.map((l, i) => {
                  const isActive = active === l.id;
                  return (
                    <motion.li
                      key={l.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.35,
                        delay: 0.05 + i * 0.05,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <a
                        ref={i === 0 ? firstLinkRef : undefined}
                        href={`#${l.id}`}
                        onClick={() => setMenuOpen(false)}
                        className={`flex items-baseline gap-5 py-5 ${
                          isActive ? "text-white" : "text-white/60 active:text-white"
                        }`}
                      >
                        <span className="font-mono-tight text-[11px] tracking-[0.2em] text-white/40">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="font-display text-[2rem] font-medium uppercase leading-none tracking-[-0.02em]">
                          {l.label}
                        </span>
                        {isActive && (
                          <span
                            aria-hidden
                            className="ml-auto h-1.5 w-1.5 self-center rounded-full bg-[oklch(0.75_0.2_265)] shadow-[0_0_10px_oklch(0.75_0.2_265)]"
                          />
                        )}
                      </a>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
