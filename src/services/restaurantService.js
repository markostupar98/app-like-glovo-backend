const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.fetchRestaurants = async () => {
  return await prisma.restaurants.findMany({
    include: {
      category: true
    }
  });
};