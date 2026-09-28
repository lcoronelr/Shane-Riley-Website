import type { Metadata } from "next";
import Image from "next/image";

import { SectionLabel } from "@/components/ui/primitives";
import { photoSources, photos } from "@/content/photos";

export const metadata: Metadata = {
  title: "Photo credits",
  description: "Credits and licences for photography used on this site.",
  alternates: { canonical: "/credits" },
};

export default function CreditsPage() {
  const entries = Object.entries(photos) as [keyof typeof photos, (typeof photos)[keyof typeof photos]][];
  return (
    <div className="shell pt-12 pb-section sm:pt-16 lg:pt-20">
      <SectionLabel>Credits</SectionLabel>
      <h1 className="mt-5 font-serif text-step-4 font-light tracking-[-0.025em]">Photo credits</h1>
      <p className="mt-6 max-w-[60ch] text-step-1 leading-relaxed text-charcoal/80">
        The photographs currently on this site are placeholders: stock images released under the CC0 1.0 public
        domain dedication via StockSnap.io. Credit is given as a courtesy. They will be replaced with original or
        licensed reporting photography.
      </p>
      <ul className="mt-12 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
        {entries.map(([key, photo]) => (
          <li key={key} className="grid grid-cols-[4.5rem_minmax(0,1fr)] items-center gap-4 border-t border-rule pt-4">
            <span className="relative block aspect-square overflow-hidden bg-charcoal/10">
              <Image src={photo.src} alt="" fill sizes="4.5rem" className="object-cover" />
            </span>
            <span className="text-step--1">
              <span className="block font-medium">{photo.credit?.replace(" — placeholder", "")}</span>
              <a href={photoSources[key]} className="link-inline text-slate-ink" rel="noopener noreferrer" target="_blank">
                Source on StockSnap<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-12 text-step--1 text-slate-ink">
        Demo video: <i>Big Buck Bunny</i> © Blender Foundation, licensed CC BY 3.0 (peach.blender.org).
      </p>
    </div>
  );
}
