/**
 * Video, interviews, documentary work and photo essays.
 *
 * ALL ITEMS ARE EXAMPLES. Only the first has a playable video, and it is a
 * clearly labelled open-licence demo. Items without `video` show their poster
 * with a "no video attached" label instead of a play button, so the page never
 * offers a control that does nothing.
 */
import { photos } from "./photos";
import { demoVideo } from "./stories";
import type { MediaItem } from "./types";

export const mediaItems: MediaItem[] = [
  {
    slug: "five-am-gym",
    kind: "Video",
    title: "Five A.M. at the Gym",
    description:
      "Example video report. The player uses an open-licence demo film to show how click-to-load embeds work; replace it with your own reporting.",
    published: "2026-08-30",
    poster: photos.boxingGym,
    video: demoVideo,
    placeholder: true,
  },
  {
    slug: "groundskeeper-interview",
    kind: "Interview",
    title: "Conversation: The Night Groundskeeper",
    description:
      "Example interview slot. Attach a YouTube or Vimeo ID and a transcript in src/content/multimedia.ts.",
    published: "2026-07-02",
    poster: photos.studioMic,
    placeholder: true,
  },
  {
    slug: "halfpipe-after-dark",
    kind: "Documentary",
    title: "Halfpipe After Dark",
    description:
      "Example short-documentary slot. Attach your film and a transcript to make it playable.",
    published: "2026-05-11",
    poster: photos.halfpipeLights,
    placeholder: true,
  },
  {
    slug: "matchday-broadcast",
    kind: "Video",
    title: "Matchday, Behind the Camera",
    description: "Example video slot for broadcast or field-production work.",
    published: "2026-04-03",
    poster: photos.broadcastCamera,
    placeholder: true,
  },
  {
    slug: "empty-houses",
    kind: "Photo Essay",
    title: "Empty Houses",
    description:
      "Example photo essay: stadiums and arenas between events. Placeholder photography.",
    published: "2026-06-06",
    poster: photos.emptySeats,
    placeholder: true,
    photos: [
      { ...photos.emptySeats, caption: "Upper tier, midweek. (Placeholder photograph.)" },
      { ...photos.darkSeats, caption: "House lights down. (Placeholder photograph.)" },
      { ...photos.emptyStadium, caption: "The morning after a final. (Placeholder photograph.)" },
      { ...photos.stadiumAerial, caption: "Full, for comparison. (Placeholder photograph.)" },
      { ...photos.crowd, caption: "Where the noise comes from. (Placeholder photograph.)" },
    ],
  },
  {
    slug: "lines",
    kind: "Photo Essay",
    title: "Lines",
    description:
      "Example photo essay: the painted geometry of play. Placeholder photography.",
    published: "2026-03-28",
    poster: photos.tennisLines,
    placeholder: true,
    photos: [
      { ...photos.tennisLines, caption: "Hard court, overhead. (Placeholder photograph.)" },
      { ...photos.cornerLine, caption: "The corner arc. (Placeholder photograph.)" },
      { ...photos.turfLine, caption: "Two sports, one field. (Placeholder photograph.)" },
      { ...photos.courtAerial, caption: "The noon game. (Placeholder photograph.)" },
    ],
  },
  {
    slug: "night-games",
    kind: "Photo Essay",
    title: "Night Games",
    description:
      "Example photo essay: sport after dark. Placeholder photography.",
    published: "2026-02-19",
    poster: photos.ballfieldStars,
    placeholder: true,
    photos: [
      { ...photos.ballfieldStars, caption: "Last at-bat. (Placeholder photograph.)" },
      { ...photos.nightField, caption: "One floodlight. (Placeholder photograph.)" },
      { ...photos.goalNetLights, caption: "Through the net. (Placeholder photograph.)" },
      { ...photos.ballparkNight, caption: "Sold out. (Placeholder photograph.)" },
      { ...photos.baseballDark, caption: "The ball. (Placeholder photograph.)" },
    ],
  },
];
