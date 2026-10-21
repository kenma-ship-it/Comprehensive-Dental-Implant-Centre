/** Gate G11: one h1 per page, a working skip link, and labelled form controls. */
import { chromium } from "playwright";

const ROUTES = ["/", "/about", "/services", "/services/dental-implants", "/contact"];
const BASE = process.env.CHECK_URL ?? "http://localhost:3500";

const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined });
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();
const failures = [];

for (const route of ROUTES) {
  await page.goto(BASE + route, { waitUntil: "load", timeout: 20000 });
  await page.waitForTimeout(400);
  const report = await page.evaluate(() => {
    const h1 = document.querySelectorAll("h1").length;
    const skip = document.querySelector('a[href="#main-content"]');
    const main = document.querySelector("#main-content");
    const unlabelled = [...document.querySelectorAll("input, select, textarea")].filter((el) => {
      if (el.type === "hidden") return false;
      const id = el.getAttribute("id");
      return !(
        (id && document.querySelector(`label[for="${id}"]`)) ||
        el.getAttribute("aria-label") ||
        el.getAttribute("aria-labelledby") ||
        el.closest("label")
      );
    }).length;
    const imgNoAlt = [...document.querySelectorAll("img")].filter((i) => !i.hasAttribute("alt")).length;
    return { h1, skip: Boolean(skip), main: Boolean(main), unlabelled, imgNoAlt };
  });
  if (report.h1 !== 1) failures.push(`${route}: ${report.h1} h1`);
  if (!report.skip || !report.main) failures.push(`${route}: skip link target missing`);
  if (report.unlabelled) failures.push(`${route}: ${report.unlabelled} unlabelled field(s)`);
  if (report.imgNoAlt) failures.push(`${route}: ${report.imgNoAlt} img without alt`);
}

await browser.close();
console.log(failures.length ? `FAIL: ${failures.join(", ")}` : "GATE_OK");
process.exit(failures.length ? 1 : 0);
