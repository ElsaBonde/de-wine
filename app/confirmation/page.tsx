"use client";

import { CartItem } from "@/data";
import { Box, Card, Typography } from "@mui/material";
import Image from "next/image";
import { useCart } from "../ui/CartContext";

export default function ConfirmationPage() {
  // Hämta sparad data från localStorage i en annan fil
  const savedFormData = localStorage.getItem("checkoutFormData");

  //använd sparad data
  let parsedFormData: {
    fullname: string;
    email: string;
    phonenumber: number;
    address: string;
    zipcode: number;
    city: string;
  } | null = null;
  if (savedFormData) {
    parsedFormData = JSON.parse(savedFormData);
  }
  // fixa så att carten rensas efter att sidan har laddats om 
  const { getCartItems, calculateTotalPrice } = useCart();

  const cartItems: CartItem[] = getCartItems();

  return (
    <main>
      <Typography variant="h4" sx={{ textAlign: "center", margin: "10px" }}>
        Thank you for your purchase!
      </Typography>
      <Typography>Your orderId is: ettuniktid</Typography>
      {parsedFormData && (
        <Box>
          <Typography variant="h6">Your shipping information:</Typography>
          <Typography>{`Full Name: ${parsedFormData.fullname}`}</Typography>
          <Typography>{`Email: ${parsedFormData.email}`}</Typography>
          <Typography>{`Phone Number: ${parsedFormData.phonenumber}`}</Typography>
          <Typography>{`Address: ${parsedFormData.address}`}</Typography>
          <Typography>{`Zip Code: ${parsedFormData.zipcode}`}</Typography>
          <Typography>{`City: ${parsedFormData.city}`}</Typography>
        </Box>
      )}
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
          Total amount: {calculateTotalPrice(cartItems)} SEK
        </Box>
      </Box>
    </main>
  );
}
