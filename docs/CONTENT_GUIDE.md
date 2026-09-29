# Content guide

Everything a visitor reads lives in `src/content/`. Edit those files, then run `npm run dev` to preview, or `npm run typecheck` to validate. A mistake such as a missing alt text or an unknown topic stops the build with a clear error, so broken content can't ship.

## Where the current content came from

| Content | Source |
| --- | --- |
| Name, email, location, phone, education, experience, skills | Shane's résumé PDF (September 2026), also offered as a download at `public/resume/shane-riley-resume.pdf` |
| About-page biography | Shane's Adobe Portfolio "About" text, plus facts from the résumé |
| 11 stories (text and photos) | Shane's Adobe Portfolio "Articles" section |
| Video packages, commentary playlists, podcasts | Shane's YouTube channel (@ShaneRileyPortfolio), Rockbridge Report packages, and the portfolio's Video and Audio pages |
| Photo essays (Heliotrope, Reid Hall) and their captions | Shane's Adobe Portfolio "Photography" page |
| Portrait | The photo on Shane's Adobe Portfolio "Video" page |
| Video posters | Each video's own YouTube thumbnail, saved locally |

### Things worth checking

- **Photo rights and credits.** Some story photos appear to be supplied or agency images rather than Shane's own, for example the Top Rank boxing photos, the Team USA field hockey and rowing images, and the Navy football photo. They were used this way on the portfolio, but no credit lines came with them. Add a `credit` (see "Add photographs") wherever one is known, or replace any photo that can't be credited.
- **Headlines.** Three portfolio titles were lightly tidied: "Matt Miller Feature" became "Matt Miller", "Tatafu Polota-Nau Feature" became "Tatafu Polota-Nau", and "Ed Kashi W&L Visit" became "Ed Kashi's Visit to W&L". Change `title` in `stories.ts` to revert.
- **Where stories first ran.** Only the Isaac Hibbard profile names its publication (Playbook, Winter 2025). If others ran in The Ring-tum Phi, the Rockbridge Report or elsewhere, add `publication` and `originalUrl`.
- **Phone number.** It appears on the résumé page and in the PDF. Remove `phone` from `resume.ts` (and use a PDF without it) to keep it off the public site.
- **Dates.** Stories have no `published` date, because the portfolio only gave years. Dates are never shown on the site; adding exact ones enables article structured data for search engines.

## Add photographs

1. Put the file in `src/assets/photos/` (story photos in `src/assets/photos/stories/`). Use JPEG or PNG, ideally **at least 2400px on the long edge**, and don't pre-shrink it. Every file name must be unique across `src/assets`.
2. Run `npm run images`, or just `npm run dev` or `npm run build`, which do it automatically. This writes resized WebP versions to `public/img/`.
3. Import the photo where you use it:

   ```ts
   import ringWalk from "@/assets/photos/stories/ring-walk.jpg";

   const photo = {
     src: ringWalk,
     alt: "A boxer walks to the ring through a tunnel of fans holding up phones.",
     caption: "Walkout before the main event, Scope Arena, March 2026.",
     credit: "Shane Riley",
     focus: "50% 35%", // optional: what stays in frame when cropped
   };
   ```

**Alt text** describes what is in the picture for someone who can't see it, in one sentence. **Captions** add the journalism: who, where, when. Credit the photographer and keep any licence terms.

Small or portrait photos are shown near their natural size rather than stretched full width, so they stay sharp. Larger originals therefore always look better.

## Publish a story

Add an object to the `stories` array in `src/content/stories.ts`. Stories appear on the Stories page in the order they are listed.

```ts
{
  slug: "first-pro-fight-norfolk",        // URL: /stories/first-pro-fight-norfolk (lower case, hyphens)
  title: "My First Pro Fight: Chaos in Norfolk",
  dek: "One or two sentences shown under the headline.",
  excerpt: "Short summary for cards and search results.",
  sport: "Boxing",                        // one of SPORTS in types.ts (add new topics there)
  type: "Column",                         // one of STORY_TYPES in types.ts
  published: "2025-06-14",                // optional, exact date only; never displayed
  publication: "The Ring-tum Phi",        // optional: where it first ran
  originalUrl: "https://…",               // optional: link to the original
  hero: { src: ringWalk, alt: "…" },
  featured: 2,                            // optional: position on the home page (1 = lead)
  body: [
    { type: "paragraph", text: "…" },
    { type: "heading", text: "A subheading or Q&A question" },
    { type: "quote", text: "A pull quote.", attribution: "Name, role" },
    { type: "image", photo: { src: ringWalk, alt: "…" }, size: "wide" }, // size: "inline" (default) | "wide"
    { type: "gallery", title: "Fight night", photos: [/* two or more photos */] },
    { type: "video", video: { kind: "embed", provider: "youtube", id: "…", title: "…", poster: { src: …, alt: "…" } } },
    { type: "divider" },
  ],
}
```

