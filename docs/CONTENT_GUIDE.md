# Content guide

Everything a visitor reads lives in `src/content/`. Most of it (profile, home and contact wording, About, résumé, multimedia, Sports Flash, published articles) is in JSON files that non-developers edit through the CMS. See "Content edited in the CMS" below and `docs/EDITING.md`. Stories stay in `stories.ts`.

After editing, run `npm run dev` to preview or `npm run typecheck` to validate. A mistake such as a missing alt text or an unknown topic stops the build with a clear error, so broken content can't ship.

This site replaces Shane's previous portfolio. Its material (stories, captions, audio, portrait) was carried over, but nothing on the site links back to the old one.

## Where the current content came from

| Content | Source |
| --- | --- |
| Name, email, location, phone, education, experience, skills | Shane's résumé PDF (September 2026), offered as a download at `public/resume/shane-riley-resume.pdf` |
| About-page biography, portrait | The previous portfolio's About and Video pages, plus facts from the résumé |
| 11 stories: text, photos and photo captions | The previous portfolio's Articles section |
| Three podcast recordings (`public/audio/`) | The previous portfolio's Audio page, now hosted on this site |
| Video titles and descriptions | Shane's YouTube channel (@ShaneRileyPortfolio) and his Rockbridge Report stories |
| "More published work" on the Stories page | A selection from Shane's author pages at The Ring-tum Phi and the Rockbridge Report (`src/content/data/published.json`) |
| Home-page hero photo | A frame from Shane's Mary Schleusner all-star package (W&L vs. Bethel, NCAA Division III Tournament), `src/assets/photos/hero-schleusner-bethel.jpg` |
| Video posters | Each video's own YouTube thumbnail, saved locally |

### Things worth checking

- **Photo rights and credits.** Credits from the original posts are shown under every photo (e.g. "Courtesy of Mikey Williams/Top Rank"). Two caption typos were fixed ("Coutesy", "Polata-Nau").
- **The résumé PDF** still lists the old portfolio address at the top. Upload a new PDF in the CMS (Résumé → Résumé PDF) once that line is updated.
- **Headlines.** Three titles were lightly tidied: "Matt Miller Feature" became "Matt Miller", "Tatafu Polota-Nau Feature" became "Tatafu Polota-Nau", and "Ed Kashi W&L Visit" became "Ed Kashi's Visit to W&L". Change `title` in `stories.ts` to revert.
- **Phone number.** It appears on the résumé page and in the PDF. Clear the phone field in the CMS (and use a PDF without it) to keep it off the public site.
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

## Content edited in the CMS

These sections live in JSON files in `src/content/data/`, which the CMS edits through forms. The forms are defined in `.pages.yml` (see "The CMS" below). The TypeScript modules next to them read the JSON, check it, and export the same objects the pages use.

| CMS section | File | Read by |
| --- | --- | --- |
| Profile & links | `data/site.json` | `site.ts` |
| Home page | `data/home.json` | `photos.ts` (hero), `pages.ts` |
| About page | `data/about.json` | `photos.ts` (portrait), `resume.ts` (intro, biography, interests) |
| Résumé | `data/resume.json` | `resume.ts` |
| Contact page | `data/contact.json` | `pages.ts` |
| Multimedia | `data/multimedia.json` | `multimedia.ts` |
| Sports Flash | `data/sports-flash.json` | `sports-flash.ts` |
| Published elsewhere | `data/published.json` | `published.ts` |

You can also edit the JSON files directly. Keep every key that's already there: the CMS form and the JSON must stay in step. If you add a key, add a matching field to `.pages.yml`.

**Photos in JSON** are paths inside `src/assets`, such as `"photos/shane-riley-portrait.jpg"` or `"posters/aJX64OC45xk.jpg"`. `npm run images` writes `src/lib/assets.generated.ts`, which maps each path to its image, and `cms-media.ts` looks them up. An unknown path stops the build with a message naming the field.

**Validation.** `cms.ts` and `cms-media.ts` check required fields when the site builds. A message reads like *"Content error in About page → Portrait → image: the image … wasn't found."* A failed build never replaces the live site.

### Published elsewhere

The Stories page lists a selection of Shane's articles at The Ring-tum Phi and the Rockbridge Report. Each outlet also gets an "All stories" link to Shane's author page. Only written Rockbridge Report stories are listed here; its video packages are on the Multimedia page. Newest first.

### Multimedia page

Items appear in listed order, grouped by **Section**:

| Page section | Sections |
| --- | --- |
| Video packages | `Video`, `Interview`, `Documentary` |
| Game commentary | `Commentary` |
| Podcasts & audio | The Sports Flash series, then `Podcast` items ("Podcasts"), then `Audio` items ("Audio productions") |

- **Plays** (`source`) picks one of the following:
  - `youtube`: needs `youtubeId`.
  - `youtube-playlist`: needs `playlistId`, and adds a "Full playlist on YouTube" link automatically.
  - `video-file`: needs `videoFile`, under `/video/`.
  - `audio-file`: needs `audioFile`, under `/audio/`.
