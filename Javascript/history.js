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

// const userName = localStorage.getItem("userName") || "Guest";
let currentUser=null;
const userId = localStorage.getItem("userId");

fetch(`http://localhost:8082/api/users/${userId}`)
.then(response=>response.json())
.then(user=>{
	currentUser=user;
});

function openReceipt(order) {
  receiptBody.innerHTML = `
    <h2>
        🍔 GooFoodoo Receipt
    </h2>

    <hr>

    <p style="margin-top:1rem;">
        <strong>Customer Name:</strong>
        #${currentUser.name}
    </p>

    <p>
        <strong>Date:</strong>
        ${new Date(order.orderDate).toLocaleString()}
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
					
    <div style="
				display:flex;
				justify-content: space-between;
				align-items:center;
				margin-top:.5rem;">
        <h3>
					Total:
					$${order.total.toFixed(2)}
				</h3>
				<button class="downloadPDF" data-id="${order.id}" style="
								padding:.5rem;
								border-radius:1rem;
								cursor:pointer;
								border-style:none;
								background:#f2bd12;
								font-weight:600;">
					Download pdf
				</button>  
    </div>
  `;

  receiptModal.classList.add("show");
}

let qtyId = 1;

let allOrder = [];
let allOrders=[];

fetch(`http://localhost:8082/api/users/order/${userId}`)
  .then((response) => response.json())
  .then((orders) => {
    const totalSpents = orders.reduce((sum, order) => {
      return sum + (order.total || 0);
    }, 0);

    totalSpent.textContent = `$${totalSpents.toFixed(2)}`;
    allOrder = orders;
		allOrders=orders;
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

closeReceipt.addEventListener("click", () => {
  receiptModal.classList.remove("show");
});


// generate pdf

function downloadReceipt(order){
	const {jsPDF} =window.jspdf;
	const doc=new jsPDF({
		orientation: 'l',
	});

	doc.text("GooFoodoo Receipt",20,20);
	doc.text(`Customer Name: ${currentUser.name}`,20,40);
	doc.text(`Order total: $${order.total.toFixed(2)}`,20,60);

	doc.text("Thanks customer for choosing GooFoodoo",20,80);
	doc.save(`GooFooDoo Receipt-${currentUser.name}.pdf`);
}

document.addEventListener("click",(e)=>{
	if(e.target && e.target.classList.contains("downloadPDF")){
		const orderId = Number(e.target.dataset.id);

    const selectedOrder = allOrders.find((order) => order.id === orderId);

    downloadReceipt(selectedOrder);
	}
});