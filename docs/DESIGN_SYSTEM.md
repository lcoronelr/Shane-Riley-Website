# Design system

Tokens are defined once in `src/app/globals.css` (the Tailwind v4 `@theme` block) and are available as Tailwind utilities, for example `bg-ivory`, `text-step-3` and `py-section`.

## Palette

| Token | Value | Use | Contrast |
| --- | --- | --- | --- |
| `ivory` | `#F7F6F2` | Page background | — |
| `charcoal` | `#17191C` | Text, cinematic dark sections | 16.3:1 on ivory |
| `slate` | `#747B84` | Decorative numerals, rules, **large text only** on ivory | 3.96:1 on ivory |
| `slate-ink` | `#5C636C` | Small secondary text on ivory and white | 5.6:1 on ivory |
| `slate-light` | `#A1A8B0` | Secondary text on charcoal | 7.3:1 on charcoal |
| `cobalt` | `#325DF4` | Selective accent: links, primary buttons, focus rings, kickers | 4.9:1 on ivory; white on cobalt 5.3:1 |
| `cobalt-deep` | `#2346C8` | Hover state for cobalt buttons | white on it 7.6:1 |
| `cobalt-light` | `#8AA6FF` | Accent and focus rings on charcoal | 7.5:1 on charcoal |
| `surface` | `#FFFFFF` | Raised bands (contact CTA, related stories, timeline) | — |
| `rule`, `rule-strong`, `rule-dark` | Charcoal at 14% and 32%, white at 16% | Hairline borders | — |

The requested slate (`#747B84`) is 3.96:1 on ivory, below the 4.5:1 AA minimum for small text. It is kept for large and decorative uses, and `slate-ink` was added for small text. The orange dot in `PlaceholderTag` (`#D9822B`) is decorative and appears only on placeholder labels.

## Typography

| Family | Role | Loading |
| --- | --- | --- |
| **Newsreader** (variable weight), roman | Headlines, decks, long-form body | `next/font/google`, self-hosted, preloaded, `display: swap` |
| **Newsreader** italic | Decks, pull quotes, accent words | Self-hosted, *not* preloaded, so it stays off the critical path |
| **Geist** (variable) | UI, navigation, metadata, captions, body UI text | Self-hosted, preloaded |

Fluid scale (`clamp()`; minimum at about 375px, maximum at about 1440px):

| Token | Range | Typical use |
| --- | --- | --- |
| `text-step--1` | 13–14px | Captions, metadata, kickers |
| `text-step-0` | 16–18px | UI body |
| `text-step-1` | 19–23px | Lead paragraphs, small headlines |
| `text-step-2` | 23–32px | Card headlines |
| `text-step-3` | 30–48px | Section headlines, pull quotes |
| `text-step-4` | 38–72px | Feature headlines |
| `text-step-5` | 46–116px | Page titles and hero |

Long-form article text (`.story-body`) is Newsreader at 18–21px with 1.7 line height and a measure of about 40rem (65–75 characters), with a drop cap on the first paragraph.

Utilities: `kicker` (uppercase, 0.14em tracking, semibold sans), `tabular` (tabular figures), and `text-balance` / `text-pretty` applied to headings and paragraphs.

## Spacing and layout

- `shell`: page container, max 90rem, fluid side gutter `clamp(1.25rem, 0.5rem + 3.4vw, 3.5rem)`.
- `section` spacing: `clamp(4.5rem, 3rem + 6vw, 10rem)` for vertical rhythm between editorial sections (`py-section`, `mt-section`).
- `header`: 4rem, the header height (`h-header`, `-mt-header` pulls cinematic heroes under the transparent header).
- Grids are 12-column and deliberately asymmetrical (7/5 spread, 8/4 multimedia, 4/8 timeline), separated by hairline rules rather than card boxes.

Breakpoints are Tailwind defaults: `sm` 40rem (640px), `md` 48rem (768px), `lg` 64rem (1024px), `xl` 80rem, `2xl` 96rem. Design is mobile-first and verified at 375, 768, 1280, 1440 and 1920px.

## Components

| Component | Notes |
| --- | --- |
| `SiteHeader` | Sticky; transparent over dark heroes, translucent ivory or charcoal once scrolled; animated active-link underline (`layoutId`); full-screen mobile menu |
| `SiteFooter` | Wordmark, section links, profiles, credits link |
| `ButtonLink` | `primary` (cobalt), `secondary` (outline, inverts on hover), `ghost-dark` (on charcoal). Pill shape, 48px minimum height, 0.98 press scale |
| `SectionLabel` | Index number, hairline and kicker above section titles |
| `PlaceholderTag` | Labels example content; disabled globally with `site.showPlaceholderLabels` |
| `Picture` / `Caption` | Aspect-locked `next/image` with blur placeholder and focal point; caption with credit |
| `LeadStoryCard`, `SupportingStoryCard`, `StoryCard`, `StoryMeta` | Magazine-spread and archive cards |
| `StoryBody` | Renders typed story blocks; wide images and galleries break out of the text column |
| `VideoPlayer` | Poster-first, click-to-load YouTube (nocookie) and Vimeo (dnt), or native `<video>` with captions |
| `PhotoGallery` | Mosaic or strip of thumbnails opening a `<dialog>` lightbox |
| `PortraitPlaceholder` | Monogram block used instead of a stock portrait |

## Motion

| Token | Value |
| --- | --- |
| `--ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)`: entrances, reveals, hovers |
| `--ease-in-out-quart` | `cubic-bezier(0.76, 0, 0.24, 1)`: the curtain reveal |
| `--duration-quick` / `base` / `slow` / `cinematic` | 180 / 320 / 900 / 1400ms |

Patterns:

- **Hero entrance:** headline lines rise in with a stagger (`.hero-rise`), and the hero photograph settles from 1.08 to 1.0 scale (`.hero-settle`). CSS only.
- **Scroll reveal:** `data-reveal` elements fade and rise 28px once, when they enter the viewport. `--reveal-delay` staggers siblings. A single IntersectionObserver serves the whole site; there are no scroll listeners.
- **Signature, curtain reveal:** the lead story image on the home page is uncovered by an ivory curtain that lifts (`scaleY` 1 to 0) while the photo settles from 1.14 scale (`data-reveal="mask"`).
- **Hover:** images ease to 1.035 scale over 1.4s, and underlines draw in from the left.
- **Reading progress:** a CSS scroll-driven animation (`animation-timeline: scroll()`), with no JavaScript. It is omitted where unsupported.

Only `opacity` and `transform` are animated, apart from colour transitions on buttons. `prefers-reduced-motion: reduce` disables every animation and transition, smooth scrolling and Motion's transforms (`MotionConfig reducedMotion="user"`). Content is fully visible with animations disabled or JavaScript off.
