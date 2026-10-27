var swiper = new Swiper('.mySwiper', {
  loop:true,
  navigation: {
    nextEl: '#next',
    prevEl: '#prev',
  },
});
// we use this when we put id in html
// const cartIcon=document.getElementById('cart-icon');
// we use this when in html no id it refer to class
// first define variable
// using class
const cartIcon=document.querySelector('.cart-icon');
const cartTab=document.querySelector('.cart-tab');
const closeBtn=document.querySelector('.close-btn');
const cardList=document.querySelector('.card-list');
const cartList=document.querySelector('.cart-list');
const cartTotal=document.querySelector('.cart-total');
const cartValue=document.querySelector('.cart-value');
// using id
const topBtn=document.getElementById('topbtn');

// for mobile
const hamburger=document.querySelector('.hamburger');
const mobileMenu=document.querySelector('.mobile-menu');
const bar=document.querySelector('.fa-bars');

// in this situation i have to analyze each code
// this is arrow function
// this once the user click the cart icon it will appear the cart tab in the website
cartIcon.addEventListener('click',()=>cartTab.classList.add('cart-tab-active'));
closeBtn.addEventListener('click',()=>cartTab.classList.remove('cart-tab-active'));
hamburger.addEventListener('click',()=>mobileMenu.classList.toggle('mobile-menu-active'));
hamburger.addEventListener('click', () => {
    bar.classList.toggle('fa-bars');
    bar.classList.toggle('fa-xmark');
});
// Back to top button
window.addEventListener('scroll', () => {

  if(window.scrollY > 300){
      topBtn.style.display = 'block';
  }
  else{
      topBtn.style.display = 'none';
  }

});

topBtn.addEventListener('click', () => {

  window.scrollTo({
      top: 0,
      behavior: 'smooth'
  });

});


let productList=[];
let cartProduct=[];

const updateTotals=()=>{
  let totalPrice=0;
  let totalQuantity=0;
  document.querySelectorAll('.item').forEach(item =>{
    const quantity=parseInt(item.querySelector('.quantity-value').textContent);
    const price=parseFloat(item.querySelector('.item-total').textContent.replace('$',''));

    totalPrice += price;
    totalQuantity += quantity;
  });

  cartTotal.textContent=`$${(totalPrice.toFixed(2))}`;
  // cartValue.textContent=cartProduct.length;
  cartValue.textContent=totalQuantity;
};

const showCart=()=>{
  productList.forEach(product=>{
    const orderCard=document.createElement('div');
    orderCard.classList.add('order-card');
    // this is how dynamic the value(dynamic data)
    // we use ${} 
    orderCard.innerHTML=`
    <div class="card-image">
      <img src="${product.image}" alt="burger">
    </div>
    <h4>${product.name}</h4>
    <h4 class="price">${product.price}</h4>
    <a href="#" class="btn card-btn">Add to Cart</a>
    `;
    cardList.appendChild(orderCard);

    const cardBtn=orderCard.querySelector('.card-btn');
    cardBtn.addEventListener('click',(e)=>{
      // this prevent page is refreshing
      e.preventDefault();

      addToCart(product);
    });
    


  });
};

const addToCart=(product)=>{

  const existingProduct=cartProduct.find(item=>item.id === product.id);

  if (existingProduct){
    alert('Item already in your Cart!');
    return;
  }

  cartProduct.push(product);

  let quantity=1;
  let price=parseFloat(product.price.replace('$',''));

  const cartItem=document.createElement('div');
  cartItem.classList.add('item');

  cartItem.innerHTML=`
  <div class="item-image">
    <img src="${product.image}" alt="burger">
  </div>
  <div>
    <h4>${product.name}</h4>
    <h4 class="item-total">${product.price}</h4>
  </div>
  <div class="flex">
    <a href="#" class="quantity-btn minus">
      <i class="fa-solid fa-minus"></i>
    </a>
    <h4 class="quantity-value">${quantity}</h4>
    <a href="#" class="quantity-btn plus">
      <i class="fa-solid fa-plus"></i>
    </a>
  </div>
  `;

  cartList.appendChild(cartItem);
  updateTotals();

  const quantityValue=cartItem.querySelector('.quantity-value');
  const itemTotal=cartItem.querySelector('.item-total');
  
  const plusBtn=cartItem.querySelector('.plus');
  plusBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    quantity++;
    quantityValue.textContent=quantity;
    itemTotal.textContent=`$${(price * quantity).toFixed(2)}`;
    updateTotals();
  }); 

  const minusBtn=cartItem.querySelector('.minus');
  minusBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    if(quantity > 1){
      quantity--;
      quantityValue.textContent=quantity;
      itemTotal.textContent=`$${(price * quantity).toFixed(2)}`;
      updateTotals();
    }
    else{
      cartItem.classList.add('slide-out');
      
      setTimeout(()=>{
        cartItem.remove();
        cartProduct=cartProduct.filter(item => item.id !== product.id);
        updateTotals();
      },300);
    }
    
  });
  // 3:47:52
}

// this function will take data from product.json file
// syntax
// fetch('file.').then(repsonse=>repsonse.json()).then(data=>{array=data});
const initApp=()=>{
  fetch('/product.json').then(response=>response.json()).then(data=>{
    productList=data;
    // console.log(productList);
    showCart();
  });
  
}

// main function
initApp();


//in this case i have two button and i want both of them get affect we use this
const signIn=document.querySelectorAll('.btnn');

signIn.forEach(sign=>{
  sign.addEventListener('click',(e)=>{
    e.preventDefault();

    document.body.classList.add('fade-out');
    setTimeout(()=>{
      window.location.href='HTML/form.html';
    },500);
  });
});




