import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const ROUTES = [
  "/",
  "/stories",
  "/stories/first-pro-fight-norfolk",
  "/stories/tatafu-polota-nau",
  "/stories/wjmc-reflection",
  "/stories/flosports-viewership-drop",
  "/stories/leah-crouse-consistent-growth",
  "/multimedia",
  "/about",
  "/resume",
  "/contact",
];

for (const route of ROUTES) {
  test(`axe: ${route} has no WCAG 2.2 A/AA violations`, async ({ page }) => {
    await page.goto(route);
    // Reveal everything so contrast is checked on final, not mid-animation, styles.
    await page.evaluate(() => document.querySelectorAll("[data-reveal]").forEach((el) => el.setAttribute("data-revealed", "")));
    await page.waitForTimeout(1500);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    const summary = results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`);
    expect(summary).toEqual([]);
  });
}

test("axe: open lightbox and mobile-width layout", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/stories/matt-miller-rowing");
  await page.getByRole("button", { name: /^Open photo 1 of/ }).click();
  await page.waitForTimeout(800);
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag22aa"]).analyze();
  expect(results.violations.map((v) => v.id)).toEqual([]);
});
