"use server";

import { db } from "@/prisma/db";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export type Product = Prisma.ProductGetPayload<{
  include: { categories: true };
}>;

export type ProductCreate = Prisma.ProductCreateInput & {
  categories: string[];
};

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

export async function createProduct(incomingData: ProductCreate) {
  const { categories, ...productData } = incomingData;
  const product = await db.product.create({
    data: {
      price: productData.price,
      inventory: productData.inventory,
      title: productData.title,
      description: productData.description,
      image: productData.image,
      categories: {
        connect: categories.map((category) => ({
          id: category,
        })),
      },
    },
  });
  console.log(product);
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteProduct(productId: string) {
  const product = await db.product.delete({ where: { id: productId } });
  revalidatePath("/");
  revalidatePath("/admin");
  return product;
}

export async function updateProduct(
  productId: string,
  productData: ProductCreate
) {
  const product = await db.product.update({
    where: { id: productId },
    data: {
      price: productData.price,
      inventory: productData.inventory,
      title: productData.title,
      description: productData.description,
      image: productData.image,
      categories: {
        connect: productData.categories.map((category: any) => ({
          id: category,
        })),
      },
    },
  });
  revalidatePath("/");
  revalidatePath("/admin");
  return product;
}

export async function getCategories() {
  const categories = await db.category.findMany();
  return categories;
}
