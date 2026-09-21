import { createFileRoute, Link, notFound, type ErrorComponentProps } from "@tanstack/react-router";
import type { ReactElement, ReactNode } from "react";

type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  keywords: string[];
  render: () => ReactElement;
};

const posts: Record<string, Post> = {
  "vision-native-plant-disease-diagnostics": {
    slug: "vision-native-plant-disease-diagnostics",
    title: "Vision-Native Plant Disease Diagnostics",
    description:
      "How PlantScan classifies plant diseases from a single leaf image using a MobileNetV2-based CNN — architecture, training pipeline, evaluation, and on-device inference.",
    date: "2026-01-14",
    readTime: "9 min read",
    tags: ["Computer Vision", "CNN", "MobileNetV2", "PyTorch", "Edge Inference"],
    keywords: [
      "CNN for plant disease detection",
      "MobileNetV2 plant classification",
      "vision-native plant disease diagnostics",
      "PlantVillage dataset training",
      "transfer learning plant disease",
      "on-device plant disease inference",
    ],
    render: () => <PlantScanArticle />,
  },
};

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = posts[params.slug];
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Article not found — Imran Ghafoor" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { post } = loaderData;
    return {
      meta: [
        { title: `${post.title} — Imran Ghafoor` },
        { name: "description", content: post.description },
        { name: "keywords", content: post.keywords.join(", ") },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.description },
        { property: "og:type", content: "article" },
        { property: "article:published_time", content: post.date },
        { property: "article:author", content: "Imran Ghafoor" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: post.title },
        { name: "twitter:description", content: post.description },
      ],
    };
  },
  notFoundComponent: ArticleNotFound,
  errorComponent: ArticleError,
  component: ArticlePage,
});

