const express = require('express');
const router = express.Router();
const products = require('../data/products');
const validateProduct = require('../middleware/validateProduct');

// GET all products
router.get('/', (req, res) => {
    res.json(products);
});

// GET one product by ID
router.get('/:id', (req,res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) {
        return res.status(404).send('Product not found');
    }
    res.json(product);
});

