export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatPrice(num) {
  return `$${num.toFixed(2)}`;
}

export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function calculateTotal(cartItems) {
  return cartItems.reduce((sum, item) => sum + item.price, 0);
}

export function isValidProduct(obj) {
  return obj && typeof obj.name === "string" && typeof obj.price === "number";
}
