/**
 * Résumé and biography content. Edited in the CMS ("Résumé" and "About page"),
 * saved in data/resume.json and data/about.json. When the résumé changes,
 * upload the new PDF in the CMS too.
 */
import { text, textList } from "./cms";
import aboutData from "./data/about.json";
import data from "./data/resume.json";
import type { ResumeOrganization, TimelineEntry } from "./types";

/** Interests, shown in the About page sidebar. */
export const interests = aboutData.interests.map((interest, i) => ({
  title: text(interest.title, `About page → Interest ${i + 1} → Title`),
  text: text(interest.text, `About page → Interest ${i + 1} → Description`),
}));

export const about = {
  /** Opening paragraph of the About page. */
  intro: text(aboutData.intro, "About page → Intro"),
  /** Longer biography, one string per paragraph. */
  biography: textList(aboutData.biography, "About page → Biography"),
};

function organizations(list: typeof data.experience, where: string): ResumeOrganization[] {
  return list.map((org, i) => {
    const at = `Résumé → ${where} ${i + 1}`;
    return {
      organization: text(org.organization, `${at} → Organization`),
      location: text(org.location, `${at} → Location`),
      roles: org.roles.map((role, j) => ({
        title: text(role.title, `${at} → Role ${j + 1} → Job title`),
        period: text(role.period, `${at} → Role ${j + 1} → Dates`),
        bullets: textList(role.bullets, `${at} → Role ${j + 1} → Bullet points`),
      })),
    };
  });
}

export const resume = {
  /** Shown on the résumé page only. */
  phone: data.phone,
  summary: text(data.summary, "Résumé → Profile summary"),
  education: {
    institution: text(data.education.institution, "Résumé → Education → School"),
    location: text(data.education.location, "Résumé → Education → Location"),
    degrees: textList(data.education.degrees, "Résumé → Education → Degrees"),
  },
  experience: organizations(data.experience, "Journalism & media experience"),
  additionalExperience: organizations(data.additionalExperience, "Additional experience"),
  /** Skill names use Title Case throughout. */
  skills: data.skills.map((group, i) => ({
    group: text(group.group, `Résumé → Skill group ${i + 1} → Name`),
    items: textList(group.items, `Résumé → Skill group ${i + 1} → Skills`),
  })),
  /**
   * Path of a downloadable PDF under /public. The Download PDF button only
   * appears when this file actually exists at build time.
   */
  pdfPath: data.pdf,
};

/** The About page timeline: every journalism and media role, in résumé order. */
export const timeline: TimelineEntry[] = resume.experience.flatMap((org) =>
  org.roles.map((role) => ({
    period: role.period,
    title: role.title,
    organization: org.organization,
    description: role.bullets[0],
  })),
);
