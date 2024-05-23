"use server";

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
  const user = await db.user.delete({ where: { id: userId } });
  return user;
}
