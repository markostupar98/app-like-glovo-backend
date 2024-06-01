const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

// Generate jwt
exports.generateToken = (user) => {
  return jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET, // Tajni ključ za potpis tokena
    { expiresIn: '1h' } // Token ističe za 1 sat
  );
};

exports.createUser = async ({ email, password, fullName, username, address }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      fullName,
      username,
      role:'user',
      address,
      latitude:null,
      longitude:null
    },
  });
};

exports.validateUser = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) return null;

  const isMatch = await bcrypt.compare(password, user.password);
  return isMatch ? user : null;
};
