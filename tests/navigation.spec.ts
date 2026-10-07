import { expect, test } from "@playwright/test";

test("primary navigation reaches every section and marks the current page", async ({ page }) => {
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Primary" });
  const targets: [string, string][] = [
    ["Stories", "/stories"],
    ["Multimedia", "/multimedia"],
    ["About", "/about"],
    ["Résumé", "/resume"],
    ["Contact", "/contact"],
    ["Home", "/"],
  ];
  for (const [label, path] of targets) {
    await nav.getByRole("link", { name: label, exact: true }).click();
    await expect(page).toHaveURL(path);
    await expect(nav.getByRole("link", { name: label, exact: true })).toHaveAttribute("aria-current", "page");
  }
});

test("'Sports Journalist' appears nowhere on the site", async ({ page }) => {
  for (const path of ["/", "/stories", "/stories/first-pro-fight-norfolk", "/multimedia", "/about", "/resume", "/contact"]) {
    await page.goto(path);
    const html = await page.content();
    expect(html, path).not.toMatch(/sports journalist/i);
  }
});

test("story listings and pages show no dates", async ({ page }) => {
  for (const path of ["/", "/stories", "/stories/first-pro-fight-norfolk", "/stories/tatafu-polota-nau"]) {
    await page.goto(path);
    await expect(page.locator("main article time"), path).toHaveCount(0);
    await expect(page.locator("main"), path).not.toContainText(/(January|February|March|April|May|June|July|August|September|October|November|December) d{1,2}, 20dd/i);
  }
});

test("home sections carry no numbers", async ({ page }) => {
  await page.goto("/");
  for (const index of ["01", "02", "03", "04"]) {
    await expect(page.locator("main section span.kicker").getByText(index, { exact: true })).toHaveCount(0);
  }
});

test("browser back and forward restore pages", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Explore stories" }).click();
  await expect(page).toHaveURL("/stories");
  await page.getByRole("link", { name: /W&L Viewership Drops/ }).first().click();
  await expect(page).toHaveURL("/stories/flosports-viewership-drop");
  await page.goBack();
  await expect(page).toHaveURL("/stories");
  await page.goBack();
  await expect(page).toHaveURL("/");
  await page.goForward();
  await expect(page).toHaveURL("/stories");
});

test("skip link is the first tab stop and moves focus to the main content", async ({ page }) => {
  await page.goto("/about");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to content" });
  await expect(skip).toBeFocused();
  await expect(skip).toBeInViewport();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
});

test("keyboard focus is always visible", async ({ page }) => {
  await page.goto("/");
  for (let i = 0; i < 6; i++) {
    await page.keyboard.press("Tab");
    const outline = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement;
      const style = getComputedStyle(el);
      return { width: parseFloat(style.outlineWidth), style: style.outlineStyle };
    });
    expect(outline.style).not.toBe("none");
    expect(outline.width).toBeGreaterThan(0);
  }
});

test("security headers are sent", async ({ request }) => {
  const res = await request.get("/");
  const h = res.headers();
  expect(h["content-security-policy"]).toContain("default-src 'self'");
  expect(h["content-security-policy"]).toContain("frame-ancestors 'none'");
  expect(h["content-security-policy"]).toContain("frame-src https://www.youtube-nocookie.com https://player.vimeo.com");
  expect(h["x-content-type-options"]).toBe("nosniff");
  expect(h["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(h["permissions-policy"]).toContain("camera=()");
  expect(h["x-frame-options"]).toBe("DENY");
  expect(h["x-powered-by"]).toBeUndefined();
});

test("sitemap and robots are generated and exclude example stories", async ({ request }) => {
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toContain("Sitemap:");
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).toContain("/stories</loc>");
  expect(sitemap).toContain("/stories/flosports-viewership-drop");
  expect(sitemap).not.toContain("/credits");
});

test("reduced motion shows all content without scrolling animations", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("/");
  const hidden = await page.$$eval("[data-reveal]", (els) =>
    els.filter((el) => getComputedStyle(el).opacity !== "1").length,
  );
  expect(hidden).toBe(0);
  const scrollBehavior = await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior);
  expect(scrollBehavior).toBe("auto");
  await context.close();
});

test("header switches to dark text when navigating from a dark page at the top", async ({ page }) => {
  await page.goto("/");
  const header = page.locator("header[role='banner']");
  await expect(header).toHaveAttribute("data-theme", "dark");
  const nav = page.getByRole("navigation", { name: "Primary" });
  for (const [label, theme] of [["Contact", "light"], ["Multimedia", "dark"], ["Résumé", "light"], ["Home", "dark"], ["Stories", "light"]]) {
    await nav.getByRole("link", { name: label, exact: true }).click();
    await expect(header, label).toHaveAttribute("data-theme", theme);
    await page.waitForTimeout(800);
    await expect(header, `${label} after settling`).toHaveAttribute("data-theme", theme);
  }
});

test("contact page has no copy-address button and links every profile", async ({ page }) => {
  await page.goto("/contact");
  await expect(page.getByRole("button", { name: /Copy/ })).toHaveCount(0);
  await expect(page.locator("main").getByRole("link", { name: "shanemriley12@gmail.com" })).toHaveAttribute("href", "mailto:shanemriley12@gmail.com");
  await expect(page.getByRole("region", { name: "Elsewhere" }).getByRole("link")).toHaveCount(4);
});
