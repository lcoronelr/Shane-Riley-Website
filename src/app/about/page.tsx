import type { Metadata } from "next";
import Link from "next/link";

import { Picture } from "@/components/media/Picture";
import { ButtonLink, SectionLabel } from "@/components/ui/primitives";
import { portraitPhoto } from "@/content/photos";
import { about, timeline } from "@/content/resume";
import { activeSocialLinks, site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: `Biography of ${site.name}.`,
  alternates: { canonical: "/about" },
  openGraph: { url: "/about", title: `About — ${site.name}` },
};

export default function AboutPage() {
  return (
    <>
      <div className="shell pt-12 sm:pt-16 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionLabel>About</SectionLabel>
            <h1 className="hero-rise mt-5 font-serif text-step-5 font-light tracking-[-0.03em]">
              {site.name}
            </h1>
            <p
              className="hero-rise mt-8 max-w-[34ch] font-serif text-step-3 leading-[1.15] font-light tracking-[-0.015em] text-charcoal/85"
              style={{ ["--rise-delay" as string]: "120ms" }}
            >
              {about.intro}
            </p>
          </div>
          <div className="lg:col-span-5 lg:pt-6">
            <Picture photo={portraitPhoto} sizes="(min-width: 64rem) 36vw, 100vw" ratio="4 / 5" preload />
          </div>
        </div>
      </div>

      <div className="shell py-section">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-16">
          <section aria-labelledby="bio-heading" className="lg:col-span-7" data-reveal>
            <h2 id="bio-heading" className="kicker text-slate-ink">
              Background
            </h2>
            <div className="mt-6 space-y-6 font-serif text-step-1 leading-[1.7] text-charcoal/85">
              {about.biography.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </section>

          <aside className="space-y-12 lg:col-span-4 lg:col-start-9" data-reveal style={{ ["--reveal-delay" as string]: "120ms" }}>
            <section aria-labelledby="interests-heading">
              <h2 id="interests-heading" className="kicker text-slate-ink">
                Interests
              </h2>
              <ul className="mt-5 divide-y divide-rule border-y border-rule">
                {about.interests.map((interest) => (
                  <li key={interest} className="py-3.5 text-step-0">
                    {interest}
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="elsewhere-heading">
              <h2 id="elsewhere-heading" className="kicker text-slate-ink">
                Elsewhere
              </h2>
              <ul className="mt-5 space-y-1">
                <li>
                  <a href={`mailto:${site.email}`} className="link-draw inline-flex min-h-11 items-center">
                    {site.email}
                  </a>
                </li>
                {activeSocialLinks.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="me noopener noreferrer"
                      className="link-draw inline-flex min-h-11 items-center"
                    >
                      {s.label}
                      {s.handle && <span className="ml-2 text-slate-ink">{s.handle}</span>}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
              {activeSocialLinks.length === 0 && (
                <p className="mt-2 text-step--1 text-slate-ink">
                  Add social profiles in <code className="text-[0.85em]">src/content/site.ts</code>.
                </p>
              )}
            </section>
          </aside>
        </div>
      </div>

      <section aria-labelledby="timeline-heading" className="border-t border-rule bg-surface">
        <div className="shell py-section">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionLabel>Experience</SectionLabel>
              <h2 id="timeline-heading" className="mt-5 font-serif text-step-3 tracking-[-0.02em]">
                Timeline
              </h2>
              <p className="mt-4 text-slate-ink">
                The full record is on the{" "}
                <Link href="/resume" className="link-inline">
                  résumé
                </Link>
                .
              </p>
            </div>
            <ol className="relative lg:col-span-8">
              {timeline.map((entry, i) => (
                <li
                  key={i}
                  data-reveal
                  style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
                  className="relative grid gap-2 border-t border-rule py-7 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-8"
                >
                  <p className="kicker tabular pt-1 text-slate-ink">{entry.period}</p>
                  <div>
                    <h3 className="font-serif text-step-2">{entry.title}</h3>
                    <p className="mt-1 text-charcoal/80">{entry.organization}</p>
                    {entry.description && <p className="mt-3 text-step--1 text-slate-ink">{entry.description}</p>}
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="mt-14 flex flex-wrap gap-3">
            <ButtonLink href="/stories">Read the stories</ButtonLink>
            <ButtonLink href="/contact" tone="secondary" icon="none">
              Get in touch
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
