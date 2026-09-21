import { useEffect, useRef } from "react";

/**
 * Ambient neural-network canvas behind the hero (desktop / tablet only).
 *
 * Same idea as before — drifting nodes, faint links, links that reach for the
 * cursor — but far cheaper to run:
 *  - Draws only while it is on screen *and* the tab is visible (it used to
 *    keep drawing after you scrolled past the hero).
 *  - Capped at ~30fps; motion is delta-time based so speed doesn't change.
 *  - Links are batched into a few alpha buckets → ~6 stroke calls per frame
 *    instead of one beginPath/stroke per line (hundreds).
 *  - Fewer nodes, lower device-pixel-ratio cap, and the mouse is read once per
 *    frame instead of being recalculated in event handlers.
 *  - Skipped entirely on phones, "save data" and low-core devices; touch-first
 *    tablets get a lighter version with no cursor links; reduced-motion users
 *    get a single static frame.
 */

type Node = { x: number; y: number; vx: number; vy: number; r: number };

const LINK_DIST = 140;
const LINK_DIST2 = LINK_DIST * LINK_DIST;
const MOUSE_DIST = 200;
const MOUSE_DIST2 = MOUSE_DIST * MOUSE_DIST;
const BUCKETS = 5;
const FRAME_MS = 1000 / 30;

export function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    const isWide = window.matchMedia("(min-width: 768px)").matches;
    const lowPower = nav.connection?.saveData === true || (nav.hardwareConcurrency ?? 8) <= 2;
    if (!isWide || lowPower) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touchFirst = !window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let raf = 0;
    let last = 0;
    let onScreen = true;
    const mouse = { x: -9999, y: -9999, active: false };

    const init = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      if (!width || !height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const density = touchFirst ? 52000 : 26000;
      const count = Math.max(14, Math.min(60, Math.floor((width * height) / density)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.4 + 0.4,
      }));
      draw(0);
    };

    // Reused every frame — no per-frame allocation in the hot path.
    const buckets: number[][] = Array.from({ length: BUCKETS }, () => []);
    const bucketAlpha = Array.from(
      { length: BUCKETS },
      (_, k) => (1 - Math.sqrt((k + 0.5) / BUCKETS)) * 0.18,
    );

    const draw = (dt: number) => {
      ctx.clearRect(0, 0, width, height);

      // Advance in 60fps-equivalent steps so a 30fps loop moves at the same speed.
      const step = dt / (1000 / 60);
      for (const n of nodes) {
        n.x += n.vx * step;
        n.y += n.vy * step;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      }

      // Cursor position relative to the canvas (read once per frame).
      let mx = -9999;
      let my = -9999;
      if (mouse.active && !touchFirst) {
        const rect = canvas.getBoundingClientRect();
        mx = mouse.x - rect.left;
        my = mouse.y - rect.top;
      }

      for (const b of buckets) b.length = 0;
      ctx.lineWidth = 0.6;
      const mouseLinks: number[] = [];

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          if (dx > LINK_DIST || dx < -LINK_DIST) continue;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK_DIST2) {
            buckets[Math.min(BUCKETS - 1, Math.floor((d2 / LINK_DIST2) * BUCKETS))].push(
              a.x,
              a.y,
              b.x,
              b.y,
            );
          }
        }
        if (mx > -9000) {
          const mdx = a.x - mx;
          const mdy = a.y - my;
          const md2 = mdx * mdx + mdy * mdy;
          if (md2 < MOUSE_DIST2) mouseLinks.push(a.x, a.y, 1 - Math.sqrt(md2) / MOUSE_DIST);
        }
      }

      for (let k = 0; k < BUCKETS; k++) {
        const seg = buckets[k];
        if (!seg.length) continue;
        ctx.strokeStyle = `rgba(120, 140, 255, ${bucketAlpha[k]})`;
        ctx.beginPath();
        for (let s = 0; s < seg.length; s += 4) {
          ctx.moveTo(seg[s], seg[s + 1]);
          ctx.lineTo(seg[s + 2], seg[s + 3]);
        }
        ctx.stroke();
      }

      if (mouseLinks.length) {
        ctx.lineWidth = 0.9;
        for (let s = 0; s < mouseLinks.length; s += 3) {
          ctx.strokeStyle = `rgba(180, 130, 255, ${mouseLinks[s + 2] * 0.55})`;
          ctx.beginPath();
          ctx.moveTo(mouseLinks[s], mouseLinks[s + 1]);
          ctx.lineTo(mx, my);
          ctx.stroke();
        }
      }

      ctx.fillStyle = "rgba(200, 210, 255, 0.7)";
      ctx.beginPath();
      for (const n of nodes) {
        ctx.moveTo(n.x + n.r, n.y);
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      }
      ctx.fill();
    };

    const frame = (t: number) => {
      raf = requestAnimationFrame(frame);
      const dt = t - last;
      if (dt < FRAME_MS - 1) return; // ~30fps cap
      last = t;
      draw(Math.min(dt, 100)); // clamp so a stall doesn't teleport the nodes
    };
    const shouldRun = () => onScreen && !document.hidden && !reducedMotion;
    const sync = () => {
      if (shouldRun()) {
        if (!raf) {
          last = performance.now();
          raf = requestAnimationFrame(frame);
        }
      } else if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
    };

    // Re-init when the canvas box changes (rAF-debounced by the observer itself).
    const ro = new ResizeObserver(() => init());
    ro.observe(canvas);
    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    // (ResizeObserver fires once on observe(), which performs the first init.)
    sync();
    document.addEventListener("visibilitychange", sync);
    if (!touchFirst) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full opacity-35"
    />
  );
}
