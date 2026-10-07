# Content guide

Everything a visitor reads lives in `src/content/`. Edit those files, then run `npm run dev` to preview, or `npm run typecheck` to validate. A mistake such as a missing alt text or an unknown topic stops the build with a clear error, so broken content can't ship.

This site replaces Shane's previous portfolio. Its material (stories, captions, audio, portrait) was carried over, but nothing on the site links back to the old one.

## Where the current content came from

| Content | Source |
| --- | --- |
| Name, email, location, phone, education, experience, skills | Shane's résumé PDF (September 2026), offered as a download at `public/resume/shane-riley-resume.pdf` |
| About-page biography, portrait | The previous portfolio's About and Video pages, plus facts from the résumé |
| 11 stories: text, photos and photo captions | The previous portfolio's Articles section |
| Three podcast recordings (`public/audio/`) | The previous portfolio's Audio page, now hosted on this site |
| Video titles and descriptions | Shane's YouTube channel (@ShaneRileyPortfolio) and his Rockbridge Report stories |
| "More published work" on the Stories page | A selection from Shane's author pages at The Ring-tum Phi and the Rockbridge Report (`src/content/published.ts`) |
| Home-page hero photo | A frame from Shane's Mary Schleusner all-star package (W&L vs. Bethel, NCAA Division III Tournament), `src/assets/photos/hero-schleusner-bethel.jpg` |
| Video posters | Each video's own YouTube thumbnail, saved locally |

### Things worth checking

- **Photo rights and credits.** Credits from the original posts are shown under every photo (e.g. "Courtesy of Mikey Williams/Top Rank"). Two caption typos were fixed ("Coutesy", "Polata-Nau").
- **The résumé PDF** still lists the old portfolio address at the top. Upload a new PDF to `public/resume/shane-riley-resume.pdf` once that line is updated.
- **Headlines.** Three titles were lightly tidied: "Matt Miller Feature" became "Matt Miller", "Tatafu Polota-Nau Feature" became "Tatafu Polota-Nau", and "Ed Kashi W&L Visit" became "Ed Kashi's Visit to W&L". Change `title` in `stories.ts` to revert.
- **Phone number.** It appears on the résumé page and in the PDF. Remove `phone` from `resume.ts` (and use a PDF without it) to keep it off the public site.
- **Dates.** Stories have no `published` date, because the old portfolio only gave years. Dates are never shown on the site; adding exact ones enables article structured data for search engines.
- **Archived photo essays.** The Heliotrope and Reid Hall photo essays were taken off the Multimedia page. Their photos are kept in `archive/photo-essays/`, which isn't published.

## Add photographs

1. Put the file in `src/assets/photos/` (story photos in `src/assets/photos/stories/`). Use JPEG or PNG, ideally **at least 2400px on the long edge**, and don't pre-shrink it. Every file name must be unique across `src/assets`.
2. Run `npm run images`, or just `npm run dev` or `npm run build`, which do it automatically. This writes resized WebP versions to `public/img/` and deletes versions of photos you've removed.
3. Import the photo where you use it:

   ```ts
   import ringWalk from "@/assets/photos/stories/ring-walk.jpg";

   const photo = {
     src: ringWalk,
     alt: "A boxer walks to the ring through a tunnel of fans holding up phones.",
     caption: "Walkout before the main event, Scope Arena",
     credit: "Photo by Shane Riley",
     focus: "50% 35%", // optional: what stays in frame when the photo is cropped (cards)
   };
   ```

**Alt text** describes what is in the picture for someone who can't see it, in one sentence. **Captions** add the journalism: who, where, when. Captions and credits always show under the photo.

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
  hero: { src: ringWalk, alt: "…", caption: "…", credit: "…" }, // photo at the top of the story
  heroRow: [photoA, photoB],              // optional: two or three photos side by side at the top instead
  cover: { src: …, alt: "…" },            // optional: a different photo for story cards and link previews
  featured: 2,                            // optional: position on the home page (1 = lead)
  body: [/* blocks, see below */],
}
```

### Story blocks

| Block | Use |
| --- | --- |
| `{ type: "paragraph", text }` | Body text |
| `{ type: "heading", text }` | Subheading or Q&A question |
| `{ type: "quote", text, attribution }` | Large pull quote |
| `{ type: "image", photo, size }` | One photo. `size` is `"inline"` (fills the text column), `"wide"` (breaks out of it), or `"left"` / `"right"` (floats beside the text on larger screens; best for portrait photos, with at least three or four paragraphs after it) |
| `{ type: "gallery", photos }` | Two or more photos side by side. Rows are justified: every photo in a row has the same height at its natural shape, with equal gaps. More than three photos wrap into balanced rows |
| `{ type: "video", video }` | Click-to-load video (see "Embed a video") |
| `{ type: "audio", audio: { src, title, duration, description } }` | Audio player for a file in `public/audio/` |
| `{ type: "divider" }` | A short rule between sections |

**Layout tips.** Alternate floated photos left and right, and give each one enough following text to wrap around. Galleries, videos, audio and inline photos always start below any floated photo, so nothing overlaps.

- **Home page.** Four stories carry a `featured` number: 1 leads the spread and 2–4 sit beside it.
- **Drafts.** Set `placeholder: true` on a story that isn't ready. It's labelled "Draft", marked `noindex`, and kept out of the sitemap.

## Published elsewhere

The Stories page lists a selection of Shane's articles at The Ring-tum Phi and the Rockbridge Report, from `src/content/published.ts`. Each outlet also gets an "All stories" link to Shane's author page. Only written Rockbridge Report stories are listed here; its video packages are on the Multimedia page. Add a new article at the top of the right outlet's `articles` list:

```ts
{ title: "…", url: "https://…", summary: "One sentence." }
```

To add another outlet, add a new `{ name, authorUrl, articles }` entry.

## Embed a video

Videos show a local poster, and nothing loads from the video host until the visitor presses play.

**YouTube video:** take the ID from the URL (`https://www.youtube.com/watch?v=aJX64OC45xk` gives `aJX64OC45xk`):

