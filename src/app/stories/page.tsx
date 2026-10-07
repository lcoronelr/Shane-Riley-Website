import { ArrowDown, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";

import { StoryCard } from "@/components/stories/StoryCard";
import { SectionLabel } from "@/components/ui/primitives";
import { outlets } from "@/content/published";
import { site } from "@/content/site";
import { getAllStories } from "@/lib/content";

export const metadata: Metadata = {
  title: "Stories",
  description: `Features, profiles, news and columns by ${site.name}.`,
  alternates: { canonical: "/stories" },
  openGraph: { url: "/stories", title: `Stories — ${site.name}` },
};

export default function StoriesPage() {
  const stories = getAllStories();

  return (
    <div className="shell pt-12 pb-section sm:pt-16 lg:pt-20">
      <header className="grid gap-8 border-b border-rule pb-12 lg:grid-cols-12 lg:items-end lg:pb-16">
        <div className="lg:col-span-8">
          <SectionLabel>Archive</SectionLabel>
          <h1 className="hero-rise mt-5 font-serif text-step-5 font-light tracking-[-0.03em]">Stories</h1>
        </div>
        <div className="lg:col-span-4">
          <p className="text-step-1 leading-relaxed text-charcoal/80">
            Features, profiles, news and columns, from college athletics to Olympians.
          </p>
          <a href="#published-elsewhere" className="group mt-5 inline-flex min-h-11 items-center gap-2 font-medium text-cobalt">
            <span className="link-draw">More published work</span>
            <ArrowDown aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" strokeWidth={1.75} />
          </a>
        </div>
      </header>

      <ul className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
        {stories.map((story, i) => (
          <li
            key={story.slug}
            data-reveal={i > 2 ? "" : undefined}
            style={i > 2 ? { ["--reveal-delay" as string]: `${(i % 3) * 90}ms` } : undefined}
            className={i === 0 ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : ""}
          >
            <StoryCard
              story={story}
              headingLevel="h2"
              ratio="3 / 2"
              aspectClassName={i === 0 ? "aspect-[16/10] lg:aspect-[20/19]" : undefined}
              sizes={
                i === 0
                  ? "(min-width: 64rem) 62vw, (min-width: 40rem) 90vw, 100vw"
                  : "(min-width: 64rem) 30vw, (min-width: 40rem) 45vw, 100vw"
              }
            />
          </li>
        ))}
      </ul>

      <section
        id="published-elsewhere"
        aria-labelledby="published-elsewhere-heading"
        className="mt-section scroll-mt-24 border-t border-charcoal pt-12"
      >
        <SectionLabel>Published elsewhere</SectionLabel>
        <h2 id="published-elsewhere-heading" className="mt-5 font-serif text-step-4 font-light tracking-[-0.025em]">
          More published work
        </h2>
        <p className="mt-4 max-w-[48ch] text-step-1 leading-relaxed text-charcoal/80">
          Reporting for {outlets.map((o) => o.name).join(" and ")}.
        </p>
        <div className="mt-12 space-y-16">
          {outlets.map((outlet) => (
            <div key={outlet.name}>
              <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-rule pb-4">
                <h3 className="font-serif text-step-2">{outlet.name}</h3>
                <a
                  href={outlet.authorUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-inline inline-flex min-h-11 items-center text-step--1 font-medium"
                >
                  All stories<span className="sr-only"> at {outlet.name} (opens in a new tab)</span>
                </a>
              </div>
              <ul className="grid md:grid-cols-2 md:gap-x-12">
                {outlet.articles.map((article) => (
                  <li key={article.url} className="border-b border-rule">
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group grid grid-cols-[minmax(0,1fr)_auto] gap-4 py-5"
                    >
                      <span>
                        <span className="block font-serif text-step-1 leading-snug">
                          <span className="link-draw">{article.title}</span>
                        </span>
                        <span className="mt-1.5 block text-step--1 leading-relaxed text-slate-ink">{article.summary}</span>
                      </span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="mt-1 size-4 text-slate transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        strokeWidth={1.75}
                      />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
