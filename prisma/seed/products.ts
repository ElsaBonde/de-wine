import { db } from "../db";

export async function mockProductsAndCategories() {
  const wine = await db.product.upsert({
    where: { id: "clw7ucvey00000cjnfcml6bd4" },
    update: {},
    create: {
      id: "clw7ucvey00000cjnfcml6bd4",
      title: "Red",
      description: "abc",
      price: 293,
      image: "url",
      inventory: 1,
    },
  });

  await db.category.upsert({
    where: { title: "White" },
    update: {},
    create: {
      title: "White",
      products: {
        connect: {
          id: wine.id,
        },
      },
    },
  });

  await db.category.upsert({
    where: { title: "Red" },
    update: {},
    create: {
      title: "Red",
      products: {
        create: [
          {
            title: "Red Shirt",
            description: "abc",
            price: 293,
            image: "url",
            inventory: 1,
          },
        ],
      },
    },
  });
}
