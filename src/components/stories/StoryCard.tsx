import Link from "next/link";

import { Picture } from "@/components/media/Picture";
import { PlaceholderTag } from "@/components/ui/primitives";
import type { Story } from "@/content/types";
import { formatDate } from "@/lib/content";

export function StoryMeta({
  story,
  tone = "light",
  showDate = true,
}: {
  story: Pick<Story, "sport" | "type" | "published">;
  tone?: "light" | "dark";
  showDate?: boolean;
}) {
  return (
    <p className={`kicker flex flex-wrap items-center gap-x-3 gap-y-1 ${tone === "dark" ? "text-slate-light" : "text-slate-ink"}`}>
      <span className={tone === "dark" ? "text-cobalt-light" : "text-cobalt"}>{story.sport}</span>
      <span aria-hidden="true" className="h-3 w-px bg-current opacity-40" />
      <span>{story.type}</span>
      {showDate && (
        <>
          <span aria-hidden="true" className="h-3 w-px bg-current opacity-40" />
          <time dateTime={story.published} className="tabular">
            {formatDate(story.published)}
          </time>
        </>
      )}
    </p>
  );
}

/**
 * Dominant story in the magazine spread. The image is revealed by a curtain
 * lifting as it scrolls into view (the site's signature interaction).
 */
export function LeadStoryCard({ story }: { story: Story }) {
  return (
    <article className="group relative">
      <Link href={`/stories/${story.slug}`} className="block rounded-sm">
        <div data-reveal="mask" className="relative">
          <Picture
            photo={story.hero}
            sizes="(min-width: 64rem) 58vw, 100vw"
            ratio="4 / 3"
            className="media-zoom"
            imgClassName="mask-photo"
          />
          <span aria-hidden="true" className="mask-curtain absolute inset-0 bg-ivory" />
        </div>
        <div className="mt-6 md:mt-8">
          <StoryMeta story={story} />
          <h3 className="mt-4 font-serif text-step-4 font-normal tracking-[-0.02em]">
            <span className="link-draw">{story.title}</span>
          </h3>
          <p className="mt-4 max-w-[38ch] font-serif text-step-1 text-charcoal/80 italic">{story.dek}</p>
        </div>
      </Link>
      {story.placeholder && <PlaceholderTag className="mt-5">Example story</PlaceholderTag>}
    </article>
  );
}

/** Supporting story beside the lead: compact image, strong headline. */
export function SupportingStoryCard({ story, index }: { story: Story; index: number }) {
  return (
    <article className="group" data-reveal style={{ ["--reveal-delay" as string]: `${index * 90}ms` }}>
      <Link href={`/stories/${story.slug}`} className="grid grid-cols-[minmax(0,1fr)_7.5rem] gap-5 rounded-sm sm:grid-cols-[minmax(0,1fr)_10rem]">
        <div>
          <StoryMeta story={story} showDate={false} />
          <h3 className="mt-3 font-serif text-step-2 tracking-[-0.01em]">
            <span className="link-draw">{story.title}</span>
          </h3>
          <p className="mt-2 line-clamp-3 text-step--1 text-slate-ink">{story.excerpt}</p>
        </div>
        <Picture photo={story.hero} sizes="10rem" ratio="1 / 1" className="media-zoom self-start" />
      </Link>
    </article>
  );
}

/** Standard card used in listings and related stories. */
export function StoryCard({
  story,
  sizes = "(min-width: 64rem) 30vw, (min-width: 40rem) 45vw, 100vw",
  ratio = "3 / 2",
  headingLevel = "h3",
  aspectClassName,
}: {
  story: Story;
  sizes?: string;
  ratio?: string;
  headingLevel?: "h2" | "h3";
  aspectClassName?: string;
}) {
  const Heading = headingLevel;
  return (
    <article className="group">
      <Link href={`/stories/${story.slug}`} className="block rounded-sm">
        <Picture
          photo={story.hero}
          sizes={sizes}
          ratio={ratio}
          aspectClassName={aspectClassName}
          className="media-zoom"
        />
        <div className="mt-5">
          <StoryMeta story={story} />
          <Heading className="mt-3 font-serif text-step-2 tracking-[-0.01em]">
            <span className="link-draw">{story.title}</span>
          </Heading>
          <p className="mt-2 text-step--1 leading-relaxed text-slate-ink">{story.excerpt}</p>
        </div>
      </Link>
    </article>
  );
}
