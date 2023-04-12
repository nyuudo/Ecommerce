// Import Modules
import { products } from "./products.js";
//import { validate } from "./checkout.js";

// Listeners to access Product Buttons in html from Module (UPDATE to strict equality)
const productButtons = document.querySelectorAll('[id^="product-"]');
for (let i = 0; i < productButtons.length; i++) {
  let id = Number(productButtons[i].id.substring(9));
  productButtons[i].addEventListener("click", () => addToCart(id));
}

// Listeners Functions in Module
document.getElementById("open_modal").addEventListener("click", open_modal);
document.getElementById("cleanCart").addEventListener("click", cleanCart);

let cart = [];
let total = 0;

function calculateTotal() {
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].subtotalWithDiscount;
  }
  document.querySelector("#total_price").innerHTML = total;
  return console.log(total);
}

function applyPromotionsCart() {
  cart.forEach((product) => {
    product.subtotal = Number(product.quantity * product.price);
    product.subtotalWithDiscount = 0;
    if (!product.offer || product.quantity < product.offer.number) {
      product.subtotalWithDiscount = product.subtotal;
    } else {
      let discount = Number(product.offer.percent) / 100;
      product.subtotalWithDiscount = Math.round(
        product.subtotal - product.subtotal * discount
      );
    }
  });
}

function printCart() {
  let tbody = `<tbody border="0">`;
  cart.forEach((product) => {
    tbody = tbody + `<tr>`;
    tbody = tbody + `<th scope="row">${product.name}</th>`;
    tbody = tbody + `<td>$${product.price}</td>`;
    tbody = tbody + `<td>${product.quantity}</td>`;
    tbody = tbody + `<td>$${product.subtotalWithDiscount}</td>`;
    tbody += `</tr>`;
    document.getElementById("cart_list").innerHTML = tbody;
  });
  calculateTotal();
}

// ** Nivell II **
// Exercise 7
function addToCart(id) {
  // Refactor previous code in order to simplify it
  // 1. Loop for to the array products to get the item to add to cart
  // 2. Add found product to the cart array or update its quantity in case it has been added previously.
  let isInCart = products.find((item) => item.id === id);
  if (!isInCart) {
    console.log("ERROR: Item not found");
  }
  let isInCartIndex = cart.find((found) => found.id === id);
  if (!isInCartIndex) {
    isInCart.quantity = 1;
    cart.push(isInCart);
  } else {
    isInCart.quantity++;
  }
  applyPromotionsCart();
  console.log(cart);
}

// Updated cleanCart function on Modal
function cleanCart() {
  cart = [];
  total = 0;
  document.getElementById("cart_list").innerHTML = "";
  document.querySelector("#total_price").innerHTML = cart.length;
}
// Exercise 8
function removeFromCart(id) {
  // 1. Loop for to the array products to get the item to add to cart
  // 2. Add found product to the cartList array
  //cart = cart.filter((x) => x.id !== id);
}

function open_modal() {
  console.log("Open Modal");
  printCart();
}
