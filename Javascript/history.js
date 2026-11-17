//by id
const backBtn = document.getElementById("backBtn"),
  historyContainer = document.getElementById("historyContainer"),
  totalOrder = document.getElementById("totalOrder"),
  totalSpent = document.getElementById("totalSpent"),
  receiptModal = document.getElementById("receiptModal"),
  closeReceipt = document.getElementById("closeReceipt");
//by class
const receiptBody = document.querySelector(".receiptBody");
// const api_url="https://goofoodoobackend-production.up.railway.app";

backBtn.addEventListener("click", (e) => {
  e.preventDefault();

  document.body.classList.add("fade-in");

  setTimeout(() => {
    window.location.href = "../index.html";
  }, 500);
});

// const userName = localStorage.getItem("userName") || "Guest";
let currentUser = null;
const userId = localStorage.getItem("userId");

fetch(`${api_url}/${userId}`)
  .then((response) => response.json())
  .then((user) => {
    currentUser = user;
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
        ${formatDate(order.orderDate)}

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
// if cambodiaa en_KM
function formatDate(dateString) {
  return new Date(dateString + "Z").toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  });
}

let qtyId = 1;

let allOrder = [];
let allOrders = [];

fetch(`${api_url}/order/${userId}`)
  .then((response) => response.json())
  .then((orders) => {
    const totalSpents = orders.reduce((sum, order) => {
      return sum + (order.total || 0);
    }, 0);

    totalSpent.textContent = `$${totalSpents.toFixed(2)}`;
    allOrder = orders;
    allOrders = orders;
    // console.log(allOrder);
    orders.forEach((order) => {
      totalOrder.textContent = qtyId;
      console.log(order.orderDate);
      historyContainer.innerHTML += `
      <div class="history-card">
        <div class="order-top">
          <div>
            <h3>#${qtyId++}</h3>

            <p class="order-date">
              <i class="fa-solid fa-calendar"></i>
              ${formatDate(order.orderDate)}
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

// function downloadReceipt(order){
// 	const {jsPDF} =window.jspdf;
// 	const doc=new jsPDF({
// 		orientation: 'l',
// 	});

// 	doc.text("GooFoodoo Receipt",20,20);
// 	doc.text(`Customer Name: ${currentUser.name}`,20,40);
// 	doc.text(`Order total: $${order.total.toFixed(2)}`,20,60);

// 	doc.text("Thanks customer for choosing GooFoodoo",20,80);
// 	doc.save(`GooFooDoo Receipt-${currentUser.name}.pdf`);
// }

async function downloadReceipt(order) {
  const { jsPDF } = window.jspdf;
  
  try {
    const response = await fetch(`${api_url}/orderItem/${order.id}`);
    const data = await response.json();
    
    // Fallback in case the API returns an object containing the array (e.g., data.items or data.data)
    const items = Array.isArray(data) ? data : (data.items || data.data || []);

    const doc = new jsPDF();

    // Header
    doc.setFontSize(22);
    doc.setTextColor(242, 189, 18);
    doc.text("🍔 GooFoodoo", 20, 20);

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text("Food Delivery Receipt", 20, 30);
    doc.line(20, 35, 190, 35);

    // Customer Info
    doc.setFontSize(14);
    doc.text(`Customer: ${currentUser?.name || "Guest"}`, 20, 50);
    doc.text(`Address: ${order.address}`, 20, 60);
    doc.text(`Payment: ${order.paymentMethod}`, 20, 70);
    doc.text(`Order ID: #${order.id}`, 20, 80);
    doc.text(`Date: ${new Date(order.orderDate).toLocaleString()}`, 20, 90);

    // Divider
    doc.line(20, 100, 190, 100);

    // Items Header
    doc.setFontSize(16);
    doc.text("Order Summary", 20, 115);

    let y = 130;
    doc.setFontSize(14);
    doc.text("Item", 20, y);
    doc.text("Qty", 120, y);
    doc.text("Price", 160, y);

    y += 5;
    doc.line(20, y, 190, y);
    y += 10;

    // Loop safely over items
    items.forEach((item) => {
      doc.text(item.productName || "Unknown Item", 20, y);
      doc.text((item.quantity || 1).toString(), 120, y);
      doc.text(`$${((item.price || 0) * (item.quantity || 1)).toFixed(2)}`, 160, y);
      y += 10;
    });

    doc.line(20, y, 190, y);
    y += 15;

    doc.setFontSize(18);
    doc.text(`Total : $${order.total.toFixed(2)}`, 20, y);

    y += 25;
    doc.setFontSize(12);
    doc.text("Thank you for choosing GooFoodoo ❤️", 20, y);
    doc.text("We hope to serve you again!", 20, y + 10);

    // Fixed bug where order.currentUser was undefined (use currentUser.name instead)
    doc.save(`GooFoodoo-Receipt-${currentUser?.name || "Customer"}.pdf`);
    
  } catch (error) {
    console.error("Failed to generate PDF receipt:", error);
    alert("Could not load order items for the PDF. Please try again.");
  }
}


document.addEventListener("click", (e) => {
  if (e.target && e.target.classList.contains("downloadPDF")) {
    const orderId = Number(e.target.dataset.id);

    const selectedOrder = allOrders.find((order) => order.id === orderId);

    downloadReceipt(selectedOrder);
  }
});
