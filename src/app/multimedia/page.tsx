import type { Metadata } from "next";
import Image from "next/image";

import { PhotoGallery } from "@/components/media/PhotoGallery";
import { VideoPlayer } from "@/components/media/VideoPlayer";
import { PlaceholderTag, SectionLabel } from "@/components/ui/primitives";
import { mediaItems } from "@/content/multimedia";
import { site } from "@/content/site";
import type { MediaItem } from "@/content/types";
import { formatShortDate } from "@/lib/content";

export const metadata: Metadata = {
  title: "Multimedia",
  description: `Video reporting, interviews, documentary work and photo essays by ${site.name}.`,
  alternates: { canonical: "/multimedia" },
  openGraph: { url: "/multimedia", title: `Multimedia — ${site.name}` },
};

export default function MultimediaPage() {
  const [featured, ...rest] = mediaItems.filter((i) => i.kind !== "Photo Essay");
  const essays = mediaItems.filter((i) => i.kind === "Photo Essay");

  return (
    <div data-surface="dark" className="grain relative -mt-header bg-charcoal text-white">
      <div className="shell relative pt-[calc(var(--spacing-header)+3rem)] pb-section sm:pt-[calc(var(--spacing-header)+4rem)]">
        <header className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <SectionLabel tone="dark">Watch · Listen · Look</SectionLabel>
            <h1 className="hero-rise mt-5 font-serif text-step-5 font-light tracking-[-0.03em]">
              Multimedia
            </h1>
          </div>
          <div className="lg:col-span-4">
            <p className="text-step-1 leading-relaxed text-white/80">
              Video reporting, interviews, short documentaries and photo essays. Videos load only when you press play.
            </p>
            <PlaceholderTag tone="dark" className="mt-4">
              Example media — replace before launch
            </PlaceholderTag>
          </div>
        </header>

        {featured && (
          <section aria-labelledby={`${featured.slug}-title`} id={featured.slug} className="mt-14 lg:mt-20">
            <MediaEntry item={featured} large priority headingLevel="h2" />
          </section>
        )}

        <section aria-labelledby="video-heading" className="mt-section">
          <div className="border-b border-rule-dark pb-6">
            <h2 id="video-heading" className="font-serif text-step-3 tracking-[-0.02em]">
              Video, interviews &amp; documentary
            </h2>
          </div>
          <ul className="mt-12 grid gap-x-10 gap-y-16 md:grid-cols-2">
            {rest.map((item, i) => (
              <li
                key={item.slug}
                id={item.slug}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${(i % 2) * 100}ms` }}
                className={i === 0 ? "md:col-span-2" : ""}
              >
                <MediaEntry item={item} large={i === 0} />
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="essays-heading" className="mt-section">
          <div className="border-b border-rule-dark pb-6">
            <h2 id="essays-heading" className="font-serif text-step-3 tracking-[-0.02em]">
              Photo essays
            </h2>
          </div>
          <div className="mt-12 space-y-20">
            {essays.map((essay) => (
              <article key={essay.slug} id={essay.slug} aria-labelledby={`${essay.slug}-title`} data-reveal>
                <div className="mb-6 grid gap-4 lg:grid-cols-12 lg:items-end">
                  <div className="lg:col-span-7">
                    <p className="kicker text-slate-light">
                      Photo essay · <time dateTime={essay.published}>{formatShortDate(essay.published)}</time>
                    </p>
                    <h3 id={`${essay.slug}-title`} className="mt-3 font-serif text-step-3 font-light tracking-[-0.02em]">
                      {essay.title}
                    </h3>
                  </div>
                  <p className="text-white/75 lg:col-span-5">{essay.description}</p>
                </div>
                {essay.photos && (
                  <PhotoGallery photos={essay.photos} title={essay.title} tone="dark" />
                )}
              </article>
            ))}
          </div>
        </section>
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
  const sizes = large ? "(min-width: 90rem) 83rem, 100vw" : "(min-width: 48rem) 45vw, 100vw";
  return (
    <article aria-labelledby={`${item.slug}-title`}>
      {item.video ? (
        <VideoPlayer video={item.video} tone="dark" sizes={sizes} priority={priority} />
      ) : (
        <figure>
          <div className="relative aspect-video overflow-hidden bg-white/5">
            <Image
              src={item.poster.src}
              alt={item.poster.alt}
              fill
              sizes={sizes}
              placeholder="blur"
              className="object-cover opacity-70"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 sm:p-6">
              <PlaceholderTag tone="dark">No video attached yet</PlaceholderTag>
            </div>
          </div>
          <figcaption className="mt-3 text-step--1 text-slate-light">
            {item.poster.credit}
          </figcaption>
        </figure>
      )}
      <div className={`mt-6 ${large ? "grid gap-4 lg:grid-cols-12" : ""}`}>
        <div className={large ? "lg:col-span-7" : ""}>
          <p className="kicker text-cobalt-light">
            {item.kind} <span className="text-slate-light">· <time dateTime={item.published}>{formatShortDate(item.published)}</time></span>
          </p>
          <Heading
            id={`${item.slug}-title`}
            className={`mt-3 font-serif tracking-[-0.015em] ${large ? "text-step-3 font-light" : "text-step-2"}`}
          >
            {item.title}
          </Heading>
        </div>
        <p className={`text-white/75 ${large ? "lg:col-span-5 lg:self-end" : "mt-2"}`}>{item.description}</p>
      </div>
    </article>
  );
}
