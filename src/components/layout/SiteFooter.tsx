import Link from "next/link";

import { SocialIcon, iconLinkClass } from "@/components/ui/SocialIcon";
import { activeSocialLinks, navigation, site } from "@/content/site";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer role="contentinfo" className="border-t border-rule bg-ivory">
      <div className="shell grid gap-12 py-14 md:grid-cols-12 md:py-16">
        <div className="md:col-span-5">
          <p className="font-serif text-step-2 leading-tight tracking-[-0.01em]">{site.name}</p>
          <p className="mt-2 max-w-sm text-step--1 text-slate-ink">{site.tagline}</p>
          <a
            href={`mailto:${site.email}`}
            className="link-draw mt-6 inline-block text-step-0 font-medium"
          >
            {site.email}
          </a>
        </div>

        <nav aria-label="Footer" className="md:col-span-4">
          <h2 className="kicker text-slate-ink">Sections</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-1">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-draw inline-flex min-h-11 items-center">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <h2 className="kicker text-slate-ink">Elsewhere</h2>
          {activeSocialLinks.length > 0 ? (
            <ul className="mt-4 flex flex-wrap gap-3">
              {activeSocialLinks.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="me noopener noreferrer"
                    title={s.label}
                    className={iconLinkClass}
                  >
                    <SocialIcon link={s} className="size-5" />
                    <span className="sr-only">{s.label} (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-step--1 text-slate-ink">
              Social profiles will appear here once they are added in{" "}
              <code className="text-[0.85em]">src/content/site.ts</code>.
            </p>
          )}
        </div>
      </div>
      <div className="shell flex flex-col gap-2 border-t border-rule py-6 text-step--1 text-slate-ink sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
