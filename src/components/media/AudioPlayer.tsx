import { AudioLines } from "lucide-react";

import type { Audio } from "@/content/types";

/**
 * Self-hosted audio with the browser's native controls. Nothing is downloaded
 * until the listener presses play (preload="none").
 */
export function AudioPlayer({
  audio,
  tone = "light",
  showTitle = true,
  className = "",
}: {
  audio: Audio;
  tone?: "light" | "dark";
  showTitle?: boolean;
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <figure
      className={`border p-5 sm:p-6 ${dark ? "border-rule-dark bg-white/[0.04]" : "border-rule bg-surface"} ${className}`}
    >
      <div className="flex items-start gap-4">
        <span
          aria-hidden="true"
          className={`grid size-11 shrink-0 place-items-center rounded-full ${dark ? "bg-white/10 text-cobalt-light" : "bg-cobalt/10 text-cobalt"}`}
        >
          <AudioLines className="size-5" strokeWidth={1.75} />
        </span>
        <div className="min-w-0">
          {showTitle && (
            <p className="font-serif text-step-1 leading-snug">
              {audio.title}
              {audio.duration && (
                <span className={`tabular ml-2 font-sans text-step--1 ${dark ? "text-slate-light" : "text-slate-ink"}`}>
                  {audio.duration}
                </span>
              )}
            </p>
          )}
          {audio.description && (
            <figcaption className={`mt-1 text-step--1 leading-relaxed ${dark ? "text-white/75" : "text-slate-ink"}`}>
              {audio.description}
            </figcaption>
          )}
        </div>
      </div>
      <audio controls preload="none" className="mt-4 w-full" aria-label={`Play audio: ${audio.title}`}>
        <source src={audio.src} />
      </audio>
    </figure>
  );
}
