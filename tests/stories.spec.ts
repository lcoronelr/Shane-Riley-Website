import { expect, test } from "@playwright/test";

test.describe("story archive", () => {
  test("lists every story, newest first, with no filter bar", async ({ page }) => {
    await page.goto("/stories");
    const headlines = page.locator("main article h2");
    await expect(headlines).toHaveCount(9);
    await expect(headlines.first()).toHaveText("The Long Count");
    await expect(headlines.last()).toHaveText("The Noon Run");
    await expect(page.getByRole("group")).toHaveCount(0);
    await expect(page.locator("main button")).toHaveCount(0);
  });

  test("story cards open their article", async ({ page }) => {
    await page.goto("/stories");
    await page.getByRole("link", { name: /Pond Season/ }).click();
    await expect(page).toHaveURL("/stories/pond-season");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Pond Season");
  });
});

test.describe("story page", () => {
  test("shows byline, reading time, captions and marks example stories", async ({ page }) => {
    await page.goto("/stories/the-long-count");
    await expect(page.getByText(/^By Shane Riley/)).toBeVisible();
    await expect(page.getByText(/min read$/)).toBeVisible();
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
