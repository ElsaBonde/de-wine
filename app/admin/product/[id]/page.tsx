"use client";

import { useAdminContext } from "@/app/ui/AdminContext";
import ProductForm from "@/app/ui/ProductForm";
import { Product, getProductById } from "@/data";

type PageProps = { params: { slug: string } };

export default function EditProduct({ params }: PageProps) {

  const productId = params.slug;
  const product = getProductById(productId);
  const { editProduct } = useAdminContext();

  if (!product) {
    return (
      <main>
        <h1>Product does not exist...</h1>
      </main>
    );
  }

  const handleSave = (updatedProduct: Partial<Product>) => {
    editProduct(productId, updatedProduct);
  };

  return (
    <>
      <ProductForm product={product} onSave={handleSave} />
    </>
  );
}
