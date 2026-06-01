// 📦 RURAT E PRODUKTEVE

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { verifyToken } = require('../middleware/authMiddleware');

// 📖 SHFAQ Te GJITHe PRODUKTET
// GET /api/products
router.get('/', productController.getAllProducts);

// 🔍 SHFAQ NJe PRODUKT
// GET /api/products/:id
router.get('/:id', productController.getProductById);

// POST /api/products
router.post('/', verifyToken, productController.createProduct);


// PUT /api/products/:id
router.put('/:id', verifyToken, productController.updateProduct);


// DELETE /api/products/:id
router.delete('/:id', verifyToken, productController.deleteProduct);

module.exports = router;
