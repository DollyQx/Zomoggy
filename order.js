// Initial setup
populateDishSelect();

// Handle initial selected dish from menu page
const selectedDishFromMenu = localStorage.getItem('selectedDish');
if (selectedDishFromMenu) {
    const dish = JSON.parse(selectedDishFromMenu);
    dishSelect.value = dish.name; // Correct way
    localStorage.removeItem('selectedDish'); 
}

// Calculate after setting
calculateTotalPrice();
if (response.ok) {
    statusMessage.textContent = 'Order placed successfully! We will contact you soon.';
    statusMessage.style.color = 'green';
    orderForm.reset();
    dishSelect.value = ""; // Reset dropdown
    totalPriceSpan.textContent = "$0.00"; // Reset price
}
