import type { Metadata } from "next";

import { ButtonLink } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="shell flex min-h-[70svh] flex-col justify-center py-section">
      <p className="kicker text-slate-ink">404</p>
      <h1 className="mt-5 max-w-[16ch] font-serif text-step-5 font-light tracking-[-0.03em]">
        This page went <span className="italic">out of bounds.</span>
      </h1>
      <p className="mt-6 max-w-[46ch] text-step-1 text-charcoal/80">
        The link may be broken, or the page may have moved.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink href="/">Back to home</ButtonLink>
        <ButtonLink href="/stories" tone="secondary" icon="none">
          Browse stories
        </ButtonLink>
      </div>
    </div>
  );
}
