import {
  capitalize,
  formatPrice,
  validateEmail,
  calculateTotal,
  isValidProduct,
} from "./utils.js";

describe("Utils – Unit тести", () => {
  test("capitalize() повертає першу літеру великою", () => {
    expect(capitalize("apple")).toBe("Apple");
  });

  test("formatPrice() повертає форматовану ціну", () => {
    expect(formatPrice(12)).toBe("$12.00");
    expect(formatPrice(5.5)).toBe("$5.50");
  });

  test("validateEmail() перевіряє валідність email", () => {
    expect(validateEmail("test@email.com")).toBe(true);
    expect(validateEmail("wrong-email")).toBe(false);
  });

  test("calculateTotal() рахує суму товарів у кошику", () => {
    const cart = [
      { name: "Item 1", price: 10 },
      { name: "Item 2", price: 5.5 },
    ];
    expect(calculateTotal(cart)).toBe(15.5);
  });

  test("isValidProduct() перевіряє структуру обʼєкта товару", () => {
    expect(isValidProduct({ name: "TV", price: 299.99 })).toBe(true);
    expect(isValidProduct({ name: 123, price: "free" })).toBe(false);
  });
});
