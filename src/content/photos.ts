/**
 * Shared photography: the portrait, the home-page hero and the photo essays.
 * Story photos are imported directly in stories.ts; video posters in
 * multimedia.ts. See docs/CONTENT_GUIDE.md for adding photos.
 */
import type { Photo } from "./types";

import heroFrame from "@/assets/posters/1s5OinyKIM0.jpg";
import portrait from "@/assets/photos/shane-riley-portrait.jpg";
import heliotrope1 from "@/assets/photos/essays/heliotrope-1.jpg";
import heliotrope2 from "@/assets/photos/essays/heliotrope-2.jpg";
import heliotrope3 from "@/assets/photos/essays/heliotrope-3.jpg";
import heliotrope4 from "@/assets/photos/essays/heliotrope-4.jpg";
import heliotrope5 from "@/assets/photos/essays/heliotrope-5.jpg";
import heliotrope6 from "@/assets/photos/essays/heliotrope-6.jpg";
import heliotrope7 from "@/assets/photos/essays/heliotrope-7.jpg";
import heliotrope8 from "@/assets/photos/essays/heliotrope-8.jpg";
import heliotrope9 from "@/assets/photos/essays/heliotrope-9.jpg";
import heliotrope10 from "@/assets/photos/essays/heliotrope-10.jpg";
import reidHall1 from "@/assets/photos/essays/reid-hall-1.jpg";
import reidHall2 from "@/assets/photos/essays/reid-hall-2.jpg";
import reidHall3 from "@/assets/photos/essays/reid-hall-3.jpg";
import reidHall4 from "@/assets/photos/essays/reid-hall-4.jpg";
import reidHall5 from "@/assets/photos/essays/reid-hall-5.jpg";
import reidHall6 from "@/assets/photos/essays/reid-hall-6.jpg";
import reidHall7 from "@/assets/photos/essays/reid-hall-7.jpg";
import reidHall8 from "@/assets/photos/essays/reid-hall-8.jpg";
import reidHall9 from "@/assets/photos/essays/reid-hall-9.jpg";
import reidHall10 from "@/assets/photos/essays/reid-hall-10.jpg";

export const portraitPhoto: Photo = {
  src: portrait,
  alt: "Shane Riley wearing a broadcast headset with a boom microphone.",
  focus: "50% 40%",
};

/** A frame from Shane's Rockbridge Report package on W&L women's basketball. */
export const heroPhoto: Photo = {
  src: heroFrame,
  alt: "Washington and Lee women's basketball players huddle on the court in front of a packed crowd.",
  caption: "From \"W&L Women's Basketball,\" a Rockbridge Report package by Shane Riley.",
  focus: "50% 45%",
};

const byShane = "Shane Riley";

export const heliotropePhotos: Photo[] = [
  {
    src: heliotrope1,
    alt: "Heliotrope employees work together to create pizza to cook in the oven pictured on the right.",
    caption: "Heliotrope employees work together to create pizza to cook in the oven pictured on the right, Wednesday, Oct. 8, 2025.",
    credit: byShane,
  },
  {
    src: heliotrope2,
    alt: "The pizza oven at Heliotrope cooks two pizzas, ready to be served soon.",
    caption: "The pizza oven at Heliotrope cooks two pizzas, ready to be served soon, Wednesday, Oct. 8, 2025.",
    credit: byShane,
  },
  {
    src: heliotrope3,
    alt: "Heliotrope employee Vic de Souza stands over a margherita pizza.",
    caption: "Heliotrope employee Vic de Souza stands over a margherita pizza, Wednesday, Oct. 8, 2025. “We have a lot of celebrations… I just love being able to be a part of that and create food that people will not only enjoy but will bond over,” de Souza said.",
    credit: byShane,
  },
  {
    src: heliotrope4,
    alt: "Heliotrope General Manager Olivia White serves a pizza to a table of customers.",
    caption: "Heliotrope General Manager Olivia White serves a pizza to a table of customers, Wednesday, Oct. 8, 2025. “Most of the locals who come in are regulars, so anytime they come in we talk like we’re friends,” White said.",
    credit: byShane,
  },
  {
    src: heliotrope5,
    alt: "Heliotrope’s brewing vats located in the back of the restaurant send beer directly to the bar.",
    caption: "Heliotrope’s brewing vats located in the back of the restaurant send beer directly to the bar, Wednesday, Oct. 8, 2025.",
    credit: byShane,
  },
  {
    src: heliotrope6,
    alt: "Bartender Jake Seawright fills a glass with one of Heliotrope’s self-brewed beverages.",
    caption: "Bartender Jake Seawright fills a glass with one of Heliotrope’s self-brewed beverages, Wednesday, Oct. 8, 2025. “I like to work the bar. It’s cool to talk with the people who come in to see us. My favorite drink to make is the Cy Twombly, one of our frozen drinks,” Seawright said.",
    credit: byShane,
  },
  {
    src: heliotrope7,
    alt: "Olivia White and Jake Seawright help check a customer’s tab after refilling her drink at the Heliotrope bar.",
    caption: "Olivia White and Jake Seawright help check a customer’s tab after refilling her drink at the Heliotrope bar, Wednesday, Oct. 8, 2025. “The most special part about working here is the coworkers. Everyone has their own personality, but the vibe is still very much that everyone is here to make sure everyone else succeeds,” White said.",
    credit: byShane,
  },
  {
    src: heliotrope8,
    alt: "The Heliotrope glass featuring one of their beverages and their logo.",
    caption: "The Heliotrope glass featuring one of their beverages and their logo, Wednesday, Oct. 8, 2025.",
    credit: byShane,
  },
  {
    src: heliotrope9,
    alt: "Flags hang above the Heliotrope brewery, including the Doug Flag (left) and the LGBTQIA+ flag (right).",
    caption: "Flags hang above the Heliotrope brewery, including the Doug Flag (left) and the LGBTQIA+ flag (right), Wednesday, Oct. 8, 2025. “Everyone is so kind, everyone is so nice. I feel like no matter who I am, I am going to be accepted here. We have all sorts of people working here and all sorts of people eating here. It is a perfect place for everyone to come along,” Vic de Souza said.",
    credit: byShane,
  },
  {
    src: heliotrope10,
    alt: "Heliotrope from outside the restaurant at night.",
    caption: "Heliotrope from outside the restaurant at night, Wednesday, Oct. 8, 2025.",
    credit: byShane,
  },
];

