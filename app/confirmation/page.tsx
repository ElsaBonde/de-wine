"use client";

import { Box, Card, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useCart } from "../ui/CartContext";
import { useCustomer } from "../ui/CustomerContext";

export default function ConfirmationPage() {
  const { customer } = useCustomer();
  // fixa så att carten rensas efter att sidan har laddats om
  const { cart: contextCart, calculateTotalPrice, clearCart } = useCart();
  const [cart] = useState(contextCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <main>
      <Typography variant="h4" sx={{ textAlign: "center", margin: "10px" }}>
        Thank you for your purchase!
      </Typography>
      <Typography>Your orderId is: ettuniktid</Typography>
      {customer && (
        <Box>
          <Typography variant="h6">Your shipping information:</Typography>
          <Typography>{`Full Name: ${customer.fullname}`}</Typography>
          <Typography>{`Email: ${customer.email}`}</Typography>
          <Typography>{`Phone Number: ${customer.phonenumber}`}</Typography>
          <Typography>{`Address: ${customer.address}`}</Typography>
          <Typography>{`Zip Code: ${customer.zipcode}`}</Typography>
          <Typography>{`City: ${customer.city}`}</Typography>
        </Box>
      )}
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
                <Typography data-cy="product-quantity">
                  {item.quantity} pc
                </Typography>
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
          Total amount: {calculateTotalPrice()} SEK
        </Box>
      </Box>
    </main>
  );
}
