// const { PrismaClient } = require('@/app/generated/prisma');
// const { withAccelerate } = require('@prisma/extension-accelerate');

const { withAccelerate } = require("@prisma/extension-accelerate");
const { PrismaClient } = require("../generated/prisma");

const globalForPrisma = global;

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient().$extends(withAccelerate());

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

module.exports = prisma;
 
 