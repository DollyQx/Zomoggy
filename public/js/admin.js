document.addEventListener('DOMContentLoaded', () => {
    const ordersList = document.getElementById('orders-list');

    const fetchOrders = async () => {
        try {
            const response = await fetch('/api/orders');
            const orders = await response.json();
            renderOrders(orders);
        } catch (error) {
            console.error('Error fetching orders:', error);
            ordersList.innerHTML = '<tr><td colspan="7" style="text-align:center;">Could not load orders.</td></tr>';
        }
    };

    const renderOrders = (orders) => {
        ordersList.innerHTML = '';
        if (orders.length === 0) {
            ordersList.innerHTML = '<tr><td colspan="7" style="text-align:center;">No orders found.</td></tr>';
            return;
        }

        orders.forEach(order => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${order.id}</td>
                <td>${order.name}</td>
                <td>${order.phone}</td>
                <td>${order.dish}</td>
                <td>${order.quantity}</td>
                <td><span class="status-btn ${order.status.toLowerCase().replace(/\s/g, '-')}">${order.status}</span></td>
                <td>
                    <button class="status-btn pending" data-id="${order.id}" data-status="Pending">Pending</button>
                    <button class="status-btn preparing" data-id="${order.id}" data-status="Preparing">Preparing</button>
                    <button class="status-btn out-for-delivery" data-id="${order.id}" data-status="Out for Delivery">Out</button>
                    <button class="status-btn completed" data-id="${order.id}" data-status="Completed">Completed</button>
                    <button class="delete-btn" data-id="${order.id}">Delete</button>
                </td>
            `;
            ordersList.appendChild(row);
        });

        // Add event listeners for status updates and deletion
        ordersList.querySelectorAll('.status-btn').forEach(button => {
            button.addEventListener('click', (e) => updateOrderStatus(e.target.dataset.id, e.target.dataset.status));
        });

        ordersList.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', (e) => deleteOrder(e.target.dataset.id));
        });
    };

    const updateOrderStatus = async (id, status) => {
        try {
            await fetch(`/api/orders/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status })
            });
            fetchOrders(); // Refresh the list
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    const deleteOrder = async (id) => {
        if (confirm('Are you sure you want to delete this order?')) {
            try {
                await fetch(`/api/orders/${id}`, {
                    method: 'DELETE'
                });
                fetchOrders(); // Refresh the list
            } catch (error) {
                console.error('Error deleting order:', error);
            }
        }
    };

    // Initial fetch of orders when the page loads
    fetchOrders();
});