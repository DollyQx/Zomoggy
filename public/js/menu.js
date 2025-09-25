document.addEventListener('DOMContentLoaded', () => {
    const menuData = [
        { id: 1, name: "Cheesecake", price: 250, category: "Cake", image: "images/CheeseCake.jpg" },
        { id: 2, name: "Chocolate Cake", price: 200, category: "Cake", image: "images/ChocolateCake.jpg" },
        { id: 3, name: "Cupcake", price: 150, category: "Cake", image: "images/Cupcake.jpg" },
        { id: 4, name: "Birthday Cake", price: 300, category: "Cake", image: "images/BirthdayCake.jpg" }, 
        { id: 5, name: "Strawberry Cake", price: 250, category: "Cake", image: "images/StrawberryCake.jpg" },
        { id: 6, name: "Red Velvet", price: 280, category: "Cake", image: "images/RedVelvet.jpg" },
        { id: 7, name: "Coca-Cola", price: 120, category: "Drinks", image: "images/CocaCola.jpg" },
        { id: 8, name: "Orange Juice", price: 120, category: "Drinks", image: "images/OrangeJuice.jpg" },
    ];

    const menuGrid = document.getElementById('menu-items');
    const searchInput = document.getElementById('search-input');
    const categorySelect = document.getElementById('category-select');

    function renderMenu(items) {
        menuGrid.innerHTML = ''; // Clear previous items
        items.forEach(item => {
            const foodCard = document.createElement('div');
            foodCard.className = 'food-card';
            foodCard.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="food-card-img">
                <div class="food-card-content">
                    <div>
                        <h3>${item.name}</h3>
                        <p>${item.category}</p>
                    </div>
                    <p class="food-price">₹${item.price}</p>

                    <button class="add-to-cart" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}">Add to Cart</button>
                </div>
            `;
            menuGrid.appendChild(foodCard);
        });

        // Handle Add to Cart
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (e) => {
                const item = {
                    name: e.target.dataset.name,
                    price: e.target.dataset.price
                };
                // Save item to localStorage and redirect to order page
                localStorage.setItem('selectedDish', JSON.stringify(item));
                window.location.href = 'order.html';
            });
        });
    }

    function filterMenu() {
        const searchTerm = searchInput.value.toLowerCase();
        const category = categorySelect.value;

        const filteredItems = menuData.filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(searchTerm);
            const matchesCategory = category === 'all' || item.category === category;
            return matchesSearch && matchesCategory;
        });

        renderMenu(filteredItems);
    }

    // Event listeners
    searchInput.addEventListener('input', filterMenu);
    categorySelect.addEventListener('change', filterMenu);

    // Handle category from URL (if clicked from category cards)
    const urlParams = new URLSearchParams(window.location.search);
    const categoryFromURL = urlParams.get('category');

    if (categoryFromURL) {
        categorySelect.value = categoryFromURL;
        filterMenu();
    } else {
        renderMenu(menuData);
    }
});
