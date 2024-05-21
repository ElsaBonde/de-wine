import { PrismaClient } from "@prisma/client";

export async function mockUsers(db: PrismaClient) {
  await db.user.upsert({
    where: { id: "clwad7xzi000108k0fosm1qs3" },
    update: {},
    create: {
      id: "clwad7xzi000108k0fosm1qs3",
      fullName: "User",
      userName: "abc",
      phone: "293",
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
      phone: "293",
      password: "admin",
      isAdmin: true,
    },
  });
}
