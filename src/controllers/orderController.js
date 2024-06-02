const orderService = require('../services/orderService');

exports.createOrder = async (req, res) => {
  const { userId, restaurantId, deliveryAddress, cartItems, total } = req.body;

  try {
    const order = await orderService.createOrder(userId, restaurantId, deliveryAddress, cartItems, total);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
