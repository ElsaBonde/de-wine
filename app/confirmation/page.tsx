"use client";

import { Box, Card, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useCart } from "../ui/CartContext";
import { useCustomer } from "../ui/CustomerContext";
import cheers from "/public/cheers.gif";

export default function ConfirmationPage() {
  const { customer } = useCustomer();
  // fixa så att carten rensas efter att sidan har laddats om
  const { cart: contextCart, calculateTotalPrice, clearCart } = useCart();
  const [cart] = useState(contextCart);
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    //genererar ett unikt orderId
    const thisOrderId = uuidv4();
    setOrderId(thisOrderId);
  }, []);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <Box component="main" sx={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="h4" sx={{ textAlign: "center", margin: "10px" }}>
        Thank you for your purchase!
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Image src={cheers} alt="cheers" width={100} height={100} />
      </Box>
      <Box component="div">
        <Typography>Your orderId is: {orderId}</Typography>
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
      </Box>
      {customer && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "40rem",
            margin: "auto",
            textAlign: "left",
          }}
        >
          <Typography variant="h5" sx={{ fontFamily: "karla" }}>
            Your shipping information:
          </Typography>
          <Typography sx={{ fontWeight: "bold" }}>
            Name: <Typography component="span">{customer.fullname}</Typography>
          </Typography>
          <Typography sx={{ fontWeight: "bold" }}>
            Email: <Typography component="span">{customer.email}</Typography>
          </Typography>
          <Typography sx={{ fontWeight: "bold" }}>
            Phone number:
            <Typography component="span">{customer.phonenumber}</Typography>
          </Typography>
          <Typography sx={{ fontWeight: "bold" }}>
            Adress:
            <Typography comonent="span">{customer.address}</Typography>
          </Typography>
          <Typography sx={{ fontWeight: "bold" }}>
            Zip code:
            <Typography component="span">{customer.zipcode}</Typography>
          </Typography>
          <Typography sx={{ fontWeight: "bold" }}>
            City:
            <Typography component="span">{customer.city}</Typography>
          </Typography>
        </Box>
      )}
      <Box sx={{ display: "flex", flexDirection: "column" }}></Box>
    </Box>
  );
}
