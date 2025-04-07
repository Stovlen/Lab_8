import axios from "axios";

const BASE_URL = "https://automationexercise.com/api";

describe("API тести для automationexercise.com", () => {
  test("GET /productsList повертає список товарів", async () => {
    const response = await axios.get(`${BASE_URL}/productsList`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data.products)).toBe(true);
    expect(response.data.products.length).toBeGreaterThan(0);
  });

  test("POST /searchProduct знаходить товари за назвою", async () => {
    const formData = new URLSearchParams({ search_product: "top" });

    const response = await axios.post(`${BASE_URL}/searchProduct`, formData);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data.products)).toBe(true);
    expect(response.data.products.length).toBeGreaterThan(0);
    expect(response.data.products[0].name.toLowerCase()).toContain("top");
  });


  test("POST /createAccount створює нового користувача", async () => {
    const email = `test_${Date.now()}@example.com`;

    const data = {
      name: "TestUser",
      email: email,
      password: "test123",
      title: "Mr",
      birth_date: "10",
      birth_month: "January",
      birth_year: "2000",
      firstname: "Test",
      lastname: "User",
      company: "TestCorp",
      address1: "123 Test Street",
      address2: "",
      country: "Canada",
      state: "TestState",
      city: "TestCity",
      zipcode: "12345",
      mobile_number: "1234567890",
    };

    const formData = new URLSearchParams(data);

    const response = await axios.post(`${BASE_URL}/createAccount`, formData);
    expect(response.status).toBe(200);
    expect(response.data.responseCode).toBe(201);
  });

  test("GET /brandsList повертає список брендів", async () => {
    const response = await axios.get(`${BASE_URL}/brandsList`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data.brands)).toBe(true);
    expect(response.data.brands.length).toBeGreaterThan(0);
  });

  test("GET /contactUs повертає HTML сторінку контактів", async () => {
    const response = await axios.get(
      `https://automationexercise.com/contact_us`
    );
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toContain("text/html");
    expect(response.data).toContain("<form");
  });


});
