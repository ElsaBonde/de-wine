"use server";

import { db } from "@/prisma/db";
import { UserCreate } from "../validation/register";

export async function registerUser(userData: UserCreate) {
  const user = await db.user.create({
    data: {
      fullName: userData.fullName,
      userName: userData.email,
      phone: userData.phone,
      password: userData.password,
      isAdmin: false,
    },
  });
  console.log(user);
  //   revalidatePath("/"); /* Refreshar sidan/ bygger om den sidan du står på. */
}

export async function getUsers() {
  const users = await db.user.findMany({ orderBy: { id: "desc" } });
  return users;
}
