import Image from "next/image";

import type { Photo } from "@/content/types";

/**
 * Responsive, aspect-ratio-locked photograph. The wrapper reserves space so
 * nothing shifts while the image loads; `sizes` must describe the rendered
 * width so the browser picks the smallest adequate file.
 */
export function Picture({
  photo,
  sizes,
  ratio,
  className = "",
  imgClassName = "",
  preload = false,
  fill = true,
  aspectClassName,
}: {
  photo: Photo;
  sizes: string;
  /** CSS aspect-ratio such as "4 / 5". Defaults to the photo's own ratio. */
  ratio?: string;
  className?: string;
  imgClassName?: string;
  /** Only for the single most important above-the-fold image. */
  preload?: boolean;
  /** When false the wrapper does not set an aspect ratio (parent sizes it). */
  fill?: boolean;
  /** Responsive aspect-ratio utilities, e.g. "aspect-[16/10] lg:aspect-square". Overrides `ratio`. */
  aspectClassName?: string;
}) {
  const aspect = ratio ?? `${photo.src.width} / ${photo.src.height}`;
  return (
    <div
      className={`relative overflow-hidden bg-charcoal/8 ${aspectClassName ?? ""} ${className}`}
      style={fill && !aspectClassName ? { aspectRatio: aspect } : undefined}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        placeholder="blur"
        preload={preload}
        fetchPriority={preload ? "high" : undefined}
        className={`object-cover ${imgClassName}`}
        style={{ objectPosition: photo.focus ?? "50% 50%" }}
      />
    </div>
  );
}

export function Caption({
  photo,
  tone = "light",
  className = "",
}: {
  photo: Photo;
  tone?: "light" | "dark";
  className?: string;
}) {
  if (!photo.caption && !photo.credit) return null;
  return (
    <figcaption
      className={`mt-3 flex flex-col gap-1 text-step--1 sm:flex-row sm:justify-between sm:gap-6 ${
        tone === "dark" ? "text-slate-light" : "text-slate-ink"
      } ${className}`}
    >
      {photo.caption && <span className="max-w-prose">{photo.caption}</span>}
      {photo.credit && (
        <span className="shrink-0 text-[0.75rem] tracking-[0.02em] uppercase">
          {photo.credit}
        </span>
      )}
    </figcaption>
  );
}
