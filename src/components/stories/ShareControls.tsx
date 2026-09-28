"use client";

import { Check, Link2, Share } from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/**
 * Native share sheet where the browser supports it, plus a copy-link button
 * that always works. Status changes are announced to screen readers.
 */
export function ShareControls({ title, path }: { title: string; path: string }) {
  const canShare = useSyncExternalStore(
    noopSubscribe,
    () => typeof navigator.share === "function",
    () => false,
  );
  const [status, setStatus] = useState("");
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const url = () => new URL(path, window.location.origin).toString();

  const flash = (message: string) => {
    setStatus(message);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setStatus(""), 2600);
  };

  const share = async () => {
    try {
      await navigator.share({ title, url: url() });
    } catch (err) {
      // AbortError means the visitor closed the share sheet; nothing to do.
      if ((err as DOMException)?.name !== "AbortError") flash("Sharing is unavailable — use Copy link.");
    }
  };

  const copy = async () => {
    const link = url();
    try {
      await navigator.clipboard.writeText(link);
      flash("Link copied");
    } catch {
      // Clipboard API can be blocked; fall back to a selectable prompt.
      window.prompt("Copy this link:", link);
    }
  };

  const btn =
    "inline-flex min-h-11 items-center gap-2 rounded-full border border-rule-strong px-4 text-[0.875rem] font-medium transition-colors duration-200 hover:border-charcoal hover:bg-charcoal hover:text-ivory";

  return (
    <div className="flex flex-wrap items-center gap-2" data-print="hide">
      {canShare && (
        <button type="button" onClick={share} className={btn}>
          <Share aria-hidden="true" className="size-4" strokeWidth={1.75} />
          Share
        </button>
      )}
      <button type="button" onClick={copy} className={btn}>
        {status === "Link copied" ? (
          <Check aria-hidden="true" className="size-4 text-cobalt" strokeWidth={2} />
        ) : (
          <Link2 aria-hidden="true" className="size-4" strokeWidth={1.75} />
        )}
        {status === "Link copied" ? "Copied" : "Copy link"}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {status}
      </span>
    </div>
  );
}
