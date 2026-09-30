import { existsSync } from "node:fs";
import path from "node:path";

import { expect, test } from "@playwright/test";

test("résumé sections render", async ({ page }) => {
  await page.goto("/resume");
  for (const name of ["Profile", "Education", "Journalism & media experience", "Additional experience", "Skills"]) {
    await expect(page.getByRole("heading", { level: 2, name })).toBeVisible();
  }
  await expect(page.getByRole("button", { name: "Print résumé" })).toBeVisible();
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
  await expect(page.getByRole("button", { name: "Print résumé" })).toBeHidden();
  await expect(page.getByRole("heading", { level: 2, name: "Journalism & media experience" })).toBeVisible();
});
