"use client";

import { Box, Typography } from "@mui/material";
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
            backgroundColor: "rgba(242, 239, 239, 0.8)",
            border: "1px solid #d3cdcd",
            fontSize: "20px",
            borderRadius: "0px 15px 15px 0px",
            padding: "20px",
            color: "black",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            textDecoration: "none",
            "&:hover": {
              transform: "scale(1.02)",
              transition: "transform 0.6s",
            },
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
              <Typography sx={{ fontSize: "23px", fontFamily: "josefin sans" }}>
                Order Overview
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Karla",
                  fontSize: "18px",
                  fontWeight: "500",
                }}
              >
                {order.id}
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
              Total: {order.total}$
            </Typography>
          </Box>

          <Box
            sx={{
              overflow: "hidden",
              transition: "max-height 1.3s ease, opacity 1.3s ease",
              maxHeight: openOrders.includes(order.id) ? "1000px" : "0px",

              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <Box
              sx={{
                background: "#ffffff80",
                border: "1px solid #d3cdcda7",
                padding: "20px",
                borderRadius: "6px",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Josefin sans",
                  fontSize: "18px",
                  fontWeight: "500",
                }}
              >
                Your delivery details:
              </Typography>
              <Typography sx={{ fontFamily: "Karla" }}>
                Name: {order.name}
              </Typography>
              <Typography sx={{ fontFamily: "Karla" }}>
                Adress: {order.street}
              </Typography>
              <Typography sx={{ fontFamily: "Karla" }}>
                {order.city}, {order.zip}
              </Typography>
            </Box>
            {order.products.map((product: any) => (
              <Box
                key={product.product.id}
                sx={{
                  display: "flex",
                  padding: "10px",
                  background: "#ffffff80",
                  border: "1px solid #d3cdcda7",
                  borderRadius: "6px",
                }}
              >
                <Image
                  src={product.product.image}
                  alt={product.product.title}
                  width={130}
                  height={130}
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
                    Price/pc: {product.product.price}$
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
