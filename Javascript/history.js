//by id
const backBtn = document.getElementById("backBtn"),
  historyContainer = document.getElementById("historyContainer"),
  totalOrder = document.getElementById("totalOrder"),
  totalSpent = document.getElementById("totalSpent"),
  receiptModal = document.getElementById("receiptModal"),
  closeReceipt = document.getElementById("closeReceipt");
//by class
const receiptBody = document.querySelector(".receiptBody");

backBtn.addEventListener("click", (e) => {
  e.preventDefault();

  document.body.classList.add("fade-in");

  setTimeout(() => {
    window.location.href = "../index.html";
  }, 500);
});

function openReceipt(order) {

  receiptBody.innerHTML = `
    <h2>
        🍔 GooFoodoo Receipt
    </h2>

    <hr>

    <p style="margin-top:1rem;">
        <strong>Order ID:</strong>
        #${order.id}
    </p>

    <p>
        <strong>Date:</strong>
        ${new Date(order.orderDate)
          .toLocaleString()}
    </p>

    <p>
        <strong>Address:</strong>
        ${order.address}
    </p>

    <p style="margin-bottom:1rem;">
        <strong>Payment:</strong>
        ${order.paymentMethod}
    </p>

    <hr>

    <h3>
        Total:
        $${order.total.toFixed(2)}
    </h3>
  `;

  receiptModal.classList.add("show");
}

const userId = localStorage.getItem("userId");
let qtyId = 1;

let allOrder = [];

fetch(`http://localhost:8082/api/users/order/${userId}`)
  .then((response) => response.json())
  .then((orders) => {
    const totalSpents = orders.reduce((sum, order) => {
      return sum + (order.total || 0);
    }, 0);

    totalSpent.textContent = `$${totalSpents.toFixed(2)}`;
    allOrder = orders;
    // console.log(allOrder);
    orders.forEach((order) => {
      totalOrder.textContent = qtyId;

      historyContainer.innerHTML += `
      <div class="history-card">
        <div class="order-top">
          <div>
            <h3>#${qtyId++}</h3>

            <p class="order-date">
              <i class="fa-solid fa-calendar"></i>
              ${new Date(order.orderDate).toLocaleString()}
            </p>
          </div>

          <span class="status">
            Delivered
          </span>
          
        </div>  

        <div class="order-detail">
          <p>
            <i class="fa-solid fa-location-dot"></i>
              ${order.address}
          </p>

          <p>
            <i class="fa-solid fa-credit-card"></i>
            ${order.paymentMethod}
          </p>
        </div>

        <div class="order-bottom">
          <h4>
            Total:$${order.total.toFixed(2)}
          </h4>
          <button class="viewBtn" data-id="${order.id}">
            View Details
          </button>
        </div>

      </div>
      `;
    });
  });

document.addEventListener("click", (event) => {
  if (event.target && event.target.classList.contains("viewBtn")) {
    // console.log("cliapsjfjasjdf");
    const orderId = Number(event.target.dataset.id);

    const selectedOrder = allOrder.find((order) => order.id === orderId);

    openReceipt(selectedOrder);
  }
});

closeReceipt.addEventListener("click",()=>{
  receiptModal.classList.remove("show");
});