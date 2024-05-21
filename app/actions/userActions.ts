"use server";

import { db } from "@/prisma/db";
import { revalidatePath } from "next/cache";

export type User = {
  id: string;
  fullName: string;
  userName: string;
  phone: string;
  isAdmin: boolean;
};

export async function getUsers() {
  const users = await db.user.findMany({ orderBy: { id: "desc" } });
  console.log(users);
  return users;
}

export async function deleteUser(userId: string) {
  const user = await db.user.delete({ where: { id: userId } });
  revalidatePath("/admin");
  return user;
}
