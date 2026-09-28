# Deployment

The site builds to static HTML plus a small Node server that `next start` runs for image optimisation. Any host that runs Next.js 16 works. Vercel requires no configuration; Netlify, Cloudflare (via OpenNext), Render, Railway, Fly.io or a VPS with Node all work too.

## Build configuration

| Setting | Value |
| --- | --- |
| Node.js | 20.9 or newer (tested on 24) |
| Install | `npm ci` |
| Build | `npm run build` |
| Start (self-hosting) | `npm run start` (listens on `PORT`, default 3000) |
| Output | `.next/` |

## Environment variables

| Variable | Required | Example | Purpose |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | **Yes, in production** | `https://shaneriley.com` | Canonical URLs, Open Graph URLs, sitemap and robots. Without it, links point at `http://localhost:3000` |
| `SITE_ALLOW_INDEXING` | No | `false` | Set to `false` on preview or staging deployments so `robots.txt` disallows crawling |

These are read at build time, so rebuild after changing them. There are no secrets.

## Deploying to Vercel (simplest)

1. Push the repository to GitHub.
2. Import it at vercel.com/new. The framework (Next.js) is detected automatically.
3. Add `NEXT_PUBLIC_SITE_URL` (Production) and `SITE_ALLOW_INDEXING=false` (Preview).
4. Deploy, then add your custom domain under Settings → Domains.

## Self-hosting

```bash
npm ci
NEXT_PUBLIC_SITE_URL=https://yourdomain.com npm run build
PORT=3000 npm run start
```

Put a reverse proxy (Caddy, nginx) in front for TLS. Caddy obtains and renews certificates automatically:

```
yourdomain.com {
  reverse_proxy localhost:3000
}
```

Run the Node process under a supervisor (systemd, pm2, or a container restart policy).

## HTTPS and HSTS

- **Serve the site only over HTTPS.** Vercel, Netlify and Cloudflare do this automatically with free certificates. When self-hosting, use Caddy or Let's Encrypt with certbot.
- Redirect HTTP to HTTPS at the host or proxy. Managed hosts do this by default.
- The app sends `Strict-Transport-Security: max-age=63072000` (two years) in production. Browsers act on it only when it arrives over HTTPS, and from then on they refuse plain-HTTP connections to the domain.
- `includeSubDomains` and `preload` are intentionally **not** set. Add them only when every subdomain (including `www` and any mail or legacy subdomains) serves HTTPS, and submit the domain to hstspreload.org only once you are sure. Preloading is hard to undo.
- The CSP includes `upgrade-insecure-requests`, so any stray `http://` sub-resource is fetched over HTTPS.

If your host also adds security headers, check for duplicates or conflicts. Two different CSP headers are combined by browsers, which makes the effective policy the stricter intersection.

## Post-deployment checklist

- [ ] Every placeholder in `docs/CONTENT_GUIDE.md` is replaced, and `showPlaceholderLabels` is `false`
- [ ] Example stories are removed (or still `placeholder: true` if intentionally kept for a preview)
- [ ] `NEXT_PUBLIC_SITE_URL` is set; view source on a story and confirm the `canonical` and `og:url` use the real domain
- [ ] `https://yourdomain.com/robots.txt` allows crawling and points to the sitemap
- [ ] `https://yourdomain.com/sitemap.xml` lists the real pages and stories
- [ ] `http://yourdomain.com` redirects to `https://`
- [ ] Headers are present: `curl -sI https://yourdomain.com | grep -iE "content-security|strict-transport|x-content|referrer|permissions|x-frame"`, or use securityheaders.com
- [ ] The TLS configuration grades well on ssllabs.com
- [ ] A video plays on the live site, and the browser console shows no CSP errors
- [ ] The résumé Download PDF button appears if a PDF was added, and the file downloads
- [ ] The email link opens a mail client with the right address; social links go to the right profiles
- [ ] Share previews look right (opengraph.xyz, or paste the link into a messaging app)
- [ ] Lighthouse or PageSpeed Insights has been run on the live URL, and results recorded in `docs/PERFORMANCE.md`
- [ ] Submit the sitemap in Google Search Console (optional)
- [ ] Hosting, domain and email accounts use strong unique passwords and two-factor authentication
- [ ] Dependabot or Renovate is enabled on the repository
