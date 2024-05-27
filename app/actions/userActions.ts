"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/prisma/db";

export type User = {
  id: string;
  name: string;
  userName: string;
  email: string;
  phone: string;
  isAdmin: boolean;
};

export async function getUsers() {
  const users = await db.user.findMany({ orderBy: { id: "desc" } });
  console.log(users);
  return users;
}

export async function deleteUser(userId: string) {
  try {
    //hämta orders kopplade till användare
    const userOrders = await db.order.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: true,
      },
    });

    const orderIds = userOrders.map((order) => order.id);

    //hitta alla produkter kopplade till orders och radera dem
    await db.productOrder.deleteMany({
      where: {
        orderId: {
          in: orderIds,
        },
      },
    });

    //radera orders
    await db.order.deleteMany({
      where: {
        userId: userId,
      },
    });

    //ta bort användaren
    const user = await db.user.delete({
      where: {
        id: userId,
      },
    });

    revalidatePath("/admin");

    return user;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
}

export async function updateUser(user: User, isAdmin: boolean) {
  try {
    const updatedUser = await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        isAdmin: isAdmin,
      },
    });

    revalidatePath("/admin");

    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}
