"use server";

import { db } from "@/prisma/db";

export async function getUsers() {
  const users = await db.user.findMany({ orderBy: { id: "desc" } });
  return users;
}

export async function deleteUser(userId: string) {
  const user = await db.user.delete({ where: { id: userId } });
  return user;
}
