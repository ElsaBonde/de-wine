"use client";

import { AddShoppingCart } from "@mui/icons-material";
import { IconButton, Snackbar } from "@mui/material";
import React, { useState } from "react";
import { useCount } from "./AddContext";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  add: number;
}

export default function AddButton(props: Props) {
  const { count, setCount } = useCount();
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const handleClick = () => {
    const newCount = count + props.add;
    setCount(newCount);
    localStorage.setItem("cart-items-count-badge", newCount.toString());
    setOpenSnackBar(true);
  };

  const handleCloseSnackBar = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };

  return (
    <>
      <AddShoppingCart
        sx={{ "&:hover": { backgroundColor: "green" } }}
        data-cy="product-buy-button"
        onClick={handleClick}
      />
      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={handleCloseSnackBar}
        message="Added to cart!"
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleCloseSnackBar}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </>
  );
}
