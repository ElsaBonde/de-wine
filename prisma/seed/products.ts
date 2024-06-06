import { PrismaClient } from "@prisma/client";

export async function mockProductsAndCategories(db: PrismaClient) {
  const wine = await db.product.upsert({
    where: { id: "clw7ucvey00000cjnfcml6bd4" },
    update: {},
    create: {
      id: "clw7ucvey00000cjnfcml6bd4",
      title: "Bohemian Bliss",
      description:
        "Embark on a journey of Bohemian Bliss with our artistic wine trio, all from the same renowned brand. This collection features two whimsically labeled white wines, each exuding a free-spirited charm and vibrant personality. Embrace the eclectic fusion of flavors and aromas as you sip on these enchanting whites. Completing this bohemian ensemble is a rich and soulful red wine, wrapped in an equally captivating label that speaks to the heart of the bohemian ethos. Whether you're dancing under the stars or lounging in a cozy corner, our Bohemian Bliss trio promises a sensory adventure like no other. Embrace the unconventional and elevate your wine experience with this enchanting trio today.",
      price: 100,
      image: "https://i.ibb.co/YhNtWhp/ttreo3.png",
      inventory: 50,
      categories: {
        create: [
          {
            title: "Red",
            image: "https://i.ibb.co/JB28kZP/bild-4.png",
          },
          {
            title: "White",
            image: "https://i.ibb.co/VNNFHZ6/bild-5.png",
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
      image: "https://i.ibb.co/VNNFHZ6/bild-5.png",
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
      title: "Citrus Delight",
      description:
        "Indulge in a delightful wine experience with our Citrus Delight package. This exclusive selection features three exquisite white wines, each carefully chosen to tantalize your taste buds. Highlighting this collection is a refreshing lemon-infused wine that adds a zesty twist to your sipping pleasure. Whether you're hosting a gathering or simply unwinding after a long day, our Citrus Delight package promises a journey of flavor and sophistication. Elevate your wine moments with this refreshing trio today.",
      price: 79,
      image:
        "https://i.ibb.co/M9SgHYC/elinw-Craft-an-inviting-visual-for-the-White-Symphony-Boxed-W-4cc86366-c2ba-48a1-967e-b126e91f4737-1.png",
      inventory: 50,
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
      image: "https://i.ibb.co/JB28kZP/bild-4.png",
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
      image: "https://i.ibb.co/BGkP3wg/bild-6.png",
      products: {
        create: [
          {
            title: "Sparkling gold",
            description:
              "Welcome to Bubble Bliss, where every moment transforms into a magical celebration! Immerse yourself in a sea of shimmering bubbles, dazzling light displays, and an atmosphere filled with joy and laughter. Perfect for all occasions - from children's parties and weddings to corporate events and private gatherings. Let Bubble Bliss turn your event into an unforgettable adventure with our innovative bubble machines, professional performers, and customized decor. Create memories that last forever with Bubble Bliss!",
            price: 69,
            image: "https://i.ibb.co/gDxM498/Microsoft-Teams-image.png",
            inventory: 40,
          },
          {
            title: "Effervescent Elegance",
            description:
              "Savor the sophistication of our exclusive trio of sparkling wines. Crafted from the finest grapes, each bottle offers a symphony of delicate bubbles and exquisite flavors. Perfect for celebrating life's special moments, elevate your gatherings with this luxurious trio of bubblies.",
            price: 119,
            image:
              "https://i.ibb.co/gmvGNDg/elinw-Create-an-enchanting-visual-for-Luminous-Bubbles-Sparklin-c892c7e4-97d1-4d20-854d-0b71bae8e172.png",
            inventory: 50,
          },
        ],
      },
    },
  });
}
