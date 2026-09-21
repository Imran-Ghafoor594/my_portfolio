import type { RefObject } from "react";

const POSTER = "/video/hero-poster.jpg";
const VIDEO = "/video/hero-intro.mp4";

type Props = {
  /** Play the video (desktop) or show the poster frame only (phones, reduced motion, save-data). */
  videoActive: boolean;
  videoRef: RefObject<HTMLVideoElement | null>;
};

/**
 * Video/poster plus the legibility scrim and bottom fade.
 *
 * The video itself is completely static — no scroll-linked scale/translate.
 * Continuously transforming a full-screen video forces the GPU to re-composite
 * a 720p frame every scroll tick; the cinematic feel comes from the text and
 * overlays instead. The four stacked overlay layers are now one `hero-scrim`.
 */
export function HeroBackdrop({ videoActive, videoRef }: Props) {
  return (
    <>
      <div className="absolute inset-0 z-0 bg-black">
        {videoActive ? (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            disablePictureInPicture
            poster={POSTER}
            src={VIDEO}
          />
        ) : (
          <img
            src={POSTER}
            alt=""
            width={1280}
            height={720}
            decoding="async"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover object-[54%_center]"
          />
        )}
      </div>

      <div aria-hidden className="hero-scrim pointer-events-none absolute inset-0 z-[2]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-40 bg-gradient-to-b from-transparent to-background md:h-56" />
    </>
  );
}
