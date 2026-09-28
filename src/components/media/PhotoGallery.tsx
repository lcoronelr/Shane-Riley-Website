"use client";

import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import type { Photo } from "@/content/types";

/**
 * Grid of thumbnails that open a full-screen lightbox. The lightbox is a
 * native modal <dialog>, which provides focus containment, Escape to close
 * and an inert page behind it. Arrow keys and swipes move between photos.
 */
export function PhotoGallery({
  photos,
  title,
  layout = "grid",
  tone = "light",
}: {
  photos: Photo[];
  title: string;
  layout?: "grid" | "strip";
  tone?: "light" | "dark";
}) {
  const [index, setIndex] = useState<number | null>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const open = (i: number) => setIndex(i);
  const close = useCallback(() => {
    setIndex((current) => {
      if (current !== null) {
        // Return focus to the thumbnail of the photo that was showing.
        requestAnimationFrame(() => triggerRefs.current[current]?.focus());
      }
      return null;
    });
  }, []);

  const mosaic = layout === "grid" && photos.length > 3;
  const gridClass = mosaic
    ? "grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-6"
    : "grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3";

  // Mosaic: a large lead frame with two beside it, then the remaining frames
  // share a full row so no grid cell is left empty.
  const remaining = photos.length - 3;
  const cell = (i: number) => {
    if (!mosaic) return { li: "", frame: "aspect-[4/3]" };
    if (i === 0) return { li: "col-span-2 md:col-span-4 md:row-span-2", frame: "aspect-[4/3] md:aspect-auto md:h-full" };
    if (i < 3) return { li: "md:col-span-2", frame: "aspect-[4/3]" };
    const span = remaining === 1 ? "col-span-2 md:col-span-6" : remaining === 2 ? "md:col-span-3" : "md:col-span-2";
    return { li: span, frame: remaining <= 2 ? "aspect-[4/3] md:aspect-[16/9]" : "aspect-[4/3]" };
  };

  return (
    <>
      <ul className={gridClass} aria-label={`${title}: ${photos.length} photographs`}>
        {photos.map((photo, i) => (
          <li key={`${photo.src.src}-${i}`} className={cell(i).li}>
            <button
              ref={(el) => {
                triggerRefs.current[i] = el;
              }}
              type="button"
              onClick={() => open(i)}
              className="group relative block size-full overflow-hidden bg-charcoal/10"
              aria-label={`Open photo ${i + 1} of ${photos.length}: ${photo.alt}`}
              aria-haspopup="dialog"
            >
              <span className={`relative block w-full ${cell(i).frame}`}>
                <Image
                  src={photo.src}
                  alt=""
                  fill
                  sizes={
                    mosaic && i === 0
                      ? "(min-width: 48rem) 60vw, 100vw"
                      : mosaic && remaining <= 2 && i >= 3
                        ? "(min-width: 48rem) 50vw, 100vw"
                        : "(min-width: 48rem) 30vw, 50vw"
                  }
                  placeholder="blur"
                  className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                  style={{ objectPosition: photo.focus ?? "50% 50%" }}
                />
              </span>
              <span
                aria-hidden="true"
                className={`absolute right-2 bottom-2 grid size-9 place-items-center rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 ${
                  tone === "dark" ? "bg-white text-charcoal" : "bg-charcoal text-white"
                }`}
              >
                <Expand className="size-4" strokeWidth={1.75} />
              </span>
            </button>
          </li>
        ))}
      </ul>
      <Lightbox photos={photos} title={title} index={index} onIndex={setIndex} onClose={close} />
    </>
  );
}

function Lightbox({
  photos,
  title,
  index,
  onIndex,
  onClose,
}: {
  photos: Photo[];
  title: string;
  index: number | null;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [direction, setDirection] = useState(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const headingId = useId();
  const isOpen = index !== null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) {
      dialog.showModal();
      document.documentElement.setAttribute("data-scroll-locked", "");
      closeRef.current?.focus();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
    if (!isOpen) document.documentElement.removeAttribute("data-scroll-locked");
  }, [isOpen]);

  useEffect(() => () => document.documentElement.removeAttribute("data-scroll-locked"), []);

  const go = useCallback(
    (delta: number) => {
      if (index === null) return;
      setDirection(delta);
      onIndex((index + delta + photos.length) % photos.length);
    },
    [index, onIndex, photos.length],
  );

  const onKeyDown = (e: React.KeyboardEvent<HTMLDialogElement>) => {
    if (e.key === "Tab") {
      // Keep Tab cycling within the dialog instead of escaping to browser UI.
      const focusable = e.currentTarget.querySelectorAll<HTMLElement>("button:not([disabled])");
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    }
  };

  const photo = index !== null ? photos[index] : null;

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={headingId}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onKeyDown={onKeyDown}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onTouchStart={(e) => {
        const t = e.touches[0];
        touchStart.current = { x: t.clientX, y: t.clientY };
      }}
      onTouchEnd={(e) => {
        const start = touchStart.current;
        touchStart.current = null;
        if (!start) return;
        const t = e.changedTouches[0];
        const dx = t.clientX - start.x;
        const dy = t.clientY - start.y;
        if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.2) go(dx < 0 ? 1 : -1);
      }}
      data-surface="dark"
      className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none bg-charcoal p-0 text-white backdrop:bg-charcoal/95"
    >
      {photo && index !== null && (
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
            <h2 id={headingId} className="kicker truncate text-slate-light">
              {title}
              <span className="tabular ml-3 text-white" aria-live="polite">
                {index + 1} / {photos.length}
              </span>
            </h2>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="inline-flex h-11 items-center gap-2 rounded-full px-3 text-[0.9375rem] hover:bg-white/10"
            >
              Close
              <X aria-hidden="true" className="size-5" strokeWidth={1.5} />
            </button>
          </div>

          <div className="relative min-h-0 flex-1">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <m.figure
                key={index}
                custom={direction}
                className="absolute inset-0 flex flex-col px-4 pb-4 sm:px-20"
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -40 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="relative min-h-0 flex-1">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="100vw"
                    placeholder="blur"
                    className="object-contain"
                  />
                </div>
                <figcaption className="mx-auto mt-4 flex w-full max-w-3xl flex-col gap-1 text-step--1 text-slate-light sm:flex-row sm:justify-between sm:gap-6">
                  <span className="text-white/90">{photo.caption ?? photo.alt}</span>
                  {photo.credit && (
                    <span className="shrink-0 text-[0.75rem] tracking-[0.02em] uppercase">{photo.credit}</span>
                  )}
                </figcaption>
              </m.figure>
            </AnimatePresence>

            {photos.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  className="absolute top-1/2 left-2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-black/40 hover:bg-white/15 sm:left-4"
                  aria-label="Previous photo"
                >
                  <ChevronLeft aria-hidden="true" className="size-6" strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  className="absolute top-1/2 right-2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-black/40 hover:bg-white/15 sm:right-4"
                  aria-label="Next photo"
                >
                  <ChevronRight aria-hidden="true" className="size-6" strokeWidth={1.5} />
                </button>
              </>
            )}
          </div>
          <p className="sr-only">Use the left and right arrow keys to move between photos. Press Escape to close.</p>
        </div>
      )}
    </dialog>
  );
}
