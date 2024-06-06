"use client";

import { AddShoppingCart } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";
import { Product } from "../actions/productActions";
import { useCart } from "./CartContext";
import { useSnackbar } from "./Snackbar";

interface Props {
  product: Product;
  isProductPage: boolean;
}

export default function AddButton(props: Props) {
  //skapar en variabel som vi kan använda för att uppdatera antalet items i kundkorgen samt en variabel för att visa en snackbar
  const { addToCart, cart } = useCart();
  const { showSnack } = useSnackbar();

  //ökar antalet items i kundkorgen, lägger till dem i LS och visar snackbaren
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    const totalQuantityInCart = cart
      .filter((product) => product.id === props.product.id)
      .reduce((total, product) => total + product.quantity, 0);

    if (
      totalQuantityInCart >= props.product.inventory ||
      props.product.inventory < 1
    ) {
      showSnack(props.product.title + " is out of stock.");
    } else {
      showSnack(props.product.title + " has been added to your cart.");
      addToCart(props.product);
    }
  };
  return (
    <>
      {props.isProductPage ? (
        <Button
          sx={{
            background: "#eee7e7c3",
            minWidth: "250px",
            borderRadius: "8px",
            padding: "10px",
            fontFamily: "josefin sans",
            color: "#1F1724",
            fontWeight: "600",
            border: "1px solid #ccc4c4c3",
            "&:hover": {
              background: "#dddcdc",
            },
          }}
          onClick={handleClick}
        >
          Add to cart
        </Button>
      ) : (
        <AddShoppingCart
          sx={{ color: "grey", "&:hover": { color: "#1F1724" } }}
          onClick={handleClick}
        />
      )}
    </>
  );
}