```ts
video: {
  kind: "embed",
  provider: "youtube",
  id: "aJX64OC45xk",
  title: "W&L's Mary Schleusner sets two Division III women's hoops records",
  poster: { src: poster, alt: "…" },
  duration: "1:51",               // optional, shown on the play button
  transcript: "Full transcript…", // optional, shown in an expandable panel
}
```

**YouTube playlist:** use `provider: "youtube-playlist"` and the playlist ID (the `list=` value, starting with `PL`). The nine game-commentary entries work this way.

**Vimeo:** use `provider: "vimeo"` and the numeric ID.

**Self-hosted video files:** put `clip.mp4` (and optionally `clip.en.vtt` captions) in `public/video/`, then use `{ kind: "file", src: "/video/clip.mp4", captionsSrc: "/video/clip.en.vtt", title: "…", poster: … }`. Use this to replace a YouTube video that has a problem, such as missing audio. The Mary Schleusner all-star package works this way.

Compress large camera exports before adding them: GitHub rejects files over 100 MB, and visitors shouldn't download 250 MB. A 1080p H.264 MP4 at about 4 Mbps (`ffmpeg -i in.mp4 -c:v libx264 -preset slow -crf 24 -maxrate 4500k -bufsize 9000k -c:a aac -b:a 128k -movflags +faststart out.mp4`) is a good target. Keep the full-quality original in `archive/video-originals/`, which stays on your computer and is never uploaded.

**Posters.** To use a video's own thumbnail, download `https://i.ytimg.com/vi/<id>/maxresdefault.jpg` (or `hqdefault.jpg`) into `src/assets/posters/`.

## Audio

Put the file (MP3, M4A or MP4) in `public/audio/`, then add it to a story as an `audio` block, or to the Multimedia page as an item with an `audio` field:

```ts
{
  slug: "lexington-life-john-tucker",
  kind: "Podcast",
  title: "Lexington Life: John Tucker",
  description: "…",
  audio: { src: "/audio/lexington-life-john-tucker.mp4", title: "Lexington Life: John Tucker", duration: "4:37" },
}
```

Audio plays with the browser's own controls and downloads nothing until the listener presses play.

## Sports Flash series

The Podcasts & audio section opens with **Sports Flash**: Shane's one-minute sports segments for News Talk 790-WNIS (summer 2026). They play in one series player with a day-by-day list, previous/next buttons and optional continuous play, instead of 41 separate cards.

To add a segment:

1. Save the MP3 in `public/audio/sports-flash/` named `YYYY-MM-DD-N.mp3`, where N is the segment number for that day, e.g. `2026-08-03-1.mp3`.
2. Add a line to `src/content/sports-flash.ts`, keeping dates in order:

   ```ts
   { date: "2026-08-03", segment: 1, src: "/audio/sports-flash/2026-08-03-1.mp3", duration: "1:05" },
   ```

Use MP3 rather than WAV (a one-minute WAV is about 10 MB; the MP3 about 1.5 MB). The two original July 2 WAV recordings are kept in `archive/sports-flash-originals/`; the site plays MP3 copies.

## Multimedia page

Edit `src/content/multimedia.ts`. Items appear in listed order, grouped by `kind`:

| Section | Kinds |
| --- | --- |
| Video packages | `Video`, `Interview`, `Documentary` |
| Game commentary | `Commentary` |
| Podcasts & audio | The Sports Flash series, then `Podcast` items ("Podcasts"), then `Audio` items ("Audio productions") |

- The first `Video` item is featured at the top of the page and in the home-page teaser. Beside it, the home page shows the first Commentary, Interview and Podcast items that have a `poster` (the FloSports podcast has one for this reason).
- The first `Video` item is featured at the top of the Multimedia page. The item listed after it appears first under "Video packages".
- Keep descriptions short and free of details the section already states (for example, don't repeat "Rockbridge Report package").
- `link: { href, label }` adds an extra link under an item. The commentary entries use it for "Full playlist on YouTube".

## Résumé

Edit `resume` in `src/content/resume.ts`:

- `summary`, `phone`, `education`
- `experience` and `additionalExperience`: organizations with one or more `roles`, each with `title`, `period` and `bullets`
- `skills`: skill names in Title Case (e.g. "Multimedia Storytelling")
- `interests`: title and one sentence each; shown on the résumé and in the About page sidebar

The About page timeline is built from `experience`. When the résumé changes, replace `public/resume/shane-riley-resume.pdf` too. The Download PDF button only appears when the file exists.

## Personal details and profile links

In `src/content/site.ts`: `tagline`, `shortBio`, `location`, `email`, and `social` (label, url, optional handle). Links with an empty `url` are hidden. Profiles appear in the footer, the mobile menu, About and Contact. LinkedIn and YouTube also appear on the résumé page.

## Social sharing image

The default Open Graph image (`src/app/opengraph-image.tsx`) is generated from the name and tagline in `site.ts`. Story pages use their `cover` (or hero) photo. To use a designed image instead, delete `opengraph-image.tsx` and add `src/app/opengraph-image.png` (1200 × 630).
