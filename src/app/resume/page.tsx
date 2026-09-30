import { existsSync } from "node:fs";
import path from "node:path";

import type { Metadata } from "next";
import { Fragment } from "react";

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
      <div className="mx-auto max-w-[60rem]">
        <header className="border-b border-charcoal pb-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="kicker text-slate-ink">Résumé</p>
              <h1 className="mt-3 font-serif text-step-5 font-light tracking-[-0.03em]">{site.name}</h1>
            </div>
            <div className="flex flex-wrap gap-3" data-print="hide">
              {pdfAvailable && (
                <ButtonLink href={resume.pdfPath} download icon="none">
                  Download PDF
                </ButtonLink>
              )}
              <PrintButton />
            </div>
          </div>
          <ul className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-step--1 text-slate-ink">
            <li>{site.location}</li>
            <Dot />
            <li>
              <a href={`tel:${resume.phone.replace(/[^\d+]/g, "")}`} className="link-inline tabular text-charcoal">
                {resume.phone}
              </a>
            </li>
            <Dot />
            <li>
              <a href={`mailto:${site.email}`} className="link-inline text-charcoal">
                {site.email}
              </a>
            </li>
            {profileLinks.map((s) => (
              <Fragment key={s.label}>
                <Dot />
                <li>
                  <a href={s.url} className="link-inline text-charcoal" rel="me noopener noreferrer" target="_blank">
                    {s.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              </Fragment>
            ))}
          </ul>
        </header>

        <ResumeSection title="Profile">
          <p className="font-serif text-step-1 leading-relaxed">{resume.summary}</p>
        </ResumeSection>

        <ResumeSection title="Education">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <h3 className="font-serif text-step-1 font-medium">{resume.education.institution}</h3>
            <p className="text-step--1 text-slate-ink">{resume.education.location}</p>
          </div>
          <ul className="mt-2 space-y-1">
            {resume.education.degrees.map((degree) => (
              <li key={degree}>{degree}</li>
            ))}
          </ul>
        </ResumeSection>

        <ResumeSection title="Journalism & media experience">
          <Organizations items={resume.experience} />
        </ResumeSection>

        <ResumeSection title="Additional experience">
          <Organizations items={resume.additionalExperience} />
        </ResumeSection>

        <ResumeSection title="Skills">
          <dl className="space-y-3">
            {resume.skills.map((group) => (
              <div key={group.group} className="grid gap-1 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-6">
                <dt className="font-semibold">{group.group}</dt>
                <dd className="text-charcoal/85">{group.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </ResumeSection>
      </div>
    </div>
  );
}

function Dot() {
  return (
    <li aria-hidden="true" className="text-slate">
      ·
    </li>
  );
}

function ResumeSection({ title, children }: { title: string; children: React.ReactNode }) {
  const id = `resume-${title.toLowerCase().replace(/[^a-z]+/g, "-")}`;
  return (
    <section
      aria-labelledby={id}
      className="grid gap-4 border-b border-rule py-9 last:border-b-0 md:grid-cols-[12rem_minmax(0,1fr)] md:gap-10"
    >
      <h2 id={id} className="kicker pt-1 text-charcoal">
        {title}
      </h2>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

function Organizations({ items }: { items: ResumeOrganization[] }) {
  return (
    <ol className="space-y-8">
      {items.map((org) => (
        <li key={org.organization}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <h3 className="font-serif text-step-1 font-medium">{org.organization}</h3>
            <p className="text-step--1 text-slate-ink">{org.location}</p>
          </div>
          <ol className="mt-3 space-y-4">
            {org.roles.map((role) => (
              <li key={role.title}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-0.5">
                  <p className="font-semibold">{role.title}</p>
                  <p className="tabular text-step--1 text-slate-ink">{role.period}</p>
                </div>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-step--1 leading-relaxed text-charcoal/85 marker:text-slate">
                  {role.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
