import type { Metadata } from "next";

import { StoryCard } from "@/components/stories/StoryCard";
import { SectionLabel } from "@/components/ui/primitives";
import { site } from "@/content/site";
import { getAllStories } from "@/lib/content";

export const metadata: Metadata = {
  title: "Stories",
  description: `Features, profiles, news and columns by ${site.name}.`,
  alternates: { canonical: "/stories" },
  openGraph: { url: "/stories", title: `Stories — ${site.name}` },
};

export default function StoriesPage() {
  const stories = getAllStories();

  return (
    <div className="shell pt-12 pb-section sm:pt-16 lg:pt-20">
      <header className="grid gap-8 border-b border-rule pb-12 lg:grid-cols-12 lg:items-end lg:pb-16">
        <div className="lg:col-span-8">
          <SectionLabel>Archive</SectionLabel>
          <h1 className="hero-rise mt-5 font-serif text-step-5 font-light tracking-[-0.03em]">Stories</h1>
        </div>
        <div className="lg:col-span-4">
          <p className="text-step-1 leading-relaxed text-charcoal/80">
            Features, profiles, news and columns, from college athletics to Olympians.
          </p>
        </div>
      </header>

      <ul className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
        {stories.map((story, i) => (
          <li
            key={story.slug}
            data-reveal={i > 2 ? "" : undefined}
            style={i > 2 ? { ["--reveal-delay" as string]: `${(i % 3) * 90}ms` } : undefined}
            className={i === 0 ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : ""}
          >
            <StoryCard
              story={story}
              headingLevel="h2"
              ratio="3 / 2"
              aspectClassName={i === 0 ? "aspect-[16/10] lg:aspect-[20/19]" : undefined}
              sizes={
                i === 0
                  ? "(min-width: 64rem) 62vw, (min-width: 40rem) 90vw, 100vw"
                  : "(min-width: 64rem) 30vw, (min-width: 40rem) 45vw, 100vw"
              }
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
