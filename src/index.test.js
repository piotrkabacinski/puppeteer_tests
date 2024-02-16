import { describe, it, after, beforeEach } from "node:test";
import { strictEqual} from "node:assert";
import puppeteer from "puppeteer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const browser = await puppeteer.launch({
  headless: false
});

let page;

describe("Static page test", async () => {
  beforeEach(async () => {
    page = await browser.newPage();

    await page.goto(`file:///${__dirname}/index.html`);
  });

  after(async () => {
    await browser.close();
  });

  it('Render h1 message with no background', async () => {  
    const h1 = await page.waitForSelector("h1");

    const title = await h1.evaluate(el => el.textContent);
    const color = await h1.evaluate(el => el.style.backgroundColor);

    strictEqual(title, "Hello, World!");
    strictEqual(color, "");
  });

  it('Changes h1 colors after button click', async () => {
    const [h1] = await Promise.all([
      page.waitForSelector("h1"),
      page.waitForSelector("button"),
    ]);

    for await (const color of ["blue", "red", ""]) {
      await page.click("button");

      const backgroundColor = await h1.evaluate(el => el.style.backgroundColor);
  
      strictEqual(color, backgroundColor);
    }
  });
});
