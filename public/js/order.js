document.addEventListener("DOMContentLoaded", () => {
  const dishSelect = document.getElementById("dish");
  const quantityInput = document.getElementById("quantity");
  const totalPriceEl = document.getElementById("totalPrice");
  const orderForm = document.getElementById("orderForm");

  const modal = document.getElementById("orderModal");
  const orderDetailsEl = document.getElementById("orderDetails");

  // Sample menu (should match menu.js items)
  const menuItems = [
    { name: "Coca-Cola", price: 120 },
    { name: "Orange Juice", price: 120 },
    { name: "Chocolate Cake", price: 250 },
    { name: "Cheesecake", price: 300 }
  ];

  // Populate dish dropdown
  menuItems.forEach(item => {
    const option = document.createElement("option");
    option.value = item.name;
    option.textContent = `${item.name} - ₹${item.price}`;
    dishSelect.appendChild(option);
  });

  // Update total price when dish or quantity changes
  function updatePrice() {
    const dish = menuItems.find(i => i.name === dishSelect.value);
    const qty = parseInt(quantityInput.value) || 1;
    if (dish) {
      totalPriceEl.textContent = `₹${dish.price * qty}`;
    } else {
      totalPriceEl.textContent = "₹0";
    }
  }
  dishSelect.addEventListener("change", updatePrice);
  quantityInput.addEventListener("input", updatePrice);

  // Handle order submission
  orderForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
    const dish = dishSelect.value;
    const qty = parseInt(quantityInput.value);
    const payment = document.getElementById("payment").value;

    const dishData = menuItems.find(i => i.name === dish);
    const total = dishData.price * qty;

    // Save order in localStorage
    const order = { name, phone, address, dish, qty, total, payment };
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));

    // Show modal confirmation
    orderDetailsEl.textContent = `${qty} x ${dish} = ₹${total} (Payment: ${payment})`;
    modal.style.display = "flex";

    // Reset form
    orderForm.reset();
    totalPriceEl.textContent = "₹0";
  });
});

// Close modal function
function closeModal() {
  document.getElementById("orderModal").style.display = "none";
}
