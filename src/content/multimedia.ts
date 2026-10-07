/**
 * Video packages, game commentary, podcasts and audio. Edited in the CMS
 * ("Multimedia"), saved in data/multimedia.json.
 *
 * Each item plays one of: a YouTube video or playlist (loaded only when the
 * visitor presses play), a self-hosted video file in public/video, or an audio
 * file in public/audio. Items appear in this order within each section of the
 * Multimedia page; the first video is featured at the top.
 */
import { fail, optionalText, text } from "./cms";
import { image } from "./cms-media";
import data from "./data/multimedia.json";
import type { MediaItem, MediaKind, Photo } from "./types";

const SECTIONS: MediaKind[] = ["Video", "Interview", "Documentary", "Commentary", "Podcast", "Audio"];

export const mediaItems: MediaItem[] = data.items.map((raw, i): MediaItem => {
  const title = text(raw.title, `Multimedia → Item ${i + 1} → Title`);
  const where = `Multimedia → "${title}"`;
  const kind = raw.section as MediaKind;
  if (!SECTIONS.includes(kind)) fail(`${where} → Section`, `"${raw.section}" isn't one of ${SECTIONS.join(", ")}.`);

  const item: MediaItem = {
    slug: text(raw.slug, `${where} → Short name`),
    kind,
    title,
    description: raw.description ?? "",
  };

  const poster: Photo | undefined = optionalText(raw.poster)
    ? { src: image(raw.poster, `${where} → Thumbnail`), alt: text(raw.posterAlt, `${where} → Thumbnail description`) }
    : undefined;
  if (poster) item.poster = poster;
  const duration = optionalText(raw.duration);
  const needPoster = () => poster ?? fail(`${where} → Thumbnail`, "videos need a thumbnail image.");

  switch (raw.source) {
    case "youtube":
      item.video = {
        kind: "embed",
        provider: "youtube",
        id: text(raw.youtubeId, `${where} → YouTube video ID`),
        title,
        poster: needPoster(),
        duration,
      };
      break;
    case "youtube-playlist": {
      const id = text(raw.playlistId, `${where} → YouTube playlist ID`);
      item.video = {
        kind: "embed",
        provider: "youtube-playlist",
        id,
        title: kind === "Commentary" ? `${title} commentary` : title,
        poster: needPoster(),
      };
      item.link = { href: `https://www.youtube.com/playlist?list=${id}`, label: "Full playlist on YouTube" };
      break;
    }
    case "video-file":
      item.video = {
        kind: "file",
        src: text(raw.videoFile, `${where} → Video file`),
        title,
        poster: needPoster(),
        duration,
      };
      break;
    case "audio-file":
      item.audio = { src: text(raw.audioFile, `${where} → Audio file`), title, duration };
      break;
    default:
      fail(`${where} → Plays`, `"${raw.source}" isn't a known source.`);
  }
  return item;
});

/** Shane's YouTube channel, linked from the Multimedia page. */
export const youtubeChannel = "https://www.youtube.com/@ShaneRileyPortfolio";
