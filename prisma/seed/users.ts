import { PrismaClient } from "@prisma/client";

export async function mockUsers(db: PrismaClient) {
  await db.user.upsert({
    where: { id: "clwad7xzi000108k0fosm1qs3" },
    update: {},
    create: {
      id: "clwad7xzi000108k0fosm1qs3",
      name: "User",
      userName: "abc",
      email: "skoj@gmail.com",
      isAdmin: false,
    },
  });

  await db.user.upsert({
    where: { id: "clwad8lqc000208k0edr1419p" },
    update: {},
    create: {
      id: "clwad8lqc000208k0edr1419p",
      name: "Admin",
      userName: "kul",
      email: "iamcool@hotmail.com",
      isAdmin: true,
    },
  });
}
