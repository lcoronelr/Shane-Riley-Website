/**
 * Video packages, game commentary, podcasts and audio.
 *
 * Videos are YouTube embeds that load only when the visitor presses play.
 * Posters are local copies of each video's own thumbnail; audio files live in
 * public/audio. Items appear in this order within each section of the
 * Multimedia page; the first video is featured at the top.
 */
import schleusnerRecords from "@/assets/posters/aJX64OC45xk.jpg";
import schleusnerOverseas from "@/assets/posters/-SG7GoAMz7s.jpg";
import golf from "@/assets/posters/FS3J-QV0YHA.jpg";
import schleusnerAllStar from "@/assets/posters/1s5OinyKIM0.jpg";
import eliteEight from "@/assets/posters/_TE1eJJucEQ.jpg";
import secondWeekend from "@/assets/posters/cOaqN9oyJlE.jpg";
import sweetSixteen from "@/assets/posters/EJQGFYyFXPU.jpg";
import svuVolleyball from "@/assets/posters/NcEB85eAECk.jpg";
import twoSportAthlete from "@/assets/posters/uwrQYE1Ccyw.jpg";
import isaacJames from "@/assets/posters/kFDMpXAaKEU.jpg";
import workingThroughKinks from "@/assets/posters/knMOo2m9_bQ.jpg";
import offseasonInsight from "@/assets/posters/7mFCJTkN0aQ.jpg";
import feiginInterview from "@/assets/posters/h9Yz-nNVVsc.jpg";
import windEnsemble from "@/assets/posters/fvejucNIt4U.jpg";
import hailMary1 from "@/assets/posters/VbvJ4TGz-s8.jpg";
import hailMary2 from "@/assets/posters/6yyLLQRzm1w.jpg";
import christmasCarol from "@/assets/posters/5P0ucLIL8Go.jpg";
import mensSoccer from "@/assets/posters/PLfpVwYj_UdCFraXDc4N5zRlUHMZx6ydw4.jpg";
import womensSoccer from "@/assets/posters/PLfpVwYj_UdCF-jpQ9Wk5qmR5PZFSjKnWX.jpg";
import mensBasketball from "@/assets/posters/PLfpVwYj_UdCF-oFMUZ737bo8oKaM7Nvkm.jpg";
import womensBasketball from "@/assets/posters/PLfpVwYj_UdCGjq6gxCIFgAgqAB-o26FTr.jpg";
import baseball from "@/assets/posters/PLfpVwYj_UdCGGJtkQkGUNnQXzjAiJtuYI.jpg";
import mensLacrosse from "@/assets/posters/PLfpVwYj_UdCHOtx9qoVZXme1lJuz8UcR4.jpg";
import volleyball from "@/assets/posters/PLfpVwYj_UdCEQE7qLdAJPKKXjsyTSHil_.jpg";
import football from "@/assets/posters/PLfpVwYj_UdCHod004_A4BamgDXZG9dB7D.jpg";
import fieldHockey from "@/assets/posters/PLfpVwYj_UdCE096hyTQVKgtZOmbxBvKRH.jpg";

import type { MediaItem, Photo } from "./types";

function video(
  slug: string,
  kind: MediaItem["kind"],
  id: string,
  title: string,
  description: string,
  poster: Photo,
  duration?: string,
): MediaItem {
  return {
    slug,
    kind,
    title,
    description,
    poster,
    video: { kind: "embed", provider: "youtube", id, title, poster, duration },
  };
}

function commentary(slug: string, sport: string, listId: string, src: Photo["src"], alt: string): MediaItem {
  const poster: Photo = { src, alt };
  return {
    slug,
    kind: "Commentary",
    title: sport,
    description: "",
    poster,
    video: { kind: "embed", provider: "youtube-playlist", id: listId, title: `${sport} commentary`, poster },
    link: { href: `https://www.youtube.com/playlist?list=${listId}`, label: "Full playlist on YouTube" },
  };
}

