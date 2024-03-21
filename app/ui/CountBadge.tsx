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
    //beräknar totala antalet items i kundkorgen
    const total = cart.reduce((total, item) => total + item.quantity, 0);
    setTotalQuantity(total);
  }, [cart]);

  return (
    <Stack>
      <Link href="/checkout">
        <Badge
          badgeContent={totalQuantity > 0 ? totalQuantity : null}
          data-cy="cart-items-count-badge"
          sx={{
            //sätter styling endast för badgen med numret
            "& .MuiBadge-badge": {
              backgroundColor: "white",
              color: "#881c1c",
              fontSize: "15px",
              fontWeight: "bold",
            },
          }}
        >
          <ShoppingCart
            data-cy="cart-link"
            sx={{
              color: "#881C1C",
              width: "35px",
              height: "35px",
            }}
          />
        </Badge>
      </Link>
    </Stack>
  );
}
