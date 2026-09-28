import type { StaticImageData } from "next/image";

/** A photograph with the information needed to publish it responsibly. */
export interface Photo {
  src: StaticImageData;
  /** Describes what is in the image for screen-reader users. Required. */
  alt: string;
  /** Visible caption. Optional. */
  caption?: string;
  /** Photographer / rights holder shown next to the caption. */
  credit?: string;
  /** CSS object-position used when the photo is cropped, e.g. "50% 30%". */
  focus?: string;
  /** True for stock/placeholder imagery that should be replaced. */
  placeholder?: boolean;
}

export type VideoProvider = "youtube" | "vimeo";

/**
 * A video. Either an external embed (loaded only after the visitor clicks
 * the poster) or a self-hosted file in /public played with native controls.
 */
export type Video =
  | {
      kind: "embed";
      provider: VideoProvider;
      /** The provider's video ID, e.g. the `v=` value of a YouTube URL. */
      id: string;
      title: string;
      poster: Photo;
      duration?: string;
      /** Plain-text transcript shown in an expandable panel. */
      transcript?: string;
      /** Whether the hosted video has captions switched on at the provider. */
      captions?: boolean;
      /** Short note shown under the player, e.g. licensing for demo media. */
      note?: string;
    }
  | {
      kind: "file";
      /** Path under /public, e.g. "/video/clip.mp4". */
      src: string;
      /** Optional WebVTT captions under /public, e.g. "/video/clip.en.vtt". */
      captionsSrc?: string;
      title: string;
      poster: Photo;
      duration?: string;
      transcript?: string;
      note?: string;
    };

export type StoryBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "image"; photo: Photo; size?: "inline" | "wide" }
  | { type: "gallery"; title?: string; photos: Photo[] }
  | { type: "video"; video: Video }
  | { type: "divider" };

export const SPORTS = [
  "Boxing",
  "Soccer",
  "Baseball",
  "Basketball",
  "Tennis",
  "Surfing",
  "Hockey",
  "Running",
] as const;
export type Sport = (typeof SPORTS)[number];

export const STORY_TYPES = [
  "Feature",
  "Profile",
  "Essay",
  "Analysis",
  "Photo Essay",
] as const;
export type StoryType = (typeof STORY_TYPES)[number];

export interface Story {
  /** Lower-case, hyphenated, human-readable URL segment. */
  slug: string;
  title: string;
  /** One- or two-sentence standfirst shown under the headline. */
  dek: string;
  /** Short summary used on cards and in search results. */
  excerpt: string;
  sport: Sport;
  type: StoryType;
  /** ISO date, e.g. "2026-03-14". */
  published: string;
  updated?: string;
  /** Publication the story first appeared in, if any. */
  publication?: string;
  /** Link to the original if published elsewhere. */
  originalUrl?: string;
  hero: Photo;
  body: StoryBlock[];
  /** Show on the home page featured spread. First featured story leads. */
  featured?: boolean;
  /**
   * Marks example content. Example stories are labelled on the page, kept out
   * of the sitemap, marked noindex and never receive article structured data.
   */
  placeholder?: boolean;
}

export type MediaKind = "Video" | "Interview" | "Documentary" | "Photo Essay";

export interface MediaItem {
  slug: string;
  kind: MediaKind;
  title: string;
  description: string;
  published: string;
  /** Poster image shown in listings. */
  poster: Photo;
  /** Video/interview/documentary playback. Omit when nothing is attached. */
  video?: Video;
  /** Photo essay frames, opened in the lightbox. */
  photos?: Photo[];
  placeholder?: boolean;
}

export interface SocialLink {
  label: string;
  url: string;
  handle?: string;
}

export interface TimelineEntry {
  period: string;
  title: string;
  organization: string;
  description?: string;
}
