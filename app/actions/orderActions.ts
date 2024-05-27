"use server"

import { revalidatePath } from "next/cache";
import { db } from "@/prisma/db";

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

    export async function orderNumber () {
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