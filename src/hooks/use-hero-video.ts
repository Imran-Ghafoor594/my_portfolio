import { useEffect, useRef, useState, type RefObject } from "react";
import { useReducedMotion } from "motion/react";
import { useIsDesktop } from "./use-media-query";

/**
 * Set to `true` to also play the hero video on phones. It is off by default:
 * a full-screen autoplaying video is the single heaviest thing on the page for
 * a mid-range phone, and the poster frame already carries the look.
 */
export const HERO_VIDEO_ON_MOBILE = false;

/**
 * Decides whether the hero should play its video, and controls it.
 *
 * - Plays on desktop only (see above), never for reduced-motion or "save data".
 * - The video is only attached after hydration, so phones never download it.
 * - While muted it pauses when the hero scrolls out of view, so it isn't
 *   decoding 720p frames behind the rest of the page. If the visitor turned
 *   the intro audio on, it keeps playing.
 */
export function useHeroVideo(sectionRef: RefObject<HTMLElement | null>) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isDesktop = useIsDesktop();
  const reduced = useReducedMotion();
  const [saveData, setSaveData] = useState(false);
  const [audioOn, setAudioOn] = useState(false);

  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    setSaveData(conn?.saveData === true);
  }, []);

  const active = (isDesktop || HERO_VIDEO_ON_MOBILE) && !reduced && !saveData;

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!active || !section || !video) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else if (video.muted) {
          video.pause();
        }
      },
      { threshold: 0 },
    );
    io.observe(section);
    return () => io.disconnect();
  }, [active, sectionRef]);

  const toggleAudio = () => {
    const v = videoRef.current;
    if (!v) return;
    const next = !audioOn;
    v.muted = !next;
    if (next) {
      v.volume = 1;
      v.play().catch(() => {});
    }
    setAudioOn(next);
  };

  return { videoRef, videoActive: active, audioOn, toggleAudio };
}
