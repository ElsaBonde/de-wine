"use client";

import { Box, Typography, keyframes } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

export default function OrderHistory({ orders }: any) {
  const [openOrders, setOpenOrders] = useState<string[]>([]);

  const handleOrderClick = (orderId: string) => {
    setOpenOrders((prevOrders) => {
      if (prevOrders.includes(orderId)) {
        return prevOrders.filter((id) => id !== orderId);
      } else {
        return [...prevOrders, orderId];
      }
    });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {orders.map((order: any) => (
        <Box
          key={order.id}
          sx={{
            backgroundColor: "#c9bcbc",
            fontSize: "20px",
            borderRadius: "0px 15px 15px 0px",
            padding: "20px",
            color: "black",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            textDecoration: "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              cursor: "pointer",
            }}
            onClick={() => handleOrderClick(order.id)}
          >
            <Box>
              <Typography
                sx={{
                  fontFamily: "Karla",
                  fontSize: "20px",
                  fontWeight: "500",
                }}
              >
                Order no: {order.id}
              </Typography>
              <Typography sx={{ fontFamily: "Karla", color: "#796e6e" }}>
                Order Date: {order.orderDate.toLocaleDateString()}
              </Typography>
            </Box>
            <Typography
              sx={{
                fontFamily: "Karla",
                alignContent: "center",
                fontSize: "20px",
                fontWeight: "500",
              }}
            >
              Total: {order.total} :-
            </Typography>
          </Box>

          <Box
            sx={{
              overflow: "hidden",
              transition: "max-height 1.3s ease, opacity 1.3s ease",
              maxHeight: openOrders.includes(order.id) ? "1000px" : "0px",
              opacity: openOrders.includes(order.id) ? 1 : 0,
              display: "flex",
                flexDirection: "column",
              gap: "10px",
            }}
          >
            {order.products.map((product: any) => (
              <Box key={product.product.id} sx={{ display: "flex", padding: "10px", background: "#dfd4d4", borderRadius: "6px" }}>
                <Image
                  src={product.product.image}
                  alt={product.product.title}
                  width={130}
                  height={100}
                />
                <Box sx={{ paddingLeft: "20px" }}>
                  <Typography
                    sx={{
                      fontFamily: "Karla",
                      fontSize: "18px",
                      fontWeight: "500",
                    }}
                  >
                    {product.product.title}
                  </Typography>
                  <Typography sx={{ fontFamily: "Karla" }}>
                    Price/pc: {product.product.price} :-
                  </Typography>
                  <Typography sx={{ fontFamily: "Karla" }}>
                    Quantity: {product.quantity}
                  </Typography>
                  <Typography sx={{ fontFamily: "Karla" }}>
                    Total: {product.subTotal}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
}
