/** Gate G10: no horizontal scroll at key widths, both themes, every route. */
import { chromium } from "playwright";

const WIDTHS = [320, 375, 414, 768];
const ROUTES = ["/", "/about", "/services", "/services/dental-implants", "/contact"];
const BASE = process.env.CHECK_URL ?? "http://localhost:3500";

// CHROME_PATH reuses a Chrome already on the machine instead of Playwright's download.
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined });
const failures = [];
for (const theme of ["light", "dark"]) {
  for (const width of WIDTHS) {
    const ctx = await browser.newContext({ viewport: { width, height: 800 }, colorScheme: theme });
    const page = await ctx.newPage();
    for (const route of ROUTES) {
      await page.goto(BASE + route, { waitUntil: "load", timeout: 20000 });
      await page.waitForTimeout(500);
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      if (scrollWidth > width) failures.push(`${theme} ${width}px ${route} -> ${scrollWidth}`);
    }
    await ctx.close();
  }
}
await browser.close();
console.log(failures.length ? `FAIL: ${failures.join(", ")}` : "GATE_OK");
process.exit(failures.length ? 1 : 0);
