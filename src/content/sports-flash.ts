/**
 * Sports Flash: one-minute sports news segments Shane produced for News Talk
 * 790-WNIS during his summer 2026 radio internship at Sinclair Communications.
 *
 * Edited in the CMS ("Sports Flash"), saved in data/sports-flash.json. Audio
 * files live in public/audio/sports-flash/, named <date>-<segment>.mp3.
 */
import { text } from "./cms";
import data from "./data/sports-flash.json";

export interface SportsFlashSegment {
  date: string;
  /** Segment number within the day (most days had two). */
  segment: number;
  src: string;
  duration: string;
}

export const sportsFlash = {
  title: text(data.title, "Sports Flash → Title"),
  station: text(data.station, "Sports Flash → Station"),
  description: text(data.description, "Sports Flash → Description"),
};

/** Every segment, oldest first (sorted, so new ones can be added anywhere in the CMS list). */
export const sportsFlashSegments: SportsFlashSegment[] = data.segments
  .map((s, i) => ({
    date: text(s.date, `Sports Flash → Segment ${i + 1} → Date`),
    segment: Number(s.segment) || 1,
    src: text(s.audio, `Sports Flash → Segment ${i + 1} → Audio file`),
    duration: text(s.duration, `Sports Flash → Segment ${i + 1} → Length`),
  }))
  .sort((a, b) => a.date.localeCompare(b.date) || a.segment - b.segment);
