"use client";

import CloseIcon from '@mui/icons-material/Close';
import { ProductCreate, createProduct } from "@/app/actions/productActions";
import ProductForm from "@/app/ui/ProductForm";
import { Box, Modal, IconButton } from "@mui/material";
import { useState } from "react";

export default function AddProduct() {
  const [open, setOpen] = useState(true);

  const handleSave = async (product: ProductCreate) => {
    await createProduct(product);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal
      open={open}
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
        <IconButton sx={{justifyContent: "flex-end", "&:hover": {
          backgroundColor: "transparent",
                  },}}>
          <CloseIcon onClick={handleClose} />
        </IconButton>
        <ProductForm onSave={handleSave} />
      </Box>
    </Modal>
  );
}
