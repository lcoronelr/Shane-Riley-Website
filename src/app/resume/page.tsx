import { existsSync } from "node:fs";
import path from "node:path";

import type { Metadata } from "next";

import { PrintButton } from "@/components/ui/PrintButton";
import { ButtonLink } from "@/components/ui/primitives";
import { resume } from "@/content/resume";
import { activeSocialLinks, site } from "@/content/site";
import type { ResumeOrganization } from "@/content/types";

export const metadata: Metadata = {
  title: "Résumé",
  description: `Résumé of ${site.name}: education, journalism and media experience, and skills.`,
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
  const profileLinks = activeSocialLinks.filter((s) => s.label === "LinkedIn" || s.label === "YouTube");

  return (
    <div className="shell pt-12 pb-section sm:pt-16 lg:pt-20" data-print="show-url">
      <header className="grid gap-8 border-b border-charcoal pb-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="kicker text-slate-ink">Résumé</p>
          <h1 className="mt-4 font-serif text-step-5 font-light tracking-[-0.03em]">{site.name}</h1>
        </div>
        <div className="space-y-4 lg:col-span-5 lg:text-right">
          <ul className="space-y-1 text-step-0 lg:ml-auto">
            <li className="text-slate-ink">{site.location}</li>
            <li>
              <a href={`tel:${resume.phone.replace(/[^\d+]/g, "")}`} className="link-inline tabular">
                {resume.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="link-inline">
                {site.email}
              </a>
            </li>
            {profileLinks.map((s) => (
              <li key={s.label}>
                <a href={s.url} className="link-inline" rel="me noopener noreferrer" target="_blank">
                  {s.label}
                  <span className="sr-only"> (opens in a new tab)</span>
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

      <div className="mt-12 grid gap-x-16 gap-y-14 lg:grid-cols-12">
        <ResumeSection title="Professional profile" className="lg:col-span-8">
          <p className="max-w-[70ch] font-serif text-step-1 leading-relaxed">{resume.summary}</p>
        </ResumeSection>

        <ResumeSection title="Education" className="lg:col-span-4">
          <h3 className="font-serif text-step-1 font-medium">{resume.education.institution}</h3>
          <p className="text-step--1 text-slate-ink">{resume.education.location}</p>
          <ul className="mt-3 space-y-1">
            {resume.education.degrees.map((degree) => (
              <li key={degree}>{degree}</li>
            ))}
          </ul>
        </ResumeSection>

        <ResumeSection title="Journalism & media experience" className="lg:col-span-8">
          <Organizations items={resume.experience} />
        </ResumeSection>

        <div className="space-y-14 lg:col-span-4">
          <ResumeSection title="Additional experience">
            <Organizations items={resume.additionalExperience} compact />
          </ResumeSection>

          <ResumeSection title="Skills">
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
  const id = `resume-${title.toLowerCase().replace(/[^a-z]+/g, "-")}`;
  return (
    <section aria-labelledby={id} className={className}>
      <h2 id={id} className="kicker mb-5 border-b border-rule pb-3 text-charcoal">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Organizations({ items, compact = false }: { items: ResumeOrganization[]; compact?: boolean }) {
  return (
    <ol className="space-y-9">
      {items.map((org) => (
        <li key={org.organization}>
          <h3 className="font-serif text-step-1 font-medium">
            {org.organization}
            <span className="font-sans text-step--1 font-normal text-slate-ink"> — {org.location}</span>
          </h3>
          <ol className="mt-3 space-y-5">
            {org.roles.map((role) => (
              <li
                key={role.title}
                className={compact ? "" : "grid gap-1 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-6"}
              >
                <p className="text-step--1 text-slate-ink sm:pt-0.5">{role.period}</p>
                <div>
                  <p className="font-semibold">{role.title}</p>
                  <ul className="mt-2 list-disc space-y-1.5 pl-5 text-step--1 leading-relaxed text-charcoal/85 marker:text-slate">
                    {role.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
