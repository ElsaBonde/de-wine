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

export async function getOrderById(slug: string) {
const order = await db.order.findUnique({
    where: { id: slug },
    include: { products: { include: { product: true } } },
  });
  return order;
}
/* 
export async function getProductOrderRows() {
  const rows = await db.productOrder.findMany();
  return rows;
} */

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

  const productIds = cart.map((item) => item.id);
  const products = await db.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
  });

  let total = 0;
  const cartWithPrices = cart.map((item) => {
    const product = products.find((product) => product.id === item.id);
    if (product) {
      const subTotal = product.price * item.quantity;
      total += subTotal;
      return {
        ...item,
        price: product.price,
        subTotal,
      };
    }
    return item;
  });

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
      total: total,
      products: {
        createMany: {
          data: cartWithPrices.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            subTotal: item.subTotal,
          })),
        },
      },
    },
  });
  
  //minska lagersaldo för produkterna
  const productOrderRows = await db.productOrder.findMany({
    where: {
      orderId: order.id,
    },
  });

  for (const row of productOrderRows) {
    const product = await db.product.findUnique({
      where: { id: row.productId },
    });

    if (product) {
      await db.product.update({
        where: { id: row.productId },
        data: {
          inventory: product.inventory - row.quantity,
        },
      });
    }
    
  }
 
  return order;
}
