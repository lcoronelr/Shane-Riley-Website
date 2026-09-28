# Claude Code Build Instructions: Premium Sports Journalism Portfolio

You are a senior creative director, frontend engineer, accessibility specialist, and application-security engineer working inside my VS Code project. **Build the working website**, not just a mockup or a written plan. Work through the phases below in order, make reasonable decisions without repeatedly asking me questions, and report what you actually implemented and verified.

## 1. Project goal

Create a distinctive, premium **sports journalism portfolio** with the editorial credibility of a high-end sports magazine and the visual refinement and fluid interactions associated with Apple product websites. The result should be minimalist, cinematic, image- and video-rich, extraordinarily polished, responsive, accessible, fast, and secure. It must feel like a journalist's own publication rather than a generic portfolio template.

Use editable placeholder content where I have not provided actual names, articles, credentials, imagery, or résumé details. Clearly mark every placeholder; never invent real career history, published reporting, affiliations, or awards.

## 2. Inspect and scaffold

1. Inspect the existing repository, dependencies, scripts, and directory structure. Preserve useful code if already present.
2. If the project is empty, scaffold **Next.js (App Router) + TypeScript + Tailwind CSS**.
3. Use Server Components by default and Client Components only for interactive elements.
4. Use **Motion for React** sparingly for transitions, **Lucide** for icons, and `next/image` for optimized imagery. Avoid unnecessary packages and heavyweight animation/scrolling frameworks.
5. Store editable content locally in typed data files or MDX. Keep deployment simple; do not add a database, CMS, authentication system, or backend unless required by a real feature.
6. Write a short architectural explanation in `docs/ARCHITECTURE.md` before introducing unnecessary complexity.

## 3. Establish the visual identity

Create design tokens for the following palette, with the flexibility to fine-tune contrast:

| Role | Color |
| --- | --- |
| Warm ivory background | `#F7F6F2` |
| Primary charcoal | `#17191C` |
| Muted slate | `#747B84` |
| Selective cobalt accent | `#325DF4` |
| White surface | `#FFFFFF` |

- Pair a sophisticated editorial **serif headline font** with a crisp, contemporary **sans-serif UI/body font**; optimize font loading.
- Use large headlines, deliberate whitespace, excellent alignment, fine borders, asymmetrical magazine grids, and dramatic but tasteful photography.
- Introduce cinematic dark sections strategically, especially for featured video and major stories.
- Use responsive type with `clamp()` and a consistent spacing and motion system.
- Avoid template-looking card grids, gratuitous gradients, neon effects, excessive glassmorphism, and movement with no editorial purpose.
- Build reusable design primitives and document tokens in `docs/DESIGN_SYSTEM.md`.

## 4. Build the pages

### Home `/`

- Minimal, polished header with journalist wordmark/name and links: **Home, Stories, Multimedia, About, Résumé, Contact**.
- Accessible mobile menu with smooth open/close animation, proper focus behavior, and clearly visible focus states.
- Cinematic hero with a major headline, short journalist description, dramatic licensed/placeholder sports photography or optimized optional video, and prominent **Explore Stories** CTA.
- Featured-story section arranged as an editorial magazine spread: one dominant story and several supporting stories, with striking images, metadata, and thoughtful hover states.
- Multimedia teaser featuring video journalism, interviews, photography, or documentary work.
- Short About section with portrait placeholder and a route to the full biography.
- Elegant contact CTA and minimal footer with working social/email links when those details are available.

### Stories `/stories` and individual articles `/stories/[slug]`

- Create a dynamic story index with filters by sport and/or content type. Ensure filtering works with keyboard and on mobile.
- Build polished story previews with category, date, title, excerpt, and responsive photographs.
- Build individual story pages with accessible long-form typography, byline, publication date, image captions, optional pull quotes, inline galleries, and optional video embeds.
- Support MDX or typed story content and clearly marked example stories.
- Add accessible share controls (native Web Share API where supported, copy-link fallback) and optional unobtrusive reading progress.
- Add suitable page-level metadata, canonical URLs, and article structured data **only when accurate metadata exists**.

### Multimedia `/multimedia`