- **Home page.** Four stories carry a `featured` number: 1 leads the spread and 2–4 sit beside it. The next three unfeatured stories fill the "More stories" row.
- **Drafts.** Set `placeholder: true` on a story that isn't ready. It's labelled "Draft", marked `noindex`, and kept out of the sitemap.
- **Republishing.** If you don't hold the rights to republish a story in full, publish a short summary with `originalUrl` linking to the original, as the Hibbard profile does.

## Embed a video

Videos show a local poster, and nothing loads from the video host until the visitor presses play.

**YouTube video:** take the ID from the URL (`https://www.youtube.com/watch?v=aJX64OC45xk` gives `aJX64OC45xk`):

```ts
video: {
  kind: "embed",
  provider: "youtube",            // played from youtube-nocookie.com
  id: "aJX64OC45xk",
  title: "W&L's Mary Schleusner sets two Division III women's hoops records",
  poster: { src: poster, alt: "…" },
  duration: "2:41",               // optional
  captions: true,                 // optional; omit if unknown and the player makes no claim
  transcript: "Full transcript…", // optional, shown in an expandable panel
}
```

**YouTube playlist:** use `provider: "youtube-playlist"` and the playlist ID (the `list=` value, starting with `PL`). The nine game-commentary entries work this way.

**Vimeo:** use `provider: "vimeo"` and the numeric ID (played with Do Not Track on).

**Self-hosted files** (short clips): put `clip.mp4` and optionally `clip.en.vtt` in `public/video/`, then use `{ kind: "file", src: "/video/clip.mp4", captionsSrc: "/video/clip.en.vtt", title: "…", poster: … }`.

**Posters.** To use a video's own thumbnail as the poster, download `https://i.ytimg.com/vi/<id>/maxresdefault.jpg` (or `hqdefault.jpg`) into `src/assets/posters/`. Posters are served locally, never hot-linked, so no request goes to YouTube before play.

Only YouTube and Vimeo are allowed by the Content Security Policy. Adding another provider means updating `VideoPlayer.tsx` and the CSP in `next.config.ts`.

## Multimedia page

Edit `src/content/multimedia.ts`. Items appear in listed order, grouped by `kind`:

| Section | Kinds |
| --- | --- |
| Video packages | `Video`, `Interview`, `Documentary` |
| Game commentary | `Commentary` |
| Podcasts & audio | `Podcast`, `Audio` |
| Photo essays | `Photo Essay` |

- The first `Video` item is featured at the top of the page and in the home-page teaser.
- For audio that can't be embedded (the three Adobe Portfolio recordings), use `link: { href, label }` instead of `video`. The card links out and shows no play button.
- Photo essays use `photos: [...]`; each photo's caption shows in the lightbox. The Heliotrope and Reid Hall photos live in `src/content/photos.ts`.

## Résumé

Edit `resume` in `src/content/resume.ts`:

- `summary`, `phone`, `education`
- `experience` and `additionalExperience`: organizations with one or more `roles`, each with `title`, `period` and `bullets`
- `skills`

The About page timeline is built from `experience`.

**PDF.** When the résumé changes, replace `public/resume/shane-riley-resume.pdf` and update `resume.ts` to match. The Download PDF button only appears when the file exists at build time.

## Personal details and profile links

In `src/content/site.ts`: `tagline`, `shortBio`, `location`, `email`, and `social` (label, url, optional handle). Links with an empty `url` are hidden. Profiles appear in the footer, the mobile menu, About and Contact. LinkedIn and YouTube also appear on the résumé page.

## Social sharing image

The default Open Graph image (`src/app/opengraph-image.tsx`) is generated from the name and tagline in `site.ts`. Story pages use their hero photograph. To use a designed image instead, delete `opengraph-image.tsx` and add `src/app/opengraph-image.png` (1200 × 630).
