// server.js - Starter Express server for Week 2 assignment

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(bodyParser.json());

// Sample in-memory products database
let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false
  }
];

// Root route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// TODO: Implement the following routes:
// GET /api/products - Get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});
// GET /api/products/:id - Get a specific product
app.get('/api/products/:id', (req, res) => {
  const productId = req.params.id;
  const product = products.find(p => p.id == productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).send('Product not found');
  }
});
// POST /api/products - Create a new product
app.post('/api/products', (req, res) => {
  const newProduct = {
    id: uuidv4(), // Generate a unique ID for the new product
    ...req.body // Spread the request body into the new product object
  };
  products.push(newProduct); // Add the new product to the in-memory database
  res.status(201).json(newProduct); // Respond with the created product
});


// PUT /api/products/:id - Update a product
app.put('/api/products/:id', (req, res) => {
  const productId = req.params.id;
  const productIndex = products.findIndex(p => p.id === productId);
  if (productIndex !== -1) {
    const updatedProduct = {
      ...products[productIndex],
      ...req.body // Update the product with the request body
    };
    products[productIndex] = updatedProduct; // Replace the old product with the updated one
    res.json(updatedProduct); // Respond with the updated product
  } else {
    res.status(404).send('Product not found');
  }
});
// DELETE /api/products/:id - Delete a product
app.delete('/api/products/:id', (req, res) => {
  const productId = req.params.id;
});
// Example route implementation for GET /api/products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// TODO: Implement custom middleware for:
// - Request logging
app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next(); // Call the next middleware in the stack
});
// - Authentication
app.use((req, res, next) => {
  const auth =req.headers.authorization;

  if (auth === 'Bearer mysecrettoken'){
    next();
  }else {
    res.status(401).json({ message:'Unauthorized'});
  }
  });
// - Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({message:'Something went wrong!'});
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export the app for testing purposes
module.exports = app; 