import type { SocialLink } from "./types";

/**
 * Site-wide identity and contact details. Everything the visitor reads about
 * Shane — name, tagline, biography, email, profile links — lives here.
 */
export const site = {
  name: "Shane Riley",
  /** One-sentence positioning statement: hero, footer and link previews. */
  tagline:
    "Reporting, writing, producing and broadcasting sports and local news across print, digital, television and radio.",
  /** Two or three sentences used on the home page. */
  shortBio:
    "Shane Riley is a journalism student at Washington and Lee University, pursuing a career in journalism with a passion for sports and for sharing everyone's story in an ever-changing media landscape. He produces the Rockbridge Report newscast, calls W&L games on the Washington and Lee Sports Network, and reports for The Ring-tum Phi and The News-Gazette.",
  /** City or region shown on the résumé. */
  location: "Chesapeake, Virginia",
  email: "shanemriley12@gmail.com",
  /** Professional profiles. Links with an empty url are hidden. */
  social: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/shane-riley-4ab82b338/" },
    { label: "YouTube", url: "https://www.youtube.com/@ShaneRileyPortfolio", handle: "@ShaneRileyPortfolio" },
    { label: "The Ring-tum Phi", url: "https://ringtumphi.net/staff_name/shane-riley/" },
    { label: "Rockbridge Report", url: "https://rockbridgereport.academic.wlu.edu/?s=shane+riley" },
  ] satisfies SocialLink[],
  locale: "en_US",
} as const;

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
