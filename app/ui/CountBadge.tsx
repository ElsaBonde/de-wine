"use client";

import { ShoppingCart } from "@mui/icons-material";
import { Badge, Stack } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "./CartContext";

//skriver ut antalet items i kundkorgen
export default function CountBadge() {
  const ShoppingCartGold = () => (
    <>
      <svg width={0} height={0}>
        <linearGradient id="linearColors" x1={0} y1={1} x2={1} y2={0}>
          <stop offset={0} stopColor="#AE8625" />
          <stop offset={1} stopColor="#F7EF8A" />
        </linearGradient>
      </svg>
      <ShoppingCart
        sx={{ fill: "url(#linearColors)", width: "33px", height: "33px" }}
      />
    </>
  );

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
          overlap="circular"
          sx={{
            "& .MuiBadge-badge": {
              background:
                "linear-gradient(to right, #AE8625, #F7EF8A, #D2AC47, #EDC967)",
              border: "1px solid #1F1724",
              color: "#1F1724",
              fontSize: "15px",
              fontWeight: "bold",
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxSizing: "border-box",
              top: "10%",
              right: "-5%",
              transform: "translate(50%, -50%)",
            },
          }}
        >
          <ShoppingCartGold />
        </Badge>
      </Link>
    </Stack>
  );
}
