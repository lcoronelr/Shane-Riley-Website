/**
 * Stories.
 *
 * EVERY STORY BELOW IS AN EXAMPLE. The people, places and events are invented
 * to demonstrate the layout; none of it is published reporting. Each is marked
 * `placeholder: true`, which labels it on the site, keeps it out of the
 * sitemap, sets noindex and suppresses article structured data.
 *
 * To publish a real story, copy an entry, fill in your own copy and photos,
 * and remove `placeholder: true`. See docs/CONTENT_GUIDE.md.
 */
import { photos } from "./photos";
import type { Story, Video } from "./types";

/**
 * Demonstrates the click-to-load player. Big Buck Bunny is an open movie by
 * the Blender Foundation (CC BY 3.0); replace it with your own video.
 */
export const demoVideo: Video = {
  kind: "embed",
  provider: "youtube",
  id: "aqz-KE-bpKQ",
  title: "Demo embed: Big Buck Bunny (Blender Foundation)",
  poster: photos.boxingGym,
  duration: "10:34",
  captions: false,
  note: "Demo embed — Big Buck Bunny © Blender Foundation, CC BY 3.0. Replace with your own video reporting.",
  transcript:
    "Placeholder transcript. Paste the full transcript of your video here so the story is accessible to readers who cannot play audio.",
};

