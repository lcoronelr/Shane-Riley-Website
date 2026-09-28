import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Caption, Picture } from "@/components/media/Picture";
import { ShareControls } from "@/components/stories/ShareControls";
import { StoryBody } from "@/components/stories/StoryBody";
import { StoryCard, StoryMeta } from "@/components/stories/StoryCard";
import { PlaceholderTag } from "@/components/ui/primitives";
import { site, siteUrl } from "@/content/site";
import { stories } from "@/content/stories";
import { formatDate, getRelatedStories, getStory, jsonLd, readingMinutes } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return stories.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({ params }: PageProps<"/stories/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) return {};
  const path = `/stories/${story.slug}`;
  return {
    title: story.title,
    description: story.excerpt,
    alternates: { canonical: path },
    // Example stories must never be indexed as real journalism.
    robots: story.placeholder ? { index: false, follow: true } : undefined,
    openGraph: {
      type: "article",
      url: path,
      title: story.title,
      description: story.dek,
      publishedTime: story.published,
      modifiedTime: story.updated,
      authors: [site.name],
      section: story.sport,
      images: [
        {
          url: story.hero.src.src,
          width: story.hero.src.width,
          height: story.hero.src.height,
          alt: story.hero.alt,
        },
      ],
    },
    twitter: { card: "summary_large_image", title: story.title, description: story.dek },
  };
}

export default async function StoryPage({ params }: PageProps<"/stories/[slug]">) {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) notFound();

  const related = getRelatedStories(story);
  const path = `/stories/${story.slug}`;
  const minutes = readingMinutes(story);

  // Structured data only for real, published stories with accurate metadata.
  const articleData = story.placeholder
    ? null
    : {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        headline: story.title,
        description: story.dek,
        datePublished: story.published,
        ...(story.updated ? { dateModified: story.updated } : {}),
        image: [`${siteUrl}${story.hero.src.src}`],
        author: [{ "@type": "Person", name: site.name, url: `${siteUrl}/about` }],
        mainEntityOfPage: `${siteUrl}${path}`,
        ...(story.publication
          ? { publisher: { "@type": "Organization", name: story.publication } }
          : {}),
      };

  return (
    <>
      <div
        aria-hidden="true"
        className="reading-progress fixed inset-x-0 top-0 z-[60] h-[3px] bg-cobalt"
        data-print="hide"
      />
      {articleData && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(articleData) }} />
      )}

      <article>
        <header className="shell pt-12 sm:pt-16 lg:pt-20">
          <nav aria-label="Breadcrumb" className="text-step--1 text-slate-ink" data-print="hide">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/stories" className="link-inline">
                  Stories
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="truncate">
                {story.title}
              </li>
            </ol>
          </nav>

          <div className="mx-auto mt-10 max-w-4xl text-center lg:mt-14">
            <div className="flex justify-center">
              <StoryMeta story={story} showDate={false} />
            </div>
            <h1 className="hero-rise mt-6 font-serif text-step-5 font-light tracking-[-0.03em]">
              {story.title}
            </h1>
            <p
              className="hero-rise mx-auto mt-6 max-w-[46ch] font-serif text-step-2 leading-snug text-charcoal/75 italic"
              style={{ ["--rise-delay" as string]: "120ms" }}
            >
              {story.dek}
            </p>
            {story.placeholder && (
              <div className="mt-6 flex justify-center">
                <PlaceholderTag>Example story · placeholder copy</PlaceholderTag>
              </div>
            )}
          </div>

          <div className="mx-auto mt-10 flex max-w-4xl flex-col items-center justify-between gap-5 border-y border-rule py-5 sm:flex-row">
            <div className="text-center text-step--1 sm:text-left">
              <p>
                By{" "}
                <Link href="/about" className="font-semibold">
                  {site.name}
                </Link>
                {story.publication && <span className="text-slate-ink"> for {story.publication}</span>}
              </p>
              <p className="mt-0.5 text-slate-ink">
                <time dateTime={story.published}>{formatDate(story.published)}</time>
                {story.updated && (
                  <>
                    {" · Updated "}
                    <time dateTime={story.updated}>{formatDate(story.updated)}</time>
                  </>
                )}
                {" · "}
                {minutes} min read
              </p>
            </div>
            <ShareControls title={story.title} path={path} />
          </div>
        </header>

        <figure className="shell mt-10 lg:mt-14">
          <Picture
            photo={story.hero}
            sizes="(min-width: 90rem) 83rem, 100vw"
            ratio="16 / 9"
            preload
          />
          <Caption photo={story.hero} />
        </figure>

        <div className="shell mt-14 lg:mt-20">
          <StoryBody blocks={story.body} />

          {story.originalUrl && (
            <p className="mx-auto mt-12 max-w-[40rem] text-step--1 text-slate-ink">
              Originally published{story.publication ? ` in ${story.publication}` : ""}.{" "}
              <a href={story.originalUrl} className="link-inline" rel="noopener noreferrer" target="_blank">
                Read the original
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </p>
          )}

          <footer className="mx-auto mt-16 flex max-w-[40rem] flex-col gap-4 border-t border-rule pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-step--1 text-slate-ink">Share this story</p>
            <ShareControls title={story.title} path={path} />
          </footer>
        </div>
      </article>

      {related.length > 0 && (
        <aside aria-labelledby="related-heading" className="mt-section border-t border-rule bg-surface">
          <div className="shell py-section">
            <h2 id="related-heading" className="font-serif text-step-3 tracking-[-0.02em]">
              More stories
            </h2>
            <ul className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((s, i) => (
                <li key={s.slug} data-reveal style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}>
                  <StoryCard story={s} />
                </li>
              ))}
            </ul>
          </div>
        </aside>
      )}
    </>
  );
}
