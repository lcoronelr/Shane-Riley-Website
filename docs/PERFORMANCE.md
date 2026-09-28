# Performance

## What is implemented

**Rendering**
- Every route is statically prerendered (`next build` output: all `○` static or `●` SSG). There is no server work per request and pages can be CDN-cached.
- Server Components by default. Client JavaScript is limited to the header, filters, share and copy buttons, the video player, the gallery and the reveal observer.
- Motion's animation features are code-split with `LazyMotion` and loaded after hydration.
- No analytics, tag managers, web fonts from third parties or other third-party scripts.

**Images**
- All photographs are statically imported: dimensions are known (no layout shift), blur placeholders are inlined, and files are fingerprinted for immutable caching.
- `next/image` serves AVIF/WebP at responsive widths. Every image has a `sizes` attribute matching its rendered width.
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

Measured on 2026-09-27 with **Lighthouse 12** (npm), headless Google Chrome 153, against the local production build (`next build && next start`) on a Windows 11 desktop. "Mobile" is Lighthouse's default mobile emulation with simulated slow-4G throttling and 4× CPU slowdown; "Desktop" uses `--preset=desktop`.

| Page | Mobile P / A / BP / SEO | Mobile LCP | Desktop P / A / BP / SEO | Desktop LCP | CLS (mobile) | TBT (mobile) |
| --- | --- | --- | --- | --- | --- | --- |
| `/` | 88 / 100 / 100 / 100 | 3.8 s | 100 / 100 / 100 / 100 | 0.8 s | 0.048 | 20 ms |
| `/stories` | 91 / 100 / 100 / 100 | 3.5 s | 99 / 100 / 100 / 100 | 0.9 s | 0 | 10 ms |
| `/stories/the-long-count` | 89 / 100 / 100 / 69* | 3.8 s | 100 / 100 / 100 / 69* | 0.8 s | 0.002 | 20 ms |
| `/multimedia` | 89 / 100 / 100 / 100 | 3.8 s | 100 / 100 / 100 / 100 | 0.8 s | 0 | 10 ms |
| `/about` | 94 / 100 / 100 / 100 | 3.1 s | 100 / 100 / 100 / 100 | 0.6 s | 0 | 10 ms |
| `/resume` | 94 / 100 / 100 / 100 | 3.1 s | 100 / 100 / 100 / 100 | 0.6 s | 0 | 10 ms |
| `/contact` | 93 / 100 / 100 / 100 | 3.2 s | 100 / 100 / 100 / 100 | 0.7 s | 0 | 20 ms |

\* SEO 69 on the article is intentional: example stories are marked `noindex`, which Lighthouse penalises. Real stories are indexable.

Before the font optimisation, mobile performance was 81–86 with an LCP of 4.2–5.3s.

These are **lab** results from one machine over localhost, not real-user (field) Core Web Vitals. The site has no real-user data yet. Once deployed, check PageSpeed Insights or the Chrome UX Report for 75th-percentile LCP, CLS and INP.

## Remaining limitations

- **Mobile LCP is 3.1–3.8s in the simulated slow-4G profile**, above the 2.5s target. The LCP element on most pages is Newsreader text, and the remaining time is the web-font download inside Lighthouse's throttled model. Options if field data confirms a problem: `display: "optional"` for Newsreader (fastest, but first-time visitors on slow networks may see the fallback serif), or subsetting the font further.
- Home mobile CLS is 0.048 (under the 0.1 target), caused by the italic hero line swapping from the fallback to Newsreader Italic.
- Placeholder photos are only 960px wide, so they look soft on large retina screens. Replace them with originals of at least 2400px (see CONTENT_GUIDE.md).
- The first `next/image` request for each size is optimised on demand by the server and cached afterwards. On serverless hosts this can make the very first view of an image slower.
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
