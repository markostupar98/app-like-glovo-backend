const restaurantService = require('../services/restaurantService');

exports.getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await restaurantService.fetchRestaurants();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRestaurantDetails = async (req, res) => {
  try {
    const restaurant = await restaurantService.fetchRestaurantDetails(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
