"use client";

import "@fontsource/karla";
import { Box, Checkbox, TableCell, TableRow, Typography } from "@mui/material";
import { Order } from "@prisma/client";
import { shipOrder } from "../actions/orderActions";

interface Props {
  order: Order;
}

export default function OrderRow({ order }: Props) {
  const handleShipped = async (orderId: string) => {
    await shipOrder(orderId);
  };

  return (
    <TableRow>
      <TableCell
        sx={{
          fontFamily: "Karla",
          fontSize: {
            xs: "10px",
            md: "16px",
          },
        }}
      >
        {order.id}
      </TableCell>
      <TableCell
        sx={{
          fontFamily: "Karla",
          fontSize: {
            xs: "10px",
            md: "16px",
          },
        }}
      >
        {order.orderDate.toLocaleDateString()}
      </TableCell>
      <TableCell
        sx={{
          fontFamily: "Karla",
          fontSize: {
            xs: "10px",
            md: "16px",
          },
        }}
      >
        {order.total}
      </TableCell>
      <TableCell>
        {order.isShipped ? (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              sx={{
                minWidth: "65px",
                fontFamily: "Karla",
                fontSize: {
                  xs: "10px",
                  md: "16px",
                },
              }}
            >
              Shipped
            </Typography>
            <Checkbox
              defaultChecked
              onClick={() => handleShipped(order.id)}
              sx={{
                color: "#757575",
                "&.Mui-checked": {
                  color: "#424242",
                },
                "& .MuiSvgIcon-root": {
                  fontSize: 24,
                },
              }}
            />
          </Box>
        ) : (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              sx={{
                minWidth: "65px",
                fontFamily: "Karla",
                fontSize: {
                  xs: "10px",
                  md: "16px",
                },
              }}
            >
              Progress
            </Typography>
            <Checkbox onClick={() => handleShipped(order.id)} />
          </Box>
        )}
      </TableCell>
    </TableRow>
  );
}
