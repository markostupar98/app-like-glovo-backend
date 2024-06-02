const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create order
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

// Fetch order details

exports.fetchOrderDetails = async (orderId) => {
  return await prisma.order.findUnique({
    where: { id: parseInt(orderId) },
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
      user: {
        select: {
          address: true,
        },
      },
    },
  });
};

// Fetch orders
exports.fetchOrders = async () => {
    return await prisma.order.findMany({
      include: {
        restaurant: {
          select: {
            name: true,
            image: true,
          },
        },
        user: {
          select: {
            address: true,
          },
        },
      },
    });
  };