# Accessibility

Target: **WCAG 2.2 Level AA**.

## Approach

**Structure**
- Landmarks on every page: `header[role=banner]`, `nav` (labelled "Primary", "Footer" and "Breadcrumb"), `main#main-content`, `footer[role=contentinfo]`, and `aside` where appropriate.
- Exactly one `h1` per page and no skipped heading levels (checked by axe).
- A skip link ("Skip to content") is the first tab stop and moves focus into `main`.
- `lang="en"` and a descriptive `<title>` on every page.

**Keyboard and focus**
- Everything interactive is a native `<a>` or `<button>`.
- A visible 2px cobalt focus ring (light cobalt on dark sections) appears on every focusable element.
- **Mobile menu:** a button with `aria-expanded` and `aria-controls`. Focus moves to the first link when it opens, and the page behind becomes `inert` and scroll-locked. Escape closes it and returns focus to the toggle, and it also closes after navigation.
- **Lightbox:** a native modal `<dialog>` labelled by the essay title. Focus moves to Close on open and Tab cycles inside the dialog. Arrow keys move between photos, Escape closes, and focus returns to the thumbnail of the last photo viewed. The counter ("3 / 5") is announced politely, and swipe gestures work on touch screens.
- **Video:** the poster is a single button whose accessible name includes the visible "Play" text and the video title. After a click, focus moves into the player. Autoplay after that click has sound only because the visitor asked to play.

**Content**
- Every photograph has written alt text in `photos.ts` (a required field). Decorative duplicates, such as thumbnails whose button already carries a label, use `alt=""`.
- Captions and photographer credits are visible under images and in the lightbox where they exist. Shane's photo essays carry his full captions; most article photos have alt text but no caption.
- Videos show whether captions are available, and provide a transcript in an expandable `<details>` panel where one exists.
- Link text is meaningful ("All stories", "Full biography"). Links that open a new tab say so to screen readers.

**Visual**
- Colour contrast meets AA. The requested slate (3.96:1) is used only for large or decorative text, and a darker `slate-ink` (5.6:1) is used for small text. See DESIGN_SYSTEM.md.
- Text uses fluid `clamp()` sizes with a 16px minimum for body copy, and is not locked against zoom.
- Tap targets for navigation and buttons are at least 44 × 44px.
- No information is conveyed by colour alone, and no feature depends on hover.

**Motion**
- `prefers-reduced-motion: reduce` disables all CSS animations and transitions, smooth scrolling, the reading-progress bar and Motion transforms.
- Scroll-reveal content is hidden only when JavaScript is running and reduced motion is not requested. With JavaScript off, everything is visible.

## Checks performed (2026-09-27)

**Automated** (`npm run test:e2e`, Chrome 153, production build, real content: 80 tests, all passing):

| Check | Where |
| --- | --- |
| axe-core (WCAG 2.0/2.1 A and AA, WCAG 2.2 AA tags): **0 violations** on all 8 routes at 1280px, and with the lightbox open at 375px | `tests/a11y.spec.ts` |
| Skip link is the first tab stop and focuses `main` | `tests/navigation.spec.ts` |
| Focus indicator present on the first six tab stops | `tests/navigation.spec.ts` |
| Reduced motion: all reveal content visible without scrolling; `scroll-behavior: auto` | `tests/navigation.spec.ts` |
| Lightbox: keyboard open, arrows, focus containment across 5 Tabs, Escape, focus restoration | `tests/multimedia.spec.ts` |
| Mobile menu: `aria-expanded`, initial focus, `inert` background, Escape returns focus | `tests/mobile.spec.ts` |
| Tap targets ≥ 44px (header, story buttons, footer navigation) at 375px | `tests/mobile.spec.ts` |
| Touch: menu, story cards and lightbox swipe | `tests/mobile.spec.ts` |

**Lighthouse** accessibility score: 100 on all seven main pages, mobile and desktop.

**Manual/visual:** screenshots reviewed at 375, 768, 1280, 1440 and 1920px; the open mobile menu and lightbox inspected; every page loaded with JavaScript disabled (all content visible).

**Issues found and fixed during testing:** a photo credit at 90% opacity fell below AA contrast; a skipped heading level (h1 to h3) on Multimedia; a play-button accessible name that didn't contain its visible label; Tab escaping the lightbox into browser chrome.

## Not yet verified

- A **screen-reader walkthrough** (NVDA with Firefox or Chrome on Windows; VoiceOver on macOS and iOS). Recommended before launch: navigate by landmarks and headings, open and close the lightbox, and play a video.
- **Windows High Contrast / forced-colors** mode.
- **200% and 400% zoom** reflow testing by hand (layouts are fluid and pass 375px, which approximates 400% zoom at 1280px, but this wasn't checked directly).
- Captions and transcripts for real videos, which depend on the content you add.
