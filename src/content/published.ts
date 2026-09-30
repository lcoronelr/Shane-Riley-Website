/**
 * Shane's bylined work at other outlets, shown on the Stories page with links
 * to the originals. Newest first within each outlet. Add new articles at the top.
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
        title: "Women's basketball ends historic season in Elite Eight",
        url: "https://ringtumphi.net/11201/sports/womens-basketball-ends-historic-season-in-elite-eight/",
        summary: "The Generals' season ends after a program-best 31 straight wins, with a 77-64 loss to Denison.",
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
        title: "Cross country nationals wrap up",
        url: "https://ringtumphi.net/10844/sports/cross-country-nationals-wrap-up/",
        summary: "The women place 15th and the men earn a program-best 20th-place finish at nationals.",
      },
      {
        title: "Family ties fuel success: W&L soccer siblings",
        url: "https://ringtumphi.net/10766/sports/family-ties-fuel-success-wl-soccer-siblings/",
        summary: "Siblings on W&L's men's and women's soccer teams, both headed back to the NCAA tournament.",
      },
      {
        title: "FloSports puts W&L Athletics behind a paywall",
        url: "https://ringtumphi.net/10521/sports/flosports-puts-wl-athletics-behind-a-paywall/",
        summary: "The ODAC's five-year media rights deal moves W&L broadcasts to a subscription service.",
      },
      {
        title: "Double trouble: How identical twins navigate W&L sports",
        url: "https://ringtumphi.net/8089/sports/double-trouble-how-identical-twins-navigate-wl-sports/",
        summary: "Identical twins on Washington and Lee's volleyball and lacrosse teams.",
      },
    ],
  },
  {
    name: "Rockbridge Report",
    authorUrl: "https://rockbridgereport.academic.wlu.edu/?s=shane+riley",
    articles: [
      {
        title: "W&L golf teams adjust as course renovations limit practice access",
        url: "https://rockbridgereport.academic.wlu.edu/2026/04/09/wl-golf-teams-adjust-as-course-renovations-limit-practice-access/",
        summary: "The golf teams have practiced without a course since January while the Lexington Golf and Country Club is renovated.",
      },
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
        title: "Generals basketball star Mary Schleusner considers playing overseas after graduation",
        url: "https://rockbridgereport.academic.wlu.edu/2026/03/26/generals-basketball-star-mary-schleusner-considers-playing-overseas-after-graduation/",
        summary: "The 2026 Jostens Trophy winner weighs playing abroad in Australia after graduation.",
      },
      {
        title: "Mary Schleusner earns Division III all-star nod as record-setting women's basketball season comes to an end",
        url: "https://rockbridgereport.academic.wlu.edu/2026/03/19/mary-schleusner-earns-division-iii-all-star-nod-as-record-setting-womens-basketball-season-comes-to-an-end/",
        summary: "The record holder heads to the WBCA Division III All-Star Game after the season ends in the Elite Eight.",
      },
      {
        title: "Generals women's hoops undefeated season ends in Elite Eight",
        url: "https://rockbridgereport.academic.wlu.edu/2026/03/17/generals-womens-hoops-undefeated-season-ends-in-elite-eight/",
        summary: "A loss in Lexington ends W&L's perfect season one step short of the program's first semifinal.",
      },
      {
        title: "Generals look to stay undefeated as W&L hosts second weekend of NCAA women's basketball tournament",
        url: "https://rockbridgereport.academic.wlu.edu/2026/03/12/generals-look-to-stay-undefeated-as-wl-hosts-second-weekend-of-ncaa-womens-basketball-tournament/",
        summary: "At 30-0, the Generals host the Sweet 16 and Elite Eight in front of packed crowds.",
      },
      {
        title: "Washington and Lee women's basketball team stays unbeaten, advances to Sweet 16",
        url: "https://rockbridgereport.academic.wlu.edu/2026/03/10/washington-and-lee-womens-basketball-team-stays-unbeaten-advances-to-sweet-16/",
        summary: "W&L reaches 30 wins for the first time in program history.",
      },
      {
        title: "Rockbridge County supervisors move closer to bond sale to fund new recreation center",
        url: "https://rockbridgereport.academic.wlu.edu/2026/03/05/rockbridge-county-supervisors-move-closer-to-bond-sale-to-fund-new-recreation-center/",
        summary: "The county plans to borrow up to $15.5 million for a recreation center and tennis courts.",
      },
      {
        title: "Southern Virginia University Volleyball leans on its young core in 2025 title defense",
        url: "https://rockbridgereport.academic.wlu.edu/2026/02/19/southern-virginia-university-volleyball-leans-on-its-young-core-in-2025-title-defense/",
        summary: "The defending national champions start 13-1 with 10 freshmen and one returning starter.",
      },
      {
        title: "Accountant-turned-coach takes over as athletic director at Rockbridge County High School",
        url: "https://rockbridgereport.academic.wlu.edu/2026/02/12/accountant-turned-coach-takes-over-as-athletic-director-at-rockbridge-county-high-school/",
        summary: "Anthony Marasco's path from accounting to coaching to leading Rockbridge County athletics.",
      },
      {
        title: "W&L's Mary Schleusner sets two Division III women's hoops records",
        url: "https://rockbridgereport.academic.wlu.edu/2026/02/05/wls-mary-schleusner-sets-two-division-iii-womens-hoops-records/",
        summary: "Schleusner chases 2,000 career points and rebounds, and credits her team for the records.",
      },
      {
        title: "Two-sport high school athlete finds home in Lexington after world travel with star-athlete father",
        url: "https://rockbridgereport.academic.wlu.edu/2026/01/29/riletwosportathlete/",
        summary: "Lola Mulitalo commits to Division I lacrosse at Kennesaw State.",
      },
    ],
  },
];
