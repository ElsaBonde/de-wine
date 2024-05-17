"use server";

import { db } from "@/prisma/db";

export async function getProductById(slug: string) {
  const product = await db.product.findUnique({ where: { id: slug } });
  return product;
}

export async function getProducts() {
  const products = await db.product.findMany({
    include: { categories: true },
    orderBy: { id: "desc" },
  });
  return products;
}