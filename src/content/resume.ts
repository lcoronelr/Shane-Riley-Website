/**
 * Résumé and biography content, from Shane Riley's résumé and portfolio.
 * Update this file whenever the PDF résumé changes.
 */
import type { ResumeOrganization, TimelineEntry } from "./types";

export const about = {
  /** Opening paragraph of the About page. */
  intro:
    "A student journalist at Washington and Lee University with a passion for sports and for sharing everyone's story in an ever-changing media landscape.",
  /** Longer biography, one string per paragraph. */
  biography: [
    "I am from Chesapeake, Virginia, where my love for sports began with watching local teams like the Norfolk Tides and Admirals. The love and appreciation for sports that I developed as a child fuel my work every day, just as much as the importance of storytelling and truth-telling across all types of journalistic work.",
    "At Washington and Lee, where I am studying journalism and European and Russian history, I report, write, produce and broadcast sports and local news across print, digital, television and radio. I produce the Rockbridge Report's weekly live newscast, call home games as a play-by-play, color and sideline reporter for the Washington and Lee Sports Network, and write for The Ring-tum Phi and The News-Gazette.",
    "Here you can explore my work, from commentary for W&L athletics to published articles, video packages, podcasts and photography.",
  ],
  /** Interests listed on the About page. */
  interests: ["History", "Hiking", "News Writing", "Multimedia Storytelling", "Radio Production"],
};

export const resume = {
  /** Shown on the résumé page only. */
  phone: "757-606-7217",
  summary:
    "Journalism student with experience reporting, writing, producing and broadcasting sports and local news across print, digital, television and radio platforms. Experienced in live, deadline-driven production, multimedia storytelling, on-air reporting and newsroom collaboration.",
  education: {
    institution: "Washington and Lee University",
    location: "Lexington, VA",
    degrees: [
      "Bachelor of Arts in Journalism, Class of 2027",
      "Bachelor of Arts in European and Russian History, Class of 2027",
    ],
  },
  experience: [
    {
      organization: "Rockbridge Report",
      location: "Lexington, VA",
      roles: [
        {
          title: "Producer",
          period: "September 2026 – Present",
          bullets: [
            "Produce a weekly live, deadline-driven 30-minute newscast, using iNews to organize and sequence broadcast content.",
            "Write and select news, weather and sports programming for the broadcast.",
            "Produce website content in WordPress using reporter stories and relevant national news.",
            "Communicate with reporters through weekly pitch meetings to develop stories, plan coverage and meet deadlines.",
          ],
        },
        {
          title: "Sports Reporter",
          period: "January 2026 – April 2026",
          bullets: [
            "Research, report and produce video packages and articles on local sports stories.",
            "Collaborate daily with reporters, producers and editors to plan and execute newsroom coverage.",
          ],
        },
      ],
    },
    {
      organization: "Sinclair Communications",
      location: "Norfolk, VA",
      roles: [
        {
          title: "Radio Broadcasting Intern",
          period: "June 2026 – August 2026",
          bullets: [
            "Worked across Sinclair Communications' five-station radio network with a focus on sports broadcasting and on-air production.",
            "Produced daily one-minute sports news segments for News Talk 790-WNIS.",
            "Voiced advertisements and appeared on air with Tony Macrini to discuss news, sports and talk-radio topics.",
            "Appeared several times on the weekly Sports Insight 790 program.",
          ],
        },
      ],
    },
    {
      organization: "The News-Gazette",
      location: "Lexington, VA",
      roles: [
        {
          title: "Freelance Sports Reporter",
          period: "January 2026 – Present",
          bullets: [
            "Report and write game recaps covering local athletics for a weekly, family-owned newspaper serving the Rockbridge area.",
            "Collaborate with Sports Editor Jonathan Schwab on story planning and coverage.",
          ],
        },
      ],
    },
    {
      organization: "Washington and Lee Sports Network",
      location: "Lexington, VA",
      roles: [
        {
          title: "Play-by-Play, Color & Sideline Reporter",
          period: "September 2024 – Present",
          bullets: [
            "Analyze and comment on Washington and Lee home athletic events for live broadcast audiences.",
            "Covered NCAA Division III soccer and basketball championship tournaments.",
          ],
        },
      ],
    },
    {
      organization: "The Ring-tum Phi",
      location: "Lexington, VA",
      roles: [
        {
          title: "Sports Reporter",
          period: "October 2023 – Present",
          bullets: ["Report and write articles covering Washington and Lee athletics for print and digital platforms."],
        },
      ],
    },
    {
      organization: "91.5 WLUR-FM",
      location: "Lexington, VA",
      roles: [
        {
          title: "Radio Host",
          period: "September 2023 – Present",
          bullets: [
            "Host live radio programming, manage on-air segments and cultivate an engaging on-air presence and vocal delivery.",
          ],
        },
      ],
    },
  ] satisfies ResumeOrganization[],
  additionalExperience: [
    {
      organization: "Washington and Lee Athletics Communications",
      location: "Lexington, VA",
      roles: [
        {
          title: "Student Assistant / Multimedia Content",
          period: "Current",
          bullets: ["Support athletics communications and multimedia coverage through content production and event coverage."],
        },
      ],
    },
    {
      organization: "Harte Center Writing Tutoring",
      location: "Lexington, VA",
      roles: [
        {
          title: "Writing Consultant",
          period: "September 2025 – Present",
          bullets: ["Guide students in developing effective writing and presentation skills across academic disciplines."],
        },
      ],
    },
    {
      organization: "Washington Journalism and Media Conference",
      location: "Washington, D.C.",
      roles: [
        {
          title: "Correspondent",
          period: "July 2022",
          bullets: ["Gained experience in professional journalism practices and industry networking."],
        },
      ],
    },
  ] satisfies ResumeOrganization[],
  skills: [
    {
      group: "Journalism",
      items: ["AP Style", "News writing", "Sports reporting", "Live reporting", "Broadcast production", "Multimedia storytelling"],
    },
    {
      group: "Technology",
      items: ["iNews", "WordPress", "Adobe Premiere Pro", "Adobe Audition", "Adobe Photoshop", "Microsoft Office"],
    },
    { group: "Interests", items: ["History", "Hiking", "News Writing", "Multimedia Storytelling", "Radio Production"] },
  ],
  /**
   * Path of a downloadable PDF under /public. The Download PDF button only
   * appears when this file actually exists at build time.
   */
  pdfPath: "/resume/shane-riley-resume.pdf",
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
