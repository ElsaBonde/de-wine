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
      image:
        "https://d3p3oepuk3k14u.cloudfront.net/img/article/w34005-mundo-de-yuntero-espumoso-bio-20240515064804_lg.webp",
      inventory: 1,
      categories: {
        // DAVID är detta korrekt för att lägga till i flera kategorier?
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
      image:
        "https://d3p3oepuk3k14u.cloudfront.net/img/article/w33368-bosco-dei-cirmioli-sparkling-blanc-de-blancs-extra-dry-20231101125737_lg.webp",
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
            image:
              "https://d3p3oepuk3k14u.cloudfront.net/img/article/w31048-dufouleur-monopole-blanc-20230308122238_lg.webp",
            inventory: 1,
          },
          {
            title: "Red Stallion",
            description: "def",
            price: 288,
            image:
              "https://d3p3oepuk3k14u.cloudfront.net/img/article/w32380-dufouleur-monopole-rose-2022-20230308120950_lg.webp",
            inventory: 5,
          },
          {
            title: "Red strawberry",
            description: "ghi",
            price: 99,
            image:
              "https://d3p3oepuk3k14u.cloudfront.net/img/article/w32727-dominio-de-requena-cava-brut-20230608081856_lg.webp",
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
            image:
              "https://d3p3oepuk3k14u.cloudfront.net/img/article/w25430-biasiotto-sui-lieviti-zero-15-spumante-extra-brut--20240326111057_lg.webp",
            inventory: 9,
          },
          {
            title: "Super Champis",
            description: "mno",
            price: 10000,
            image:
              "https://d3p3oepuk3k14u.cloudfront.net/img/article/w25430-biasiotto-sui-lieviti-zero-15-spumante-extra-brut--20240326111057_lg.webp",
            inventory: 1,
          },
        ],
      },
    },
  });
}
