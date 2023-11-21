// Import Modules
import { products } from "./products.js";

// Maping the products to render in the page
function showProducts(products) {
  const formatedProducts = products.map((item) => {
    return `
    <div class="col-md-4 px-6" id="${item.type}">
        <div class="h-100 m-4">
          <img
            class="card-img-top"
            src="./images/${item.image}"
            alt="${item.name}"
          />
          <div class="card-body text-center p-4">
              <h3 class="fw-bolder">${item.name}</h3>
              <p>${item.description}</p>
              <h3 class="fw-bolder">€ ${item.price}</h3>
            </div>
          <div>
            <div class="text-center">
              <button
                id="product-0${item.id}"
                type="button"
                class="btn btn-outline-dark"
              >
              ADD TO CART
              </button>
            </div>
          </div>
        </div>
    </div>
    `;
  });
  document.getElementById("products").innerHTML = formatedProducts.join(" ");
}
showProducts(products);

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
  const total = cart.reduce(
    (acc, product) => acc + parseFloat(product.subtotalWithDiscount),
    0
  );
  document.querySelector("#total_price").innerHTML = total.toFixed(2);
  return console.log(total);
}

function applyPromotionsCart() {
  cart.forEach((product) => {
    product.subtotal = product.quantity * product.price;
    product.subtotalWithDiscount = 0;

    if (!product.offer || product.quantity < product.offer.number) {
      product.subtotalWithDiscount = product.subtotal.toFixed(2);
    } else {
      let discount = product.offer.percent / 100;
      product.subtotalWithDiscount = (
        product.subtotal *
        (1 - discount)
      ).toFixed(2);
    }
  });
}

function printCart() {
  let tbody = `<tbody border="0">`;
  let htmlString = ""; // New variable to store the entire HTML string
  cart.forEach((product) => {
    htmlString += `<tr>`;
    htmlString += `<th scope="row">${product.name}</th>`;
    htmlString += `<td>$${product.price}</td>`;
    htmlString += `<td>${product.quantity}</td>`;
    htmlString += `<td>$${product.subtotalWithDiscount}</td>`;
    htmlString += `</tr>`;
  });
  tbody += htmlString; // Append the HTML string to tbody
  document.getElementById("cart_list").innerHTML = tbody;
  calculateTotal();
}

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
  document.getElementById("count_product").textContent = cart.length;
}

// Updated cleanCart function on Modal
function cleanCart() {
  cart = [];
  total = 0;
  document.getElementById("cart_list").innerHTML = "";
  document.querySelector("#total_price").innerHTML = cart.length;
}

function removeFromCart(id) {}

function open_modal() {
  console.log("Open Modal");
  printCart();
}
