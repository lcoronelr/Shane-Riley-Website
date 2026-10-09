import { optionalText, text } from "./cms";
import data from "./data/site.json";
import type { SocialLink } from "./types";

/**
 * Site-wide identity and contact details: name, tagline, biography, email and
 * profile links. Edited in the CMS ("Profile & links"), saved in data/site.json.
 */
export const site = {
  name: text(data.name, "Profile & links → Name"),
  /** One-sentence positioning statement: hero, footer and link previews. */
  tagline: text(data.tagline, "Profile & links → Tagline"),
  /** Two or three sentences used on the home page. */
  shortBio: text(data.shortBio, "Profile & links → Short bio"),
  /** City or region shown on the résumé. */
  location: text(data.location, "Profile & links → Location"),
  email: text(data.email, "Profile & links → Email"),
  /** Professional profiles. Links with an empty url are hidden. */
  social: data.social.map((s, i): SocialLink => {
    const link: SocialLink = { label: text(s.label, `Profile & links → Profile ${i + 1} → Name`), url: s.url ?? "" };
    const handle = optionalText(s.handle);
    const note = optionalText(s.note);
    if (handle) link.handle = handle;
    if (note) link.note = note;
    return link;
  }),
  locale: "en_US",
};

/** Social links that have been filled in. */
export const activeSocialLinks: SocialLink[] = site.social.filter(
  (s: SocialLink) => s.url.trim() !== "",
);

/** Canonical origin. Set NEXT_PUBLIC_SITE_URL in production. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

export const navigation = [
  { href: "/", label: "Home" },
  { href: "/stories", label: "Stories" },
  { href: "/multimedia", label: "Multimedia" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Résumé" },
  { href: "/contact", label: "Contact" },
] as const;
