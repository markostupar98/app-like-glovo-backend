const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.fetchRestaurants = async () => {
  return await prisma.restaurants.findMany({
    include: {
      category: true,
    },
  });
};

// Details without coords
// services/restaurantService.js

exports.getRestaurantDetailsBasic = async (restaurantId) => {
  return await prisma.restaurants.findUnique({
    where: { id: parseInt(restaurantId) },
    include: {
      category: true,
      dishes: true,
    },
  });
};

exports.fetchRestaurantDetailsComplete = async (restaurantId) => {
  return await prisma.restaurants.findUnique({
    where: { id: parseInt(restaurantId) },
    include: {
      category: true,
      dishes: true,
      latitude: true,
      longitude: true,
      address: true,
    },
  });
};
