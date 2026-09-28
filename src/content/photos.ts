/**
 * Placeholder photography.
 *
 * Every image below is CC0 (public domain dedication) stock photography from
 * StockSnap.io, used only as a stand-in until the journalist's own or properly
 * licensed work is added. Replace these imports with your photographs in
 * src/assets/photos/ — see docs/CONTENT_GUIDE.md.
 */
import type { Photo } from "./types";

import ballfieldStars from "@/assets/placeholder/ballfield-stars.jpg";
import ballparkNight from "@/assets/placeholder/ballpark-night.jpg";
import baseballDark from "@/assets/placeholder/baseball-dark.jpg";
import bigWave from "@/assets/placeholder/big-wave.jpg";
import boxingGym from "@/assets/placeholder/boxing-gym.jpg";
import boxingRing from "@/assets/placeholder/boxing-ring.jpg";
import broadcastCamera from "@/assets/placeholder/broadcast-camera.jpg";
import cornerLine from "@/assets/placeholder/corner-line.jpg";
import courtAerial from "@/assets/placeholder/court-aerial.jpg";
import crowd from "@/assets/placeholder/crowd.jpg";
import darkSeats from "@/assets/placeholder/dark-seats.jpg";
import emptySeats from "@/assets/placeholder/empty-seats.jpg";
import emptyStadium from "@/assets/placeholder/empty-stadium.jpg";
import goalNetLights from "@/assets/placeholder/goal-net-lights.jpg";
import halfpipeLights from "@/assets/placeholder/halfpipe-lights.jpg";
import marathoner from "@/assets/placeholder/marathoner.jpg";
import muayThaiWater from "@/assets/placeholder/muay-thai-water.jpg";
import nightField from "@/assets/placeholder/night-field.jpg";
import pitcher from "@/assets/placeholder/pitcher.jpg";
import pondHockey from "@/assets/placeholder/pond-hockey.jpg";
import referee from "@/assets/placeholder/referee.jpg";
import runnerRain from "@/assets/placeholder/runner-rain.jpg";
import stadiumAerial from "@/assets/placeholder/stadium-aerial.jpg";
import studioMic from "@/assets/placeholder/studio-mic.jpg";
import surfAir from "@/assets/placeholder/surf-air.jpg";
import tennisBlue from "@/assets/placeholder/tennis-blue.jpg";
import tennisLines from "@/assets/placeholder/tennis-lines.jpg";
import turfLine from "@/assets/placeholder/turf-line.jpg";
import videographer from "@/assets/placeholder/videographer.jpg";

function stock(
  src: Photo["src"],
  alt: string,
  photographer: string,
  extra: Partial<Photo> = {},
): Photo {
  return {
    src,
    alt,
    credit: `${photographer} / StockSnap (CC0) — placeholder`,
    placeholder: true,
    ...extra,
  };
}

export const photos = {
  nightField: stock(
    nightField,
    "Amateur footballers play on a dark field lit by a single distant floodlight.",
    "Abigail Keenan",
    { focus: "50% 40%" },
  ),
  goalNetLights: stock(
    goalNetLights,
    "Close view of a football goal net glowing under stadium floodlights at night.",
    "Chen YiZhou",
  ),
  referee: stock(
    referee,
    "Black-and-white photo of a referee seen from behind, watching play on a football pitch.",
    "Eric Haidara",
  ),
  emptyStadium: stock(
    emptyStadium,
    "An empty football stadium with striped grass under a pale evening sky.",
    "Michal Jarmoluk",
  ),
  cornerLine: stock(
    cornerLine,
    "The white corner arc painted on a football pitch, with the shadow of a net across the grass.",
    "Robert Katzki",
  ),
  muayThaiWater: stock(
    muayThaiWater,
    "Two young fighters spar in shallow water, silhouetted against golden evening light.",
    "sasint",
  ),
  emptySeats: stock(
    emptySeats,
    "Rows of empty teal stadium seats fading into haze.",
    "Eric Haidara",
  ),
  ballparkNight: stock(
    ballparkNight,
    "A packed baseball stadium at night seen from the upper deck, the diamond bright under the lights.",
    "Rob Bye",
  ),
  stadiumAerial: stock(
    stadiumAerial,
    "Aerial view of a baseball diamond surrounded by a full stadium.",
    "Tim Gouw",
  ),
  darkSeats: stock(
    darkSeats,
    "A lit aisle of steps between rows of red seats in a dark arena.",
    "Felix Mooneeram",
  ),
  crowd: stock(
    crowd,
    "Black-and-white photo of a dense crowd seen from behind.",
    "Davide Ragusa",
  ),
  courtAerial: stock(
    courtAerial,
    "High-angle view of players on a green basketball court striped with long shadows.",
    "Emile-Victor Portenart",
  ),
  runnerRain: stock(
    runnerRain,
    "A runner on a wet waterfront path on a grey morning, a bridge in the fog behind her.",
    "Francesco Gallarotti",
  ),
  marathoner: stock(
    marathoner,
    "A distance runner in sunglasses and a race vest mid-stride.",
    "Quino Al",
    { focus: "40% 40%" },
  ),
  turfLine: stock(
    turfLine,
    "A white boundary line meeting a blue line on artificial turf.",
    "Matt Moloney",
  ),
  tennisLines: stock(
    tennisLines,
    "The white lines of a green-and-red hard tennis court from above.",
    "Chris Chondrogiannis",
  ),
  tennisBlue: stock(
    tennisBlue,
    "A tennis player stretches for a forehand on a bright blue court, seen from above.",
    "Christopher Burns",
  ),
  bigWave: stock(
    bigWave,
    "A large wave curls and breaks in deep blue water.",
    "Rob Bye",
  ),
  surfAir: stock(
    surfAir,
    "A surfer launches off the lip of a breaking wave as spray fans out behind him.",
    "Marcus Dall Col",
  ),
  pondHockey: stock(
    pondHockey,
    "Two hockey players in silhouette battle for the puck on a frozen outdoor rink.",
    "Nick Le",
  ),
  studioMic: stock(
    studioMic,
    "A studio microphone on a boom arm in a softly lit recording space.",
    "Maciej Korsan",
  ),
  videographer: stock(
    videographer,
    "A camera operator frames a shot with a shotgun microphone mounted on the rig.",
    "Leeroy",
  ),
  broadcastCamera: stock(
    broadcastCamera,
    "The monitor and controls of a professional broadcast video camera.",
    "Donald Tong",
  ),
  boxingGym: stock(
    boxingGym,
    "A boxing gym under a high industrial ceiling, a fighter training in the ring at the back.",
    "Vinicius Amano",
  ),
  boxingRing: stock(
    boxingRing,
    "Black-and-white photo of a boxer raising both arms in the ring as an opponent stands across from him.",
    "Skitter Photo",
  ),
  baseballDark: stock(
    baseballDark,
    "A worn baseball with red stitching on a black background.",
    "Kai Oberhäuser",
  ),
  ballfieldStars: stock(
    ballfieldStars,
    "A batter waits with the bat on his shoulder at a small floodlit ballfield under a deep-blue night sky.",
    "Christopher Campbell",
    { focus: "50% 60%" },
  ),
  pitcher: stock(
    pitcher,
    "A pitcher follows through on a delivery, glove tucked, eyes on the plate.",
    "Keith Johnston",
    { focus: "50% 30%" },
  ),
  halfpipeLights: stock(
    halfpipeLights,
    "An empty skateboard halfpipe at night, lit by two bright lamps.",
    "Mike Wilson",
  ),
} satisfies Record<string, Photo>;

