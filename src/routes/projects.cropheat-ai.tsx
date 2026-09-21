import { createFileRoute } from "@tanstack/react-router";
import { MotionConfig } from "motion/react";
import { CropHeatCaseStudy } from "@/components/portfolio/CropHeatCaseStudy";

export const Route = createFileRoute("/projects/cropheat-ai")({
  head: () => ({
    meta: [
      { title: "CropHeat AI — Imran Ghafoor" },
      {
        name: "description",
        content:
          "CropHeat AI case study — an explainable agricultural heat-risk platform built with FortyGuard geospatial temperature intelligence.",
      },
      { property: "og:title", content: "CropHeat AI — Imran Ghafoor" },
      {
        property: "og:description",
        content:
          "An explainable agricultural heat-risk platform built with FortyGuard geospatial temperature intelligence.",
      },
      { property: "og:type", content: "article" },
    ],
  }),
  component: CropHeatRoute,
});

function CropHeatRoute() {
  return (
    <MotionConfig reducedMotion="user">
      <CropHeatCaseStudy />
    </MotionConfig>
  );
}
