"use client";

import { useAdminContext } from "@/app/ui/AdminContext";
import ProductForm from "@/app/ui/ProductForm";
import { Product } from "@/data";
import { Box, Modal } from "@mui/material";

type PageProps = { params: { slug: string } };

export default function EditProduct({ params }: PageProps) {
  const productId = params.slug;

  const { products, editProduct } = useAdminContext();

  const product = products.find((p) => p.id === productId);

  const handleSave = (updatedProduct: Partial<Product>) => {
    editProduct(productId, updatedProduct);
  };

  const handleClose = () => {};

  return (
    <Modal
      open
      onClose={handleClose}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Box
        component="main"
        sx={{
          padding: "25px",
          bgcolor: "background.paper",
          width: "100%",
          maxWidth: "500px",
          margin: "15px",
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
        }}
      >
        {product && <ProductForm product={product} onSave={handleSave} />}
      </Box>
    </Modal>
  );
}
