# Performance

## What is implemented

**Rendering**
- Every route is statically prerendered (`next build` output: all `○` static or `●` SSG). There is no server work per request and pages can be CDN-cached.
- Server Components by default. Client JavaScript is limited to the header, share and copy buttons, the video player, the gallery and the reveal observer.
- Motion's animation features are code-split with `LazyMotion` and loaded after hydration.
- No analytics, tag managers, web fonts from third parties or other third-party scripts.

**Images**
- All photographs are statically imported: dimensions are known (no layout shift), blur placeholders are inlined, and files are fingerprinted for immutable caching.
- **Images are pre-generated at build time.** `scripts/generate-images.mjs` writes WebP versions of every photo at 96–2400px into `public/img/`, and a custom `next/image` loader (`src/lib/image-loader.ts`) points `srcset` at them. Images are plain static files that a CDN can cache, and the server does no image work at request time.
- Every image has a `sizes` attribute matching its rendered width, so browsers download the smallest adequate file.
- **Why not Next's runtime optimiser?** Testing found a Next.js 16.3.6 bug in self-hosted `next start`: if the first request for an image size is cancelled within about a millisecond (which browsers do routinely when a visitor navigates away), that image size hangs forever for every later visitor. It was reproduced with a script; about 1 in 4 very early aborts poisoned the image. AVIF encoding also hung on at least one photo size. Pre-generating removes both problems.
- Only the LCP image on each page is preloaded with `fetchPriority="high"` (home hero, article hero, first multimedia poster). Everything else is lazy-loaded.
- Aspect ratios are reserved with CSS `aspect-ratio`.

**Video**
- No iframes on page load. YouTube and Vimeo players load only after the visitor presses play (a verified test asserts that no third-party requests are made before that).
- Native `<video>` uses `preload="none"`.

**Fonts**
- Self-hosted through `next/font` (no request to Google at runtime), Latin subset only, `display: swap` with metric-adjusted fallbacks.
- Only the upright Newsreader and Geist are preloaded (about 151KB). The italic face (about 64KB) loads on demand. Newsreader's optical-size axis was removed after measurement: it doubled the font files and was the main cause of slow mobile LCP.

**Animation**
- Scroll reveals use a single IntersectionObserver. There are no scroll event handlers, apart from a passive one that toggles the header background.
- Only `opacity` and `transform` are animated. Reading progress is a CSS scroll-driven animation that runs off the main thread.

## Measured results

Measured on 2026-09-28, with Shane's real content, using **Lighthouse 12** (npm), headless Google Chrome 153, against the local production build (`next build && next start`) on a Windows 11 desktop. "Mobile" is Lighthouse's default mobile emulation with simulated slow-4G throttling and 4× CPU slowdown; "Desktop" uses `--preset=desktop`.

| Page | Mobile P / A / BP / SEO | Mobile LCP | Desktop P / A / BP / SEO | Desktop LCP | CLS (mobile) | TBT (mobile) |
| --- | --- | --- | --- | --- | --- | --- |
| `/` | 84 / 100 / 100 / 100 | 4.4 s | 99 / 100 / 100 / 100 | 0.9 s | 0.049 | 10 ms |
| `/stories` | 91 / 100 / 100 / 100 | 3.5 s | 99 / 100 / 100 / 100 | 0.9 s | 0 | 20 ms |
| `/stories/leah-crouse-consistent-growth` | 87 / 100 / 100 / 100 | 4.1 s | 99 / 100 / 100 / 100 | 1.0 s | 0.002 | 10 ms |
| `/multimedia` | 88 / 100 / 100 / 100 | 3.9 s | 99 / 100 / 100 / 100 | 0.9 s | 0 | 50 ms |
| `/about` | 93 / 100 / 100 / 100 | 3.3 s | 100 / 100 / 100 / 100 | 0.6 s | 0 | 20 ms |
| `/resume` | 94 / 100 / 100 / 100 | 3.1 s | 100 / 100 / 100 / 100 | 0.6 s | 0 | 20 ms |
| `/contact` | 93 / 100 / 100 / 100 | 3.2 s | 100 / 100 / 100 / 100 | 0.7 s | 0 | 20 ms |

Earlier history: before the font optimisation, mobile performance was 81–86 with an LCP of 4.2–5.3s.

These are **lab** results from one machine over localhost, not real-user (field) Core Web Vitals. The site has no real-user data yet. Once deployed, check PageSpeed Insights or the Chrome UX Report for 75th-percentile LCP, CLS and INP.

## Remaining limitations

- **Mobile LCP is 3.1–4.4s in the simulated slow-4G profile**, above the 2.5s target. The LCP element on most pages is Newsreader text, and the remaining time is the web-font download inside Lighthouse's throttled model. Options if field data confirms a problem: `display: "optional"` for Newsreader (fastest, but first-time visitors on slow networks may see the fallback serif), or subsetting the font further.
- Home mobile CLS is 0.048 (under the 0.1 target), caused by the italic hero line swapping from the fallback to Newsreader Italic.
- Several story photos are small originals (225–640px wide, as supplied on the portfolio). They are shown near natural size on story pages but look soft when cropped into cards. Larger originals would fix this.
- The home-page hero is a 1280×720 video frame, slightly soft on large screens.
- `public/img` holds about 16 MB of generated images. Unchanged images are skipped when it regenerates, and versions of deleted photos are removed. `public/audio` adds about 15 MB of recordings, which load only when played (`preload="none"`).
- INP could not be measured in the lab. TBT, its lab proxy, is 10–20ms.

## How to re-measure

```bash
npm run build
npm run start
# in another terminal (requires Chrome):
npx lighthouse@12 http://localhost:3000/ --view
npx lighthouse@12 http://localhost:3000/ --preset=desktop --view
```

After deployment, run PageSpeed Insights on the live URL for field data.
