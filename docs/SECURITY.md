# Security and privacy

No website is "unhackable". This document records what this site defends against, what is implemented, what depends on the hosting setup, and what remains open.

## Threat model

The site is a **static, read-only portfolio**. It has no user accounts, no database, no contact form, no API routes, no server actions and no secrets. Every page is prerendered at build time.

| Asset | Threats considered |
| --- | --- |
| The journalist's reputation and published content | Defacement through injected script or markup (XSS), content spoofing, clickjacking or framing |
| Visitors | Script injection, tracking by third parties, leaking referrer data, malicious embeds |
| The build and deployment | Compromised or vulnerable npm dependencies, leaked credentials in the repo |

Out of scope: the security of the hosting account, the domain registrar and email. Protect those with strong unique passwords and two-factor authentication.

## Implemented controls

### HTTP security headers (`next.config.ts`, applied to every route)

| Header | Value / purpose |
| --- | --- |
| `Content-Security-Policy` | See below |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin`: other sites see only the origin, never full URLs |
| `Permissions-Policy` | Denies camera, microphone, geolocation, payment, USB, sensors, Topics and similar. Allows `autoplay`, `fullscreen`, `encrypted-media` and `picture-in-picture` only for this site and the two approved video players. `web-share` for this site |
| `X-Frame-Options` | `DENY` (legacy companion to `frame-ancestors 'none'`) |
| `Cross-Origin-Opener-Policy` | `same-origin` |
| `Strict-Transport-Security` | `max-age=63072000` in production builds (browsers ignore it over plain HTTP; see DEPLOYMENT.md) |
| `X-Powered-By` | Removed (`poweredByHeader: false`) |

### Content Security Policy

```
default-src 'self';
script-src 'self' 'unsafe-inline';
style-src 'self' 'unsafe-inline';
img-src 'self' data: blob:;
font-src 'self';
media-src 'self';
connect-src 'self';
frame-src https://www.youtube-nocookie.com https://player.vimeo.com;
object-src 'none';
base-uri 'self';
form-action 'self';
frame-ancestors 'none';
manifest-src 'self';
worker-src 'self' blob:;
upgrade-insecure-requests
```

In development, `'unsafe-eval'` (required by React's dev tooling) and `ws:` (hot reload) are added and `upgrade-insecure-requests` is dropped.

**Trade-off: `'unsafe-inline'` for scripts.** Next.js emits inline scripts to hydrate each page. A stricter nonce-based CSP requires every page to be rendered dynamically per request (see `node_modules/next/dist/docs/01-app/02-guides/content-security-policy.md`), giving up static generation and CDN caching. For a site that renders no user input, this was judged a poor trade. The actual XSS risk is mitigated because:

- all scripts can load only from this origin (`'self'`), so an injected `<script src>` to another domain is blocked;
- no user input is ever rendered, and content is rendered as React text nodes, never as HTML;
- the only `dangerouslySetInnerHTML` uses are a fixed one-line string (the `js` class) and JSON-LD serialised with `<` escaped.

If the site ever gains dynamic user content, switch to the nonce approach with `proxy.ts` from the Next.js guide above.

`style-src 'unsafe-inline'` is required by `next/image` and Motion, which set inline styles. Style injection is far lower risk than script injection.

### Safe content rendering

- Story content is typed data (`StoryBlock`), not HTML or MDX, and is rendered as text. There is no HTML sanitiser because no HTML is accepted.
- JSON-LD is serialised with `JSON.stringify` and `<` escaped to `<`, as the Next.js guide recommends.
- External links use `rel="noopener noreferrer"` (plus `me` for social profiles).

### Video embeds

- Only YouTube (via the privacy-enhanced `youtube-nocookie.com`) and Vimeo (with `dnt=1`) are allowed, both in code and by `frame-src`.
- Video IDs are validated against strict patterns (`^[A-Za-z0-9_-]{11}$` for YouTube videos, `^PL[A-Za-z0-9_-]{16,64}$` for YouTube playlists, digits for Vimeo) before any URL is built. An invalid ID shows an error message instead of an iframe.
- Iframes load **only after a click**. No third-party request is made on page view (checked by an automated test).
- Iframes are sandboxed (`allow-scripts allow-same-origin allow-presentation allow-popups allow-popups-to-escape-sandbox`) with a minimal `allow` list and `referrerPolicy="strict-origin-when-cross-origin"`.

### Input handling

The site accepts no user input: there are no forms, no API routes, no server actions, and no pages that read query strings.

A contact form was **deliberately not built**: the brief allows one only with a real backend, and none is configured. The contact page uses a `mailto:` link, so no personal data touches the site. If a form is added later, it needs server-side validation (e.g. a schema library), a rate limit, spam protection (honeypot or a CAPTCHA provider added to the CSP), a provider API key kept only in server-side environment variables (never `NEXT_PUBLIC_`), generic error messages, and a note on the contact page about how messages are stored.

### Secrets and environment variables

There are no secrets. The only environment variables are `NEXT_PUBLIC_SITE_URL` (public by design) and `SITE_ALLOW_INDEXING`. `.env*` files are git-ignored.

### Privacy

- No analytics, cookies, tracking pixels, third-party fonts or third-party scripts.
- Fonts are self-hosted by `next/font`, so no request goes to Google.
- Video providers are contacted only when a visitor chooses to play a video, and the player says so ("Plays from youtube-nocookie.com after you press play").
- If you add analytics later, prefer a cookieless, privacy-focused provider, add its domain to `script-src`/`connect-src` explicitly, and update this document.

### Dependencies

- Runtime dependencies are minimal: `next`, `react`, `react-dom`, `motion`, `lucide-react`. Everything else is a development tool.
- `npm audit` on 2026-09-27: **0 vulnerabilities** (all dependencies and production-only).
- `package-lock.json` is committed, so builds are reproducible.
- Run `npm audit` and `npm outdated` monthly, and enable Dependabot or Renovate on the repository.

## Verification performed

| Check | Result |
| --- | --- |
| Security headers on the production server (`next start`), inspected with `curl -I` | All headers present as listed |
| Automated header test (`tests/navigation.spec.ts`) | Passes: CSP, nosniff, referrer policy, permissions policy, X-Frame-Options, no X-Powered-By |
| Real YouTube playback under the CSP, sandbox and Permissions-Policy (Chrome 153) | Plays after one click; no CSP violations or console errors |
| No third-party requests before the video is played (`tests/multimedia.spec.ts`) | Passes |
| Stories are indexable and canonical, carry no undated structured data, and drafts are `noindex` (`tests/stories.spec.ts`) | Passes |
| `npm audit` | 0 vulnerabilities |

Not verified here: HTTPS, HSTS and TLS configuration. These depend on the host; see DEPLOYMENT.md for the post-deploy checks.

## Known limitations and open items

- `script-src 'unsafe-inline'` (see the trade-off above).
- HSTS is sent without `includeSubDomains` or `preload`. Add them only when every subdomain of the domain is HTTPS-only.
- The CSP has no `report-to` endpoint, so violations in production are not collected.
- Security of the hosting account, DNS and email is outside this codebase.
