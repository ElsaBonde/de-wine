import { db } from "@/prisma/db";
import { RegisterSchema, UserCreate } from "../ui/RegisterForm";

export async function savePost(incomingData: UserCreate) {
  const postData = RegisterSchema.parse(incomingData);

  const user = await db.user.create({
    data: {
      fullName: postData.fullName,
      userName: postData.email,
      phone: parseInt(postData.phone),
      password: postData.password,
      isAdmin: false,
      orders: {
        // Lägg till beställningsdata
        create: [],
      },
    },
  });
  console.log(user);
  //   revalidatePath("/"); /* Refreshar sidan/ bygger om den sidan du står på. */
}
