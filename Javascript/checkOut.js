// import {cartProduct} from './main.js';

const backBtn = document.getElementById("backBtn");
const methods = document.querySelectorAll(".method"),
      pages=document.querySelectorAll(".page"),
      steps=document.querySelectorAll(".step");

let currentStep=0;
let cartProduct=JSON.parse(localStorage.getItem("cartProduct")) || [];

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