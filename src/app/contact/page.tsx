import { ArrowUpRight, Mail } from "lucide-react";
import type { Metadata } from "next";

import { buttonBase, buttonTones } from "@/components/ui/primitives";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { contact } from "@/content/pages";
import { activeSocialLinks, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${site.name} about commissions, collaborations and story tips.`,
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact", title: `Contact — ${site.name}` },
};

export default function ContactPage() {
  const firstName = site.name.split(" ")[0];

  return (
    <div className="shell pt-16 pb-section sm:pt-20 lg:pt-24">
      <header className="mx-auto max-w-2xl text-center">
        <p className="kicker text-slate-ink">Contact</p>
        <h1 className="hero-rise mt-4 font-serif text-step-5 font-light tracking-[-0.03em]">
          {contact.headingItalic ? `${contact.heading.trim()} ` : contact.heading}
          {contact.headingItalic && <span className="italic">{contact.headingItalic}</span>}
        </h1>
        <p className="mx-auto mt-6 max-w-[48ch] text-balance text-step-1 leading-relaxed text-charcoal/75">
          {contact.intro}
        </p>
        <div className="mt-9 flex flex-col items-center gap-4">
          <a href={`mailto:${site.email}`} className={`${buttonBase} ${buttonTones.primary}`}>
            <Mail aria-hidden="true" className="size-4" strokeWidth={1.75} />
            Email {firstName}
          </a>
        </div>
      </header>

      <section aria-labelledby="profiles-heading" className="mx-auto mt-20 max-w-5xl lg:mt-24">
        <h2 id="profiles-heading" className="kicker text-center text-slate-ink">
          Elsewhere
        </h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {activeSocialLinks.map((s) => (
            <li key={s.label}>
              <a
                href={s.url}
                target="_blank"
                rel="me noopener noreferrer"
                className="group relative flex h-full flex-col gap-5 rounded-2xl border border-rule bg-surface p-5 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-rule-strong hover:shadow-[0_8px_24px_-12px_rgb(0_0_0/0.18)]"
              >
                <span className="flex size-12 items-center justify-center rounded-xl border border-rule bg-ivory text-charcoal">
                  <SocialIcon link={s} className="size-6" />
                </span>
                <span className="min-w-0">
                  <span className="block text-step-0 font-medium text-charcoal">{s.label}</span>
                  <span className="mt-1 block truncate text-step--1 text-slate-ink">
                    {s.note ?? s.handle}
                  </span>
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="absolute top-5 right-5 size-4 text-slate transition-[transform,color] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-cobalt"
                  strokeWidth={1.75}
                />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="reasons-heading" className="mx-auto mt-20 max-w-5xl lg:mt-24">
        <h2 id="reasons-heading" className="kicker text-center text-slate-ink">
          Get in touch about
        </h2>
        <ul className="mt-8 grid gap-10 text-center md:grid-cols-3 md:gap-8">
          {contact.reasons.map((reason, i) => (
            <li key={reason.title} data-reveal style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}>
              <h3 className="font-serif text-step-1 font-medium">{reason.title}</h3>
              <p className="mx-auto mt-2 max-w-[30ch] leading-relaxed text-slate-ink">{reason.text}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
