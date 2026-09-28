import { ArrowUpRight, Mail } from "lucide-react";
import type { Metadata } from "next";

import { CopyEmailButton } from "@/components/ui/CopyEmailButton";
import { PlaceholderTag, SectionLabel } from "@/components/ui/primitives";
import { activeSocialLinks, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${site.name} about commissions, collaborations and story tips.`,
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact", title: `Contact — ${site.name}` },
};

const reasons = [
  { title: "Commissions", text: "Features, profiles and long-form reporting for editors and publications." },
  { title: "Video & multimedia", text: "Field reporting, interviews and short documentary projects." },
  { title: "Story tips", text: "Something the sports world should know about? Get in touch." },
];

export default function ContactPage() {
  return (
    <div className="shell pt-12 pb-section sm:pt-16 lg:pt-20">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <SectionLabel>Contact</SectionLabel>
          <h1 className="hero-rise mt-5 font-serif text-step-5 font-light tracking-[-0.03em]">
            Let&rsquo;s talk <span className="italic">sport.</span>
          </h1>
          <p className="mt-8 max-w-[48ch] text-step-1 leading-relaxed text-charcoal/80">
            The fastest way to reach {site.name.split(" ")[0]} is by email. Please include your deadline and
            the publication or project you are working on.
          </p>

          <div className="mt-12 border-y border-rule py-8">
            <p className="kicker text-slate-ink">Email</p>
            <a
              href={`mailto:${site.email}`}
              className="group mt-3 inline-flex items-center gap-3 font-serif text-[clamp(1.625rem,1.1rem+2.6vw,3rem)] leading-tight tracking-[-0.015em] break-all text-cobalt"
            >
              <Mail aria-hidden="true" className="size-[0.7em] shrink-0" strokeWidth={1.25} />
              <span className="link-draw">{site.email}</span>
            </a>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <CopyEmailButton email={site.email} />
              {site.emailIsPlaceholder && <PlaceholderTag>Placeholder address — replace in site.ts</PlaceholderTag>}
            </div>
          </div>

          <section aria-labelledby="social-heading" className="mt-12">
            <h2 id="social-heading" className="kicker text-slate-ink">
              Professional profiles
            </h2>
            {activeSocialLinks.length > 0 ? (
              <ul className="mt-4 divide-y divide-rule border-y border-rule">
                {activeSocialLinks.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="me noopener noreferrer"
                      className="group flex min-h-14 items-center justify-between gap-4 py-3"
                    >
                      <span className="text-step-1">
                        <span className="link-draw">{s.label}</span>
                        {s.handle && <span className="ml-3 text-step--1 text-slate-ink">{s.handle}</span>}
                      </span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-5 text-slate transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        strokeWidth={1.5}
                      />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-4 flex flex-wrap items-center gap-3 border border-dashed border-rule-strong p-5 text-step--1 text-slate-ink">
                <PlaceholderTag>Placeholder</PlaceholderTag>
                <span>
                  No profiles yet. Add your X, Instagram, LinkedIn, YouTube or Muck Rack links in{" "}
                  <code className="text-[0.9em]">src/content/site.ts</code> and they will appear here.
                </span>
              </div>
            )}
          </section>
        </div>

        <aside className="lg:col-span-4 lg:col-start-9 lg:pt-24" aria-labelledby="reasons-heading">
          <h2 id="reasons-heading" className="kicker text-slate-ink">
            Get in touch about
          </h2>
          <ul className="mt-5 space-y-8">
            {reasons.map((reason, i) => (
              <li key={reason.title} data-reveal style={{ ["--reveal-delay" as string]: `${i * 90}ms` }} className="border-t border-rule pt-5">
                <h3 className="font-serif text-step-2">{reason.title}</h3>
                <p className="mt-2 text-slate-ink">{reason.text}</p>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-step--1 text-slate-ink">
            This site has no contact form and does not collect personal data. Email is handled by your own mail
            client.
          </p>
        </aside>
      </div>
    </div>
  );
}
