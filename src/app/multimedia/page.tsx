import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";

import { AudioPlayer } from "@/components/media/AudioPlayer";
import { VideoPlayer } from "@/components/media/VideoPlayer";
import { ButtonLink, SectionLabel } from "@/components/ui/primitives";
import { mediaItems, youtubeChannel } from "@/content/multimedia";
import { site } from "@/content/site";
import type { MediaItem, MediaKind } from "@/content/types";

export const metadata: Metadata = {
  title: "Multimedia",
  description: `Video packages, game commentary and podcasts by ${site.name}.`,
  alternates: { canonical: "/multimedia" },
  openGraph: { url: "/multimedia", title: `Multimedia — ${site.name}` },
};

const SECTIONS: { id: string; title: string; intro: string; kinds: MediaKind[] }[] = [
  {
    id: "video",
    title: "Video packages",
    intro: "Packages, interviews and short documentaries produced for the Rockbridge Report and at Washington and Lee.",
    kinds: ["Video", "Interview", "Documentary"],
  },
  {
    id: "commentary",
    title: "Game commentary",
    intro:
      "Play-by-play, color and sideline commentary from Washington and Lee broadcasts on the Washington and Lee Sports Network. Each player runs through the full playlist; commentary start times are in each video's description on YouTube.",
    kinds: ["Commentary"],
  },
  {
    id: "audio",
    title: "Podcasts & audio",
    intro: "Podcasts, interviews and audio productions.",
    kinds: ["Podcast", "Audio"],
  },
];

export default function MultimediaPage() {
  const featured = mediaItems.find((i) => i.video && i.kind === "Video");

  return (
    <div data-surface="dark" className="grain relative -mt-header bg-charcoal text-white">
      <div className="shell relative pt-[calc(var(--spacing-header)+3rem)] pb-section sm:pt-[calc(var(--spacing-header)+4rem)]">
        <header className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <SectionLabel tone="dark">Watch · Listen</SectionLabel>
            <h1 className="hero-rise mt-5 font-serif text-step-5 font-light tracking-[-0.03em]">Multimedia</h1>
          </div>
          <div className="lg:col-span-4">
            <p className="text-step-1 leading-relaxed text-white/80">
              Video packages, game commentary, podcasts and audio.
            </p>
            <ButtonLink
              href={youtubeChannel}
              tone="ghost-dark"
              icon="external"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6"
            >
              YouTube channel<span className="sr-only"> (opens in a new tab)</span>
            </ButtonLink>
          </div>
        </header>

        {featured && (
          <section aria-labelledby={`${featured.slug}-title`} id={featured.slug} className="mt-14 lg:mt-20">
            <MediaEntry item={featured} large priority headingLevel="h2" />
          </section>
        )}

        {SECTIONS.map((section) => {
          const items = mediaItems.filter((i) => section.kinds.includes(i.kind) && i !== featured);
          if (items.length === 0) return null;
          return (
            <section key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`} className="mt-section">
              <div className="grid gap-4 border-b border-rule-dark pb-6 lg:grid-cols-12 lg:items-end">
                <h2 id={`${section.id}-heading`} className="font-serif text-step-3 tracking-[-0.02em] lg:col-span-6">
                  {section.title}
                </h2>
                <p className="text-white/70 lg:col-span-6">{section.intro}</p>
              </div>
              <ul className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
                {items.map((item, i) => (
                  <li
                    key={item.slug}
                    id={item.slug}
                    data-reveal
                    style={{ ["--reveal-delay" as string]: `${(i % 3) * 90}ms` }}
                  >
                    <MediaEntry item={item} />
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}

function MediaEntry({
  item,
  large = false,
  priority = false,
  headingLevel: Heading = "h3",
}: {
  item: MediaItem;
  large?: boolean;
  priority?: boolean;
  headingLevel?: "h2" | "h3";
}) {
  const sizes = large ? "(min-width: 90rem) 83rem, 100vw" : "(min-width: 64rem) 30vw, (min-width: 48rem) 45vw, 100vw";
  return (
    <article aria-labelledby={`${item.slug}-title`}>
      {item.video ? (
        <VideoPlayer video={item.video} tone="dark" sizes={sizes} priority={priority} />
      ) : item.audio ? (
        <AudioPlayer audio={item.audio} tone="dark" showTitle={false} />
      ) : null}
      <div className={`mt-5 ${large ? "grid gap-4 lg:grid-cols-12" : ""}`}>
        <div className={large ? "lg:col-span-7" : ""}>
          <p className="kicker text-cobalt-light">
            {item.kind}
            {item.audio?.duration && <span className="tabular ml-2 text-slate-light">{item.audio.duration}</span>}
          </p>
          <Heading
            id={`${item.slug}-title`}
            className={`mt-3 font-serif tracking-[-0.015em] ${large ? "text-step-3 font-light" : "text-step-1 leading-snug"}`}
          >
            {item.title}
          </Heading>
        </div>
        {item.description && (
          <p className={`text-white/75 ${large ? "lg:col-span-5 lg:self-end" : "mt-2 text-step--1 leading-relaxed"}`}>
            {item.description}
          </p>
        )}
        {item.link && (
          <a
            href={item.link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-3 inline-flex min-h-11 items-center gap-2 text-step--1 font-medium text-white"
          >
            <span className="link-draw">{item.link.label}</span>
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={1.75}
            />
            <span className="sr-only">: {item.title} (opens in a new tab)</span>
          </a>
        )}
      </div>
    </article>
  );
}
