import { db } from "../db";

export async function mockUsers() {
    await db.user.upsert({
        where: { id: "user123" },
        update: {},
        create: {
          id: "user123",
          fullName: "User",
          userName: "abc",
          phone: 293,
          password: "user",
          isAdmin: false,
        },
      });

      await db.user.upsert({
        where: { id: "admin123" },
        update: {},
        create: {
          id: "admin123",
          fullName: "Admin",
          userName: "kul",
          phone: 293,
          password: "admin",
          isAdmin: true,
        },
      });

}

   



/* model User {
    id       String  @id @default(cuid())
    fullName String
    userName String  @unique //ska vara email i validering
    phone    Int
    password String
    isAdmin  Boolean
    orders   Order[] */
  