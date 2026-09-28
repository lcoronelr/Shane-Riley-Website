# Architecture

## Principles

The site is a portfolio of published work, so it is built as a **static site with typed local content**. There is no database, CMS, authentication or API: nothing on the site needs one, and each would add cost, attack surface and maintenance. Every route is prerendered to HTML at build time and can be served from a CDN.

Complexity is added only where a feature requires it:

- **Server Components by default.** Pages, cards, the story body and the footer render on the server and send no JavaScript.
- **Client Components only for interaction:** the header (active indicator, mobile menu, dark-section detection), share and copy buttons, the video player, the photo gallery and lightbox, the print button, and one global reveal observer.
- **Motion for React is loaded lazily.** `LazyMotion` code-splits the animation features, so the initial bundle carries only the lightweight `m` components. Motion is used for the mobile menu, the navigation indicator and lightbox transitions. Everything else (scroll reveals, hero entrance, hover states, reading progress) is plain CSS.

## Stack

| Dependency | Why |
| --- | --- |
| `next` 16 (App Router, Turbopack) | Routing, static generation, `next/image`, `next/font`, metadata, sitemap and robots |
| `react` / `react-dom` 19 | UI |
| `tailwindcss` 4 | Styling with design tokens defined in CSS (`@theme`) |
| `motion` | Restrained, interruptible UI transitions (lazy-loaded) |
| `lucide-react` | Icons (tree-shaken; only the icons used are bundled) |
| `@playwright/test`, `@axe-core/playwright` (dev) | End-to-end and accessibility tests |

There are no other runtime dependencies.

## Directory structure

```
src/
  app/                    Routes (App Router)
    layout.tsx            Fonts, metadata defaults, skip link, header/footer shell
    page.tsx              Home
    stories/page.tsx      Story archive
    stories/[slug]/       Article pages (generateStaticParams, dynamicParams = false)
    multimedia/ about/ resume/ contact/ credits/
    sitemap.ts robots.ts  Generated sitemap.xml / robots.txt
    opengraph-image.tsx   Default social card, rendered at build time
    icon.svg              Favicon
    not-found.tsx error.tsx
    globals.css           Design tokens, base styles, motion, print styles
  components/
    layout/               SiteHeader (client), SiteFooter
    media/                Picture, Caption, VideoPlayer, PhotoGallery (+ lightbox), PortraitPlaceholder
    motion/               MotionProvider (LazyMotion), RevealObserver
    stories/              StoryCard variants, StoryBody, ShareControls
    ui/                   Buttons, labels, PlaceholderTag, PrintButton, CopyEmailButton
  content/                Editable, typed content (see CONTENT_GUIDE.md)
    types.ts              Content model
    site.ts stories.ts multimedia.ts resume.ts photos.ts
  lib/content.ts          Queries (sorting, related stories), reading time, JSON-LD serialisation
  assets/
    photos/               Your photography (statically imported)
    posters/              Video poster frames
    placeholder/          CC0 stand-in photography (replace)
public/
  resume/                 Optional résumé PDF
tests/                    Playwright specs
```

## Content flow

1. Content is written as TypeScript objects in `src/content/*.ts`, checked against the types in `types.ts`. A missing alt text, a misspelt sport or an invalid block type fails `npm run typecheck` and the build.
2. Images are **statically imported**, so Next.js knows their dimensions (no layout shift), generates blur placeholders and fingerprints the files for long-term caching.
3. Pages read content through `src/lib/content.ts` and render it with Server Components.
4. Story bodies are arrays of typed blocks rendered by `StoryBody`. Text is always rendered as React text nodes and never as HTML, so content cannot inject markup or scripts.
5. `generateStaticParams` lists every story slug, and `dynamicParams = false` makes any other slug a real 404.

MDX was considered but not used. Typed blocks cover every layout the site needs (paragraph, heading, pull quote, image, gallery, video, divider), keep content validation strict, and remove the risk of arbitrary components or HTML in content.

## Routing and navigation

- All routes are static (`○`/`●` in the build output).
- Internal links use `next/link` for client-side navigation with prefetching. Browser back and forward work normally.
- The story archive is a Server Component that lists every story newest first; it sends no JavaScript of its own.

## Rendering decisions worth knowing

- **Static rendering and CSP.** Nonce-based CSP would force every page to render dynamically. The site uses a static CSP with `'unsafe-inline'` for scripts instead; see SECURITY.md for the trade-off.
- **`html.js` class.** A one-line inline script adds `js` to `<html>` before first paint. Scroll-reveal styles apply only under that class, so content is never hidden when JavaScript is off or fails.
- **Header theme.** Sections marked `data-surface="dark"` switch the header to light-on-dark while they sit beneath it. This is detected by an IntersectionObserver, not a scroll handler.
