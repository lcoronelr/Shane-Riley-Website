/**
 * A selection of Shane's bylined work at other outlets, shown on the Stories
 * page with links to the originals. Newest first within each outlet. Rockbridge
 * Report video packages live on the Multimedia page, so only its written
 * stories are listed here. Edited in the CMS ("Published elsewhere"), saved in
 * data/published.json.
 */
import { text } from "./cms";
import data from "./data/published.json";

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

export const outlets: Outlet[] = data.outlets.map((outlet, i) => ({
  name: text(outlet.name, `Published elsewhere → Outlet ${i + 1} → Name`),
  authorUrl: text(outlet.authorUrl, `Published elsewhere → ${outlet.name} → Author page link`),
  articles: outlet.articles.map((article, j) => ({
    title: text(article.title, `Published elsewhere → ${outlet.name} → Article ${j + 1} → Headline`),
    url: text(article.url, `Published elsewhere → ${outlet.name} → Article ${j + 1} → Link`),
    summary: text(article.summary, `Published elsewhere → ${outlet.name} → Article ${j + 1} → Summary`),
  })),
}));
