/**
 * Video packages, game commentary, podcasts and photo essays.
 *
 * Videos are YouTube embeds that load only when the visitor presses play.
 * Posters are local copies of each video's own thumbnail. The order here is
 * the order on the Multimedia page; the first video is featured at the top.
 */
import schleusnerRecords from "@/assets/posters/aJX64OC45xk.jpg";
import schleusnerOverseas from "@/assets/posters/-SG7GoAMz7s.jpg";
import eliteEight from "@/assets/posters/_TE1eJJucEQ.jpg";
import secondWeekend from "@/assets/posters/cOaqN9oyJlE.jpg";
import wbbPackage from "@/assets/posters/EJQGFYyFXPU.jpg";
import wbbFeature from "@/assets/posters/1s5OinyKIM0.jpg";
import svuVolleyball from "@/assets/posters/NcEB85eAECk.jpg";
import twoSportAthlete from "@/assets/posters/uwrQYE1Ccyw.jpg";
import workingThroughKinks from "@/assets/posters/knMOo2m9_bQ.jpg";
import offseasonInsight from "@/assets/posters/7mFCJTkN0aQ.jpg";
import feiginInterview from "@/assets/posters/h9Yz-nNVVsc.jpg";
import isaacJames from "@/assets/posters/kFDMpXAaKEU.jpg";
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

import { heliotropePhotos, reidHallPhotos } from "./photos";
import type { MediaItem, Photo, Video } from "./types";

const PORTFOLIO_AUDIO = "https://shane-riley.myportfolio.com/shane-riley-audio";

function youtube(id: string, title: string, poster: Photo): Video {
  return { kind: "embed", provider: "youtube", id, title, poster };
}

function video(
  slug: string,
  kind: MediaItem["kind"],
  id: string,
  title: string,
  description: string,
  poster: Photo,
): MediaItem {
  return { slug, kind, title, description, poster, video: youtube(id, title, poster) };
}

function commentary(slug: string, sport: string, listId: string, src: Photo["src"], alt: string): MediaItem {
  const poster: Photo = { src, alt };
  const title = `${sport} commentary`;
  return {
    slug,
    kind: "Commentary",
    title,
    description: `Play-by-play, color and sideline commentary from Washington and Lee ${sport.toLowerCase()} broadcasts on the Washington and Lee Sports Network. Commentary start times are listed in each video's description.`,
    poster,
    video: { kind: "embed", provider: "youtube-playlist", id: listId, title: `${title} playlist`, poster },
  };
}

