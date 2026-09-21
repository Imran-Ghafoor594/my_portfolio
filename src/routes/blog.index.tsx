import { createFileRoute, Link } from "@tanstack/react-router";

const posts = [
  {
    slug: "vision-native-plant-disease-diagnostics",
    title: "Vision-Native Plant Disease Diagnostics",
    excerpt:
      "How PlantScan uses a MobileNetV2-based CNN to classify plant diseases from a single leaf image — architecture, training, and on-device inference.",
    date: "2026-01-14",
    readTime: "9 min read",
    tags: ["Computer Vision", "CNN", "MobileNetV2", "PyTorch"],
  },
];

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Engineering Notes — Imran Ghafoor" },
      {
        name: "description",
        content:
          "Technical deep-dives on AI systems by Imran Ghafoor — computer vision, model architecture, deployment, and real-world performance.",
      },
      { property: "og:title", content: "Engineering Notes — Imran Ghafoor" },
      {
        property: "og:description",
        content:
          "Technical deep-dives on AI systems: computer vision, model architecture, deployment, and real-world performance.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  return (
    <main className="relative min-h-screen bg-background pt-32 pb-32">
      <div className="mx-auto max-w-4xl px-6">
        <header className="mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent-blue,220_90%_60%))]" />
            Engineering Notes
          </div>
          <h1 className="mt-6 font-display text-5xl leading-[1.05] tracking-tight text-foreground md:text-6xl">
            Deep-dives on the systems behind the work.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Architecture decisions, training runs, and deployment notes from real projects — written for engineers who want the specifics.
          </p>
        </header>

        <ul className="divide-y divide-white/5 border-y border-white/5">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="group flex flex-col gap-4 py-10 transition-colors hover:bg-white/[0.015]"
              >
                <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                  <time dateTime={p.date}>
                    {new Date(p.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                  <span className="h-1 w-1 rounded-full bg-white/20" />
                  <span>{p.readTime}</span>
                </div>
                <h2 className="font-display text-3xl leading-tight tracking-tight text-foreground transition-colors group-hover:text-[hsl(var(--accent-blue,220_90%_60%))] md:text-4xl">
                  {p.title}
                </h2>
                <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
                  {p.excerpt}
                </p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-white/[0.02] px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-16">
          <Link
            to="/"
            className="text-sm uppercase tracking-[0.24em] text-muted-foreground transition-colors hover:text-foreground"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}