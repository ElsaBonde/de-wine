"use client";

import { useEffect } from "react";
import { useCart } from "./CartContext";

export default function ClearCart() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return null;
}
