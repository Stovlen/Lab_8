import puppeteer from "puppeteer";

describe("UI тести з Puppeteer для automationexercise.com", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
    await page.goto("https://automationexercise.com", {
      waitUntil: "domcontentloaded",
    });
  }, 20000);

  afterAll(async () => {
    if (browser) {
      await browser.close();
    }
  });

  test("Сторінка має правильний заголовок", async () => {
    const title = await page.title();
    expect(title).toContain("Automation Exercise");
  });

  test("Перехід у розділ Contact Us", async () => {
    await page.click('a[href="/contact_us"]');
    await page.waitForSelector("h2.title.text-center");
    const text = await page.$eval("h2.title.text-center", (el) =>
      el.textContent.trim()
    );
    expect(text).toBe("Contact Us");
  });

  test("Поле пошуку існує у розділі Products", async () => {
    await page.click('a[href="/products"]'); // перехід у розділ
    await page.waitForSelector("#search_product", { timeout: 10000 });
    const searchInput = await page.$("#search_product");
    expect(searchInput).not.toBeNull();
  }, 15000);

});
