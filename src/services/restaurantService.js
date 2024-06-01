const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.fetchRestaurants = async () => {
  return await prisma.restaurants.findMany({
    include: {
      category: true
    }
  });
};

// Details

exports.fetchRestaurantDetails = async (restaurantId) => {
  return await prisma.restaurants.findUnique({
    where: { id: parseInt(restaurantId) },
    include: {
      category: true,
      dishes: true
    }
  });
};