/**
 * Shared photography: the portrait and the home-page hero. Story photos are
 * imported in stories.ts; video posters in multimedia.ts.
 * See docs/CONTENT_GUIDE.md for adding photos.
 */
import type { Photo } from "./types";

import heroFrame from "@/assets/photos/hero-schleusner-bethel.jpg";
import portrait from "@/assets/photos/shane-riley-portrait.jpg";

export const portraitPhoto: Photo = {
  src: portrait,
  alt: "Shane Riley wearing a broadcast headset with a boom microphone.",
  focus: "50% 40%",
};

/** A frame from Shane's Rockbridge Report coverage of W&L women's basketball. */
export const heroPhoto: Photo = {
  src: heroFrame,
  alt: "Washington and Lee's Mary Schleusner stands on court against Bethel in front of a packed crowd at Holekamp Gym.",
  caption: "Rockbridge Report: Washington and Lee women's basketball vs. Bethel, NCAA Division III Tournament.",
  focus: "50% 40%",
};
