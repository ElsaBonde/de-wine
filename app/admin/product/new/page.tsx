"use client";

import { ProductCreate, createProduct } from "@/app/actions/productActions";
import ProductForm from "@/app/ui/ProductForm";
import { Box, Modal } from "@mui/material";

export default function AddProduct() {
  const handleSave = async (product: ProductCreate) => {
    await createProduct(product);
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
        <ProductForm onSave={handleSave} />
      </Box>
    </Modal>
  );
}
