"use server";

import { auth } from "@/auth";
import { db } from "@/prisma/db";
import { revalidatePath } from "next/cache";
import { CartItem } from "./productActions";

export type Order = {
  id: string;
  userId: string;
  street: string;
  city: string;
  zip: string;
  orderDate: string;
  isShipped: boolean;
  total: number;
};

export async function getOrders() {
  const orders = await db.order.findMany({ orderBy: { orderDate: "desc" } });
  revalidatePath("/admin");
  return orders;
}

export async function orderNumber() {
  const count = await db.order.count();

  revalidatePath("/admin");
  return count;
}

export async function totalAmountAllOrders() {
  const total = await db.order.aggregate({
    _sum: {
      total: true,
    },
  });
  return total._sum.total;
}

export async function createOrder(cart: CartItem[], userData: any) {
  const session = await auth();

  if (!session) {
    return null;
  }

  //här vill vi räkna ut totalen av alla cartitems genom att hämta ut produkterna från db och multiplicera med antalet
  

  const order = await db.order.create({
    data: {
      userId: session.user.id,
      street: userData.street,
      name: userData.name,
      city: userData.city,
      zip: userData.zip,
      phone: userData.phone,
      orderDate: new Date().toISOString(),
      isShipped: false,
      total: 945785,
      products: {
        createMany: {
          data: cart.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            subTotal: 957 * item.quantity,
          })),
        },
      },
    },
  });
  return order;
}
