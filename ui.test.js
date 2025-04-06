import puppeteer from "puppeteer";

describe("UI-тестування сайту saucedemo.com", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
    await page.goto("https://www.saucedemo.com");
  });

  afterAll(async () => {
    await browser.close();
  });

  test("Успішний логін з валідними даними", async () => {
    await page.type("#user-name", "standard_user");
    await page.type("#password", "secret_sauce");
    await page.click("#login-button");
    await page.waitForSelector(".inventory_list");
    const url = page.url();
    expect(url).toBe("https://www.saucedemo.com/inventory.html");
  }, 10000);

  test("Помилка при неправильному паролі", async () => {
    await page.goto("https://www.saucedemo.com");
    await page.type("#user-name", "standard_user");
    await page.type("#password", "wrong_password");
    await page.click("#login-button");
    await page.waitForSelector('h3[data-test="error"]', { timeout: 3000 });
    const errorText = await page.$eval(
      'h3[data-test="error"]',
      (el) => el.textContent
    );
    expect(errorText.toLowerCase()).toContain("epic sadface");
  }, 10000);

  test("Помилка при порожньому полі логіну", async () => {
    await page.goto("https://www.saucedemo.com");
    await page.click("#login-button");
    await page.waitForSelector('h3[data-test="error"]', { timeout: 3000 });
    const errorText = await page.$eval(
      'h3[data-test="error"]',
      (el) => el.textContent
    );
    expect(errorText).toContain("Username is required");
  }, 10000);

  test("Перевірка, що товари відображаються після входу", async () => {
    await page.goto("https://www.saucedemo.com");
    await page.type("#user-name", "standard_user");
    await page.type("#password", "secret_sauce");
    await page.click("#login-button");
    await page.waitForSelector(".inventory_item", { timeout: 15000 });
    const itemsCount = await page.$$eval(
      ".inventory_item",
      (items) => items.length
    );
    expect(itemsCount).toBeGreaterThan(0);
  }, 20000);

  test("Вихід з акаунту через меню", async () => {
    await page.goto("https://www.saucedemo.com");
    await page.type("#user-name", "standard_user");
    await page.type("#password", "secret_sauce");
    await page.click("#login-button");
    await page.waitForSelector(".inventory_item", { timeout: 15000 });

    await page.waitForSelector("#react-burger-menu-btn");
    await page.click("#react-burger-menu-btn");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await page.waitForSelector("#logout_sidebar_link", { timeout: 5000 });
    await page.click("#logout_sidebar_link");
    await page.waitForSelector("#login-button", { timeout: 10000 });

    const url = page.url();
    expect(url).toBe("https://www.saucedemo.com/");
  }, 20000);
});
