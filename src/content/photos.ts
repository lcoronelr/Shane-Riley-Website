/**
 * Shared photography: the portrait and the home-page hero. Edited in the CMS
 * ("About page" and "Home page"). Story photos are imported in stories.ts.
 * See docs/CONTENT_GUIDE.md for adding photos.
 */
import { photo } from "./cms-media";
import aboutData from "./data/about.json";
import homeData from "./data/home.json";
import type { Photo } from "./types";

export const portraitPhoto: Photo = photo(aboutData.portrait, "About page → Portrait");

/** The full-screen photo at the top of the home page. */
export const heroPhoto: Photo = photo(homeData.hero, "Home page → Main photo");
