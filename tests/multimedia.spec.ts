import { expect, test } from "@playwright/test";

test("video iframes are not loaded until the visitor presses play", async ({ page }) => {
  const thirdParty: string[] = [];
  page.on("request", (req) => {
    const url = new URL(req.url());
    if (!["localhost", "127.0.0.1"].includes(url.hostname)) thirdParty.push(url.hostname);
  });
  await page.goto("/multimedia");
  await page.waitForLoadState("networkidle");
  await expect(page.locator("iframe")).toHaveCount(0);
  expect(thirdParty).toEqual([]);

  const play = page.getByRole("button", { name: /^Play.*video:/ }).first();
  await play.click();
  const frame = page.locator("iframe").first();
  await expect(frame).toHaveAttribute("src", /^https:\/\/www\.youtube-nocookie\.com\/embed\/aJX64OC45xk\?/);
  await expect(frame).toHaveAttribute("title", /Mary Schleusner/);
  await expect(frame).toBeFocused();
});

test("commentary playlists embed the whole playlist", async ({ page }) => {
  await page.goto("/multimedia");
  await page.locator("#commentary-mens-soccer").getByRole("button", { name: /^Play/ }).click();
  await expect(page.locator("#commentary-mens-soccer iframe")).toHaveAttribute(
    "src",
    /youtube-nocookie\.com\/embed\/videoseries\?list=PLfpVwYj_UdCFraXDc4N5zRlUHMZx6ydw4/,
  );
});

test("every item is playable or links to where it can be heard", async ({ page }) => {
  await page.goto("/multimedia");
  await expect(page.getByRole("heading", { level: 2, name: "Game commentary" })).toBeVisible();
  await expect(page.locator("#commentary > ul > li")).toHaveCount(9);
  const listen = page.getByRole("link", { name: /Listen on Shane's Adobe Portfolio/ });
  await expect(listen).toHaveCount(3);
  await expect(listen.first()).toHaveAttribute("href", "https://shane-riley.myportfolio.com/shane-riley-audio");
  await expect(page.getByRole("link", { name: /YouTube channel/ })).toHaveAttribute(
    "href",
    "https://www.youtube.com/@ShaneRileyPortfolio",
  );
});

test("lightbox: keyboard open, arrow navigation, Escape closes and restores focus", async ({ page }) => {
  await page.goto("/multimedia");
  const essay = page.locator("#reid-hall");
  const second = essay.getByRole("button", { name: /^Open photo 2 of 10/ });
  await second.focus();
  await page.keyboard.press("Enter");

  const dialog = page.getByRole("dialog", { name: /Reid Hall/ });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("button", { name: "Close" })).toBeFocused();
  await expect(dialog).toContainText("2 / 10");
  await expect(dialog).toContainText("The main entrance to Reid Hall");

  await page.keyboard.press("ArrowRight");
  await expect(dialog).toContainText("3 / 10");
  await page.keyboard.press("ArrowLeft");
  await page.keyboard.press("ArrowLeft");
  await expect(dialog).toContainText("1 / 10");
  await page.keyboard.press("ArrowLeft");
  await expect(dialog).toContainText("10 / 10");

  // Focus stays inside the modal dialog.
  for (let i = 0; i < 5; i++) {
    await page.keyboard.press("Tab");
    expect(await dialog.evaluate((d) => d.contains(document.activeElement))).toBe(true);
  }

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(essay.getByRole("button", { name: /^Open photo 10 of 10/ })).toBeFocused();
});

test("story gallery lightbox works with a pointer", async ({ page }) => {
  await page.goto("/stories/matt-miller-rowing");
  await page.getByRole("button", { name: /^Open photo 1 of 2/ }).click();
  const dialog = page.getByRole("dialog");
  await dialog.getByRole("button", { name: "Next photo" }).click();
  await expect(dialog).toContainText("2 / 2");
  // The outgoing frame is briefly kept for the crossfade, so wait for it to leave.
  await expect(dialog.locator("figcaption")).toHaveCount(1);
  await expect(dialog.locator("figcaption")).toContainText("rowing club blazers");
  await dialog.getByRole("button", { name: "Close" }).click();
  await expect(dialog).toBeHidden();
});
