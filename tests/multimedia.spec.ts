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
  await expect(frame).toHaveAttribute("src", /^https:\/\/www\.youtube-nocookie\.com\/embed\/aqz-KE-bpKQ\?/);
  await expect(frame).toHaveAttribute("title", /Big Buck Bunny/);
  await expect(frame).toBeFocused();
});

test("items without video never show a play button", async ({ page }) => {
  await page.goto("/multimedia");
  await expect(page.getByText("No video attached yet")).toHaveCount(3);
  await expect(page.getByRole("button", { name: /^Play.*video:/ })).toHaveCount(1);
});

test("transcript expands", async ({ page }) => {
  await page.goto("/multimedia");
  const summary = page.getByText("Read transcript").first();
  await summary.click();
  await expect(page.getByText(/Placeholder transcript/).first()).toBeVisible();
});

test("lightbox: keyboard open, arrow navigation, Escape closes and restores focus", async ({ page }) => {
  await page.goto("/multimedia");
  const essay = page.locator("#empty-houses");
  const second = essay.getByRole("button", { name: /^Open photo 2 of 5/ });
  await second.focus();
  await page.keyboard.press("Enter");

  const dialog = page.getByRole("dialog", { name: /Empty Houses/ });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("button", { name: "Close" })).toBeFocused();
  await expect(dialog).toContainText("2 / 5");

  await page.keyboard.press("ArrowRight");
  await expect(dialog).toContainText("3 / 5");
  await page.keyboard.press("ArrowLeft");
  await page.keyboard.press("ArrowLeft");
  await expect(dialog).toContainText("1 / 5");
  await page.keyboard.press("ArrowLeft");
  await expect(dialog).toContainText("5 / 5");

  // Focus stays inside the modal dialog.
  for (let i = 0; i < 5; i++) {
    await page.keyboard.press("Tab");
    expect(await dialog.evaluate((d) => d.contains(document.activeElement))).toBe(true);
  }

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(essay.getByRole("button", { name: /^Open photo 5 of 5/ })).toBeFocused();
});

test("lightbox buttons work with a pointer", async ({ page }) => {
  await page.goto("/stories/the-long-count");
  await page.getByRole("button", { name: /^Open photo 1 of 3/ }).click();
  const dialog = page.getByRole("dialog");
  await dialog.getByRole("button", { name: "Next photo" }).click();
  await expect(dialog).toContainText("2 / 3");
  // The outgoing frame is briefly kept for the crossfade, so wait for it to leave.
  await expect(dialog.locator("figcaption")).toHaveCount(1);
  await expect(dialog.locator("figcaption")).toContainText("Sparring outdoors");
  await dialog.getByRole("button", { name: "Close" }).click();
  await expect(dialog).toBeHidden();
});
