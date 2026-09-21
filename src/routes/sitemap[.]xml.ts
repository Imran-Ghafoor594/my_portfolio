import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "https://me-imran.lovable.app";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          `  <url>`,
          `    <loc>${BASE_URL}/</loc>`,
          `    <changefreq>weekly</changefreq>`,
          `    <priority>1.0</priority>`,
          `  </url>`,
          `  <url>`,
          `    <loc>${BASE_URL}/blog</loc>`,
          `    <changefreq>weekly</changefreq>`,
          `    <priority>0.8</priority>`,
          `  </url>`,
          `  <url>`,
          `    <loc>${BASE_URL}/blog/vision-native-plant-disease-diagnostics</loc>`,
          `    <changefreq>monthly</changefreq>`,
          `    <priority>0.7</priority>`,
          `  </url>`,
          `</urlset>`,
        ].join("\n");
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});