export const stories: Story[] = [
  {
    slug: "the-long-count",
    title: "The Long Count",
    dek: "At thirty-six, a club fighter with a day job and a bad shoulder takes one more fight. Example feature demonstrating the long-form layout.",
    excerpt:
      "A club fighter, a converted warehouse gym and the arithmetic of one last bout. Example story — placeholder copy.",
    sport: "Boxing",
    type: "Feature",
    published: "2026-08-30",
    publication: "Example Publication",
    hero: {
      ...photos.boxingRing,
      caption: "The corner after the final bell. (Placeholder photograph.)",
    },
    featured: true,
    placeholder: true,
    body: [
      {
        type: "paragraph",
        text: "The gym opens at five, which means Danny Voss is there at a quarter to, sitting in his car with the heater running and a paper cup of coffee going cold in the holder. He is thirty-six years old. He works nights stacking freight. In eleven days he will fight for the twenty-third time as a professional, and he already knows, the way fighters know things, that it will be the last.",
      },
      {
        type: "paragraph",
        text: "This is example copy. Danny Voss is an invented character, and the gym, the promoter and the fight do not exist. The paragraphs are here to show how a long feature reads on this site: the measure of the column, the rhythm of the headings, the way photographs and pull quotes interrupt the text without breaking it.",
      },
      {
        type: "heading",
        text: "The arithmetic",
      },
      {
        type: "paragraph",
        text: "Club boxing runs on small numbers. A few hundred tickets. A purse that covers the camp, if the camp is short. A record that matters less than whether you sell, and whether you show up on weight. The fighters who last are the ones who can do that sum in their heads every week and still decide it is worth it.",
      },
      {
        type: "quote",
        text: "You don't retire from this. You just stop getting the phone call, and one day you notice.",
        attribution: "Danny Voss (fictional)",
      },
      {
        type: "paragraph",
        text: "His trainer — call her Marisol, also invented — has been in his corner for nine of those fights. She wraps his hands the same way every time, left then right, and talks the whole time about anything except the opponent. It is, she says, the only part of the job she has never had to learn.",
      },
      {
        type: "gallery",
        title: "Fight camp",
        photos: [
          { ...photos.boxingGym, caption: "The gym before the morning session. (Placeholder photograph.)" },
          { ...photos.muayThaiWater, caption: "Sparring outdoors at the end of the day. (Placeholder photograph.)" },
          { ...photos.darkSeats, caption: "The venue, an hour before doors. (Placeholder photograph.)" },
        ],
      },
      {
        type: "heading",
        text: "Fight night",
      },
      {
        type: "paragraph",
        text: "The last section of a feature like this would carry the fight itself: the walk, the rounds, the decision, and what came after. Keep paragraphs short when the action is fast. Let the photographs carry what words would only slow down.",
      },
      {
        type: "video",
        video: demoVideo,
      },
      {
        type: "paragraph",
        text: "When the story ends, the page offers the reader somewhere else to go: more stories from the same sport, and a way to share this one. That is the whole template. Replace every word of it.",
      },
    ],
  },
  {
    slug: "under-the-lights",
    title: "Under the Lights",
    dek: "An amateur league that only plays after dark, on a field nobody else wants. Example feature.",
    excerpt:
      "Midnight kick-offs, one working floodlight and the most committed players in the city. Example story — placeholder copy.",
    sport: "Soccer",
    type: "Feature",
    published: "2026-08-12",
    hero: {
      ...photos.nightField,
      caption: "The only lit pitch for miles. (Placeholder photograph.)",
    },
    featured: true,
    placeholder: true,
    body: [
      {
        type: "paragraph",
        text: "By ten o'clock the day leagues have gone home and the field belongs to the night players: line cooks, nurses coming off shift, a bus driver who plays in goal in his uniform trousers. This is example copy describing an invented league.",
      },
      {
        type: "paragraph",
        text: "Use features like this one to show range: the kind of reporting that starts with a strange detail — one floodlight, a midnight kick-off — and follows it until it opens onto something larger about a place and its people.",
      },
      {
        type: "image",
        size: "wide",
        photo: { ...photos.goalNetLights, caption: "Floodlights through the goal net. (Placeholder photograph.)" },
      },
      {
        type: "quote",
        text: "Everyone here is tired. Nobody here is going home.",
        attribution: "League organizer (fictional)",
      },
      {
        type: "paragraph",
        text: "Replace this paragraph with your reporting. Keep the photograph captions factual: who, where, when, and the photographer's credit.",
      },
    ],
  },
  {
    slug: "last-ballpark-summer",
    title: "The Last Ballpark Summer",
    dek: "A minor-league park counts down its final season. Example essay.",
    excerpt:
      "Nine innings, one more summer and a town deciding what it will remember. Example story — placeholder copy.",
    sport: "Baseball",
    type: "Essay",
    published: "2026-07-26",
    hero: {
      ...photos.ballparkNight,
      caption: "A full house under the lights. (Placeholder photograph.)",
    },
    featured: true,
    placeholder: true,
    body: [
      {
        type: "paragraph",
        text: "Every ballpark has a sound, and you only notice it when someone tells you it is going away. This essay is placeholder copy about an invented ballpark.",
      },
      {
        type: "image",
        photo: { ...photos.pitcher, caption: "A late-inning reliever. (Placeholder photograph.)" },
      },
      {
        type: "paragraph",
        text: "Essays can be more personal than features. The layout keeps them readable: a comfortable line length, generous leading, and room for a single strong image.",
      },
      {
        type: "quote",
        text: "You don't build a place like this again. You just build something next to where it used to be.",
      },
      {
        type: "paragraph",
        text: "Replace this essay with your own.",
      },
    ],
  },
  {
    slug: "pond-season",
    title: "Pond Season",
    dek: "Outdoor hockey in the three weeks a year the ice holds. Example photo essay.",
    excerpt:
      "The shortest season in sport, played in borrowed skates on a frozen pond. Example story — placeholder copy.",
    sport: "Hockey",
    type: "Photo Essay",
    published: "2026-02-08",
    hero: {
      ...photos.pondHockey,
      caption: "A late-afternoon game on the pond. (Placeholder photograph.)",
    },
    featured: true,
    placeholder: true,
    body: [
      {
        type: "paragraph",
        text: "Photo essays lead with images and keep the words short. This one is placeholder copy about an invented pond league.",
      },
      {
        type: "gallery",
        title: "Three weeks of ice",
        photos: [
          { ...photos.pondHockey, caption: "Two players contest the puck. (Placeholder photograph.)" },
          { ...photos.crowd, caption: "Spectators on the bank. (Placeholder photograph.)" },
          { ...photos.emptySeats, caption: "The rink after the thaw. (Placeholder photograph.)" },
          { ...photos.turfLine, caption: "Lines, of a different kind. (Placeholder photograph.)" },
        ],
      },
      {
        type: "paragraph",
        text: "Add a short closing paragraph, or let the final photograph end the story.",
      },
    ],
  },
  {
    slug: "blue-court-geometry",
    title: "Blue Court Geometry",
    dek: "What the angles of a single rally reveal about a changing game. Example analysis.",
    excerpt:
      "Breaking down one point, shot by shot, to explain a tactical shift. Example story — placeholder copy.",
    sport: "Tennis",
    type: "Analysis",
    published: "2026-06-18",
    hero: {
      ...photos.tennisBlue,
      caption: "A stretched forehand from the baseline. (Placeholder photograph.)",
    },
    placeholder: true,
    body: [
      {
        type: "paragraph",
        text: "Analysis pieces explain how something works. This is placeholder copy; the rally, the players and the statistics it would cite are all invented.",
      },
      {
        type: "heading",
        text: "The first three shots",
      },
      {
        type: "paragraph",
        text: "Use short subheadings to break a technical argument into steps the reader can follow.",
      },
      {
        type: "image",
        photo: { ...photos.tennisLines, caption: "The service box, from above. (Placeholder photograph.)" },
      },
      {
        type: "paragraph",
        text: "Close with what the reader should watch for next time.",
      },
    ],
  },
  {
    slug: "what-the-water-takes",
    title: "What the Water Takes",
    dek: "A big-wave surfer on the season that nearly ended everything. Example profile.",
    excerpt:
      "Twenty-foot faces, a two-minute hold-down and the long way back. Example story — placeholder copy.",
    sport: "Surfing",
    type: "Profile",
    published: "2026-05-30",
    hero: {
      ...photos.surfAir,
      caption: "Airborne on a winter swell. (Placeholder photograph.)",
    },
    placeholder: true,
    body: [
      {
        type: "paragraph",
        text: "Profiles are built on access and time. This is placeholder copy about an invented surfer.",
      },
      {
        type: "image",
        size: "wide",
        photo: { ...photos.bigWave, caption: "The outer reef on a big day. (Placeholder photograph.)" },
      },
      {
        type: "quote",
        text: "The ocean doesn't care that you trained. That's the part I like.",
        attribution: "Profile subject (fictional)",
      },
      {
        type: "paragraph",
        text: "Replace this profile with your own reporting.",
      },
    ],
  },
  {
    slug: "rain-miles",
    title: "Rain Miles",
    dek: "Training for a marathon in the wettest month on record. Example profile.",
    excerpt:
      "Four hundred miles, most of them wet, and one number to hit on race day. Example story — placeholder copy.",
    sport: "Running",
    type: "Profile",
    published: "2026-04-21",
    hero: {
      ...photos.runnerRain,
      caption: "A morning run on the waterfront. (Placeholder photograph.)",
    },
    placeholder: true,
    body: [
      {
        type: "paragraph",
        text: "This profile is placeholder copy about an invented runner.",
      },
      {
        type: "image",
        photo: { ...photos.marathoner, caption: "Race day, mile twenty. (Placeholder photograph.)" },
      },
      {
        type: "paragraph",
        text: "Replace with your own reporting.",
      },
    ],
  },
  {
    slug: "the-referees-walk",
    title: "The Referee's Walk",
    dek: "Ninety minutes with the least popular person on the pitch. Example feature.",
    excerpt:
      "What it takes to officiate a Sunday league — and why anyone does it. Example story — placeholder copy.",
    sport: "Soccer",
    type: "Feature",
    published: "2026-03-15",
    hero: {
      ...photos.referee,
      caption: "Before kick-off. (Placeholder photograph.)",
    },
    placeholder: true,
    body: [
      {
        type: "paragraph",
        text: "This feature is placeholder copy about an invented referee.",
      },
      {
        type: "image",
        photo: { ...photos.cornerLine, caption: "The corner flag area, marked fresh that morning. (Placeholder photograph.)" },
      },
      {
        type: "paragraph",
        text: "Replace with your own reporting.",
      },
    ],
  },
  {
    slug: "noon-run",
    title: "The Noon Run",
    dek: "A lunchtime pickup game with no teams, no score and a thirty-year history. Example feature.",
    excerpt:
      "The city's longest-running pickup game has never kept score. Example story — placeholder copy.",
    sport: "Basketball",
    type: "Feature",
    published: "2026-01-24",
    hero: {
      ...photos.courtAerial,
      caption: "Pickup at noon, seen from the roof. (Placeholder photograph.)",
    },
    placeholder: true,
    body: [
      {
        type: "paragraph",
        text: "This feature is placeholder copy about an invented pickup game.",
      },
      {
        type: "paragraph",
        text: "Replace with your own reporting.",
      },
    ],
  },
];
