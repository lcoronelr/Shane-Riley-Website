# Content guide

Everything a visitor reads lives in `src/content/`. Edit those files, then run `npm run dev` to preview, or `npm run typecheck` to validate. A mistake such as a missing alt text or an unknown sport stops the build with a clear error, so broken content can't ship.

## Before launch: replace every placeholder

| What | Where | Currently |
| --- | --- | --- |
| Name, role, tagline, short bio | `src/content/site.ts` | Name taken from the project folder; tagline and bio are placeholders |
| Email address | `site.ts`, `email` (then set `emailIsPlaceholder: false`) | `hello@example.com`, a reserved domain that reaches no one |
| Social profiles | `site.ts`, `social` | Empty. Links with an empty `url` are hidden, never shown as dead links |
| Biography, interests | `src/content/resume.ts`, `about` | `[Placeholder]` text |
| Résumé | `resume.ts`, `resume` | Bracketed fields such as `[Job title]` |
| Stories | `src/content/stories.ts` | 9 invented example stories marked `placeholder: true` |
| Multimedia | `src/content/multimedia.ts` | Examples; one demo video (Big Buck Bunny, CC BY 3.0) |
| Photography | `src/content/photos.ts` | CC0 StockSnap stock photos at 960px |
| Portrait | `PortraitPlaceholder` on Home and About | A monogram block, deliberately not a photo of a real person |

When everything is replaced, set `showPlaceholderLabels: false` in `site.ts` to remove the remaining "Placeholder" labels.

**Never** publish invented career history, awards or reporting. The résumé and biography fields are placeholders precisely so that only real, verifiable details replace them.

## Add photographs

1. Put the file in `src/assets/photos/`. Use JPEG or PNG at **at least 2400px on the long edge**. Next.js resizes, compresses and converts to AVIF/WebP automatically; don't pre-shrink it.
2. Register it in `src/content/photos.ts`:

   ```ts
   import ringWalk from "@/assets/photos/ring-walk.jpg";

   export const photos = {
     // ...
     ringWalk: {
       src: ringWalk,
       alt: "A boxer walks to the ring through a tunnel of fans holding up phones.",
       caption: "Walkout before the main event, Riverside Arena, March 2026.",
       credit: "Shane Riley",
       focus: "50% 35%", // optional: what stays in frame when cropped
     },
   };
   ```

3. Use `photos.ringWalk` anywhere a `Photo` is expected (story heroes, body images, galleries, posters).

**Alt text** describes what is in the picture for someone who can't see it, in one sentence. **Captions** add the journalism: who, where, when. Only use photographs you took, commissioned or licensed. Credit the photographer, and keep the licence terms. Replace every placeholder entry, then delete `src/assets/placeholder/` and the `photoSources` list, and update `/credits` (`src/app/credits/page.tsx`).

## Publish a story

Add an object to the `stories` array in `src/content/stories.ts`:

```ts
{
  slug: "the-long-count",                // URL: /stories/the-long-count (lower case, hyphens)
  title: "The Long Count",
  dek: "One or two sentences shown under the headline.",
  excerpt: "Short summary for cards and search results.",
  sport: "Boxing",                        // one of SPORTS in types.ts (add new sports there)
  type: "Feature",                        // one of STORY_TYPES in types.ts
  published: "2026-08-30",                // ISO date
  updated: "2026-09-02",                  // optional
  publication: "The Example Times",       // optional: where it first ran
  originalUrl: "https://…",               // optional: link to the original
  hero: { ...photos.ringWalk, caption: "…" },
  featured: true,                          // optional: show on the home page spread
  body: [
    { type: "paragraph", text: "…" },
    { type: "heading", text: "A subheading" },
    { type: "quote", text: "A pull quote.", attribution: "Name, role" },
    { type: "image", photo: photos.ringWalk, size: "wide" },   // size: "inline" (default) | "wide"
    { type: "gallery", title: "Fight camp", photos: [photos.a, photos.b, photos.c] },
    { type: "video", video: { kind: "embed", provider: "youtube", id: "…", title: "…", poster: photos.a } },
    { type: "divider" },
  ],
}
```

- Stories are sorted by `published` automatically.
- The first `featured` story leads the home page spread; the next three sit beside it.
- **Do not** set `placeholder: true` on real work. Real stories are added to the sitemap, are indexable, and get `NewsArticle` structured data built from their title, dates, hero image and publication.
- If a story was published elsewhere and you don't hold the rights to republish it in full, publish a short summary with `originalUrl` linking to the original instead of copying the text.

## Embed a video

Videos show a local poster, and nothing loads from the video host until the visitor presses play.

**YouTube**: take the ID from the URL (`https://www.youtube.com/watch?v=aqz-KE-bpKQ` gives `aqz-KE-bpKQ`):

```ts
video: {
  kind: "embed",
  provider: "youtube",           // played from youtube-nocookie.com
  id: "aqz-KE-bpKQ",
  title: "Inside the gym at 5 A.M.",
  poster: photos.boxingGym,      // your own still frame, not a YouTube thumbnail
  duration: "4:12",
  captions: true,                // captions are enabled on the YouTube upload
  transcript: "Full transcript…", // shown in an expandable panel
}
```

**Vimeo:** use `provider: "vimeo"` and the numeric ID (played with Do Not Track on).

**Self-hosted files** (short clips): put `clip.mp4` and optionally `clip.en.vtt` in `public/video/`:

```ts
video: { kind: "file", src: "/video/clip.mp4", captionsSrc: "/video/clip.en.vtt", title: "…", poster: photos.x }
```

These play with native controls, never autoplay, and load nothing until played (`preload="none"`). Keep files small (under about 20MB); use YouTube or Vimeo for anything long.

Always provide captions or a transcript for videos with speech. IDs are validated, and only YouTube and Vimeo are allowed by the Content Security Policy. Adding another provider requires updating `VideoPlayer.tsx` and the CSP in `next.config.ts`.

## Multimedia page

Edit `src/content/multimedia.ts`. Each item has a `kind` (`Video`, `Interview`, `Documentary`, `Photo Essay`), a title, a description, a date and a `poster`.

- Add `video` to make an item playable. Items without one show "No video attached yet" and no play button.
- Photo essays use `photos: [...]`, and each photo's caption shows in the lightbox.
- The first non-photo-essay item is featured at the top of the page and in the home page teaser.

## Résumé

Edit `resume` in `src/content/resume.ts`: `summary`, `experience`, `education`, `selectedWork` (add `url` to link a story), `skills`, `awards`. The About page timeline reuses `experience`.

**Downloadable PDF:** save the file as `public/resume/shane-riley-resume.pdf`, or change `pdfPath`, then rebuild. The Download PDF button appears only when the file exists at build time, so it can never be a broken link. Visitors can always use Print résumé, which uses the print stylesheet.

## Personal details and social links

In `src/content/site.ts`:

```ts
email: "shane@yourdomain.com",
emailIsPlaceholder: false,
social: [
  { label: "X", url: "https://x.com/yourhandle", handle: "@yourhandle" },
  { label: "Instagram", url: "https://instagram.com/yourhandle", handle: "@yourhandle" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/you" },
  // leave url empty to hide a platform
],
```

Profiles appear in the footer, the mobile menu, About, Contact and the résumé header. Social links carry `rel="me"` for profile verification.

## Social sharing image

The default Open Graph image (`src/app/opengraph-image.tsx`) is generated from the name, role and tagline in `site.ts`, so it updates automatically. Story pages use their hero photograph. To use a designed image instead, delete `opengraph-image.tsx` and add `src/app/opengraph-image.png` (1200 × 630).
