// import { PrismaClient } from '@prisma/client';

// // Function to create a new PrismaClient instance
// const PrismaClientSingleton = () => new PrismaClient();

// declare global {
//   var prisma: PrismaClient | undefined;
// }

// // Create a singleton Prisma Client instance
// const db = globalThis.prisma ?? PrismaClientSingleton();

// // Store the instance globally in development mode to avoid multiple instances
// if (process.env.NODE_ENV !== 'production') {
//   globalThis.prisma = db;
// }

// export default db;
import { PrismaClient } from '@prisma/client';

// Avoid multiple instances of PrismaClient in development
declare global {
  // Ensure that 'prisma' is only available in a Node.js global context
  var prisma: PrismaClient | undefined;
}

const db = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = db; // In development, store Prisma client in globalThis
}

export default db;
