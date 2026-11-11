const backBtn = document.getElementById("backBtn"),
      historyContainer = document.getElementById("historyContainer"),
      totalOrder = document.getElementById("totalOrder"),
      totalSpent = document.getElementById("totalSpent");

backBtn.addEventListener("click", (e) => {
  e.preventDefault();

  document.body.classList.add("fade-in");

  setTimeout(() => {
    window.location.href = "../index.html";
  }, 500);
});
const userId = localStorage.getItem("userId");
let qtyId = 1;


fetch(`http://localhost:8082/api/users/order/${userId}`)
  .then((response) => response.json())
  .then((orders) => {

    const totalSpents = orders.reduce((sum, order) => {
      return (sum + (order.total || 0));
    },0);


    totalSpent.textContent = `$${totalSpents.toFixed(2)}`;
    
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
