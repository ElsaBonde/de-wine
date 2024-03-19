"use client";

import { useAdminContext } from "@/app/ui/AdminContext";
import ProductForm from "@/app/ui/ProductForm";
import { Product } from "@/data";
import { Box } from "@mui/material";

type PageProps = { params: { slug: string } };

export default function EditProduct({ params }: PageProps) {
  const productId = params.slug;

  const { products, editProduct } = useAdminContext();

  const product = products.find((p) => p.id === productId);

  const handleSave = (updatedProduct: Partial<Product>) => {
    editProduct(productId, updatedProduct);
  };

  return (
    <Box component="main" sx={{ padding: "10px" }}>
      {product && <ProductForm product={product} onSave={handleSave} />}
    </Box>
  );
}
