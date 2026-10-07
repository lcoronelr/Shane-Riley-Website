"use client";

import { Pause, Play, Radio, SkipBack, SkipForward } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import type { SportsFlashSegment } from "@/content/sports-flash";

const dayLabel = new Intl.DateTimeFormat("en-US", { weekday: "short", month: "long", day: "numeric", timeZone: "UTC" });
const longLabel = new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric", timeZone: "UTC" });
const monthLabel = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
const rangeLabel = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", timeZone: "UTC" });
const toDate = (iso: string) => new Date(`${iso}T12:00:00Z`);

/**
 * One player for a whole series of short clips: a "now playing" panel with
 * previous/next and optional continuous play, beside a day-by-day list of
 * segments grouped by month. Audio downloads only when a segment is played.
 */
export function SportsFlashPlayer({
  title,
  station,
  description,
  segments,
}: {
  title: string;
  station: string;
  description: string;
  segments: SportsFlashSegment[];
}) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [continuous, setContinuous] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);
  const pendingPlay = useRef(false);

  const current = segments[index];
  const segmentsPerDay = (date: string) => segments.filter((s) => s.date === date).length;
  const nowLabel = `${longLabel.format(toDate(current.date))}${segmentsPerDay(current.date) > 1 ? `, segment ${current.segment}` : ""}`;

  // Start playback once the newly selected source is in place.
  useEffect(() => {
    if (pendingPlay.current) {
      pendingPlay.current = false;
      audioRef.current?.play().catch(() => setPlaying(false));
    }
  }, [index]);

  const select = (i: number) => {
    if (i === index) {
      const el = audioRef.current;
      if (!el) return;
      if (el.paused) el.play().catch(() => setPlaying(false));
      else el.pause();
      return;
    }
    pendingPlay.current = true;
    setIndex(i);
  };

  // Group segments by month, then by day.
  const months: { key: string; days: { date: string; items: { seg: SportsFlashSegment; i: number }[] }[] }[] = [];
  segments.forEach((seg, i) => {
    const key = seg.date.slice(0, 7);
    let month = months.find((m) => m.key === key);
    if (!month) months.push((month = { key, days: [] }));
    let day = month.days.find((d) => d.date === seg.date);
    if (!day) month.days.push((day = { date: seg.date, items: [] }));
    day.items.push({ seg, i });
  });

  const first = segments[0];
  const last = segments[segments.length - 1];
  const dayCount = new Set(segments.map((s) => s.date)).size;

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      <div className="lg:sticky lg:top-24 lg:col-span-5 lg:self-start">
        <div className="border border-rule-dark bg-white/[0.04] p-6 sm:p-8">
          <p className="kicker flex items-center gap-2 text-cobalt-light">
            <Radio aria-hidden="true" className="size-4" strokeWidth={1.75} />
            Radio · {station}
          </p>
          <h3 className="mt-4 font-serif text-step-3 font-light tracking-[-0.02em]">{title}</h3>
          <p className="mt-3 text-step--1 leading-relaxed text-white/75">{description}</p>
          <p className="mt-3 text-step--1 text-slate-light">
            {segments.length} segments over {dayCount} days · {rangeLabel.format(toDate(first.date))} –{" "}
            {rangeLabel.format(toDate(last.date))}, {first.date.slice(0, 4)}
          </p>

          <div className="mt-8 border-t border-rule-dark pt-6">
            <p className="kicker text-slate-light">{playing ? "Now playing" : "Selected"}</p>
            <p className="mt-2 font-serif text-step-1 leading-snug" aria-live="polite">
              {nowLabel}
              <span className="tabular ml-2 font-sans text-step--1 text-slate-light">{current.duration}</span>
            </p>
            <audio
              ref={audioRef}
              key={current.src}
              controls
              preload="none"
              src={current.src}
              className="mt-4 w-full"
              aria-label={`${title}: ${nowLabel}`}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onEnded={() => {
                setPlaying(false);
                if (continuous && index < segments.length - 1) {
                  pendingPlay.current = true;
                  setIndex(index + 1);
                }
              }}
            />
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => select(index - 1)}
                  disabled={index === 0}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/25 px-4 text-[0.875rem] transition-colors hover:border-white hover:bg-white/10 disabled:opacity-40 disabled:hover:bg-transparent"
                >
                  <SkipBack aria-hidden="true" className="size-4" strokeWidth={1.75} />
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => select(index + 1)}
                  disabled={index === segments.length - 1}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/25 px-4 text-[0.875rem] transition-colors hover:border-white hover:bg-white/10 disabled:opacity-40 disabled:hover:bg-transparent"
                >
                  Next
                  <SkipForward aria-hidden="true" className="size-4" strokeWidth={1.75} />
                </button>
              </div>
              <label className="inline-flex min-h-11 cursor-pointer items-center gap-2 text-step--1 text-white/80">
                <input
                  type="checkbox"
                  checked={continuous}
                  onChange={(e) => setContinuous(e.target.checked)}
                  className="size-4 accent-[var(--color-cobalt-light)]"
                />
                Play next automatically
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7">
        {months.map((month) => (
          <section key={month.key} aria-labelledby={`flash-${month.key}`} className="mb-10 last:mb-0">
            <h4 id={`flash-${month.key}`} className="kicker border-b border-rule-dark pb-3 text-slate-light">
              {monthLabel.format(toDate(`${month.key}-01`))}
            </h4>
            <ul className="divide-y divide-rule-dark">
              {month.days.map((day) => (
                <li key={day.date} className="flex items-center justify-between gap-3 py-2.5 sm:gap-6 sm:py-3">
                  <span className="font-serif text-step-0">{dayLabel.format(toDate(day.date))}</span>
                  <span className="flex shrink-0 gap-2">
                    {day.items.map(({ seg, i }) => {
                      const active = i === index;
                      const isPlaying = active && playing;
                      const Icon = isPlaying ? Pause : Play;
                      return (
                        <button
                          key={seg.src}
                          type="button"
                          onClick={() => select(i)}
                          aria-current={active ? "true" : undefined}
                          aria-label={`${isPlaying ? "Pause" : "Play"} ${title}, ${longLabel.format(toDate(seg.date))}${day.items.length > 1 ? `, segment ${seg.segment}` : ""} (${seg.duration})`}
                          className={[
                            "inline-flex min-h-11 items-center gap-1.5 rounded-full border px-3 text-[0.875rem] transition-colors duration-200 sm:gap-2 sm:px-4",
                            active
                              ? "border-cobalt-light bg-cobalt-light text-charcoal"
                              : "border-white/25 text-white hover:border-white hover:bg-white/10",
                          ].join(" ")}
                        >
                          <Icon aria-hidden="true" className="size-3.5 fill-current" strokeWidth={0} />
                          <span aria-hidden="true">
                            <span className="hidden sm:inline">Segment{day.items.length > 1 ? " " : ""}</span>
                            {day.items.length > 1 ? seg.segment : <span className="sm:hidden">Play</span>}
                          </span>
                          <span className={`tabular ${active ? "text-charcoal/70" : "text-slate-light"}`}>{seg.duration}</span>
                        </button>
                      );
                    })}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
