"use client";

import { Box, Checkbox, TableCell, TableRow, Typography } from "@mui/material";
import { shipOrder } from "../actions/orderActions";
import {Order} from "@prisma/client";

interface Props {
  order: Order;
}

export default function OrderRow({order}: Props) {
  const handleShipped = async (orderId: string) => {
    await shipOrder(orderId);
  };

  return (
    <TableRow>
      <TableCell>{order.id}</TableCell>
      <TableCell>{order.orderDate.toLocaleDateString()}</TableCell>
      <TableCell>{order.total}</TableCell>
      <TableCell>
        {order.isShipped ? (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ minWidth: "65px" }}>Shipped</Typography>
            <Checkbox defaultChecked onClick={() => handleShipped(order.id)} />
          </Box>
        ) : (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ minWidth: "65px" }}>Progress</Typography>
            <Checkbox onClick={() => handleShipped(order.id)} />
          </Box>
        )}
      </TableCell>
    </TableRow>
  );
}