- Videos need a thumbnail (`poster`, in `src/assets/posters/`). To use a YouTube video's own thumbnail, download `https://i.ytimg.com/vi/<id>/maxresdefault.jpg` (or `hqdefault.jpg`).
- The first `Video` item is featured at the top of the Multimedia page and in the home-page teaser. The item listed after it appears first under "Video packages".
- Beside the featured video, the home page shows the first Commentary, Interview and Podcast items that have a thumbnail. The FloSports podcast has one for this reason.
- Keep descriptions short and free of details the section already states (for example, don't repeat "Rockbridge Report package").

**Large video files.** Compress camera exports before adding them: GitHub rejects files over 100 MB, and visitors shouldn't download 250 MB. A 1080p H.264 MP4 at about 4 Mbps is a good target:

```sh
ffmpeg -i in.mp4 -c:v libx264 -preset slow -crf 24 -maxrate 4500k -bufsize 9000k -c:a aac -b:a 128k -movflags +faststart out.mp4
```

Keep the full-quality original in `archive/video-originals/`, which stays on your computer and is never uploaded.

### Sports Flash series

The Podcasts & audio section opens with **Sports Flash**: Shane's one-minute sports segments for News Talk 790-WNIS (summer 2026). They play in one series player with a day-by-day list, previous/next buttons and optional continuous play, instead of 41 separate cards.

Each segment has a date, its number that day, an MP3 in `public/audio/sports-flash/` (named `YYYY-MM-DD-N.mp3`) and a length. Segments are sorted by date automatically. Use MP3 rather than WAV: a one-minute WAV is about 10 MB, the MP3 about 1.5 MB. The two original July 2 WAV recordings are kept in `archive/sports-flash-originals/`; the site plays MP3 copies.

### Résumé

- `summary`, `phone` (leave empty to hide it), `education`
- `experience` and `additionalExperience`: organizations with one or more `roles`, each with `title`, `period` and `bullets`
- `skills`: skill names in Title Case (e.g. "Multimedia Storytelling")
- `pdf`: the file behind the Download PDF button, under `/resume/`. The button only appears when the file exists.
- Interests live in the About page section and appear on both pages.

The About page timeline is built from `experience`.

### Profile & links

`tagline`, `shortBio`, `location`, `email`, and `social` (label, url, optional handle, optional Contact-page note). Links with an empty `url` are hidden. Profiles appear in the footer, the mobile menu, About and Contact. LinkedIn and YouTube also appear on the résumé page.

### Home and contact wording

Headings come in two parts; the second part is shown in italics (e.g. "Let's talk" + *"sport."*).

## The CMS

The site uses [Pages CMS](https://pagescms.org), a free, hosted editor that reads `.pages.yml` and commits each save to GitHub. Nothing extra runs on the site itself.

- **Setup:** sign in at app.pagescms.org with GitHub, then install its GitHub app on this repository.
- **Inviting editors:** invite people from the repository's settings in Pages CMS. They can sign in by email without a GitHub account.
- **Publishing:** saves only reach the live site when the host rebuilds on every push (Vercel does this when the repository is connected).
- **Editor guide:** `docs/EDITING.md` is the plain-language guide for editors.
- **Upload folders:**

| CMS media | Folder | Written into JSON as |
| --- | --- | --- |
| Photos | `src/assets/photos` | `photos/…` |
| Video thumbnails | `src/assets/posters` | `posters/…` |
| Audio | `public/audio` | `/audio/…` |
| Video files | `public/video` | `/video/…` |
| Résumé PDF | `public/resume` | `/resume/…` |

Stories (`stories.ts`) stay in code: their mixed text, galleries and floated photos are easy to break in a form.

## Embed a video in a story

Videos show a local poster, and nothing loads from the video host until the visitor presses play. In a story's `body`, add a `video` block:

```ts
{ type: "video", video: {
  kind: "embed",
  provider: "youtube",                // or "youtube-playlist" / "vimeo"
  id: "aJX64OC45xk",                  // the v= value (or list= for playlists)
  title: "…",
  poster: { src: poster, alt: "…" },
  duration: "1:51",                   // optional, shown on the play button
  transcript: "Full transcript…",     // optional, shown in an expandable panel
} }
```

**Self-hosted video files:** put `clip.mp4` (and optionally `clip.en.vtt` captions) in `public/video/`, then use `{ kind: "file", src: "/video/clip.mp4", captionsSrc: "/video/clip.en.vtt", title: "…", poster: … }`.

## Audio in a story

Put the file (MP3, M4A or MP4) in `public/audio/`, then add `{ type: "audio", audio: { src: "/audio/clip.mp3", title: "…", duration: "5:24", description: "…" } }`. Audio plays with the browser's own controls and downloads nothing until the listener presses play.

## Social sharing image

The default Open Graph image (`src/app/opengraph-image.tsx`) is generated from the name and tagline in `site.ts`. Story pages use their `cover` (or hero) photo. To use a designed image instead, delete `opengraph-image.tsx` and add `src/app/opengraph-image.png` (1200 × 630).
