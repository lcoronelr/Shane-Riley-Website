/**
 * Wording on the home and contact pages. Edited in the CMS ("Home page" and
 * "Contact page"), saved in data/home.json and data/contact.json. Headings
 * come in two parts: the second part is shown in italics.
 */
import { optionalText, text } from "./cms";
import contactData from "./data/contact.json";
import homeData from "./data/home.json";

export const home = {
  heroHeading: text(homeData.heroHeading, "Home page → Headline"),
  heroHeadingItalic: text(homeData.heroHeadingItalic, "Home page → Headline (italic part)"),
  multimediaHeading: text(homeData.multimediaHeading, "Home page → Multimedia heading"),
  multimediaHeadingItalic: optionalText(homeData.multimediaHeadingItalic),
  multimediaIntro: text(homeData.multimediaIntro, "Home page → Multimedia intro"),
  aboutHeading: text(homeData.aboutHeading, "Home page → About heading"),
  contactHeading: text(homeData.contactHeading, "Home page → Contact heading"),
  contactHeadingItalic: optionalText(homeData.contactHeadingItalic),
  contactText: text(homeData.contactText, "Home page → Contact text"),
};

export const contact = {
  heading: text(contactData.heading, "Contact page → Heading"),
  headingItalic: optionalText(contactData.headingItalic),
  intro: text(contactData.intro, "Contact page → Intro"),
  reasons: contactData.reasons.map((reason, i) => ({
    title: text(reason.title, `Contact page → Topic ${i + 1} → Title`),
    text: text(reason.text, `Contact page → Topic ${i + 1} → Description`),
  })),
};
