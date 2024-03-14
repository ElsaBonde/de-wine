"use client";

import "@fontsource/karla";
import { Box, Button, Card, Typography } from "@mui/material";
import Image from "next/image";
import CheckoutForm from "../form";
import { useCart } from "../ui/CartContext";

export default function CheckoutPage() {
  const { cart, calculateTotalPrice, decreaseQuantity, increaseQuantity } =
    useCart(); //hämtar alla funktioner som behövs här från contexten

  if (cart.length === 0) {
    return (
      <>
        <h1> cart is empty</h1>
      </>
    );
  }

  return (
    <Box component="main" sx={{ background: "#F9F1EC", padding: "10px 20px" }}>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          margin: "10px",
          fontFamily: "Karla",
          fontWeight: "400",
          fontVariant: "small-caps",
        }}
      >
        Your Wine'Order:
      </Typography>
      <Box>
        {cart.map((item, index) => (
          <Card
            key={item.id}
            data-cy="cart-item"
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              background: "white",
              marginBottom: "10px",
            }}
          >
            <Image
              src={item.image}
              alt={item.title}
              height={75}
              width={75}
              style={{ height: "100%", width: "auto" }}
            />
            <Box
              sx={{
                paddingLeft: "10px",
                display: "flex",
                flexDirection: "column",
                flexGrow: "1",
              }}
            >
              <Typography
                data-cy="product-title"
                sx={{ fontFamily: "Josefin Sans" }}
              >
                {item.title}
              </Typography>
              <Typography
                data-cy="product-price"
                sx={{ fontFamily: "Josefin Sans" }}
              >
                {" "}
                {/* här får vi lägga till vad en kostar också */}
                {item.price * item.quantity} :-
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  sx={{
                    color: "#881C1C",
                    fontSize: "18px",
                    fontFamily: "Josefin sans",
                  }}
                  onClick={() => decreaseQuantity(item.id)}
                  data-cy="decrease-quantity-button"
                >
                  -
                </Button>
                <Typography
                  data-cy="product-quantity"
                  sx={{ fontFamily: "Josefin Sans" }}
                >
                  {item.quantity} pc
                </Typography>
                <Button
                  sx={{
                    color: "#881C1C",
                    fontSize: "18px",
                    fontFamily: "josefin sans",
                  }}
                  onClick={() => increaseQuantity(item.id)}
                  data-cy="increase-quantity-button"
                >
                  +
                </Button>
              </Box>
            </Box>
          </Card>
        ))}
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box
          data-cy="total-price"
          sx={{
            backgroundColor: "#F1DDCF",
            borderRadius: "5px",
            color: "#881C1C",
            textAlign: "center",
            padding: "5px",
            fontFamily: "Karla",
            fontWeight: "400",
            fontVariant: "small-caps",
          }}
        >
          Total amount: {calculateTotalPrice()} SEK
        </Box>
      </Box>
      <Box>
        <CheckoutForm />
      </Box>
    </Box>
  );
}
