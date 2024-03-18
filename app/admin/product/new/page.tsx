"use client";

import { useAdminContext } from "@/app/ui/AdminContext";
import ProductForm from "@/app/ui/ProductForm";
import { Product } from "@/data";

export default function AddProduct() {
  const { addProduct } = useAdminContext();

  const handleSave = (product: Product) => {
    addProduct(product);
  };
  return (
    <>
      <ProductForm onSave={handleSave} />
    </>
  );
}
