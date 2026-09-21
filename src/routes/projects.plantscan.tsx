import { createFileRoute } from "@tanstack/react-router";
import { MotionConfig } from "motion/react";
import { PlantScanCaseStudy } from "@/components/portfolio/PlantScanCaseStudy";

export const Route = createFileRoute("/projects/plantscan")({
  head: () => ({
    meta: [
      { title: "PlantScan AI — Imran Ghafoor" },
      {
        name: "description",
        content: "PlantScan AI case study — a deep-learning plant disease detection application using transfer learning, CNN model comparison and Flask inference.",
      },
      { property: "og:title", content: "PlantScan AI — Imran Ghafoor" },
      { property: "og:description", content: "Deep-learning plant disease detection with EfficientNetB0, MobileNetV2 and ResNet50." },
      { property: "og:type", content: "article" },
    ],
  }),
  component: PlantScanRoute,
});

function PlantScanRoute() {
  return (
    <MotionConfig reducedMotion="user">
      <PlantScanCaseStudy />
    </MotionConfig>
  );
}
