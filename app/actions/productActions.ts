"use server";

import { db } from "@/prisma/db";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getCategoryIds } from "./categoryActions";

export type Product = Prisma.ProductGetPayload<{
  include: { categories: true };
}>

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

//ser ni detta?!?!?!  allt är efte, min jävla teams har typ hängt sig. lunch???? :')  
// LUNCH???? aaa kör på det!   den här kuken är kukad ändå
//hahaha jaaa asså hjälp mig, jag är så trött på att sitta och kolla på detta. 
//tror vi får stänga allt
//yes jag gör de kickar ut er nu

export async function createProduct(incomingData: ProductCreate) {
  const { categories, ...productData } = incomingData;
  //hämata kategorier från databasen baserat på dess id
  const categoryIds = await getCategoryIds(categories);
  
  //ansluter kategorins id till produkten
  const product = await db.product.create({
    data: {
      price: productData.price,
      inventory: productData.inventory,
      title: productData.title,
      description: productData.description,
      image: productData.image,
      categories: {
        connect: categoryIds.map((categoryId) => ({
          id: categoryId,
        })),
      },
    },
  });
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