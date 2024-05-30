const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createUser = async (userData) => {
  const { email, fullName, password } = userData;
  // Remember to hash the password before saving
  return await prisma.user.create({
    data: {
      email,
      fullName,
      password,
    },
  });
};
