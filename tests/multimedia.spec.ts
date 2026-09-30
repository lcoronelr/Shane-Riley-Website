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

test("no hosting notes, old-portfolio links or photo essays on the page", async ({ page }) => {
  await page.goto("/multimedia");
  await expect(page.getByText(/youtube-nocookie/i)).toHaveCount(0);
  await expect(page.getByText(/Adobe Portfolio|myportfolio/i)).toHaveCount(0);
  await expect(page.locator('a[href*="myportfolio"]')).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Photo essays" })).toHaveCount(0);
});

test("videos are ordered with the Schleusner overseas package right after the featured one", async ({ page }) => {
  await page.goto("/multimedia");
  const titles = page.locator("#video > ul > li h3");
  await expect(titles.first()).toHaveText("Generals basketball star Mary Schleusner considers playing overseas after graduation");
  await expect(titles.nth(1)).toHaveText("W&L golf teams adjust as course renovations limit practice access");
  await expect(page.getByRole("heading", { name: "Washington and Lee women's basketball team stays unbeaten, advances to Sweet 16" })).toBeVisible();
});

test("commentary playlists embed the whole playlist and link to it on YouTube", async ({ page }) => {
  await page.goto("/multimedia");
  await expect(page.locator("#commentary > ul > li")).toHaveCount(9);
  const links = page.getByRole("link", { name: /Full playlist on YouTube/ });
  await expect(links).toHaveCount(9);
  await expect(links.first()).toHaveAttribute("href", "https://www.youtube.com/playlist?list=PLfpVwYj_UdCFraXDc4N5zRlUHMZx6ydw4");
  await page.locator("#commentary-mens-soccer").getByRole("button", { name: /^Play/ }).click();
  await expect(page.locator("#commentary-mens-soccer iframe")).toHaveAttribute(
    "src",
    /youtube-nocookie\.com\/embed\/videoseries\?list=PLfpVwYj_UdCFraXDc4N5zRlUHMZx6ydw4/,
  );
});

test("podcast recordings play from this site", async ({ page, request }) => {
  await page.goto("/multimedia");
  const players = page.locator("#audio audio");
  await expect(players).toHaveCount(3);
  for (const src of [
    "/audio/flosports-ryan-connell.mp4",
    "/audio/campus-thoughts-marketplace.mp4",
    "/audio/lexington-life-john-tucker.mp4",
  ]) {
    await expect(page.locator(`#audio audio source[src="${src}"]`)).toHaveCount(1);
    expect((await request.head(src)).status()).toBe(200);
  }
  const duration = await players.first().evaluate(
    (el: HTMLAudioElement) =>
      new Promise<number>((resolve) => {
        el.preload = "metadata";
        el.addEventListener("loadedmetadata", () => resolve(el.duration), { once: true });
        el.load();
      }),
  );
  expect(duration).toBeGreaterThan(300);
});

test("lightbox: keyboard open, arrow navigation, Escape closes and restores focus", async ({ page }) => {
  await page.goto("/stories/first-pro-fight-norfolk");
  const second = page.getByRole("button", { name: /^Open photo 2 of 2/ });
  await second.focus();
  await page.keyboard.press("Enter");

  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("button", { name: "Close" })).toBeFocused();
  await expect(dialog).toContainText("2 / 2");
  await expect(dialog).toContainText("Mason and Nakathila in the Ring");

  await page.keyboard.press("ArrowRight");
  await expect(dialog).toContainText("1 / 2");
  await page.keyboard.press("ArrowLeft");
  await expect(dialog).toContainText("2 / 2");

  // Focus stays inside the modal dialog.
  for (let i = 0; i < 5; i++) {
    await page.keyboard.press("Tab");
    expect(await dialog.evaluate((d) => d.contains(document.activeElement))).toBe(true);
  }

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(second).toBeFocused();
});

test("story gallery lightbox works with a pointer", async ({ page }) => {
  await page.goto("/stories/matt-miller-rowing");
  await page.getByRole("button", { name: /^Open photo 1 of 2/ }).click();
  const dialog = page.getByRole("dialog");
  await dialog.getByRole("button", { name: "Next photo" }).click();
  await expect(dialog).toContainText("2 / 2");
  // The outgoing frame is briefly kept for the crossfade, so wait for it to leave.
  await expect(dialog.locator("figcaption")).toHaveCount(1);
  await expect(dialog.locator("figcaption")).toContainText("Henley Royal Regatta");
  await dialog.getByRole("button", { name: "Close" }).click();
  await expect(dialog).toBeHidden();
});
