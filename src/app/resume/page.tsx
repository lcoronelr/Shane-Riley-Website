import { existsSync } from "node:fs";
import path from "node:path";

import type { Metadata } from "next";

import { PrintButton } from "@/components/ui/PrintButton";
import { ButtonLink, PlaceholderTag } from "@/components/ui/primitives";
import { resume } from "@/content/resume";
import { activeSocialLinks, site } from "@/content/site";
import type { TimelineEntry } from "@/content/types";

export const metadata: Metadata = {
  title: "Résumé",
  description: `Résumé of ${site.name}: experience, education, selected work, skills and awards.`,
  alternates: { canonical: "/resume" },
  openGraph: { url: "/resume", title: `Résumé — ${site.name}` },
};

/** True only when the PDF genuinely exists, so the button is never broken. */
function hasPdf() {
  if (!resume.pdfPath) return false;
  return existsSync(path.join(process.cwd(), "public", resume.pdfPath));
}

export default function ResumePage() {
  const pdfAvailable = hasPdf();

  return (
    <div className="shell pt-12 pb-section sm:pt-16 lg:pt-20" data-print="show-url">
      <header className="grid gap-8 border-b border-charcoal pb-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="kicker text-slate-ink">Résumé</p>
          <h1 className="mt-4 font-serif text-step-5 font-light tracking-[-0.03em]">{site.name}</h1>
        </div>
        <div className="space-y-4 lg:col-span-5 lg:text-right">
          <ul className="space-y-1 text-step-0 lg:ml-auto">
            <li>
              <a href={`mailto:${site.email}`} className="link-inline">
                {site.email}
              </a>
            </li>
            {site.location && <li className="text-slate-ink">{site.location}</li>}
            {activeSocialLinks.map((s) => (
              <li key={s.label}>
                <a href={s.url} className="link-inline" rel="me noopener noreferrer" target="_blank">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3 lg:justify-end" data-print="hide">
            {pdfAvailable && (
              <ButtonLink href={resume.pdfPath} download icon="none">
                Download PDF
              </ButtonLink>
            )}
            <PrintButton />
          </div>
        </div>
      </header>

      <div className="mt-8" data-print="hide">
        <PlaceholderTag>Placeholder résumé — every bracketed field needs real, verifiable details</PlaceholderTag>
      </div>

      <div className="mt-12 grid gap-x-16 gap-y-14 lg:grid-cols-12">
        <ResumeSection title="Summary" className="lg:col-span-12">
          <p className="max-w-[70ch] font-serif text-step-1 leading-relaxed">{resume.summary}</p>
        </ResumeSection>

        <ResumeSection title="Experience" className="lg:col-span-8">
          <Entries entries={resume.experience} />
        </ResumeSection>

        <div className="space-y-14 lg:col-span-4">
          <ResumeSection title="Education">
            <Entries entries={resume.education} compact />
          </ResumeSection>

          <ResumeSection title="Awards">
            <ul className="space-y-4">
              {resume.awards.map((award, i) => (
                <li key={i}>
                  <p className="font-medium">{award.title}</p>
                  <p className="text-step--1 text-slate-ink">
                    {award.organization} · {award.year}
                  </p>
                </li>
              ))}
            </ul>
          </ResumeSection>
        </div>

        <ResumeSection title="Selected work" className="lg:col-span-8">
          <ol className="divide-y divide-rule border-y border-rule">
            {resume.selectedWork.map((work, i) => (
              <li key={i} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                {work.url ? (
                  <a href={work.url} className="link-inline font-serif text-step-1" rel="noopener noreferrer" target="_blank">
                    {work.title}
                  </a>
                ) : (
                  <span className="font-serif text-step-1">{work.title}</span>
                )}
                <span className="shrink-0 text-step--1 text-slate-ink">
                  {work.outlet} · {work.year}
                </span>
              </li>
            ))}
          </ol>
        </ResumeSection>

        <ResumeSection title="Skills" className="lg:col-span-4">
          <dl className="space-y-4">
            {resume.skills.map((group) => (
              <div key={group.group}>
                <dt className="kicker text-slate-ink">{group.group}</dt>
                <dd className="mt-1.5">{group.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </ResumeSection>
      </div>
    </div>
  );
}

function ResumeSection({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  const id = `resume-${title.toLowerCase().replace(/\s+/g, "-")}`;
  return (
    <section aria-labelledby={id} className={className}>
      <h2 id={id} className="kicker mb-5 border-b border-rule pb-3 text-charcoal">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Entries({ entries, compact = false }: { entries: TimelineEntry[]; compact?: boolean }) {
  return (
    <ol className="space-y-7">
      {entries.map((entry, i) => (
        <li key={i} className={compact ? "" : "grid gap-1 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-6"}>
          <p className="tabular text-step--1 text-slate-ink sm:pt-1">{entry.period}</p>
          <div>
            <h3 className="font-serif text-step-1 font-medium">{entry.title}</h3>
            <p className="text-charcoal/80">{entry.organization}</p>
            {entry.description && <p className="mt-2 text-step--1 text-slate-ink">{entry.description}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}
