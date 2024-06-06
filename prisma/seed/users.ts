import { PrismaClient } from "@prisma/client";

export async function mockUsers(db: PrismaClient) {
  await db.user.upsert({
    where: { id: "clwad7xzi000108k0fosm1qs3" },
    update: {},
    create: {
      id: "clwad7xzi000108k0fosm1qs3",
      name: "Steve Winedrinker",
      userName: "SuperWine",
      email: "steve_winedrinker@gmail.com",
      isAdmin: false,
    },
  });

  await db.user.upsert({
    where: { id: "clwad8lqc000208k0edr1419p" },
    update: {},
    create: {
      id: "clwad8lqc000208k0edr1419p",
      name: "Adam Smith",
      userName: "dewineAdmin",
      email: "dewineadmin@hotmail.com",
      isAdmin: true,
    },
  });
}
