import { createFileRoute } from "@tanstack/react-router";
import { MotionConfig } from "motion/react";
import { CustomCursor } from "@/components/effects/CustomCursor";
import { MouseGlow } from "@/components/effects/MouseGlow";
import { SmoothScroll } from "@/components/effects/SmoothScroll";
import { About } from "@/components/portfolio/About";
import { Architecture } from "@/components/portfolio/Architecture";
import { Calibration } from "@/components/portfolio/Calibration";
import { Contact } from "@/components/portfolio/Contact";
import { Experience } from "@/components/portfolio/Experience";
import { Footer } from "@/components/portfolio/Footer";
import { Hero } from "@/components/portfolio/Hero";
import { Navbar } from "@/components/portfolio/Navbar";
import { FeaturedProjects } from "@/components/portfolio/Projects";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Imran Ghafoor — AI Engineer" },
      {
        name: "description",
        content:
          "AI Engineer specializing in Machine Learning, Deep Learning, Computer Vision, NLP, Generative AI, and intelligent software systems.",
      },
      { property: "og:title", content: "Imran Ghafoor — AI Engineer" },
      {
        property: "og:description",
        content:
          "AI Engineer specializing in Machine Learning, Deep Learning, Computer Vision, NLP, Generative AI, and intelligent software systems.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:site_name", content: "Imran Ghafoor" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Imran Ghafoor — AI Engineer" },
      {
        name: "twitter:description",
        content:
          "AI Engineer specializing in Machine Learning, Deep Learning, Computer Vision, NLP, Generative AI, and intelligent software systems.",
      },
      { name: "author", content: "Imran Ghafoor" },
      {
        name: "keywords",
        content:
          "AI Engineer, Machine Learning, Deep Learning, Computer Vision, NLP, Generative AI, Imran Ghafoor, Pakistan",
      },
    ],
    links: [
      { rel: "canonical", href: "/" },
      // The poster is the LCP element on phones (and until the video starts on desktop).
      { rel: "preload", as: "image", href: "/video/hero-poster.jpg", fetchPriority: "high" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Imran Ghafoor",
          jobTitle: "AI Engineer",
          description:
            "AI Engineer specializing in Machine Learning, Deep Learning, Computer Vision, NLP, and Generative AI.",
          email: "mailto:meimranghafoor@gmail.com",
          address: { "@type": "PostalAddress", addressCountry: "PK" },
          sameAs: ["https://github.com/Imran-Ghafoor594", "https://linkedin.com/in/imranghafoor56"],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    // Reduced-motion visitors get instant transforms (content still appears) everywhere Motion is used.
    <MotionConfig reducedMotion="user">
      <main className="relative min-h-screen overflow-x-clip bg-background text-foreground">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-black"
        >
          Skip to content
        </a>
        {/* Global backdrop */}
        <div className="pointer-events-none fixed inset-0 -z-10 bg-aurora" />
        <div className="pointer-events-none fixed inset-0 -z-10 bg-grid" />
        <SmoothScroll />
        <CustomCursor />
        <MouseGlow />

        <Navbar />
        <div id="main">
          <Hero />
          <Calibration />
          <FeaturedProjects />
          <About />
          <Experience />
          <Architecture />
          <Contact />
        </div>
        <Footer />
      </main>
    </MotionConfig>
  );
}
