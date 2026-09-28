import type { Metadata } from "next";

import { StoryFilter } from "@/components/stories/StoryFilter";
import { PlaceholderTag, SectionLabel } from "@/components/ui/primitives";
import { site } from "@/content/site";
import { getAllStories } from "@/lib/content";

export const metadata: Metadata = {
  title: "Stories",
  description: `Features, profiles, essays and analysis by ${site.name}.`,
  alternates: { canonical: "/stories" },
  openGraph: { url: "/stories", title: `Stories — ${site.name}` },
};

export default function StoriesPage() {
  const stories = getAllStories();
  const hasExamples = stories.some((s) => s.placeholder);

  return (
    <div className="shell pt-12 pb-section sm:pt-16 lg:pt-20">
      <header className="grid gap-8 pb-12 lg:grid-cols-12 lg:items-end lg:pb-16">
        <div className="lg:col-span-8">
          <SectionLabel>Archive</SectionLabel>
          <h1 className="hero-rise mt-5 font-serif text-step-5 font-light tracking-[-0.03em]">Stories</h1>
        </div>
        <div className="lg:col-span-4">
          <p className="text-step-1 leading-relaxed text-charcoal/80">
            Long-form features, profiles, essays and analysis. Filter by sport or by the kind of story.
          </p>
          {hasExamples && (
            <PlaceholderTag className="mt-4">Example stories — replace before launch</PlaceholderTag>
          )}
        </div>
      </header>
      <StoryFilter stories={stories} />
    </div>
  );
}
