import { expect, test } from "@playwright/test";

test("mobile menu opens, traps the page behind it, and closes with Escape", async ({ page }) => {
  await page.goto("/about");
  const toggle = page.getByRole("button", { name: "Menu" });
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await toggle.tap();

  const close = page.getByRole("button", { name: "Close" });
  await expect(close).toHaveAttribute("aria-expanded", "true");
  const menuNav = page.getByRole("navigation", { name: "Primary" });
  await expect(menuNav.getByRole("link", { name: "Home" })).toBeFocused();
  await expect(page.locator("#main-content")).toHaveAttribute("inert", "");
  await expect(menuNav.getByRole("link", { name: "About" })).toHaveAttribute("aria-current", "page");

  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Menu" })).toBeFocused();
  await expect(page.locator("#main-content")).not.toHaveAttribute("inert", "");
});

test("mobile menu navigates by touch and closes after navigation", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Menu" }).tap();
  await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Multimedia" }).tap();
  await expect(page).toHaveURL("/multimedia");
  await expect(page.getByRole("button", { name: "Menu" })).toHaveAttribute("aria-expanded", "false");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Multimedia");
});

test("tap targets in navigation and filters are at least 44px tall", async ({ page }) => {
  await page.goto("/stories");
  const heights = await page.$$eval(
    "header button, [role='group'] button, footer nav a",
    (els) => els.map((el) => el.getBoundingClientRect().height),
  );
  for (const h of heights) expect(h).toBeGreaterThanOrEqual(44);
});

test("story filters work by touch", async ({ page }) => {
  await page.goto("/stories");
  await page.getByRole("group", { name: "Sport" }).getByRole("button", { name: "Tennis" }).tap();
  await expect(page.locator("main article")).toHaveCount(1);
});

test("lightbox supports swipe", async ({ page }) => {
  await page.goto("/multimedia");
  await page.locator("#lines").getByRole("button", { name: /^Open photo 1 of 4/ }).tap();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toContainText("1 / 4");
  await dialog.evaluate((el) => {
    const touch = (x: number) => new Touch({ identifier: 1, target: el, clientX: x, clientY: 400 });
    el.dispatchEvent(new TouchEvent("touchstart", { touches: [touch(300)], bubbles: true }));
    el.dispatchEvent(new TouchEvent("touchend", { changedTouches: [touch(100)], bubbles: true }));
  });
  await expect(dialog).toContainText("2 / 4");
});
