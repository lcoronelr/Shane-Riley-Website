import type { SocialLink } from "./types";

/**
 * Site-wide identity and contact details. Everything the visitor reads about
 * the journalist — name, tagline, biography, email, social links — lives here.
 *
 * Values marked PLACEHOLDER must be replaced before launch.
 */
export const site = {
  name: "Shane Riley",
  /** PLACEHOLDER: one-sentence positioning statement. */
  tagline: "Long-form sports journalism about the people, places and pressure behind the game.",
  /** PLACEHOLDER: two or three sentences used on the home page. */
  shortBio:
    "Shane Riley writes features, profiles and video stories about sport. This short biography is placeholder copy — replace it with your own introduction in src/content/site.ts.",
  /** PLACEHOLDER: city or region you report from, or leave empty. */
  location: "",
  /**
   * PLACEHOLDER: public contact address. example.com is a reserved domain, so
   * this link opens a mail client but will not reach anyone until replaced.
   */
  email: "hello@example.com",
  emailIsPlaceholder: true,
  /**
   * Professional profiles. Links with an empty url are hidden, so the site
   * never shows a dead link. Fill in the ones you use.
   */
  social: [
    { label: "X", url: "", handle: "" },
    { label: "Instagram", url: "", handle: "" },
    { label: "LinkedIn", url: "", handle: "" },
    { label: "YouTube", url: "", handle: "" },
    { label: "Muck Rack", url: "", handle: "" },
  ] satisfies SocialLink[],
  /**
   * When true, small "Placeholder" labels mark example content across the
   * site. Switch off only after all example content has been replaced.
   */
  showPlaceholderLabels: true,
  locale: "en_US",
} as const;

/** Social links that have been filled in. */
export const activeSocialLinks: SocialLink[] = site.social.filter(
  (s) => s.url.trim() !== "",
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
