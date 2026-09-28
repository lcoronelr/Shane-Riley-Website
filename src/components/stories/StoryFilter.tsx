"use client";

import { useId, useMemo, useSyncExternalStore } from "react";

import { StoryCard } from "@/components/stories/StoryCard";
import type { Story } from "@/content/types";

const ALL = "All";
const URL_CHANGE = "storyfilter:urlchange";

function subscribeToSearch(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  window.addEventListener(URL_CHANGE, onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(URL_CHANGE, onChange);
  };
}

/**
 * Filters the story list by sport and by type. Filters are toggle buttons
 * (aria-pressed) so they work with a keyboard, touch and screen readers, and
 * the current selection is mirrored in the URL (?sport=&type=) so it can be
 * shared and survives reloads.
 */
export function StoryFilter({ stories }: { stories: Story[] }) {
  const sports = useMemo(() => unique(stories.map((s) => s.sport)), [stories]);
  const types = useMemo(() => unique(stories.map((s) => s.type)), [stories]);
  const sportLabel = useId();
  const typeLabel = useId();

  // The URL query string is the single source of truth for the selection.
  // The server snapshot is empty, so the static HTML shows every story.
  const search = useSyncExternalStore(
    subscribeToSearch,
    () => window.location.search,
    () => "",
  );
  const params = new URLSearchParams(search);
  const sport = sports.find((x) => slug(x) === params.get("sport")) ?? ALL;
  const type = types.find((x) => slug(x) === params.get("type")) ?? ALL;

  const update = (nextSport: string, nextType: string) => {
    const next = new URLSearchParams();
    if (nextSport !== ALL) next.set("sport", slug(nextSport));
    if (nextType !== ALL) next.set("type", slug(nextType));
    const qs = next.toString();
    window.history.replaceState(window.history.state, "", qs ? `?${qs}` : window.location.pathname);
    window.dispatchEvent(new Event(URL_CHANGE));
  };

  const results = stories.filter(
    (s) => (sport === ALL || s.sport === sport) && (type === ALL || s.type === type),
  );

  const summary =
    results.length === 0
      ? "No stories match these filters."
      : `Showing ${results.length} ${results.length === 1 ? "story" : "stories"}${
          sport !== ALL ? ` about ${sport.toLowerCase()}` : ""
        }${type !== ALL ? ` · ${type.toLowerCase()}` : ""}.`;

  return (
    <div>
      <div className="space-y-5 border-y border-rule py-6" data-print="hide">
        <FilterGroup
          labelId={sportLabel}
          label="Sport"
          options={[ALL, ...sports]}
          value={sport}
          onChange={(v) => update(v, type)}
        />
        <FilterGroup
          labelId={typeLabel}
          label="Type"
          options={[ALL, ...types]}
          value={type}
          onChange={(v) => update(sport, v)}
        />
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <p role="status" aria-live="polite" className="text-step--1 text-slate-ink">
          {summary}
        </p>
        {(sport !== ALL || type !== ALL) && (
          <button
            type="button"
            onClick={() => update(ALL, ALL)}
            className="link-inline min-h-11 text-step--1 font-medium"
          >
            Clear filters
          </button>
        )}
      </div>

      {results.length > 0 ? (
        <ul
          key={`${sport}|${type}`}
          className="fade-up-list mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
        >
          {results.map((story, i) => (
            <li
              key={story.slug}
              style={{ ["--i" as string]: i }}
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
      ) : (
        <div className="mt-10 border border-dashed border-rule-strong p-10 text-center">
          <p className="font-serif text-step-2">Nothing here yet.</p>
          <p className="mt-2 text-slate-ink">Try another sport or type, or clear the filters.</p>
          <button
            type="button"
            onClick={() => update(ALL, ALL)}
            className="mt-6 inline-flex min-h-11 items-center rounded-full border border-rule-strong px-5 font-medium hover:border-charcoal"
          >
            Show all stories
          </button>
        </div>
      )}
    </div>
  );
}

function FilterGroup({
  label,
  labelId,
  options,
  value,
  onChange,
}: {
  label: string;
  labelId: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
      <span id={labelId} className="kicker w-16 shrink-0 text-slate-ink">
        {label}
      </span>
      <div role="group" aria-labelledby={labelId} className="flex flex-wrap gap-2">
        {options.map((option) => {
          const pressed = option === value;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={pressed}
              onClick={() => onChange(option)}
              className={[
                "inline-flex min-h-11 items-center rounded-full border px-4 text-[0.875rem] transition-[background-color,color,border-color] duration-200",
                pressed
                  ? "border-charcoal bg-charcoal text-ivory"
                  : "border-rule-strong text-charcoal hover:border-charcoal",
              ].join(" ")}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function unique<T>(values: T[]): T[] {
  return [...new Set(values)];
}

function slug(value: string) {
  return value.toLowerCase().replace(/\s+/g, "-");
}