/** Source pages for the credits page. */
export const photoSources: Record<keyof typeof photos, string> = {
  nightField: "https://stocksnap.io/photo/soccer-field-5FKA3VHPRW",
  goalNetLights: "https://stocksnap.io/photo/soccer-net-1IIEPDOFFI",
  referee: "https://stocksnap.io/photo/football-soccer-3SYBQO3C58",
  emptyStadium: "https://stocksnap.io/photo/soccer-ball-FN9W4V6TK5",
  cornerLine: "https://stocksnap.io/photo/soccer-field-FS8QBX48GP",
  muayThaiWater: "https://stocksnap.io/photo/boxing-asia-48EKYDFECS",
  emptySeats: "https://stocksnap.io/photo/chairs-stadium-4N4OPR89TM",
  ballparkNight: "https://stocksnap.io/photo/baseball-stadium-P5L5LP8PN4",
  stadiumAerial: "https://stocksnap.io/photo/baseball-stadium-HZ4BHM2FSC",
  darkSeats: "https://stocksnap.io/photo/auditorium-stadium-7TO5UMVM58",
  crowd: "https://stocksnap.io/photo/people-crowd-QM8SLOCJ8M",
  courtAerial: "https://stocksnap.io/photo/hobbies-sports-HBNGBU52V1",
  runnerRain: "https://stocksnap.io/photo/girl-woman-EE8A129965",
  marathoner: "https://stocksnap.io/photo/people-woman-RKCOZX0VN8",
  turfLine: "https://stocksnap.io/photo/sport-athletic-LA1RFY2SUR",
  tennisLines: "https://stocksnap.io/photo/tennis-court-T4LLIX5GEX",
  tennisBlue: "https://stocksnap.io/photo/people-man-K8IVMXM8A5",
  bigWave: "https://stocksnap.io/photo/surfing-surfer-G6C0VB8IVA",
  surfAir: "https://stocksnap.io/photo/surfing-surfer-C7349D2E65",
  pondHockey: "https://stocksnap.io/photo/sports-hockey-MQYJBYKTVK",
  studioMic: "https://stocksnap.io/photo/microphone-audio-IQVHQYS3GL",
  videographer: "https://stocksnap.io/photo/photographer-camera-LWKE5NGA77",
  broadcastCamera: "https://stocksnap.io/photo/technology-camera-H0O97B44CT",
  boxingGym: "https://stocksnap.io/photo/ring-gym-GAB4IVSO2F",
  boxingRing: "https://stocksnap.io/photo/kickboxing-fighting-7683881689",
  baseballDark: "https://stocksnap.io/photo/baseball-ball-TXQJEEV01S",
  ballfieldStars: "https://stocksnap.io/photo/people-baseball-TAEMECELZX",
  pitcher: "https://stocksnap.io/photo/people-man-EEYKTZF2DN",
  halfpipeLights: "https://stocksnap.io/photo/skateboarding-halfpipe-733CQRSNF3",
};
