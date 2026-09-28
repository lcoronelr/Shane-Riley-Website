/**
 * Résumé and biography content.
 *
 * EVERYTHING HERE IS A PLACEHOLDER. Bracketed text marks fields to replace
 * with real, verifiable details. Nothing in this file describes actual
 * employment, education or awards.
 */
import type { TimelineEntry } from "./types";

export const about = {
  /** Opening paragraph of the About page. */
  intro:
    "[Placeholder] Write two or three sentences about the kind of sports journalism you do and why. This paragraph opens the About page.",
  /** Longer biography, one string per paragraph. */
  biography: [
    "[Placeholder] Where you started, what drew you to sports reporting, and the beats you have covered.",
    "[Placeholder] The stories you are proudest of and what they taught you. Link to them from the Stories page.",
    "[Placeholder] What you are working on now and the kinds of assignments you are looking for.",
  ],
  /** Topics you report on. */
  interests: [
    "[Placeholder] Combat sports",
    "[Placeholder] Grassroots and amateur sport",
    "[Placeholder] Athlete health and labour",
    "[Placeholder] Sport and the city",
    "[Placeholder] Visual storytelling",
  ],
};

export const resume = {
  /** One-paragraph professional summary at the top of the résumé. */
  summary:
    "[Placeholder] A two-sentence professional summary: your role, your specialisms and the outlets or audiences you serve.",
  experience: [
    {
      period: "[Year] – Present",
      title: "[Job title]",
      organization: "[Publication or organization]",
      description:
        "[Placeholder] One or two lines on responsibilities and notable work.",
    },
    {
      period: "[Year] – [Year]",
      title: "[Job title]",
      organization: "[Publication or organization]",
      description: "[Placeholder] One or two lines on responsibilities and notable work.",
    },
    {
      period: "[Year] – [Year]",
      title: "[Job title]",
      organization: "[Publication or organization]",
      description: "[Placeholder] One or two lines on responsibilities and notable work.",
    },
  ] satisfies TimelineEntry[],
  education: [
    {
      period: "[Year] – [Year]",
      title: "[Degree or program]",
      organization: "[Institution]",
    },
  ] satisfies TimelineEntry[],
  /** Selected published work. Link to the original where possible. */
  selectedWork: [
    { title: "[Story headline]", outlet: "[Outlet]", year: "[Year]", url: "" },
    { title: "[Story headline]", outlet: "[Outlet]", year: "[Year]", url: "" },
    { title: "[Story headline]", outlet: "[Outlet]", year: "[Year]", url: "" },
  ],
  skills: [
    { group: "Reporting", items: ["[Skill]", "[Skill]", "[Skill]"] },
    { group: "Multimedia", items: ["[Skill]", "[Skill]", "[Skill]"] },
    { group: "Tools", items: ["[Tool]", "[Tool]", "[Tool]"] },
    { group: "Languages", items: ["[Language]"] },
  ],
  awards: [
    { title: "[Award or honour]", organization: "[Awarding body]", year: "[Year]" },
  ],
  /**
   * Path of a downloadable PDF under /public. The Download PDF button only
   * appears when this file actually exists at build time.
   */
  pdfPath: "/resume/shane-riley-resume.pdf",
};

/** The About page timeline reuses résumé experience by default. */
export const timeline: TimelineEntry[] = resume.experience;
