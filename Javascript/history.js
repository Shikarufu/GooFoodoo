const backBtn = document.getElementById("backBtn"),
  historyContainer = document.getElementById("historyContainer");

backBtn.addEventListener("click", (e) => {
  e.preventDefault();

  document.body.classList.add("fade-in");

  setTimeout(() => {
    window.location.href = "../index.html";
  }, 500);
});

const userId = localStorage.getItem("userId");

fetch(`http://localhost:8082/api/users/order/${userId}`)
  .then(response => response.json())
  .then(orders => {
    orders.forEach(order => {
      historyContainer.innerHTML += `
      <div class="history-card">

        <h3>
          Order #${order.id}
        </h3>

        <p>
          ${order.orderDate}
        </p>

        <h4>
          $${order.total}
        </h4>

      </div>
    `;
    });
  });
