"use client";

import Link from "next/link";

import { buttonBase, buttonTones } from "@/components/ui/primitives";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="shell flex min-h-[70svh] flex-col justify-center py-section">
      <p className="kicker text-slate-ink">Something went wrong</p>
      <h1 className="mt-5 max-w-[18ch] font-serif text-step-4 font-light tracking-[-0.025em]">
        This page didn&rsquo;t load properly.
      </h1>
      <p className="mt-6 max-w-[46ch] text-step-1 text-charcoal/80">
        Please try again. If the problem continues, return to the home page.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <button type="button" onClick={reset} className={`${buttonBase} ${buttonTones.primary}`}>
          Try again
        </button>
        <Link href="/" className={`${buttonBase} ${buttonTones.secondary}`}>
          Home
        </Link>
      </div>
    </div>
  );
}
