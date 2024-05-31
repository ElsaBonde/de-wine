"use client";

import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { OrdersWithProducts } from "../actions/orderActions";

interface Props {
  orders: OrdersWithProducts;
}

export default function OrderHistory({ orders }: Props) {
  const [openOrders, setOpenOrders] = useState<string[]>([]);
  orders[0];

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
      {orders.map((order) => (
        <Box
          key={order.id}
          sx={{
            background: "white",
            // borderRadius: "8px",
            "&:hover": {
              background: "#F6F6F6",
              transform: "scale(1.02)",
              transition: "transform 0.6s",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
            },

            border: "1px solid #d3cdcd",
            fontSize: "20px",
            borderRadius: "0px 15px 15px 0px",
            padding: "20px",
            color: "#1F1724",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            textDecoration: "none",
            oxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
            marginBottom: "20px",
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
                  fontSize: "20px",
                  fontFamily: "josefin sans",
                  fontWeight: "bold",
                }}
              >
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
                  fontWeight: "bold",
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
            {order.products.map((product) => (
              <Box
                key={product.product.id}
                sx={{
                  display: "flex",
                  padding: "10px",
                  background: "#ffffff80",
                  border: "1px solid #d3cdcda7",
                  borderRadius: "6px",
                  fontFamily: "Josefin Sans",
                }}
              >
                <Image
                  src={product.product.image}
                  alt={product.product.title}
                  width={125}
                  height={130}
                />
                <Box sx={{ paddingLeft: "20px" }}>
                  <Typography
                    sx={{
                      fontFamily: "Josefin Sans",
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
