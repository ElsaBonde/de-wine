"use client";

import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useCart } from "./CartContext";

//skriver ut antalet items i kundkorgen
export default function CountBadge() {
  const { getCartItems } = useCart();
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    // Beräkna totala antalet varor i kundvagnen
    const items = getCartItems();
    if (items.length === 0) {
      setTotalQuantity(0);
      return;
    } else {
    const total = items.reduce((total, item) => total + item.quantity, 0);
    setTotalQuantity(total);
    }
  }, [getCartItems]);

  if (totalQuantity === 0) {
    return null;
  }


  return (
    <Typography component="span" data-cy="cart-items-count-badge" sx={{color: "#881C1C"}}> {totalQuantity}
    </Typography>
  );
}
