const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Create order
router.post('/', orderController.createOrder);
// Get details
router.get('/:orderId', orderController.getOrderDetails);
// Get orders
router.get('/', orderController.getOrders);


module.exports = router;
