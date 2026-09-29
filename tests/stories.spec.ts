import { expect, test } from "@playwright/test";

test.describe("story archive", () => {
  test("lists every story in authored order, with no filter bar", async ({ page }) => {
    await page.goto("/stories");
    const headlines = page.locator("main article h2");
    await expect(headlines).toHaveCount(11);
    await expect(headlines.first()).toHaveText("W&L Viewership Drops After FloSports Move");
    await expect(headlines.last()).toHaveText("Where Are They Now? Tim Cannada");
    await expect(page.getByRole("group")).toHaveCount(0);
    await expect(page.locator("main button")).toHaveCount(0);
  });

  test("story cards open their article", async ({ page }) => {
    await page.goto("/stories");
    await page.getByRole("link", { name: /Consistent Growth Becomes Success/ }).click();
    await expect(page).toHaveURL("/stories/leah-crouse-consistent-growth");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Consistent Growth Becomes Success");
  });
});

test.describe("story page", () => {
  test("shows byline, reading time, full text and related stories", async ({ page }) => {
    await page.goto("/stories/first-pro-fight-norfolk");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("My First Pro Fight: Chaos in Norfolk");
    await expect(page.getByText(/^By Shane Riley/)).toBeVisible();
    await expect(page.getByText(/min read$/)).toBeVisible();
    await expect(page.locator(".story-body p").first()).toContainText("The Keyshawn vs. De Los Santos fight week");
    await expect(page.getByText("Draft")).toHaveCount(0);
    await expect(page.getByRole("complementary", { name: "More stories" }).locator("article")).toHaveCount(3);
  });

  test("Q&A questions render as subheadings and the embedded video is click-to-load", async ({ page }) => {
    await page.goto("/stories/tatafu-polota-nau");
    await expect(
      page.getByRole("heading", { level: 2, name: "When did you know it was time to hang up the cleats?" }),
    ).toBeVisible();
    await expect(page.locator("iframe")).toHaveCount(0);
    await page.getByRole("button", { name: /^Play.*video: Rugby HQ/ }).click();
    await expect(page.locator("iframe")).toHaveAttribute("src", /youtube-nocookie\.com\/embed\/fHTuDL4Snfk/);
  });

  test("magazine story links to the published edition", async ({ page }) => {
    await page.goto("/stories/isaac-hibbard-no-ordinary-passion");
    await expect(page.getByText("Published in Playbook, Winter 2025.")).toBeVisible();
    await expect(page.getByRole("link", { name: /Read the original/ })).toHaveAttribute(
      "href",
      "https://issuu.com/wlumag/docs/playbook_-_winter_2025",
    );
  });

  test("stories are indexable, canonical, and carry no undated structured data", async ({ page }) => {
    await page.goto("/stories/leah-crouse-consistent-growth");
    await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
    await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(0);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      /\/stories\/leah-crouse-consistent-growth$/,
    );
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute("content", "article");
  });

  test("copy link copies the canonical story URL and announces it", async ({ page, context, browserName }) => {
    test.skip(browserName !== "chromium", "clipboard permissions are Chromium-specific");
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/stories/matt-miller-rowing");
    await page.getByRole("button", { name: "Copy link" }).first().click();
    await expect(page.getByRole("button", { name: "Copied" }).first()).toBeVisible();
    await expect(page.getByRole("status").filter({ hasText: "Link copied" }).first()).toBeAttached();
    const copied = await page.evaluate(() => navigator.clipboard.readText());
    expect(copied).toMatch(/\/stories\/matt-miller-rowing$/);
  });
});
