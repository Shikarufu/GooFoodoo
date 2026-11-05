// import {cartProduct} from './main.js';

const backBtn = document.getElementById("backBtn");
const methods = document.querySelectorAll(".method"),
  pages = document.querySelectorAll(".page"),
  steps = document.querySelectorAll(".step");

let currentStep = 0,
  selectedPayment = "card";

// load cart from storage
let cartProduct = JSON.parse(localStorage.getItem("cartProduct")) || [];

const deliveryFee = 0.5;

// steps.forEach((step,index)=>{
//   step.addEventListener("click",()=>{
//     if(index <= currentStep){
//       gotoStep(index);
//     }
//   });
// });

backBtn.addEventListener("click", (e) => {
  e.preventDefault();

  document.body.classList.add("fade-in");
  setTimeout(() => {
    window.location.href = "../index.html";
  }, 500);
});

// methods.forEach((method) => {
//   method.addEventListener("click", () => {
//     methods.forEach(item=>
//       item.classList.remove("active")
//     );
//     method.classList.add("active");
//   });
// });

// function area

function renderCart() {
  // El=element
  const container = document.getElementById("cartItems"),
    subtotalEl = document.getElementById("subtotal"),
    totalEl = document.getElementById("total");

  if (cartProduct.length === 0) {
    container.innerHTML = `
      <div class="empty-cart">
        <i class="fa-solid fa-cart-shopping"></i>
        <h3>Your cart is empty</h3>
        <p>Go to add some Food or Drink</p>
      </div>
    `;
    subtotalEl.textContent = "$0.00";
    totalEl.textContent = "$0.00";
    return;
  }

  let subtotal = 0;
  container.innerHTML = cartProduct
    .map((item, index) => {
      const price = parseFloat(item.price.replace("$", "")),
        qty = item.quantity || 1;

      subtotal += price * qty;

      return `
      <div class="cart-item">
        <img src="../${item.image}" alt="${item.name}"/>
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <div class="price">${item.price}</div>
          <div class="qty-controls">
            <button class="qty-btn" onclick="changeQty(${index},-1)">-</button>
            <span>${qty}</span>
            <button class="qty-btn" onclick="changeQty(${index},1)">+</button>
          </div>
        </div>
        <div style="font-weight=700; min-width=70px; text-align:right;">
          $${(price * qty).toFixed(2)}
        </div>
      </div> 
    `;
    })
    .join("");
  subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  totalEl.textContent = `$${(subtotal + deliveryFee).toFixed(2)}`;
}

function changeQty(index, delta) {
  if (!cartProduct[index].quantity) {
    cartProduct[index].quantity = 1;
  }

  cartProduct[index].quantity += delta;

  if (cartProduct[index].quantity < 1) {
    cartProduct.splice(index, 1);
  }

  localStorage.setItem("cartProduct", JSON.stringify(cartProduct));
  renderCart();
}

function gotoStep(step) {
  pages.forEach((p) => p.classList.remove("active"));

  steps.forEach((s) => s.classList.remove("active", "completed"));

  pages[step].classList.add("active");

  for (let i = 0; i <= step; i++) {
    steps[i].classList.add(i === step ? "active" : "completed");
  }

  currentStep = step;

  if (currentStep === 3) {
    updatePreview();
  }

  // pages.forEach(page=>
  //   page.classList.remove("active")
  // );

  // steps.forEach(stepE=>
  //   stepE.classList.remove("active")
  // );

  // pages[step].classList.add("active");

  // // loop
  // for(let i=0;i<=step;i++){
  //   steps[i].classList.add("active");
  // }
  // currentStep=step;
}

// cartProduct.length=0;

// preview
function updatePreview() {
  const previewItems = document.getElementById("previewItems");
  let html = "";
  let total = 0;

  cartProduct.forEach((item) => {
    const price = parseFloat(item.price.replace("$", ""));
    // check falsy value
    const qty = item.quantity || 1;
    total += price * qty;

    html += `
      <div style="display:flex; justify-content:space-between; margin-bottom:.4rem;">
        <span>${item.name} x ${qty}</span>
        <span>$${(price * qty).toFixed(2)}</span>
      </div>
    `;
  });
  previewItems.innerHTML = html || "<p>No items</p>";
  document.getElementById("previewTotal").textContent =
    `$${(total + deliveryFee).toFixed(2)}`;

  // address
  const fullName = document.getElementById("fullName").value || "-",
    street = document.getElementById("street").value || "",
    city = document.getElementById("city").value || "";
  document.getElementById("previewAddress").textContent =
    `${fullName}, ${street}, ${city}`;

  // payment
  const activeMethod = document.querySelector(".method.active");
  document.getElementById("previewPayment").textContent = selectedPayment;
}

// payment click
document.querySelectorAll(".method").forEach((m) => {
  m.addEventListener("click", () => {
    document
      .querySelectorAll(".method")
      .forEach((x) => x.classList.remove("active"));

    m.classList.add("active");

    selectedPayment = m.querySelector("span")?.textContent || m.dataset.method || "card";
  });
});

// place order
document.getElementById("placeOrderBtn").addEventListener("click", () => {
  if (cartProduct.length === 0) {
    console.log("cart is empty");
    return;
  }

  localStorage.removeItem("cartProduct");
  alert("Order successfully");
  window.location.href = "../index.html";
});

// 始めましょう
renderCart();
