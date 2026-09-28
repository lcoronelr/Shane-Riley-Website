import { stories } from "@/content/stories";
import type { Story, StoryBlock } from "@/content/types";

const byNewest = (a: Story, b: Story) => b.published.localeCompare(a.published);

export function getAllStories(): Story[] {
  return [...stories].sort(byNewest);
}

export function getStory(slug: string): Story | undefined {
  return stories.find((s) => s.slug === slug);
}

export function getFeaturedStories(): Story[] {
  const featured = stories.filter((s) => s.featured);
  return featured.length > 0 ? featured : getAllStories().slice(0, 4);
}

/** Same-sport stories first, then the most recent others. */
export function getRelatedStories(story: Story, count = 3): Story[] {
  const others = getAllStories().filter((s) => s.slug !== story.slug);
  const sameSport = others.filter((s) => s.sport === story.sport);
  const rest = others.filter((s) => s.sport !== story.sport);
  return [...sameSport, ...rest].slice(0, count);
}

function blockText(block: StoryBlock): string {
  switch (block.type) {
    case "paragraph":
    case "heading":
    case "quote":
      return block.text;
    default:
      return "";
  }
}

export function readingMinutes(story: Story): number {
  const words = story.body
    .map(blockText)
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 230));
}

const shortDateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  timeZone: "UTC",
});

export function formatShortDate(iso: string): string {
  return shortDateFormatter.format(new Date(`${iso}T00:00:00Z`));
}

/** Serialises JSON-LD safely for inline <script> output. */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
