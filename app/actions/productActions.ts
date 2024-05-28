"use server";

import { db } from "@/prisma/db";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getCategoryIds } from "./categoryActions";
import { auth } from "@/auth";

export type Product = Prisma.ProductGetPayload<{
  include: { categories: true };
}>;

export type ProductCreate = Prisma.ProductCreateInput & {
  categories: string[];
};

export type CartItem = Product & {
  quantity: number;
  subTotal: number;
};

export async function getProductById(slug: string) {
  const product = await db.product.findUnique({
    where: { id: slug },
    include: { categories: true },
  });

  if (product) {
    const categories = product.categories.map((category) => category.title);
    const categoryIds = await getCategoryIds(categories);

    const defaultValues: ProductCreate = {
      ...product,
      categories: categories,
      categoryIds: categoryIds,
    };

    console.log("getproductbyid log", defaultValues);

    return defaultValues;
  }

  return null;
}

export async function getProducts() {
  const products = await db.product.findMany({
    include: { categories: true },
    orderBy: { id: "desc" },
  });
  return products;
}

export async function createProduct(incomingData: ProductCreate) {
  const session = await auth();
 
  if (!session || !session.user.isAdmin) {
    return null;
  }
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

//change to isArchived = true men ta inte bort från databasen
export async function archiveProduct(productId: string) {
  const session = await auth();
  if (!session || !session.user.isAdmin) {
    return null;
  }

  await db.product.update({
    where: { id: productId },
    data: {
      isArchived: true,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function updateProduct(
  productId: string,
  productData: ProductCreate
) {
  const session = await auth();
 
  if (!session || !session.user.isAdmin) {
    return null;
  }
  const { categories, ...restData } = productData;

  const categoryIds = await getCategoryIds(categories);

  const product = await db.product.update({
    where: { id: productId },
    data: {
      ...restData,
    },
  });

  await updateProductCategories(productId, categoryIds);

  revalidatePath("/");
  revalidatePath("/admin");

  return product;
}

//uppdaterar kategorier för en produkt, anropas i updateProduct
export async function updateProductCategories(
  productId: string,
  categoryIds: string[]
) {
  await db.product.update({
    where: { id: productId },
    data: {
      categories: {
        set: categoryIds.map((categoryId) => ({ id: categoryId })),
      },
    },
  });
}

export async function userNumber() {
  const userCount = await db.user.count();
  return userCount;
}
