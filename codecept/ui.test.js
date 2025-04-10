Feature("AutomationExercise UI");

Scenario("Перевірка заголовка сторінки", ({ I }) => {
  I.amOnPage("/");
  I.seeInTitle("Automation Exercise");
});

Scenario("Перехід у Contact Us", ({ I }) => {
  I.click("Contact us");
  I.see("Get In Touch", "h2");
});

Scenario("Пошук товару", ({ I }) => {
  I.click("Products");
  I.seeElement("#search_product");
  I.fillField("#search_product", "top");
  I.click("#submit_search");
  I.see("Searched Products");
});
