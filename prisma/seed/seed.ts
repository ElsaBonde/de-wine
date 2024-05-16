import { db } from "../db";
import { mockOrders } from "./orders";
import { mockProductsAndCategories } from "./products";
import { mockUsers } from "./users";

async function main() {
  await mockProductsAndCategories();
  await mockUsers();
  await mockOrders();
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
