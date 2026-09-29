import Image from "next/image";
import Link from "next/link";

import { Picture } from "@/components/media/Picture";
import { VideoPlayer } from "@/components/media/VideoPlayer";
import { LeadStoryCard, StoryMeta, SupportingStoryCard } from "@/components/stories/StoryCard";
import { ButtonLink, SectionLabel } from "@/components/ui/primitives";
import { mediaItems } from "@/content/multimedia";
import { heroPhoto, portraitPhoto } from "@/content/photos";
import { site } from "@/content/site";
import type { MediaItem, Photo } from "@/content/types";
import { getAllStories, getFeaturedStories } from "@/lib/content";

export default function HomePage() {
  const featured = getFeaturedStories();
  const [lead, ...supporting] = featured;
  const featuredSlugs = new Set(featured.map((s) => s.slug));
  const latest = getAllStories()
    .filter((s) => !featuredSlugs.has(s.slug))
    .slice(0, 3);
  const playable = mediaItems.find((item) => item.video);
  // One of each other kind, so the teaser shows the range of work.
  const moreMedia = (["Commentary", "Podcast", "Photo Essay"] as const)
    .map((kind) => mediaItems.find((item) => item.kind === kind && item.poster))
    .filter((item): item is MediaItem & { poster: Photo } => Boolean(item?.poster));

  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section
        data-surface="dark"
        aria-labelledby="hero-heading"
        className="grain relative -mt-header flex min-h-[100svh] items-end overflow-hidden bg-charcoal text-white"
      >
        <div className="hero-settle absolute inset-0">
          <Image
            src={heroPhoto.src}
            alt={heroPhoto.alt}
            fill
            preload
            fetchPriority="high"
            placeholder="blur"
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: heroPhoto.focus }}
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgb(23_25_28/0.6)_0%,rgb(23_25_28/0.4)_25%,rgb(23_25_28/0.78)_55%,rgb(23_25_28/0.96)_100%)]"
        />

        <div className="shell relative pt-40 pb-14 sm:pb-20 lg:pb-24">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-9">
              <p className="hero-rise kicker text-slate-light" style={{ ["--rise-delay" as string]: "80ms" }}>
                {site.name}
              </p>
              <h1
                id="hero-heading"
                className="mt-6 font-serif text-step-5 font-light tracking-[-0.03em]"
              >
                <span className="hero-rise block" style={{ ["--rise-delay" as string]: "160ms" }}>
                  Stories from
                </span>
                <span className="hero-rise block italic" style={{ ["--rise-delay" as string]: "260ms" }}>
                  the edge of the game.
                </span>
              </h1>
            </div>
            <div
              className="hero-rise lg:col-span-3 lg:pb-3"
              style={{ ["--rise-delay" as string]: "420ms" }}
            >
              <p className="max-w-md text-step-0 text-white/85">{site.tagline}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/stories">Explore stories</ButtonLink>
                <ButtonLink href="/multimedia" tone="ghost-dark" icon="none">
                  Watch
                </ButtonLink>
              </div>
            </div>
          </div>
          <div
            className="hero-rise mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-rule-dark pt-5 text-step--1 text-slate-light"
            style={{ ["--rise-delay" as string]: "560ms" }}
          >
            <p>{heroPhoto.caption}</p>
          </div>
        </div>
      </section>

      {/* ---------------- Featured spread ---------------- */}
      <section aria-labelledby="featured-heading" className="shell py-section">
        <div className="flex flex-wrap items-end justify-between gap-6" data-reveal>
          <div>
            <SectionLabel>Featured</SectionLabel>
            <h2 id="featured-heading" className="mt-5 font-serif text-step-3 tracking-[-0.02em]">
              Recent reporting
            </h2>
          </div>
          <Link href="/stories" className="link-draw text-step-0 font-medium">
            All stories
          </Link>
        </div>

        <div className="mt-12 grid gap-14 lg:mt-16 lg:grid-cols-12 lg:gap-x-12">
          {lead && (
            <div className="lg:col-span-7">
              <LeadStoryCard story={lead} />
            </div>
          )}
          <div className="lg:col-span-5 lg:border-l lg:border-rule lg:pl-12">
            <ul className="divide-y divide-rule">
              {supporting.slice(0, 3).map((story, i) => (
                <li key={story.slug} className="py-8 first:pt-0 last:pb-0">
                  <SupportingStoryCard story={story} index={i} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {latest.length > 0 && (
          <div className="mt-20 border-t border-rule pt-10 lg:mt-28">
            <h3 className="kicker text-slate-ink">More stories</h3>
            <ol className="mt-8 grid gap-10 md:grid-cols-3 md:gap-8">
              {latest.map((story, i) => (
                <li key={story.slug} data-reveal style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}>
                  <Link href={`/stories/${story.slug}`} className="group flex gap-5 rounded-sm">
                    <span className="font-serif text-step-3 leading-none text-slate tabular" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <StoryMeta story={story} />
                      <span className="mt-2 block font-serif text-step-1 leading-snug">
                        <span className="link-draw">{story.title}</span>
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        )}
      </section>

      {/* ---------------- Multimedia teaser (dark) ---------------- */}
      <section
        data-surface="dark"
        aria-labelledby="multimedia-heading"
        className="grain relative bg-charcoal py-section text-white"
      >
        <div className="shell relative">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end" data-reveal>
            <div className="lg:col-span-7">
              <SectionLabel tone="dark">
                Multimedia
              </SectionLabel>
              <h2 id="multimedia-heading" className="mt-5 font-serif text-step-4 font-light tracking-[-0.025em]">
                Watch, listen, <span className="italic">look closer.</span>
              </h2>
            </div>
            <p className="max-w-md text-white/75 lg:col-span-5">
              Video reporting, interviews, short documentaries and photo essays.
            </p>
          </div>

          <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-12">
            {playable?.video && (
              <div className="lg:col-span-8" data-reveal>
                <VideoPlayer video={playable.video} tone="dark" sizes="(min-width: 64rem) 60vw, 100vw" />
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <p className="kicker text-cobalt-light">{playable.kind}</p>
                  <h3 className="font-serif text-step-2">{playable.title}</h3>
                </div>
              </div>
            )}
            <ul className="divide-y divide-rule-dark border-y border-rule-dark lg:col-span-4 lg:self-start">
              {moreMedia.map((item, i) => (
                <li key={item.slug} data-reveal style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}>
                  <Link
                    href={`/multimedia#${item.slug}`}
                    className="group grid grid-cols-[6rem_minmax(0,1fr)] items-center gap-5 py-5"
                  >
                    <span className="relative block aspect-[4/3] overflow-hidden bg-white/5">
                      <Image
                        src={item.poster.src}
                        alt=""
                        fill
                        sizes="6rem"
                        placeholder="blur"
                        className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-out-expo)] group-hover:scale-105"
                      />
                    </span>
                    <span>
                      <span className="kicker block text-slate-light">{item.kind}</span>
                      <span className="mt-1.5 block font-serif text-step-1 leading-snug">
                        <span className="link-draw">{item.title}</span>
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-14">
            <ButtonLink href="/multimedia" tone="ghost-dark">
              All multimedia
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* ---------------- About teaser ---------------- */}
      <section aria-labelledby="about-heading" className="shell py-section">
        <div className="grid gap-12 md:grid-cols-12 md:items-center md:gap-10 lg:gap-16">
          <div className="md:col-span-5 lg:col-span-4" data-reveal>
            <Picture photo={portraitPhoto} sizes="(min-width: 64rem) 30vw, (min-width: 48rem) 40vw, 100vw" ratio="4 / 5" />
          </div>
          <div className="md:col-span-7 lg:col-span-7 lg:col-start-6" data-reveal style={{ ["--reveal-delay" as string]: "120ms" }}>
            <SectionLabel>About</SectionLabel>
            <h2 id="about-heading" className="mt-5 font-serif text-step-3 tracking-[-0.02em]">
              Reporting from the places where sport becomes a story.
            </h2>
            <p className="mt-6 max-w-[58ch] text-step-1 leading-relaxed text-charcoal/80">{site.shortBio}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <ButtonLink href="/about" tone="secondary">
                Full biography
              </ButtonLink>
              <Link href="/resume" className="link-draw font-medium">
                View résumé
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Contact CTA ---------------- */}
      <section aria-labelledby="contact-heading" className="border-t border-rule bg-surface">
        <div className="shell py-section">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end" data-reveal>
            <div className="lg:col-span-8">
              <SectionLabel>Contact</SectionLabel>
              <h2 id="contact-heading" className="mt-5 font-serif text-step-4 font-light tracking-[-0.025em]">
                Have a story that deserves <span className="italic">telling?</span>
              </h2>
            </div>
            <div className="lg:col-span-4">
              <p className="text-slate-ink">
                Commissions, collaborations and tips are welcome.
              </p>
              <a
                href={`mailto:${site.email}`}
                className="link-draw mt-4 inline-block font-serif text-step-2 break-all text-cobalt"
              >
                {site.email}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