export const reidHallPhotos: Photo[] = [
  {
    src: reidHall1,
    alt: "People walk by a student and professor talking outside Reid Hall on Washington and Lee University’s campus.",
    caption: "People walk by a student and professor talking outside Reid Hall on Washington and Lee University’s campus, Tuesday, Sept. 30, 2025.",
    credit: byShane,
  },
  {
    src: reidHall2,
    alt: "The main entrance to Reid Hall at Washington and Lee University.",
    caption: "The main entrance to Reid Hall at Washington and Lee University, Tuesday, Sept. 30, 2025.",
    credit: byShane,
  },
  {
    src: reidHall3,
    alt: "A plaque hangs in Reid Hall at Washington and Lee University to commemorate journalism studies.",
    caption: "A plaque hangs in Reid Hall at Washington and Lee University to commemorate journalism studies, Tuesday, Sept. 30, 2025.",
    credit: byShane,
  },
  {
    src: reidHall4,
    alt: "A clock hangs in the Rockbridge Report studio in Reid Hall at Washington and Lee University.",
    caption: "A clock hangs in the Rockbridge Report studio in Reid Hall at Washington and Lee University, Tuesday, Sept. 30, 2025. The clock helps keep students on track and aware of production deadlines.",
    credit: byShane,
  },
  {
    src: reidHall5,
    alt: "Junior Aiden Kelsey works on a journalism assignment in Reid Hall at Washington and Lee University.",
    caption: "Junior Aiden Kelsey works on a journalism assignment in Reid Hall at Washington and Lee University, Tuesday, Sept. 30, 2025.",
    credit: byShane,
  },
  {
    src: reidHall6,
    alt: "Junior Kaden Buss checks his microphone’s audio levels in the Rockbridge Report studio in Reid Hall at Washington and Lee University.",
    caption: "Junior Kaden Buss checks his microphone’s audio levels in the Rockbridge Report studio in Reid Hall at Washington and Lee University, Monday, Sept. 29, 2025.",
    credit: byShane,
  },
  {
    src: reidHall7,
    alt: "The first edition of 2025-26 The Ring-tum Phi newspaper sits outside Reid Hall at Washington and Lee University.",
    caption: "The first edition of 2025-26 The Ring-tum Phi newspaper sits outside Reid Hall at Washington and Lee University, Tuesday, Sept 30, 2025. A new edition of the newspaper is released bi-weekly.",
    credit: byShane,
  },
  {
    src: reidHall8,
    alt: "Professor Kevin Finch and Junior Kaden Buss discuss the job viability of sports media in Reid Hall at Washington and Lee University.",
    caption: "Professor Kevin Finch and Junior Kaden Buss discuss the job viability of sports media in Reid Hall at Washington and Lee University, Monday, Sept. 29, 2025. Finch is Buss’s academic advisor.",
    credit: byShane,
  },
  {
    src: reidHall9,
    alt: "Professor Michael Todd looks outside Reid Hall at Washington and Lee University.",
    caption: "Professor Michael Todd looks outside Reid Hall at Washington and Lee University, Tuesday, Sept 30, 2025. Todd is the manager of technical operations for the journalism department.",
    credit: byShane,
  },
  {
    src: reidHall10,
    alt: "Students walk by from a view outside of Reid Hall’s classroom 315 at Washington and Lee University.",
    caption: "Students walk by from a view outside of Reid Hall’s classroom 315 at Washington and Lee University, Tuesday, Sept 30, 2025.",
    credit: byShane,
  },
];
