"use client";

import { Typography } from "@mui/material";
import { useCart } from "./CartContext";

//skriver ut antalet items i kundkorgen
export default function CountBadge() {
  const { cart } = useCart();
  if (cart.length === 0) return null;

  return (
    <Typography
      component="span"
      color="text.primary"
      data-cy="cart-items-count-badge"
      
    >
      {cart.length}
    </Typography>
  );
}
