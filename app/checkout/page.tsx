"use client";

import { CartItem } from "@/data";
import { Box, Button, Card, Typography } from "@mui/material";
import Image from "next/image";
import { useCart } from "../ui/CartContext";

export default function CheckoutPage() {
  const {
    getCartItems,
    calculateTotalPrice,
    decreaseQuantity,
    increaseQuantity,
  } = useCart(); //hämtar alla funktioner som behövs här från contexten

  //hämtar objekten i kudnvagnen
  const cartItems: CartItem[] = getCartItems();

  return (
    <main style={{ background: "#F9F1EC", padding: "10px 20px" }}>
      <Typography variant="h4" sx={{ textAlign: "center", margin: "10px" }}>
        Shopping bag
      </Typography>
      <Box>
        {cartItems.map((item, index) => (
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
              <Typography data-cy="product-title">{item.title}</Typography>
              <Typography data-cy="product-price">
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
                  sx={{ color: "#881C1C", fontSize: "18px" }}
                  onClick={() => decreaseQuantity(item.id)}
                  data-cy="decrease-quantity-button"
                >
                  -
                </Button>
                <Typography data-cy="product-quantity">
                  {item.quantity} pc
                </Typography>
                <Button
                  sx={{ color: "#881C1C", fontSize: "18px" }}
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
            fontWeight: "bold",
          }}
        >
          Total amount: {calculateTotalPrice(cartItems)} SEK
        </Box>
        <Button
          sx={{
            backgroundColor: "#F1DDCF",
            color: "#881C1C",
            marginTop: "10px",
            fontWeight: "bold",
            justifyContent: "center",
          }}
        >
          Place Order
        </Button>
      </Box>
    </main>
  );
}
