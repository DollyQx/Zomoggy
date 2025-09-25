const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Path to the orders data file
const ordersFilePath = path.join(__dirname, 'orders.json');

// Helper function to read orders from file
const getOrders = () => {
  try {
    const data = fs.readFileSync(ordersFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// Helper function to write orders to file
const saveOrders = (orders) => {
  fs.writeFileSync(ordersFilePath, JSON.stringify(orders, null, 2), 'utf8');
};

// API routes
// Get all orders
app.get('/api/orders', (req, res) => {
  res.json(getOrders());
});

// Add a new order
app.post('/api/orders', (req, res) => {
  const newOrder = {
    id: Date.now(), // Unique ID for each order
    status: 'Pending',
    ...req.body
  };
  const orders = getOrders();
  orders.push(newOrder);
  saveOrders(orders);
  res.status(201).json(newOrder);
});

// Update order status
app.put('/api/orders/:id', (req, res) => {
  const orderId = parseInt(req.params.id);
  const newStatus = req.body.status;
  let orders = getOrders();
  const orderIndex = orders.findIndex(order => order.id === orderId);

  if (orderIndex !== -1) {
    orders[orderIndex].status = newStatus;
    saveOrders(orders);
    res.json(orders[orderIndex]);
  } else {
    res.status(404).send('Order not found.');
  }
});

// Delete an order
app.delete('/api/orders/:id', (req, res) => {
  const orderId = parseInt(req.params.id);
  let orders = getOrders();
  const initialLength = orders.length;
  orders = orders.filter(order => order.id !== orderId);

  if (orders.length < initialLength) {
    saveOrders(orders);
    res.status(204).send(); // No Content
  } else {
    res.status(404).send('Order not found.');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});