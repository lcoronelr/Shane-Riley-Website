import { expect, test } from "@playwright/test";

const ROUTES = [
  { path: "/", h1: /Stories from/ },
  { path: "/stories", h1: "Stories" },
  { path: "/stories/flosports-viewership-drop", h1: "W&L Viewership Drops After FloSports Move" },
  { path: "/stories/leah-crouse-consistent-growth", h1: "Consistent Growth Becomes Success" },
  { path: "/stories/midori-galligan-world-university-games", h1: "World University Games: Midori Galligan" },
  { path: "/stories/matt-miller-rowing", h1: "Matt Miller" },
  { path: "/stories/ed-kashi-visit", h1: "Ed Kashi's Visit to W&L" },
  { path: "/stories/first-pro-fight-norfolk", h1: "My First Pro Fight: Chaos in Norfolk" },
  { path: "/stories/chris-mchugh-culture", h1: "Success: Measured by the Culture" },
  { path: "/stories/isaac-hibbard-no-ordinary-passion", h1: "No Ordinary Passion: Isaac Hibbard" },
  { path: "/stories/wjmc-reflection", h1: "WJMC Reflection" },
  { path: "/stories/tatafu-polota-nau", h1: "Tatafu Polota-Nau" },
  { path: "/stories/tim-cannada-where-are-they-now", h1: "Where Are They Now? Tim Cannada" },
  { path: "/multimedia", h1: "Multimedia" },
  { path: "/about", h1: "Shane Riley" },
  { path: "/resume", h1: "Shane Riley" },
  { path: "/contact", h1: /Let.s talk/ },
];

for (const route of ROUTES) {
  test(`${route.path} renders without errors, broken images or overflow`, async ({ page }) => {
    const problems: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") problems.push(msg.text());
    });
    page.on("pageerror", (err) => problems.push(err.message));

    const response = await page.goto(route.path);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveText(route.h1);

    // Scroll the whole page so lazy images load, then check none are broken.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 400) {
        window.scrollTo({ top: y, behavior: "instant" });
        await new Promise((r) => setTimeout(r, 40));
      }
    });
    await page.waitForLoadState("networkidle");
    const broken = await page.$$eval("img", (imgs) =>
      imgs.filter((img) => img.complete && img.naturalWidth === 0).map((img) => img.currentSrc || img.src),
    );
    expect(broken).toEqual([]);

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
    expect(problems).toEqual([]);
  });
}

for (const width of [768, 1920]) {
  test(`no horizontal overflow on any route at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of ROUTES) {
      await page.goto(route.path);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow, route.path).toBeLessThanOrEqual(0);
    }
  });
}

test("unknown routes return a helpful 404", async ({ page }) => {
  const response = await page.goto("/stories/does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("out of bounds");
  await expect(page.getByRole("link", { name: "Back to home" })).toBeVisible();
});
