import { db } from "../db";

export async function mockProductsAndCategories() {
  const wine = await db.product.upsert({
    where: { id: "clw7ucvey00000cjnfcml6bd4" },
    update: {},
    create: {
      id: "clw7ucvey00000cjnfcml6bd4",
      title: "The best wine",
      description: "abc",
      price: 293,
      image: "url",
      inventory: 1,
      categories: { // DAVID är detta korrekt för att lägga till i flera kategorier? 
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

 
  await db.product.upsert({
    where: { id: "clw7ucvey00000cjnfcml6bd5" },
    update: {},
    create: {
      id: "clw7ucvey00000cjnfcml6bd5",
      title: "The second best wine",
      description: "funka",
      price: 288,
      image: "url",
      inventory: 5,
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
            title: "Red Winecoolers",
            description: "abc",
            price: 293,
            image: "url",
            inventory: 1,
          },
          {
            title: "Red Stallion",
            description: "def",
            price: 288,
            image: "url",
            inventory: 5,
          },
          {
            title: "Red strawberry",
            description: "ghi",
            price: 99,
            image: "url",
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
            image: "url",
            inventory: 9,
          },
          {
            title: "Super Champis",
            description: "mno",
            price: 10000,
            image: "url",
            inventory: 1,
          },
        ],
      },
    },
  });
}
