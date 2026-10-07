import { existsSync } from "node:fs";
import path from "node:path";

import { Download } from "lucide-react";
import type { Metadata } from "next";
import { Fragment } from "react";

import { buttonBase, buttonTones } from "@/components/ui/primitives";
import { interests, resume } from "@/content/resume";
import { activeSocialLinks, site } from "@/content/site";
import type { ResumeOrganization } from "@/content/types";

export const metadata: Metadata = {
  title: "Résumé",
  description: `Résumé of ${site.name}: education, journalism and media experience, and skills.`,
  alternates: { canonical: "/resume" },
  openGraph: { url: "/resume", title: `Résumé — ${site.name}` },
};

/**
 * One type scale for the whole résumé, so every section reads the same:
 * headings (organizations, school), role titles, body copy and meta (dates,
 * locations) each have a single size.
 */
const type = {
  heading: "font-serif text-step-1 font-medium leading-snug text-charcoal",
  role: "text-step-0 font-semibold leading-snug text-charcoal",
  body: "text-step-0 leading-relaxed text-charcoal/85",
  meta: "text-step--1 tabular text-slate-ink",
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
            {pdfAvailable && (
              <a
                href={resume.pdfPath}
                download
                className={`${buttonBase} ${buttonTones.primary}`}
                data-print="hide"
              >
                <Download aria-hidden="true" className="size-4" strokeWidth={1.75} />
                Download PDF
              </a>
            )}
          </div>
          <ul className={`mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 ${type.body}`}>
            <li className="text-slate-ink">{site.location}</li>
            <Dot />
            {resume.phone && (
              <>
                <li>
                  <a href={`tel:${resume.phone.replace(/[^\d+]/g, "")}`} className="link-inline tabular">
                    {resume.phone}
                  </a>
                </li>
                <Dot />
              </>
            )}
            <li>
              <a href={`mailto:${site.email}`} className="link-inline">
                {site.email}
              </a>
            </li>
            {profileLinks.map((s) => (
              <Fragment key={s.label}>
                <Dot />
                <li>
                  <a href={s.url} className="link-inline" rel="me noopener noreferrer" target="_blank">
                    {s.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              </Fragment>
            ))}
          </ul>
        </header>

        <ResumeSection title="Profile">
          <p className={type.body}>{resume.summary}</p>
        </ResumeSection>

        <ResumeSection title="Education">
          <EntryHeader title={resume.education.institution} aside={resume.education.location} />
          <ul className="mt-2 space-y-1">
            {resume.education.degrees.map((degree) => (
              <li key={degree} className={type.body}>
                {degree}
              </li>
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
              <div key={group.group} className="grid gap-1 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-6">
                <dt className={type.role}>{group.group}</dt>
                <dd className={type.body}>{group.items.join(", ")}</dd>
              </div>
            ))}
            <div className="grid gap-1 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-6">
              <dt className={type.role}>Interests</dt>
              <dd>
                <ul className="space-y-2">
                  {interests.map((interest) => (
                    <li key={interest.title} className={type.body}>
                      <span className="font-semibold text-charcoal">{interest.title}:</span> {interest.text}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
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
      <h2 id={id} className="kicker pt-1.5 leading-snug text-charcoal">
        {title}
      </h2>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

function EntryHeader({ title, aside }: { title: string; aside: string }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
      <h3 className={type.heading}>{title}</h3>
      <p className={type.meta}>{aside}</p>
    </div>
  );
}

function Organizations({ items }: { items: ResumeOrganization[] }) {
  return (
    <ol className="space-y-9">
      {items.map((org) => (
        <li key={org.organization}>
          <EntryHeader title={org.organization} aside={org.location} />
          <ol className="mt-3 space-y-5">
            {org.roles.map((role) => (
              <li key={role.title}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-0.5">
                  <p className={type.role}>{role.title}</p>
                  <p className={type.meta}>{role.period}</p>
                </div>
                <ul className={`mt-2 list-disc space-y-1.5 pl-5 marker:text-slate ${type.body}`}>
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
