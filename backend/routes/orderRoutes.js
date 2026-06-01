

const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/', verifyToken, orderController.createOrder);


// GET /api/orders
router.get('/', verifyToken, orderController.getUserOrders);


// GET /api/orders/:id
router.get('/:id', verifyToken, orderController.getOrderById);

// PUT /api/orders/:id
router.put('/:id', verifyToken, orderController.updateOrderStatus);

module.exports = router;
