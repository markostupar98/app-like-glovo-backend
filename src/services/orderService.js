const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createOrder = async (userId, restaurantId, deliveryAddress, cartItems, total) => {
  try {
    const order = await prisma.order.create({
      data: {
        userId,
        restaurantId,
        deliveryAddress,
        total,
        status: 'pending',
        driverId: null, // driverId is null at the time of creation
        orderItems: {
          create: cartItems.map(item => ({
            dishId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });
    return order;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};
    