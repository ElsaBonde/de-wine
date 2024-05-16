import { db } from "@/prisma/db";

export async function getProductById(slug: string) {
  const product = await db.product.findUnique({ where: { id: slug } });
  return product;
}