- Present video reporting, interviews, documentary clips, and photo essays in a visually engaging editorial layout.
- Use lightweight posters and **click-to-load** external video embeds so video players do not harm initial page speed or privacy.
- Build an accessible photo gallery/lightbox with keyboard controls and focus management if a lightbox is included.
- Keep native playback controls, avoid autoplay with sound, and provide fields for captions/transcripts.

### About `/about`

- Create an attractive editorial biography with portrait placeholder, reporting interests, professional background, editable experience timeline, and social links.

### Résumé `/resume`

- Build a proper responsive **HTML résumé page** with editable sections for experience, education, selected work, skills, and awards.
- Add print styles. Offer **Download PDF** only when a genuine résumé PDF is present; never create a broken button.
- Do not fabricate professional qualifications or employment history.

### Contact `/contact`

- Create a polished contact page with a working email link and editable professional social profiles.
- Only add a contact form if a real backend/provider is configured. If added, implement real server-side validation, spam protection, rate limiting where supported, safe failure states, and privacy-conscious handling. Do not ship a fake form or expose keys.

## 5. Build exceptionally polished interaction and motion

Aim for Apple's **level of refinement**, not a copy of its design:

1. Add graceful entrance animations to major editorial sections and select headlines.
2. Use restrained hover and press states, image reveal transitions, and coordinated navigation indicators.
3. Make links and section navigation feel seamless with native smooth anchor scrolling when appropriate; **do not hijack scrolling**.
4. Consider one signature interaction, such as a cinematic featured-story reveal, subtle image-mask reveal, or exceptionally smooth media transition. Prioritize usability over novelty.
5. Animate primarily `opacity` and `transform`; avoid layout-thrashing scroll effects and gratuitous animated elements.
6. Respect `prefers-reduced-motion` globally and preserve keyboard navigation, focus, browser back/forward behavior, and expected scroll positions.
7. Ensure the site still feels complete and attractive if animations are disabled.

## 6. Make every device experience excellent

- Design mobile-first and test at approximately **375px, 768px, 1280px, and 1920px** widths.
- Ensure the navigation, editorial grids, typography, galleries, videos, and résumé work beautifully on phones and tablets.
- Prevent horizontal overflow, tiny tap targets, overlapping content, clipped headlines, unexpected layout shifts, and hover-dependent features.
- Use responsive `next/image` sizing and preserve media aspect ratios.
- Verify real touch and keyboard interactions, not merely visual screenshots.

## 7. Performance engineering

Target a genuinely fast website rather than adding superficial performance claims:

- Target Lighthouse **90+** for Performance, Accessibility, Best Practices, and SEO where achievable; record measured results and conditions.
- Target Core Web Vitals: **LCP ≤ 2.5 s, CLS ≤ 0.1, INP ≤ 200 ms** for real-user 75th-percentile data when available.
- Prioritize the real hero/LCP image; lazy-load below-the-fold images and videos.
- Optimize image dimensions, formats, compression, loading priority, and responsive sizes.
- Optimize fonts; minimize unnecessary client JavaScript and third-party scripts.
- Code-split costly interactions and defer video iframes behind poster clicks.
- Limit animation work on scroll and test on low-powered/mobile conditions.
- Document actual measurements, tools, and remaining performance limitations in `docs/PERFORMANCE.md`.

## 8. Security and privacy

Implement applicable controls rather than simply claiming the site is secure:

- Keep secrets on the server; never hardcode credentials or expose private environment variables to the browser.
- Validate all untrusted user input **server-side** for any feature that accepts it.
- Use safe content rendering; avoid unsanitized HTML, unsafe dynamic embeds, and unnecessarily broad external-script permissions.
- Add an appropriate **Content Security Policy** compatible with Next.js and any approved external video providers, plus `X-Content-Type-Options: nosniff`, `Referrer-Policy`, and a restrictive `Permissions-Policy`.
- Require HTTPS for production; explain HSTS and host/deployment-level setup.
- Audit dependencies and remove unused packages.
- If a real contact form exists, enforce abuse controls and handle data minimally.
- Prefer privacy-conscious video embeds; do not add invasive analytics by default.
- Record threat assumptions, implemented controls, deployment-dependent settings, outstanding issues, and verification steps in `docs/SECURITY.md`.
- **Never** describe the site as unhackable or claim tests passed unless you ran them.

## 9. Accessibility

