"use server";

import { db } from "@/prisma/db";
import { UserCreate } from "../ui/RegisterForm";

export async function registerUser(userData: UserCreate) {
  // const userData = RegisterSchema.parse(incomingData);

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
