/**
 * Shared photography: the portrait and the home-page hero. Story photos are
 * imported in stories.ts; video posters in multimedia.ts.
 * See docs/CONTENT_GUIDE.md for adding photos.
 */
import type { Photo } from "./types";

import heroFrame from "@/assets/posters/1s5OinyKIM0.jpg";
import portrait from "@/assets/photos/shane-riley-portrait.jpg";

export const portraitPhoto: Photo = {
  src: portrait,
  alt: "Shane Riley wearing a broadcast headset with a boom microphone.",
  focus: "50% 40%",
};

/** A frame from Shane's Rockbridge Report coverage of W&L women's basketball. */
export const heroPhoto: Photo = {
  src: heroFrame,
  alt: "Washington and Lee women's basketball players huddle on the court in front of a packed crowd.",
  caption: "From Shane Riley's Rockbridge Report coverage of Washington and Lee women's basketball.",
  focus: "50% 45%",
};
