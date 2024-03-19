"use client";

import { useAdminContext } from "@/app/ui/AdminContext";
import ProductForm from "@/app/ui/ProductForm";
import { Product, getProductById } from "@/data";
import { Box } from "@mui/material";

type PageProps = { params: { slug: string } };

export default function EditProduct({ params }: PageProps) {
  const productId = params.slug;
  console.log("PRODUKT ID HELVETE:", productId);
  const product = getProductById(productId);
  console.log("PRODUKTJÄVELN:", product);
  const { editProduct } = useAdminContext();

  const handleSave = (updatedProduct: Partial<Product>) => {
    editProduct(productId, updatedProduct);
  };

  return (
    <Box component="main" sx={{ padding: "10px" }}>
      <ProductForm product={product} onSave={handleSave} />
    </Box>
  );
}