export const mediaItems: MediaItem[] = [
  // ---------------------------------------------------------------- Video
  video(
    "schleusner-records",
    "Video",
    "aJX64OC45xk",
    "W&L's Mary Schleusner sets two Division III women's hoops records",
    "A Rockbridge Report package on Mary Schleusner's record-setting season with Washington and Lee women's basketball.",
    { src: schleusnerRecords, alt: "A Washington and Lee women's basketball player stands in a locker room." },
  ),
  video(
    "elite-eight",
    "Video",
    "_TE1eJJucEQ",
    "Generals women's hoops undefeated season ends in Elite Eight",
    "A Rockbridge Report package on the end of Washington and Lee women's basketball's undefeated run in the NCAA Division III Elite Eight.",
    { src: eliteEight, alt: "Washington and Lee players speak at an NCAA news conference." },
  ),
  video(
    "ncaa-second-weekend",
    "Video",
    "cOaqN9oyJlE",
    "Generals look to stay undefeated as W&L hosts second weekend of NCAA women's basketball tournament",
    "A Rockbridge Report preview as Washington and Lee hosts the second weekend of the NCAA Division III women's basketball tournament.",
    { src: secondWeekend, alt: "A Washington and Lee women's basketball player is interviewed in the team's gym." },
  ),
  video(
    "schleusner-overseas",
    "Video",
    "-SG7GoAMz7s",
    "Generals basketball star Mary Schleusner considers playing overseas after graduation",
    "A Rockbridge Report package on Mary Schleusner weighing a professional career overseas.",
    { src: schleusnerOverseas, alt: "Senior forward Mary Schleusner sits for an interview beside another player." },
  ),
  video(
    "wbb-package",
    "Video",
    "EJQGFYyFXPU",
    "W&L women's basketball package",
    "A Rockbridge Report video package on Washington and Lee women's basketball.",
    { src: wbbPackage, alt: "Washington and Lee women's basketball players contest a shot during a game." },
  ),
  video(
    "wbb-feature",
    "Video",
    "1s5OinyKIM0",
    "W&L Women's Basketball",
    "A Rockbridge Report package on the Washington and Lee women's basketball team.",
    { src: wbbFeature, alt: "Washington and Lee women's basketball players huddle in front of a packed crowd." },
  ),
  video(
    "svu-volleyball",
    "Video",
    "NcEB85eAECk",
    "Southern Virginia University Volleyball leans on its young core in 2025 title defense",
    "A Rockbridge Report package on Southern Virginia University volleyball's title defense.",
    { src: svuVolleyball, alt: "A Southern Virginia University volleyball player is interviewed in a gym." },
  ),
  video(
    "two-sport-athlete",
    "Video",
    "uwrQYE1Ccyw",
    "Two-sport high school athlete finds home in Lexington after world travel with star-athlete father",
    "A Rockbridge Report package on a two-sport high school athlete who found a home in Lexington after traveling the world with a star-athlete father.",
    { src: twoSportAthlete, alt: "A high school lacrosse player sprints past defenders during a game." },
  ),
  video(
    "working-through-the-kinks",
    "Video",
    "knMOo2m9_bQ",
    "Working Through the Kinks",
    "A look inside the 2024-25 Washington and Lee men's basketball season.",
    { src: workingThroughKinks, alt: "Washington and Lee men's basketball players run a defensive drill at practice." },
  ),
  video(
    "offseason-insight",
    "Video",
    "7mFCJTkN0aQ",
    "Offseason Insight",
    "Offseason insight from the 2024-25 Washington and Lee men's basketball team.",
    { src: offseasonInsight, alt: "A Washington and Lee men's basketball player stands for an interview." },
  ),
  video(
    "thomas-feigin-interview",
    "Interview",
    "h9Yz-nNVVsc",
    "Rockbridge Report Studio Interview with Thomas Feigin",
    "A studio interview with Washington and Lee men's basketball's Thomas Feigin on the Rockbridge Report set.",
    { src: feiginInterview, alt: "Thomas Feigin smiles during an interview in the Rockbridge Report studio." },
  ),
  video(
    "isaac-james-art",
    "Documentary",
    "kFDMpXAaKEU",
    "Isaac James and His Art",
    "A 60-second documentary about the artist Isaac James and his work.",
    { src: isaacJames, alt: "A clay horse sculpture seated in an armchair." },
  ),
  video(
    "wind-ensemble-gradients",
    "Video",
    "fvejucNIt4U",
    'Washington and Lee University Wind Ensemble Concert "Gradients"',
    "A video on the Washington and Lee University Wind Ensemble's concert, \"Gradients.\"",
    { src: windEnsemble, alt: "A student is interviewed in the lobby of a campus building." },
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
  video(
    "hail-mary-podcast-1",
    "Podcast",
    "VbvJ4TGz-s8",
    "Hail Mary! Podcast",
    "A football podcast on Week 10 of the 2023 NFL season, created in Shane's Fall 2023 JOUR-208 class.",
    { src: hailMary1, alt: "Hail Mary! A Football Podcast logo." },
  ),
  video(
    "hail-mary-podcast-2",
    "Podcast",
    "6yyLLQRzm1w",
    "Hail Mary! Podcast #2",
    "A football podcast on Week 14 of the 2023 NFL season, created in Shane's Fall 2023 JOUR-208 class.",
    { src: hailMary2, alt: "Hail Mary! A Football Podcast logo." },
  ),
  {
    slug: "flosports-conversation",
    kind: "Podcast",
    title: "FloSports: A Conversation with Ryan Connell",
    description:
      "A conversation with Ryan Connell, the W&L athletics broadcaster and multimedia creative specialist, about the state of the FloSports streaming service in the ODAC. A companion to Shane's FloSports article.",
    link: { href: PORTFOLIO_AUDIO, label: "Listen on Shane's Adobe Portfolio" },
  },
  {
    slug: "campus-thoughts-marketplace",
    kind: "Podcast",
    title: "Campus Thoughts: Washington and Lee University Marketplace Dining",
    description:
      "Recorded and edited with Valentina Nunez: a discussion of the main campus dining option at W&L, the Marketplace, or \"Dhall.\"",
    link: { href: PORTFOLIO_AUDIO, label: "Listen on Shane's Adobe Portfolio" },
  },
  {
    slug: "lexington-life-john-tucker",
    kind: "Podcast",
    title: "Lexington Life: John Tucker",
    description:
      "A former Washington and Lee coach and student turned lifelong Lexington resident discusses his close connection to the city.",
    link: { href: PORTFOLIO_AUDIO, label: "Listen on Shane's Adobe Portfolio" },
  },
  video(
    "a-christmas-carol",
    "Audio",
    "5P0ucLIL8Go",
    "A Christmas Carol",
    "An audio production of Charles Dickens' A Christmas Carol, voiced, produced and edited by Washington and Lee's Fall 2023 JOUR-208 class.",
    { src: christmasCarol, alt: "An illustration of Ebenezer Scrooge holding a candle." },
  ),

  // ---------------------------------------------------------------- Photo essays
  {
    slug: "heliotrope",
    kind: "Photo Essay",
    title: "Heliotrope",
    description:
      "Heliotrope, a pizza restaurant and bar in Lexington, Virginia: a brief glimpse inside the restaurant, its typical environment, and what makes it welcoming for all.",
    poster: heliotropePhotos[0],
    photos: heliotropePhotos,
  },
  {
    slug: "reid-hall",
    kind: "Photo Essay",
    title: "The Ins and Outs of Reid Hall",
    description:
      "A look at the various moving parts of Reid Hall, home of journalism at Washington and Lee, and some of the things you'd expect to see when venturing inside.",
    poster: reidHallPhotos[0],
    photos: reidHallPhotos,
  },
];

/** Shane's YouTube channel, linked from the Multimedia page. */
export const youtubeChannel = "https://www.youtube.com/@ShaneRileyPortfolio";
