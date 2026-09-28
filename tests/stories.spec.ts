import { expect, test } from "@playwright/test";

test.describe("story filters", () => {
  test("filter by sport and type, reflected in the URL", async ({ page }) => {
    await page.goto("/stories");
    const status = page.getByRole("status").filter({ hasText: "Showing" });
    await expect(status).toHaveText("Showing 9 stories.");

    const sport = page.getByRole("group", { name: "Sport" });
    await sport.getByRole("button", { name: "Soccer" }).click();
    await expect(sport.getByRole("button", { name: "Soccer" })).toHaveAttribute("aria-pressed", "true");
    await expect(page).toHaveURL(/\?sport=soccer$/);
    await expect(page.getByRole("status").first()).toHaveText("Showing 2 stories about soccer.");
    await expect(page.locator("main article")).toHaveCount(2);

    await page.getByRole("group", { name: "Type" }).getByRole("button", { name: "Essay", exact: true }).click();
    await expect(page.getByText("No stories match these filters.")).toBeVisible();
    await page.getByRole("button", { name: "Show all stories" }).click();
    await expect(page).toHaveURL("/stories");
    await expect(page.locator("main article")).toHaveCount(9);
  });

  test("filters work with the keyboard", async ({ page }) => {
    await page.goto("/stories");
    const boxing = page.getByRole("group", { name: "Sport" }).getByRole("button", { name: "Boxing" });
    await boxing.focus();
    await page.keyboard.press("Enter");
    await expect(boxing).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator("main article")).toHaveCount(1);
    const hockey = page.getByRole("group", { name: "Sport" }).getByRole("button", { name: "Hockey" });
    await hockey.focus();
    await page.keyboard.press("Space");
    await expect(page.locator("main article h2")).toHaveText("Pond Season");
  });

  test("a filtered URL loads with the filter applied", async ({ page }) => {
    await page.goto("/stories?sport=surfing");
    await expect(page.locator("main article")).toHaveCount(1);
    await expect(page.locator("main article h2")).toHaveText("What the Water Takes");
  });
});

test.describe("story page", () => {
  test("shows byline, date, captions and marks example stories", async ({ page }) => {
    await page.goto("/stories/the-long-count");
    await expect(page.getByText(/^By Shane Riley/)).toBeVisible();
    await expect(page.locator("header time[datetime='2026-08-30']")).toBeVisible();
    await expect(page.getByText("Example story · placeholder copy")).toBeVisible();
    await expect(page.locator("figcaption").first()).toContainText("The corner after the final bell");
    await expect(page.locator("blockquote").first()).toContainText("You don't retire from this");
    await expect(page.getByRole("complementary", { name: "More stories" }).locator("article")).toHaveCount(3);
  });

  test("example stories are noindex and carry no article structured data", async ({ page }) => {
    await page.goto("/stories/the-long-count");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(0);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /\/stories\/the-long-count$/);
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute("content", "article");
  });

  test("copy link copies the canonical story URL and announces it", async ({ page, context, browserName }) => {
    test.skip(browserName !== "chromium", "clipboard permissions are Chromium-specific");
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/stories/under-the-lights");
    await page.getByRole("button", { name: "Copy link" }).first().click();
    await expect(page.getByRole("button", { name: "Copied" }).first()).toBeVisible();
    await expect(page.getByRole("status").filter({ hasText: "Link copied" }).first()).toBeAttached();
    const copied = await page.evaluate(() => navigator.clipboard.readText());
    expect(copied).toMatch(/\/stories\/under-the-lights$/);
  });
});
