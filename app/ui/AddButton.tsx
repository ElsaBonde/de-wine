"use client";

import { Product } from "@/data";
import { AddShoppingCart } from "@mui/icons-material";
import React from "react";
import { useCart } from "./CartContext";
import { useSnackbar } from "./Snackbar";

interface Props {
  product: Product;
}

export default function AddButton(props: Props) {
  //skapar en variabel som vi kan använda för att uppdatera antalet items i kundkorgen samt en variabel för att visa en snackbar
  const { addToCart } = useCart();
  const { showSnack } = useSnackbar();

  //ökar antalet items i kundkorgen, lägger till dem i LS och visar snackbaren
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    addToCart(props.product);
    showSnack(props.product.title + " has been added to your cart.");
  };

  return (
    <AddShoppingCart
      data-cy="product-buy-button"
      sx={{ "&:hover": { color: "#881C1C" } }}
      onClick={handleClick}
    />
  );
}
