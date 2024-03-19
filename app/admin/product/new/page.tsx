"use client";

import { useAdminContext } from "@/app/ui/AdminContext";
import ProductForm from "@/app/ui/ProductForm";
import { Product } from "@/data";
import { Box } from "@mui/material";

export default function AddProduct() {
  const { addProduct } = useAdminContext();

  const handleSave = (product: Product) => {
    addProduct(product);
  };
  return (
    <Box component="main" sx={{ padding: "10px" }}>
      <ProductForm onSave={handleSave} />
    </Box>
  );
}
