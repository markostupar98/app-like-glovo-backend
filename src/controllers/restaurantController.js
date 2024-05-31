const restaurantService = require('../services/restaurantService');

exports.getRestaurants = async (req, res) => {
  try {
    const restaurants = await restaurantService.fetchRestaurants();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching restaurants', error: error.message });
  }
};