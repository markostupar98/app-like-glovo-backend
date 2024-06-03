const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { Expo } = require('expo-server-sdk');

let expo = new Expo();

// Sending notification
const sendNotification = async (tokens, message) => {
  let notifications = [];
  for (let token of tokens) {
    if (Expo.isExpoPushToken(token)) {
      notifications.push({
        to: token,
        sound: 'default',
        body: message,
        data: { message },
      });
    }
  }

  let chunks = expo.chunkPushNotifications(notifications);
  let tickets = [];
  (async () => {
    for (let chunk of chunks) {
      try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        tickets.push(...ticketChunk);
      } catch (error) {
        console.error(error);
      }
    }
  })();
};

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

// Notifications
const drivers = await prisma.driver.findMany({
  select: {
    notificationToken: true,
  },
});
const tokens = drivers.map(driver => driver.notificationToken).filter(token => token);

// Send notification to drivers
await sendNotification(tokens, 'New order available');
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

    // Fetch user's notification token
    const user = await prisma.user.findUnique({
      where: { id: updatedOrder.userId },
      select: { notificationToken: true },
    });

    // Send notification to user
    if (user.notificationToken) {
      await sendNotification([user.notificationToken], 'Your order has been picked up by a driver');
    }

    return updatedOrder;
  } catch (error) {
    console.error(error);
    throw error;
  }
};