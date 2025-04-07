import puppeteer from "puppeteer";

describe("Користувацькі сценарії для saucedemo.com", () => {
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

  // Сценарій 1 — Успішний логін користувача
  // Перевіряємо, що після правильного логіну користувач переходить на сторінку з товарами
  test("Сценарій 1: Успішний логін користувача", async () => {
    await page.type("#user-name", "standard_user");
    await page.type("#password", "secret_sauce");
    await page.click("#login-button");
    await page.waitForSelector(".inventory_list");
    const url = page.url();
    expect(url).toBe("https://www.saucedemo.com/inventory.html");
  }, 10000);

  // Сценарій 2 — Додавання товару в кошик
  // Перевіряємо, що після натискання кнопки додавання товар зʼявляється у кошику
  test("Сценарій 2: Додавання товару в кошик", async () => {
    await page.click('button[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click(".shopping_cart_link");
    await page.waitForSelector(".cart_item");
    const itemName = await page.$eval(
      ".inventory_item_name",
      (el) => el.textContent
    );
    expect(itemName).toContain("Sauce Labs Backpack");
  }, 10000);

  // Сценарій 3 — Оформлення замовлення (checkout)
  // Користувач заповнює форму замовлення, проходить етапи оформлення та бачить підтвердження
  test("Сценарій 3: Оформлення замовлення", async () => {
    await page.click('button[data-test="checkout"]');
    await page.waitForSelector('input[data-test="firstName"]');
    await page.type('input[data-test="firstName"]', "Імʼя");
    await page.type('input[data-test="lastName"]', "Прізвище");
    await page.type('input[data-test="postalCode"]', "01001");
    await page.click('input[data-test="continue"]');
    await page.waitForSelector(".summary_total_label");
    await page.click('button[data-test="finish"]');
    await page.waitForSelector(".complete-header");
    const confirm = await page.$eval(
      ".complete-header",
      (el) => el.textContent
    );
    expect(confirm.toLowerCase()).toContain("thank you for your order");
  }, 15000);
});
