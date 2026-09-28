# Shane Riley — Sports Journalism Portfolio

A premium editorial portfolio for a sports journalist: long-form stories, video and photo essays, biography, an HTML résumé and contact details. Built with Next.js (App Router), TypeScript and Tailwind CSS, and fully statically generated.

> **Status: placeholder content.** The name comes from the project folder. The biography, résumé, stories, email address and photography are clearly labelled placeholders. See [docs/CONTENT_GUIDE.md](docs/CONTENT_GUIDE.md) before launch.

## Pages

| Route | What it is |
| --- | --- |
| `/` | Cinematic hero, featured-story magazine spread, multimedia teaser, about teaser, contact call to action |
| `/stories` | Story archive with sport and type filters (keyboard, touch and URL-shareable) |
| `/stories/[slug]` | Long-form article: byline, captions, pull quotes, lightbox galleries, click-to-load video, share controls, reading progress |
| `/multimedia` | Video, interviews, documentary and photo essays, with a keyboard-accessible lightbox |
| `/about` | Biography, reporting interests, experience timeline |
| `/resume` | Printable HTML résumé; the Download PDF button appears only when the PDF exists |
| `/contact` | Email link, copy-address button and social profiles (no form, no data collection) |
| `/credits` | Licences for the placeholder photography |

## Prerequisites

- Node.js 20.9 or newer (developed on Node 24)
- npm
- Google Chrome, for the end-to-end tests (or install Playwright's Chromium, see below)

## Run it locally

```bash
npm install
npm run dev          # development server at http://localhost:3000
```

To preview the production build:

```bash
npm run build
npm run start        # http://localhost:3000
```

## Checks

```bash
npm run typecheck    # TypeScript
npm run lint         # ESLint (Next.js core-web-vitals + TypeScript rules)
npm run build        # production build
npm run test:e2e     # Playwright + axe accessibility tests against the production build
npm run check        # all of the above in order
```

`test:e2e` expects a production build (`npm run build`) and starts `next start` itself unless a server is already running on port 3000. It uses your installed Google Chrome. To use Playwright's bundled Chromium instead:

```bash
npx playwright install chromium
PW_CHANNEL= npm run test:e2e
```

## Customise

All editable content lives in `src/content/`:

| File | Contains |
| --- | --- |
| `site.ts` | Name, role, tagline, short bio, email, social links, placeholder-label switch |
| `stories.ts` | Stories (typed blocks: paragraphs, headings, quotes, images, galleries, video) |
| `multimedia.ts` | Videos, interviews, documentaries and photo essays |
| `resume.ts` | About-page biography and interests, résumé sections, PDF path |
| `photos.ts` | Photo registry with alt text, captions and credits |

Step-by-step instructions are in [docs/CONTENT_GUIDE.md](docs/CONTENT_GUIDE.md).

## Documentation

- [Architecture](docs/ARCHITECTURE.md): structure, routing, content flow and dependencies
- [Design system](docs/DESIGN_SYSTEM.md): tokens, type, spacing, components and motion
- [Content guide](docs/CONTENT_GUIDE.md): publishing stories, videos, photos and the résumé
- [Performance](docs/PERFORMANCE.md): optimisations and measured Lighthouse results
- [Accessibility](docs/ACCESSIBILITY.md): approach and the checks that were run
- [Security](docs/SECURITY.md): threat model, headers, CSP and known limitations
- [Deployment](docs/DEPLOYMENT.md): environment variables, hosting, HTTPS and the launch checklist
