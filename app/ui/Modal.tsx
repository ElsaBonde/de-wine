"use client";
import { Modal } from "@mui/material";
import { PropsWithChildren } from "react";

export default function EditProductModal(props: PropsWithChildren) {
  const handleClose = () => {};

  return (
    <Modal
      open
      onClose={handleClose}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <>{props.children}</>
    </Modal>
  );
}
