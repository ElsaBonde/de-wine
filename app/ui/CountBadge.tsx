"use client";

import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useCart } from "./CartContext";

//skriver ut antalet items i kundkorgen
export default function CountBadge() {
  const { cart } = useCart();
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    // Beräkna totala antalet varor i kundvagnen
    if (cart.length === 0) {
      setTotalQuantity(0);
      return;
    } else {
      const total = cart.reduce((total, item) => total + item.quantity, 0);
      setTotalQuantity(total);
    }
  }, [cart]);

  if (totalQuantity === 0) {
    return null;
  }

  return (
    <Typography
      component="span"
      data-cy="cart-items-count-badge"
      sx={{ color: "#881C1C" }}
    >
      {" "}
      {totalQuantity}
    </Typography>
  );
}