Target **WCAG 2.2 AA**:

- Semantic landmarks and correct heading hierarchy.
- Visible keyboard focus, skip link, accessible navigation/menu controls, accessible labels, and sufficient color contrast.
- Accessible responsive typography and tap targets.
- Meaningful alt text and descriptive image captions.
- Captions/transcripts for provided videos where available.
- Reduced-motion support and accessible gallery/lightbox controls if applicable.
- Proper keyboard testing, accessible form feedback if forms exist, and logical focus behavior on navigation.
- Record manual and automated accessibility checks in `docs/ACCESSIBILITY.md`.

## 10. SEO and metadata

- Add sensible metadata for every page and editable Open Graph/social sharing images.
- Generate `sitemap.xml` and `robots.txt` appropriately.
- Add canonical URLs and relevant structured data when the underlying facts are available.
- Provide meaningful link text, accessible navigation, sensible titles/descriptions, and human-readable article slugs.
- Avoid indexing obviously fictional placeholder articles as authentic journalism in a production deployment.

## 11. Content and asset management

- Centralize editable name, tagline, bio, social links, stories, multimedia, and résumé data.
- Create a clear folder structure for photography, video posters, and résumé assets.
- Use **licensed, original, or explicitly marked placeholder media**. Do not scrape and republish copyrighted sports photographs or clips.
- Add instructions for updating each content type in `docs/CONTENT_GUIDE.md`.
- Ensure the UI contains no broken image links, fake buttons, or nonfunctional navigation.

## 12. Testing and quality assurance

Set up and run the checks that make sense for the implemented project:

1. TypeScript check and lint.
2. Successful production build.
3. Automated tests for main route navigation, story pages and filters, multimedia behavior, mobile menu, and résumé page (Playwright if practical).
4. Keyboard navigation and reduced-motion checks.
5. Responsive layout inspection at the target widths.
6. Image/video loading, broken links, error states, and browser console inspection.
7. Dependency audit and security-header verification in the actual tested environment.
8. Lighthouse audits if tooling allows, with real reported results rather than invented scores.

Resolve issues you find. If a test cannot run because of environment constraints, explicitly document the missing verification and the exact command or procedure I should use later.

## 13. Documentation deliverables

Create and maintain:

- `README.md`: project overview, prerequisites, local development, build/test commands, and how to customize the site.
- `docs/ARCHITECTURE.md`: technical decisions, application structure, dependencies, content flow, and routing.
- `docs/DESIGN_SYSTEM.md`: palette, typography, spacing, components, breakpoints, and animation tokens.
- `docs/PERFORMANCE.md`: optimizations, benchmark procedures, actual results, and open performance issues.
- `docs/SECURITY.md`: threat model, headers/CSP, dependency management, input handling, privacy, deployment requirements, verification, and known limitations.
- `docs/ACCESSIBILITY.md`: accessibility approach and actual checks.
- `docs/CONTENT_GUIDE.md`: how to publish stories, embed videos, add photos, update personal details, and replace placeholder résumé content.
- `docs/DEPLOYMENT.md`: build configuration, environment variables, deployment, HTTPS, security configuration, and post-deployment checklist.

## 14. Execution order and completion criteria

Work through these milestones, completing each with functional code:

1. **Audit and scaffold:** inspect workspace; establish framework and reusable foundations.
2. **Design system and shell:** typography, tokens, responsive header/footer, and motion primitives.
3. **Homepage:** cinematic hero and compelling editorial sections.
4. **All primary routes:** Stories, individual articles, Multimedia, About, Résumé, and Contact.
5. **Interactive polish:** story filters, navigation states, accessible gallery/video interactions, and restrained transitions.
6. **Hardening:** responsiveness, accessibility, image/video performance, SEO, and application-level security.
7. **Verification and docs:** run available checks, resolve failures, finish Markdown documentation.

**Definition of done:** All six primary pages and article routes render; navigation, filters, media interactions, and résumé features work as advertised; mobile is polished; no essential actions are fake; the production build succeeds; available tests are executed; security and performance claims accurately match what was verified; documentation explains how to operate, personalize, and deploy the website.

When finished, provide a short final report containing the implemented features, modified files, commands executed, test results, any outstanding limitations, and the precise steps to run the site locally.
