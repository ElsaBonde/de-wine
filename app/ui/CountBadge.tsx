"use client";

import { ShoppingCart } from "@mui/icons-material";
import { Badge, Stack } from "@mui/material";
import Link from "next/link";
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
    <Stack>
      <Link href="/checkout">
        <Badge
          badgeContent={totalQuantity}
          data-cy="cart-items-count-badge"
          sx={{ color: "#881c1c" }}
        >
          <ShoppingCart
            sx={{
              color: "#881C1C",
              width: "40px",
              height: "40px",
            }}
            data-cy="cart-link"
          />
        </Badge>
      </Link>
    </Stack>
  );
}
