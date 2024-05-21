import { PrismaClient } from "@prisma/client";
import { mockOrders } from "./orders";
import { mockProductsAndCategories } from "./products";
import { mockUsers } from "./users";

const db = new PrismaClient();

async function main() {
  await mockProductsAndCategories(db);
  await mockUsers(db);
  await mockOrders(db);
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
