// import {cartProduct} from './main.js';

const backBtn = document.getElementById("backBtn");
const methods = document.querySelectorAll(".method"),
      pages=document.querySelectorAll(".page"),
      steps=document.querySelectorAll(".step");

let currentStep=0;

// load cart from storage
let cartProduct=JSON.parse(localStorage.getItem("cartProduct")) || [];



const deliveryFee=0.5;

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

function renderCart(){
  // El=element
  const container=document.getElementById("cartItems"),
        subtotalEl=document.getElementById("subTotal"),
        totalEl=document.getElementById("total");
  
  if(cartProduct.length === 0){
    container.innerHTML=`
      <div class="empty-cart">
        <i class="fa-solid fa-cart-shopping"></i>
        <h3>Your cart is empty</h3>
        <p>Go to add some Food or Drink</p>
      </div>
    `;
    subtotal.textContent="$0.00";
    total.textContent="$0.00";
    return;
  }

  let subtotal=0;
  container.innerHTML=cartProduct.map((item,index)=>{
    const price=parseFloat(item.price.replace("$","")),
          qty=item.quantity || 1;
    
    subtotal += price*qty;

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
        <div style="font-weight=700; min-width=70px; text-align:right;">
          $${(price*qty).toFixed(2)}
        </div>
      </div> 
    `;
  }).join("");
  subtotalEl.textContent=`$${subtotal.toFixed(2)}`;
  total.textContent=`$${(subtotal+deliveryFee).toFixed(2)}`;
}






function gotoStep(step){
  pages.forEach(page=>
    page.classList.remove("active")
  );
  
  steps.forEach(stepE=>
    stepE.classList.remove("active")
  );

  pages[step].classList.add("active");

  // loop
  for(let i=0;i<=step;i++){
    steps[i].classList.add("active");
  }
  currentStep=step;
}

console.log(cartProduct);

localStorage.removeItem("cartProduct");
// cartProduct.length=0;