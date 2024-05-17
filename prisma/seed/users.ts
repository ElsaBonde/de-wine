import { db } from "../db";

export async function mockUsers() {
  await db.user.upsert({
    where: { id: "clwad7xzi000108k0fosm1qs3" },
    update: {},
    create: {
      id: "clwad7xzi000108k0fosm1qs3",
      fullName: "User",
      userName: "abc",
      phone: 293,
      password: "user",
      isAdmin: false,
    },
  });

  await db.user.upsert({
    where: { id: "clwad8lqc000208k0edr1419p" },
    update: {},
    create: {
      id: "clwad8lqc000208k0edr1419p",
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
