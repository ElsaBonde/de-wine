import { db } from "../db";

export async function mockOrders() {

  await db.order.upsert({
    where: { id: "order123" },
    update: {},
    create: {
      id: "order123",
      user: {
        connect: {
          id: "user123",
        },
      },
      street: "street",
      city: "city",
      zip: "12345",
    
      orderDate: new Date(),
      
      products: {
        create: {
          product: {
            connect: {
              id: "clw7ucvey00000cjnfcml6bd4",
            },
          },
          quantity: 1,
        },
    }, // DAVID isShipped varför får den inte ligga här? 
},
  });
}

/* model Order {
    id        String         @id @default(cuid())
    user      User           @relation(fields: [userId], references: [id])
    userId    String
    street    String
    city      String
    zip       String
    orderDate DateTime
    products  ProductOrder[]
    isShipped Boolean        @default(false)
  } */
