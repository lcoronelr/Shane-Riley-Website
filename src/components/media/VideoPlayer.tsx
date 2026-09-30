"use client";

import { Play } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import type { Video, VideoProvider } from "@/content/types";

const PROVIDERS: Record<
  VideoProvider,
  { idPattern: RegExp; embedUrl: (id: string) => string }
> = {
  youtube: {
    idPattern: /^[A-Za-z0-9_-]{11}$/,
    embedUrl: (id) =>
      `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1`,
  },
  "youtube-playlist": {
    idPattern: /^PL[A-Za-z0-9_-]{16,64}$/,
    embedUrl: (id) =>
      `https://www.youtube-nocookie.com/embed/videoseries?list=${id}&autoplay=1&rel=0&playsinline=1`,
  },
  vimeo: {
    idPattern: /^\d{6,12}$/,
    embedUrl: (id) =>
      `https://player.vimeo.com/video/${id}?autoplay=1&dnt=1&title=0&byline=0&portrait=0`,
  },
};

/**
 * Video with a lightweight local poster. External players are not requested
 * until the visitor presses play, which keeps initial page loads fast and
 * avoids contacting third parties on page view.
 */
export function VideoPlayer({
  video,
  tone = "light",
  sizes = "(min-width: 64rem) 66vw, 100vw",
  className = "",
  priority = false,
}: {
  video: Video;
  tone?: "light" | "dark";
  sizes?: string;
  className?: string;
  /** Load the poster eagerly when the player is above the fold. */
  priority?: boolean;
}) {
  const [active, setActive] = useState(false);
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (active) frameRef.current?.focus();
  }, [active]);

  const muted = tone === "dark" ? "text-slate-light" : "text-slate-ink";

  if (video.kind === "file") {
    return (
      <figure className={className}>
        <video
          controls
          preload="none"
          playsInline
          poster={video.poster.src.src}
          className="aspect-video w-full bg-charcoal"
        >
          <source src={video.src} />
          {video.captionsSrc && (
            <track kind="captions" src={video.captionsSrc} srcLang="en" label="English" default />
          )}
        </video>
        <VideoMeta video={video} muted={muted} />
      </figure>
    );
  }

  const provider = PROVIDERS[video.provider];
  const validId = provider.idPattern.test(video.id);

  return (
    <figure className={className}>
      <div className="relative aspect-video overflow-hidden bg-charcoal">
        {active && validId ? (
          <iframe
            ref={frameRef}
            src={provider.embedUrl(video.id)}
            title={video.title}
            className="absolute inset-0 size-full"
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            sandbox="allow-scripts allow-same-origin allow-presentation allow-popups allow-popups-to-escape-sandbox"
          />
        ) : validId ? (
          <button
            type="button"
            onClick={() => setActive(true)}
            className="group absolute inset-0 size-full text-left"
          >
            <Image
              src={video.poster.src}
              alt=""
              fill
              sizes={sizes}
              placeholder="blur"
              preload={priority}
              fetchPriority={priority ? "high" : undefined}
              className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
              style={{ objectPosition: video.poster.focus ?? "50% 50%" }}
            />
            <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <span className="absolute bottom-4 left-4 inline-flex items-center gap-3 rounded-full bg-white/95 py-2 pr-5 pl-2 text-[0.9375rem] font-medium text-charcoal shadow-lg transition-transform duration-300 ease-out group-hover:scale-[1.03] group-active:scale-[0.98] sm:bottom-6 sm:left-6">
              <span aria-hidden="true" className="grid size-9 place-items-center rounded-full bg-cobalt text-white">
                <Play className="size-4 translate-x-px fill-current" strokeWidth={0} />
              </span>
              Play
              {video.duration && <span className="tabular text-slate-ink">{video.duration}</span>}
              <span className="sr-only"> — video: {video.title}</span>
            </span>
          </button>
        ) : (
          <div className="absolute inset-0 grid place-items-center p-6 text-center text-white">
            <p>This video could not be loaded: the {video.provider} ID is not valid.</p>
          </div>
        )}
      </div>
      <VideoMeta video={video} muted={muted} />
    </figure>
  );
}

function VideoMeta({ video, muted }: { video: Video; muted: string }) {
  const captionsNote =
    video.kind === "embed"
      ? video.captions === undefined
        ? null
        : video.captions
          ? "Captions available in the player."
          : "Captions not yet provided."
      : video.captionsSrc
        ? "Captions available."
        : "Captions not yet provided.";

  if (!captionsNote && !video.note && !video.transcript) return null;

  return (
    <figcaption className={`mt-3 space-y-2 text-step--1 ${muted}`}>
      {captionsNote && <p>{captionsNote}</p>}
      {video.note && <p>{video.note}</p>}
      {video.transcript && (
        <details className="group/details">
          <summary className="inline-flex min-h-11 cursor-pointer items-center gap-2 font-medium underline decoration-1 underline-offset-4">
            Read transcript
          </summary>
          <div className="mt-2 max-w-prose whitespace-pre-line">{video.transcript}</div>
        </details>
      )}
    </figcaption>
  );
}