export const mediaItems: MediaItem[] = [
  // ---------------------------------------------------------------- Video
  video(
    "schleusner-records",
    "Video",
    "aJX64OC45xk",
    "W&L's Mary Schleusner sets two Division III women's hoops records",
    "Schleusner is still trying to become the second player in NCAA women's basketball history to reach 2,000 career points and rebounds. She says the records are hard to wrap her mind around but mean nothing without her team's support.",
    { src: schleusnerRecords, alt: "Mary Schleusner stands in the Washington and Lee locker room." },
    "1:51",
  ),
  video(
    "schleusner-overseas",
    "Video",
    "-SG7GoAMz7s",
    "Generals basketball star Mary Schleusner considers playing overseas after graduation",
    "Schleusner was named the 2026 Jostens Trophy winner, presented to the top Division III basketball player each year. The senior hasn't made any decisions on next steps but is considering playing abroad in Australia after graduation in May.",
    { src: schleusnerOverseas, alt: "Mary Schleusner sits for an interview beside a teammate." },
    "1:07",
  ),
  video(
    "golf-course-renovations",
    "Video",
    "FS3J-QV0YHA",
    "W&L golf teams adjust as course renovations limit practice access",
    "The Washington and Lee golf teams have been practicing without a golf course since the beginning of the year. The school and the Lexington Golf and Country Club are renovating the course with improved facilities and plan to host tournaments once construction is complete.",
    { src: golf, alt: "A member of the Washington and Lee golf program is interviewed in an office, a tournament calendar behind her." },
  ),
  video(
    "schleusner-all-star",
    "Video",
    "1s5OinyKIM0",
    "Mary Schleusner earns Division III all-star nod as record-setting women's basketball season comes to an end",
    "After the season ended in the Elite Eight against Denison, Schleusner, the Division III career double-double and rebound record holder, weighs continuing her playing career in college or professionally, and heads to the WBCA Division III All-Star Game.",
    { src: schleusnerAllStar, alt: "Washington and Lee women's basketball players huddle in front of a packed crowd." },
    "1:38",
  ),
  video(
    "elite-eight",
    "Video",
    "_TE1eJJucEQ",
    "Generals women's hoops undefeated season ends in Elite Eight",
    "The loss in the NCAA Division III Elite Eight in Lexington ends the team's perfect season and its chance for the first semifinal appearance in program history. The team's seven graduating seniors helped win two Elite Eight appearances and three ODAC titles.",
    { src: eliteEight, alt: "Washington and Lee players speak at an NCAA news conference." },
    "1:34",
  ),
  video(
    "ncaa-second-weekend",
    "Video",
    "cOaqN9oyJlE",
    "Generals look to stay undefeated as W&L hosts second weekend of NCAA women's basketball tournament",
    "At 30-0, the Generals host Bethel, Denison and John Carroll in the Sweet 16 and Elite Eight, expecting big crowds again after filling Holekamp Gym with well over 500 fans in each of the opening-round games.",
    { src: secondWeekend, alt: "A Washington and Lee women's basketball player is interviewed in the team's gym." },
    "1:54",
  ),
  video(
    "sweet-sixteen",
    "Video",
    "EJQGFYyFXPU",
    "Washington and Lee women's basketball team stays unbeaten, advances to Sweet 16",
    "The Generals reached 30 wins for the first time in program history with NCAA tournament wins over St. Mary's, 73-44, and Christopher Newport, 61-55.",
    { src: sweetSixteen, alt: "Washington and Lee women's basketball players contest a shot during a game." },
    "1:05",
  ),
  video(
    "svu-volleyball",
    "Video",
    "NcEB85eAECk",
    "Southern Virginia University Volleyball leans on its young core in 2025 title defense",
    "Coming off a 2025 national championship, Southern Virginia is off to a 13-1 start, defending its title with 10 freshmen and only one returning starter.",
    { src: svuVolleyball, alt: "A Southern Virginia University volleyball player is interviewed in a gym." },
    "1:47",
  ),
  video(
    "two-sport-athlete",
    "Video",
    "uwrQYE1Ccyw",
    "Two-sport high school athlete finds home in Lexington after world travel with star-athlete father",
    "Rockbridge County High School senior Lola Mulitalo, a basketball forward and lacrosse attacker, has committed to play Division I lacrosse at Kennesaw State after helping the Wildcats to three straight 4A regional titles.",
    { src: twoSportAthlete, alt: "Lola Mulitalo sprints past defenders during a lacrosse game." },
    "1:45",
  ),
  video(
    "isaac-james-art",
    "Documentary",
    "kFDMpXAaKEU",
    "Isaac James and His Art",
    "A 60-second documentary: Washington and Lee junior Isaac James shares his motivation for, and personal fulfillment from, his creations.",
    { src: isaacJames, alt: "A clay horse sculpture seated in an armchair." },
    "1:03",
  ),
  video(
    "working-through-the-kinks",
    "Video",
    "knMOo2m9_bQ",
    "Working Through the Kinks",
    "Washington and Lee freshman Connor Amorosi and head coach Chris McHugh discuss Connor's and the team's growth during the 2024-25 men's basketball season. Produced in Sports Journalism 210.",
    { src: workingThroughKinks, alt: "Washington and Lee men's basketball players run a defensive drill at practice." },
    "2:35",
  ),
  video(
    "offseason-insight",
    "Video",
    "7mFCJTkN0aQ",
    "Offseason Insight",
    "Captains Colin Ryan and John Loughlin explain how the Division III men's basketball offseason differs from Division I, and how the team works to improve during the summer.",
    { src: offseasonInsight, alt: "Colin Ryan stands for an interview in a Generals basketball shirt." },
    "5:25",
  ),
  video(
    "thomas-feigin-interview",
    "Interview",
    "h9Yz-nNVVsc",
    "Studio Interview with Thomas Feigin",
    "Washington and Lee senior Thomas Feigin reflects on his playing career and time at the university, in the Rockbridge Report studio.",
    { src: feiginInterview, alt: "Thomas Feigin smiles during an interview in the Rockbridge Report studio." },
    "12:37",
  ),
  video(
    "wind-ensemble-gradients",
    "Video",
    "fvejucNIt4U",
    'Washington and Lee University Wind Ensemble Concert "Gradients"',
    "Highlights from the Wind Ensemble's concert Gradients, with musical inspiration drawn from various works of art.",
    { src: windEnsemble, alt: "A student is interviewed in the lobby of a campus building." },
    "1:59",
  ),

  // ---------------------------------------------------------------- Commentary
  commentary("commentary-mens-soccer", "Men's Soccer", "PLfpVwYj_UdCFraXDc4N5zRlUHMZx6ydw4", mensSoccer, "Game-day graphic for a Washington and Lee men's soccer ODAC Championship match."),
  commentary("commentary-womens-soccer", "Women's Soccer", "PLfpVwYj_UdCF-jpQ9Wk5qmR5PZFSjKnWX", womensSoccer, "Game-day graphic for an NCAA Division III women's soccer championship match."),
  commentary("commentary-mens-basketball", "Men's Basketball", "PLfpVwYj_UdCF-oFMUZ737bo8oKaM7Nvkm", mensBasketball, "Scoreboard graphic for Washington and Lee men's basketball against Guilford."),
  commentary("commentary-womens-basketball", "Women's Basketball", "PLfpVwYj_UdCGjq6gxCIFgAgqAB-o26FTr", womensBasketball, "Game-day graphic for Washington and Lee women's basketball against Shenandoah."),
  commentary("commentary-baseball", "Baseball", "PLfpVwYj_UdCGGJtkQkGUNnQXzjAiJtuYI", baseball, "A wide view of a baseball diamond during a Washington and Lee game."),
  commentary("commentary-mens-lacrosse", "Men's Lacrosse", "PLfpVwYj_UdCHOtx9qoVZXme1lJuz8UcR4", mensLacrosse, "The Washington and Lee trident logo."),
  commentary("commentary-volleyball", "Volleyball", "PLfpVwYj_UdCEQE7qLdAJPKKXjsyTSHil_", volleyball, "A Washington and Lee volleyball match seen from above the court."),
  commentary("commentary-football", "Football", "PLfpVwYj_UdCHod004_A4BamgDXZG9dB7D", football, "The Washington and Lee trident logo."),
  commentary("commentary-field-hockey", "Field Hockey", "PLfpVwYj_UdCE096hyTQVKgtZOmbxBvKRH", fieldHockey, "Game-day graphic for Washington and Lee field hockey against Rhodes."),

  // ---------------------------------------------------------------- Podcasts & audio
  {
    slug: "flosports-conversation",
    kind: "Podcast",
    title: "FloSports: A Conversation with Ryan Connell",
    description:
      "Ryan Connell, the W&L athletics broadcaster and multimedia creative specialist, on the state of the FloSports streaming service in the ODAC. A companion to the FloSports story.",
    audio: {
      src: "/audio/flosports-ryan-connell.mp4",
      title: "FloSports: A Conversation with Ryan Connell",
      duration: "5:24",
    },
  },
  {
    slug: "campus-thoughts-marketplace",
    kind: "Podcast",
    title: "Campus Thoughts: Marketplace Dining",
    description:
      "Recorded and edited with Valentina Nunez: a conversation about W&L's main campus dining option, the Marketplace, or \"Dhall.\"",
    audio: {
      src: "/audio/campus-thoughts-marketplace.mp4",
      title: "Campus Thoughts: Marketplace Dining",
      duration: "4:58",
    },
  },
  {
    slug: "lexington-life-john-tucker",
    kind: "Podcast",
    title: "Lexington Life: John Tucker",
    description:
      "A former Washington and Lee coach and student turned lifelong Lexington resident discusses his close connection to the city.",
    audio: {
      src: "/audio/lexington-life-john-tucker.mp4",
      title: "Lexington Life: John Tucker",
      duration: "4:37",
    },
  },
  video(
    "hail-mary-podcast-1",
    "Podcast",
    "VbvJ4TGz-s8",
    "Hail Mary! Podcast",
    "Game picks and insight for the NFL's 2023 Week 10 slate. Produced for JOUR-208, Fall 2023.",
    { src: hailMary1, alt: "Hail Mary! A Football Podcast logo." },
    "31:39",
  ),
  video(
    "hail-mary-podcast-2",
    "Podcast",
    "6yyLLQRzm1w",
    "Hail Mary! Podcast #2",
    "Game picks and insight for the NFL's 2023 Week 14 slate. Produced for JOUR-208, Fall 2023.",
    { src: hailMary2, alt: "Hail Mary! A Football Podcast logo." },
    "33:38",
  ),
  video(
    "a-christmas-carol",
    "Audio",
    "5P0ucLIL8Go",
    "A Christmas Carol",
    "An audio production of Charles Dickens' A Christmas Carol, voiced, produced and edited by Washington and Lee's Fall 2023 JOUR-208 class.",
    { src: christmasCarol, alt: "An illustration of Ebenezer Scrooge holding a candle." },
    "50:29",
  ),
];

/** Shane's YouTube channel, linked from the Multimedia page. */
export const youtubeChannel = "https://www.youtube.com/@ShaneRileyPortfolio";
