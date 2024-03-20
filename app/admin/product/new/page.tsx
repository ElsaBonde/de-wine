"use client";

import { useAdminContext } from "@/app/ui/AdminContext";
import ProductForm from "@/app/ui/ProductForm";
import { Product } from "@/data";
import { Box, Modal } from "@mui/material";

export default function AddProduct() {
  const { addProduct } = useAdminContext();

  const handleSave = (product: Product) => {
    addProduct(product);
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
