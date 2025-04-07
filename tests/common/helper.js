export async function login(page) {
  await page.goto("https://www.saucedemo.com");
  await page.type("#user-name", "standard_user");
  await page.type("#password", "secret_sauce");
  await page.click("#login-button");
  await page.waitForSelector(".inventory_list");
}
