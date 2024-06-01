const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.fetchUserProfile = async (userId) => {
  return await prisma.user.findUnique({
    where: { id: parseInt(userId) },
    select: {
      id: true,
      fullName: true,
      address: true,
      latitude: true,
      longitude: true
    }
  });
}