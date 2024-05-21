import { PrismaClient } from "@prisma/client";

export async function mockProductsAndCategories(db: PrismaClient) {
  const wine = await db.product.upsert({
    where: { id: "clw7ucvey00000cjnfcml6bd4" },
    update: {},
    create: {
      id: "clw7ucvey00000cjnfcml6bd4",
      title: "The best wine",
      description: "abc",
      price: 293,
      image: "https://i.ibb.co/Z8mGht4/redWine.jpg",
      inventory: 1,
      categories: {
        create: [
          {
            title: "Red",
          },
          {
            title: "White",
          },
        ],
      },
    },
  });

  const white = await db.category.upsert({
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

  await db.product.upsert({
    where: { id: "clw7ucvey00000cjnfcml6bd5" },
    update: {},
    create: {
      id: "clw7ucvey00000cjnfcml6bd5",
      title: "The second best wine",
      description: "funka",
      price: 288,
      image: "https://i.ibb.co/LRpW3QX/redWine2.jpg",
      inventory: 5,
      categories: {
        connect: {
          id: white.id,
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
            title: "Red Winecoolers",
            description: "abc",
            price: 293,
            image: "https://i.ibb.co/18JL0PW/wine.jpg",
            inventory: 1,
          },
          {
            title: "Red Stallion",
            description: "def",
            price: 288,
            image: "https://i.ibb.co/26KrQHp/wine2.jpg",
            inventory: 5,
          },
          {
            title: "Red strawberry",
            description: "ghi",
            price: 99,
            image: "https://i.ibb.co/k5tL4J9/wine3.jpg",
            inventory: 10,
          },
        ],
      },
    },
  });

  await db.category.upsert({
    where: { title: "Sparkling" },
    update: {},
    create: {
      title: "Sparkling",
      products: {
        create: [
          {
            title: "Popping Champagne",
            description: "jkl",
            price: 83763,
            image: "https://i.ibb.co/rM4bJJy/wine4.jpg",
            inventory: 9,
          },
          {
            title: "Super Champis",
            description: "mno",
            price: 10000,
            image: "https://i.ibb.co/rM4bJJy/wine4.jpg",
            inventory: 1,
          },
        ],
      },
    },
  });
}