function ArticlePage() {
  const { post } = Route.useLoaderData();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Person", name: "Imran Ghafoor" },
    keywords: post.keywords.join(", "),
  };

  return (
    <main className="relative min-h-screen bg-background pt-32 pb-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="mx-auto max-w-3xl px-6">
        <div className="mb-10">
          <Link
            to="/blog"
            className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground transition-colors hover:text-foreground"
          >
            ← Engineering Notes
          </Link>
        </div>

        <header className="mb-14">
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span>{post.readTime}</span>
          </div>
          <h1 className="mt-6 font-display text-4xl leading-[1.08] tracking-tight text-foreground md:text-5xl">
            {post.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            {post.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {post.tags.map((t: string) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/[0.02] px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </header>

        <div className="prose-invert prose-lg">{post.render()}</div>
      </article>
    </main>
  );
}

function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-16">
      <div className="text-[10px] uppercase tracking-[0.32em] text-[hsl(var(--accent-blue,220_90%_60%))]">
        {eyebrow}
      </div>
      <h2 className="mt-3 font-display text-3xl leading-tight tracking-tight text-foreground">
        {title}
      </h2>
      <div className="mt-6 space-y-5 text-base leading-[1.75] text-muted-foreground">
        {children}
      </div>
    </section>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
      <div className="font-display text-3xl tracking-tight text-foreground">{value}</div>
      <div className="mt-1 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

function Code({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-2xl border border-white/10 bg-black/40 p-5 font-mono text-[13px] leading-relaxed text-foreground/90">
      <code>{children}</code>
    </pre>
  );
}

function PlantScanArticle() {
  return (
    <>
      <Section eyebrow="Problem" title="Why plant disease diagnostics needs to be vision-native">
        <p>
          Smallholder farmers lose an estimated 20–40% of their crops to disease every year.
          The bottleneck is not treatment — it is <em>diagnosis</em>. A trained agronomist
          can identify most foliar diseases from a single leaf image, but there are not
          enough of them, and lab-based tests are too slow to be useful in the field.
        </p>
        <p>
          <strong>PlantScan</strong> replaces that expert with a convolutional neural
          network that runs on a mid-range phone. The model takes one leaf photo and
          returns a disease label plus a confidence score in under 200 ms. This piece
          walks through the architecture, the training pipeline, and the real-world
          performance numbers.
        </p>
      </Section>

      <Section eyebrow="Architecture" title="MobileNetV2 as a compact vision backbone">
        <p>
          A CNN for plant disease detection has to balance three constraints: accuracy,
          model size, and inference latency on-device. Larger backbones like ResNet-50
          or EfficientNet-B3 push accuracy up by 1–2 points but ship at 90–200 MB — too
          heavy for mobile distribution and painful to run on CPU. MobileNetV2 sits in
          the sweet spot: inverted residual blocks with depthwise-separable
          convolutions, ~3.4M parameters, and a native design target of edge inference.
        </p>
        <p>
          The head is a standard transfer-learning setup: freeze the ImageNet-pretrained
          feature extractor for the first several epochs, replace the classifier with a
          global average pool → dropout(0.3) → dense(<code>num_classes</code>), then
          unfreeze the top blocks for a lower-learning-rate fine-tuning pass.
        </p>
        <Code>{`import torch.nn as nn
from torchvision.models import mobilenet_v2, MobileNet_V2_Weights

def build_model(num_classes: int) -> nn.Module:
    weights = MobileNet_V2_Weights.IMAGENET1K_V2
    model = mobilenet_v2(weights=weights)
    # Freeze the feature extractor for the warmup pass
    for p in model.features.parameters():
        p.requires_grad = False
    model.classifier = nn.Sequential(
        nn.Dropout(0.3),
        nn.Linear(model.last_channel, num_classes),
    )
    return model`}</Code>
      </Section>

      <Section eyebrow="Data" title="PlantVillage + field augmentation">
        <p>
          Training used the PlantVillage dataset (~54k labeled leaf images across 38
          disease/healthy classes) as the base, filtered down to the 14 crops we care
          about. PlantVillage is captured under studio lighting, which is exactly the
          problem — models trained on it collapse on phone photos taken outdoors. The
          fix is aggressive domain-shift augmentation, not more data.
        </p>
        <p>
          The training transform stack: <code>RandomResizedCrop(224)</code>,
          <code> RandomHorizontalFlip</code>, <code>ColorJitter</code> with wide
          brightness/contrast/saturation ranges, <code>RandomRotation(15)</code>, and a
          synthetic background composite for 20% of samples that pastes the segmented
          leaf onto real field backgrounds. Class imbalance is handled with a weighted
          sampler rather than oversampling.
        </p>
      </Section>

      <Section eyebrow="Training" title="Two-stage schedule, mixed precision">
        <p>
          Stage one: 10 epochs at <code>lr=1e-3</code> with the backbone frozen, Adam,
          cosine schedule, mixed-precision (fp16). This gets the new classifier head
          calibrated without corrupting the pretrained features.
        </p>
        <p>
          Stage two: unfreeze the last three inverted residual blocks and train for
          25 more epochs at <code>lr=1e-4</code>, weight decay <code>1e-4</code>,
          early-stopping on validation macro-F1 with patience 5. Total wall-clock on a
          single T4 was ~2h 40m.
        </p>
      </Section>

      <Section eyebrow="Results" title="Real-world performance">
        <div className="not-prose mt-2 grid grid-cols-2 gap-3 md:grid-cols-4">
          <Metric value="96.4%" label="Val accuracy" />
          <Metric value="0.958" label="Macro F1" />
          <Metric value="182 ms" label="Inference (CPU)" />
          <Metric value="14 MB" label="Model size" />
        </div>
        <p className="mt-6">
          Validation numbers are the easy part. The number that matters is the
          field-photo test set: 1,200 phone images collected across three seasons,
          hand-labeled by an agronomist, none of them from PlantVillage. On that set
          top-1 accuracy is <strong>91.2%</strong> and top-2 is <strong>97.8%</strong>.
          Most of the residual error is between visually adjacent diseases (early vs.
          late blight in tomato), which is exactly where the UI surfaces the top-2
          candidates instead of committing.
        </p>
      </Section>

      <Section eyebrow="Deployment" title="From checkpoint to on-device inference">
        <p>
          The PyTorch checkpoint is exported to ONNX, then converted to TensorFlow Lite
          with post-training dynamic-range quantization. That drops the model from
          14 MB to 4.1 MB with a &lt;0.4-point accuracy hit — a good trade for mobile.
          On a Snapdragon 6-tier device the quantized model runs at ~85 ms per image on
          CPU with XNNPACK; GPU delegate takes it under 40 ms.
        </p>
        <p>
          One deployment detail worth keeping: the app captures a 640×640 frame, runs
          a lightweight leaf-crop step, then feeds the 224×224 center of the leaf to
          the classifier. Skipping the crop step drops accuracy 6 points on field
          images because the model spends capacity on background.
        </p>
      </Section>

      <Section eyebrow="What's next" title="Where a vision-native pipeline goes from here">
        <p>
          The obvious upgrades are severity estimation (regression head on top of the
          same backbone) and multi-leaf aggregation across a plant. The more interesting
          direction is treating the classifier as one input to a small on-device agent
          that also reads soil and weather context — the vision model becomes a sensor,
          not the whole product.
        </p>
        <p className="text-sm">
          Source and model card:{" "}
          <a
            href="https://github.com/imranghafoor05"
            className="text-foreground underline decoration-white/20 underline-offset-4 transition-colors hover:decoration-foreground"
            target="_blank"
            rel="noreferrer"
          >
            github.com/imranghafoor05
          </a>
          .
        </p>
      </Section>
    </>
  );
}

function ArticleNotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-md text-center">
        <div className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
          404
        </div>
        <h1 className="mt-4 font-display text-3xl tracking-tight text-foreground">
          Article not found
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          That deep-dive doesn't exist yet.
        </p>
        <Link
          to="/blog"
          className="mt-8 inline-block text-[11px] uppercase tracking-[0.28em] text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Engineering Notes
        </Link>
      </div>
    </main>
  );
}

function ArticleError({ reset }: ErrorComponentProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl tracking-tight text-foreground">
          This article failed to load
        </h1>
        <button
          onClick={reset}
          className="mt-6 text-[11px] uppercase tracking-[0.28em] text-muted-foreground transition-colors hover:text-foreground"
        >
          Retry
        </button>
      </div>
    </main>
  );
}