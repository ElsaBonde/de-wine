"use client";

import { Modal } from "@mui/material";
import { PropsWithChildren } from "react";
import { useState } from "react";

export default function EditProductModal(props: PropsWithChildren) {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal
    open={open}
      onClose={handleClose}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <>{props.children}</>
    </Modal>
  );
}
