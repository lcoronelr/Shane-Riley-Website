/**
 * Photo helpers for CMS content. Kept apart from ./cms so modules used in the
 * browser (like the site header) don't pull in the map of every photo.
 */
import type { StaticImageData } from "next/image";

import { assets } from "@/lib/assets.generated";

import { fail, optionalText, text } from "./cms";
import type { Photo } from "./types";

/** A photo uploaded through the CMS, e.g. "photos/shane-riley-portrait.jpg". */
export function image(value: unknown, where: string): StaticImageData {
  const key = text(value, where).replace(/^\/+/, "");
  const found = assets[key];
  if (!found) fail(where, `the image "${key}" wasn't found. Upload it again in the CMS.`);
  return found;
}

/** A photo with its alt text and optional caption/focus fields. */
export function photo(
  value: { image?: unknown; alt?: unknown; caption?: unknown; credit?: unknown; focus?: unknown },
  where: string,
): Photo {
  const result: Photo = {
    src: image(value.image, `${where} → image`),
    alt: text(value.alt, `${where} → image description (alt text)`),
  };
  const caption = optionalText(value.caption);
  const credit = optionalText(value.credit);
  const focus = optionalText(value.focus);
  if (caption) result.caption = caption;
  if (credit) result.credit = credit;
  if (focus) result.focus = focus;
  return result;
}
