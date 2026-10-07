/**
 * A selection of Shane's bylined work at other outlets, shown on the Stories
 * page with links to the originals. Newest first within each outlet. Rockbridge
 * Report video packages live on the Multimedia page, so only its written
 * stories are listed here.
 */
export interface PublishedArticle {
  title: string;
  url: string;
  /** One sentence shown under the headline. */
  summary: string;
}

export interface Outlet {
  name: string;
  /** Shane's author page or search results at the outlet. */
  authorUrl: string;
  articles: PublishedArticle[];
}

export const outlets: Outlet[] = [
  {
    name: "The Ring-tum Phi",
    authorUrl: "https://ringtumphi.net/staff_name/shane-riley/",
    articles: [
      {
        title: "Tebow talks faith, philanthropy",
        url: "https://ringtumphi.net/11697/news/tebow-talks-faith-philanthropy/",
        summary: "Former Heisman winner and NFL quarterback Tim Tebow visits W&L to talk purpose, faith and his foundation's work.",
      },
      {
        title: "Schleusner enters the NCAA DIII record books",
        url: "https://ringtumphi.net/11004/sports/schleusner-enters-the-ncaa-diii-record-books/",
        summary: "Mary Schleusner breaks the all-time Division III women's basketball rebounding and double-doubles records.",
      },
      {
        title: "Men's basketball midseason check-in",
        url: "https://ringtumphi.net/10935/sports/mens-basketball-midseason-check-in/",
        summary: "At 13-2, the Generals sit third in the ODAC with more wins than they had all of last season.",
      },
      {
        title: "Family ties fuel success: W&L soccer siblings",
        url: "https://ringtumphi.net/10766/sports/family-ties-fuel-success-wl-soccer-siblings/",
        summary: "Siblings on W&L's men's and women's soccer teams, both headed back to the NCAA tournament.",
      },
    ],
  },
  {
    name: "Rockbridge Report",
    authorUrl: "https://rockbridgereport.academic.wlu.edu/?s=shane+riley",
    articles: [
      {
        title: "New RCHS girls soccer coach returns to lead team with new approaches, fresh outlook",
        url: "https://rockbridgereport.academic.wlu.edu/2026/04/02/new-rchs-girls-soccer-coach-returns-to-lead-team-with-new-approaches-fresh-outlook/",
        summary: "Carrie Dietz returns to head coaching at Rockbridge County High School after years away from the job.",
      },
      {
        title: "Natural Bridge Speedway promotes family-friendly atmosphere ahead of 2026 season",
        url: "https://rockbridgereport.academic.wlu.edu/2026/03/26/natural-bridge-speedway-promotes-family-friendly-atmosphere-ahead-of-2026-season/",
        summary: "The speedway adds an affordable Crown Victoria division to welcome new racers.",
      },
      {
        title: "Rockbridge County supervisors move closer to bond sale to fund new recreation center",
        url: "https://rockbridgereport.academic.wlu.edu/2026/03/05/rockbridge-county-supervisors-move-closer-to-bond-sale-to-fund-new-recreation-center/",
        summary: "The county plans to borrow up to $15.5 million for a recreation center and tennis courts.",
      },
      {
        title: "Accountant-turned-coach takes over as athletic director at Rockbridge County High School",
        url: "https://rockbridgereport.academic.wlu.edu/2026/02/12/accountant-turned-coach-takes-over-as-athletic-director-at-rockbridge-county-high-school/",
        summary: "Anthony Marasco's path from accounting to coaching to leading Rockbridge County athletics.",
      },
    ],
  },
];
