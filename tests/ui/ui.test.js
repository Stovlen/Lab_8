import puppeteer from "puppeteer";
import { login } from "../common/helper.js";

describe("UI тести для inventory.html", () => {
  let browser, page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
    await login(page);
  });

  afterAll(async () => {
    await browser.close();
  });

  test("Є список товарів", async () => {
    const items = await page.$$(".inventory_item");
    expect(items.length).toBeGreaterThan(0);
  });

  test("Назва першого товару відображається", async () => {
    const name = await page.$eval(
      ".inventory_item_name",
      (el) => el.textContent
    );
    expect(name.length).toBeGreaterThan(0);
  });

  test("Ціна товару у форматі $X.XX", async () => {
    const price = await page.$eval(
      ".inventory_item_price",
      (el) => el.textContent
    );
    expect(price).toMatch(/^\$\d+\.\d{2}$/);
  });

  test('Кнопка "Add to cart" присутня', async () => {
    const button = await page.$("button.btn_inventory");
    expect(button).toBeTruthy();
  });

  test("Після кліку товар зʼявляється в кошику", async () => {
    await page.click('button[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click(".shopping_cart_link");
    const inCart = await page.$(".cart_item");
    expect(inCart).toBeTruthy();
  });
});
