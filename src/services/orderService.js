const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create order
exports.createOrder = async (
  userId,
  restaurantId,
  deliveryAddress,
  cartItems,
  total
) => {
  try {
    const order = await prisma.order.create({
      data: {
        userId,
        restaurantId,
        deliveryAddress,
        total,
        status: "pending",
        driverId: null,
        orderItems: {
          create: cartItems.map((item) => ({
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
      driver: {
        select: {
          fullName: true,
          phone: true,
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

// Assign driver to order
// exports.assignDriverToOrder = async (orderId, driverId) => {
//   return await prisma.order.update({
//     where: { id: parseInt(orderId) },
//     data: { driverId: parseInt(driverId) },
//   });
// };

exports.assignDriverToOrder = async (orderId, driverId) => {
  try {
    const updatedOrder = await prisma.order.update({
      where: { id: parseInt(orderId) },
      data: { driverId: parseInt(driverId) },
    });

    return updatedOrder;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
