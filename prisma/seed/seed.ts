import { db } from "../db";
import { mockProductsAndCategories } from "./products";

async function main() {
 await mockProductsAndCategories();
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
