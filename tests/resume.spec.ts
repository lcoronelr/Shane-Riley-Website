import { existsSync } from "node:fs";
import path from "node:path";

import { expect, test } from "@playwright/test";

test("résumé sections render", async ({ page }) => {
  await page.goto("/resume");
  for (const name of ["Profile", "Education", "Journalism & media experience", "Additional experience", "Skills"]) {
    await expect(page.getByRole("heading", { level: 2, name })).toBeVisible();
  }
  await expect(page.getByRole("button", { name: "Print résumé" })).toHaveCount(0);
  await expect(page.getByRole("link", { name: "Download PDF" })).toBeVisible();
});

test("Download PDF appears only when the PDF exists", async ({ page, request }) => {
  await page.goto("/resume");
  const pdfExists = existsSync(path.join(process.cwd(), "public", "resume", "shane-riley-resume.pdf"));
  const download = page.getByRole("link", { name: "Download PDF" });
  if (pdfExists) {
    await expect(download).toBeVisible();
    const href = await download.getAttribute("href");
    expect((await request.get(href!)).status()).toBe(200);
  } else {
    await expect(download).toHaveCount(0);
  }
});

test("print layout hides site chrome and controls", async ({ page }) => {
  await page.goto("/resume");
  await page.emulateMedia({ media: "print" });
  await expect(page.locator("header[role='banner']")).toBeHidden();
  await expect(page.locator("footer[role='contentinfo']")).toBeHidden();
  await expect(page.getByRole("link", { name: "Download PDF" })).toBeHidden();
  await expect(page.getByRole("heading", { level: 2, name: "Journalism & media experience" })).toBeVisible();
});

test("résumé content: dates and skills in Title Case", async ({ page }) => {
  await page.goto("/resume");
  const main = page.locator("main");
  await expect(main).not.toContainText(/Current/);
  await expect(main).toContainText("Student Assistant / Multimedia Content");
  const journalism = main.locator("dt", { hasText: "Journalism" }).locator("xpath=following-sibling::dd[1]");
  await expect(journalism).toHaveText(
    "AP Style, News Writing, Sports Reporting, Live Reporting, Broadcast Production, Radio Production, Multimedia Storytelling, Primary Source Vetting, Oral History Interviewing, Archival Research",
  );
  await expect(main).not.toContainText(/Hiking/);
  // Interests live on the About page only.
  await expect(main).not.toContainText("Investigative Journalism");
});
