import { test, expect } from '@playwright/test';
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test.describe("Static page test", () => {
  test.beforeEach(async ({ page }) => {
   await page.addInitScript({ path: `${__dirname}/../src/mock.js` });
   await page.goto(`file:///${__dirname}/../src/index.html`);
  });

  test('Render h1 message with no background', async ({ page }) => {
    const h1 = await page.locator("h1");

    const text = await h1.textContent();
    const backgroundColor = await h1.evaluate(el => el.style.backgroundColor);

    expect(text).toBe("Hello, World!");
    expect(backgroundColor).toBe("");
  });

  test('Changes h1 colors after button click', async ({ page }) => {
    const button = page.locator("button");
    const h1 = page.locator("h1");
  
    for await (const color of ["blue", "red", ""]) {
      await button.click();
  
      const backgroundColor = await h1.evaluate(el => el.style.backgroundColor);
  
      expect(color).toBe(backgroundColor);
    }
  });
});
