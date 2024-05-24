"use server";
 
import { db } from "@/prisma/db";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
 
export async function getProductsByCategory(categoryId: string) {
  const products = await db.product.findMany({
    where: { categories: { some: { id: categoryId } } },
    include: { categories: true },
  });
  return products;
}
 

 
export async function getCategoryByTitle(title: string) {
  const category = await db.category.findUnique({ where: { title } });
  return category;
}
 
export async function getCategoryIdsByTitles(categories: any[]) {
  const categoryIds = await Promise.all(
    categories.map(async (category) => {
      const existingCategory = await db.category.findUnique({
        where: { title: category.title },
      });
      return existingCategory ? existingCategory.id : null;
    })
  );
  return categoryIds.filter((categoryId) => categoryId !== null);
}
 
 
//hämtar kategorins id från databasen baserat på dess titel och returnerar en array med id:n, används i createProduct
export async function getCategoryIds(categoryTitles: string[]) {
  const categories = await db.category.findMany({
    where: {
      title: {
        in: categoryTitles,
      },
    },
    select: {
      id: true,
    },
  });
  return categories.map((category) => category.id);
}
 
export async function getCategories() {
  const categories = await db.category.findMany();
  return categories;
}