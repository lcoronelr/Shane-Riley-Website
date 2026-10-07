/**
 * Helpers for content edited in the CMS (the JSON files in src/content/data).
 *
 * The CMS saves plain values, so these turn them back into what the site uses
 * and stop the build with a readable message when something required is
 * missing. A failed build never replaces the live site, so a mistake in the
 * CMS can't take the site down.
 */
export function fail(where: string, problem: string): never {
  throw new Error(`Content error in ${where}: ${problem}`);
}

/** A required piece of text. */
export function text(value: unknown, where: string): string {
  if (typeof value !== "string" || value.trim() === "") fail(where, "this field can't be empty.");
  return value;
}

/** Optional text; empty strings (how the CMS saves a cleared field) become undefined. */
export function optionalText(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() !== "" ? value : undefined;
}

/** A list of non-empty strings, ignoring blank rows. */
export function textList(value: unknown, where: string): string[] {
  if (!Array.isArray(value)) fail(where, "expected a list.");
  return value.filter((v): v is string => typeof v === "string" && v.trim() !== "");
}
