"use server";

import { db } from "@/prisma/db";
import { ProductCreate } from "../ui/AdminContext";

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

export async function createProduct(productData: ProductCreate) {
  const product = await db.product.create({
    data: {
      price: productData.price,
      inventory: productData.inventory,
      title: productData.title,
      description: productData.description,
      image: productData.image,
      /* categories: {
        connect: productData.categories.map((category: any) => ({
          id: category,
        })),
      }, */
    },
  });
  console.log(product);
  //   revalidatePath("/"); /* Refreshar sidan/ bygger om den sidan du står på. */
}

export async function deleteProduct(productId: string) {
  const product = await db.product.delete({ where: { id: productId } });
  return product;
}