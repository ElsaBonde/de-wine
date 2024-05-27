import { PrismaClient } from "@prisma/client";

export async function mockOrders(db: PrismaClient) {
  await db.order.upsert({
    where: { id: "clwad7e9u000008k0819u2lvx" },
    update: {},
    create: {
      id: "clwad7e9u000008k0819u2lvx",
      user: {
        connect: {
          id: "clwad7xzi000108k0fosm1qs3",
        },
      },
      street: "street",
      name: "Siv Grönrot",
      city: "city",
      zip: 12345,
      phone: "+46701234567",
      total: 99.9,
      isShipped: true,
      orderDate: new Date(),

      products: {
        create: {
          product: {
            connect: {
              id: "clw7ucvey00000cjnfcml6bd4",
            },
          },
          quantity: 1,
          subTotal: 99.9,
        },
      },
    },
  });
}