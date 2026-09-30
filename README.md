# Shane Riley — Sports Journalism Portfolio

The portfolio of Shane Riley, a student journalist at Washington and Lee University: long-form stories, video packages, game commentary, podcasts, biography, an HTML résumé and contact details. Built with Next.js (App Router), TypeScript and Tailwind CSS, and fully statically generated.

> **Content:** this site replaces Shane's previous portfolio; its stories, captions, audio and portrait were carried over. Videos come from his [YouTube channel](https://www.youtube.com/@ShaneRileyPortfolio) and Rockbridge Report packages, and the résumé from his September 2026 PDF. See [docs/CONTENT_GUIDE.md](docs/CONTENT_GUIDE.md) to update anything.

## Pages

| Route | What it is |
| --- | --- |
| `/` | Cinematic hero, featured-story magazine spread, multimedia teaser, about teaser, contact call to action |
| `/stories` | All 11 stories, plus links to Shane's articles at The Ring-tum Phi and the Rockbridge Report |
| `/stories/[slug]` | Long-form article: byline, visible photo captions, floated photos and justified galleries (with a lightbox), click-to-load video, audio, share controls, reading progress |
| `/multimedia` | Video packages, game-commentary playlists, and podcasts and audio |
| `/about` | Biography, portrait, interests, experience timeline |
| `/resume` | Printable HTML résumé with a Download PDF button (`public/resume/shane-riley-resume.pdf`) |
| `/contact` | Email link, copy-address button and social profiles (no form, no data collection) |

## Prerequisites

- Node.js 20.9 or newer (developed on Node 24)
- npm
- Google Chrome, for the end-to-end tests (or install Playwright's Chromium, see below)

## Run it locally

```bash
npm install
npm run dev          # generates images, then starts http://localhost:3000
```

To preview the production build:

```bash
npm run build
npm run start        # http://localhost:3000
```

## Checks

```bash
npm run images       # regenerate responsive WebP images into public/img (runs automatically before dev/build/typecheck)
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
| `site.ts` | Name, tagline, short bio, location, email, profile links |
| `stories.ts` | Stories (typed blocks: paragraphs, headings, quotes, images, galleries, video) |
| `multimedia.ts` | Video packages, commentary playlists, podcasts and audio |
| `published.ts` | Links to Shane's articles at other outlets (Stories page) |
| `resume.ts` | About-page biography and interests; résumé profile, education, experience, skills, phone, PDF path |
| `photos.ts` | Portrait and home-page hero |

Step-by-step instructions are in [docs/CONTENT_GUIDE.md](docs/CONTENT_GUIDE.md).

## Documentation

- [Architecture](docs/ARCHITECTURE.md): structure, routing, content flow and dependencies
- [Design system](docs/DESIGN_SYSTEM.md): tokens, type, spacing, components and motion
- [Content guide](docs/CONTENT_GUIDE.md): publishing stories, videos, photos and the résumé
- [Performance](docs/PERFORMANCE.md): optimisations and measured Lighthouse results
- [Accessibility](docs/ACCESSIBILITY.md): approach and the checks that were run
- [Security](docs/SECURITY.md): threat model, headers, CSP and known limitations
- [Deployment](docs/DEPLOYMENT.md): environment variables, hosting, HTTPS and the launch checklist
