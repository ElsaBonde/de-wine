"use client";

import { Typography } from "@mui/material";
import { useCount } from "./AddContext";

//skriver ut antalet items i kundkorgen
export default function CountBadge() {
  const { count } = useCount();
  return (
    <Typography
      component="span"
      color="text.primary"
      data-cy="cart-items-count-badge"
    >
      {count}
    </Typography>
  );
}
