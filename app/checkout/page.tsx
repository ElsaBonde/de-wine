"use client";

import "@fontsource/karla";
import { Box, Button, Card, Typography } from "@mui/material";
import Image from "next/image";
import { useCart } from "../ui/CartContext";
import CheckoutForm from "../ui/CustomerForm";

export default function CheckoutPage() {
  const {
    cart,
    calculateTotalPrice,
    calculateTotalSalePrice,
    decreaseQuantity,
    increaseQuantity,
  } = useCart(); //hämtar alla funktioner som behövs här från contexten

  if (cart.length === 0) {
    return (
      <>
        <Typography
          variant="h2"
          sx={{
            textAlign: "center",
            fontFamily: "karla",
            fontVariant: "small-caps",
          }}
        >
          {" "}
          cart is empty..
        </Typography>
      </>
    );
  }

  return (
    <Box
      component="main"
      sx={{ background: "#F9F1EC", padding: "10px 20px", flex: 1 }}
    >
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
        Your Wine&apos;Order:
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
        
        {/* om produkten har reapris, visa det */}
              {item.salePrice ? (
                <>
                  <Typography
                    sx={{
                      fontFamily: "Josefin Sans",
                      color: "red",
                    }}
                  >
                    Your Price: {item.salePrice * item.quantity} :-
                  </Typography>
                  <Typography
                    data-cy="product-price"
                    sx={{
                      fontFamily: "Josefin Sans",
                      textDecoration: "line-through",
                    }}
                  >
                    Old Price: {item.price * item.quantity} :-
                  </Typography>
                </>
              ) : /* annars visa bara vanliga priset */ (
                <Typography
                  data-cy="product-price"
                  sx={{ fontFamily: "Josefin Sans" }}
                >
                  Price: {item.price * item.quantity} :-
                </Typography>
              )}


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
          Old price: {calculateTotalPrice()} SEK
        </Box>
        <Box
          sx={{
            backgroundColor: "#F1DDCF",
            borderRadius: "5px",
            color: "red",
            textAlign: "center",
            padding: "5px",
            fontFamily: "Karla",
            fontWeight: "400",
            fontVariant: "small-caps",
          }}
        >
          Your price: {calculateTotalSalePrice()} SEK
        </Box>
      </Box>
      <Box>
        <CheckoutForm />
      </Box>
    </Box>
  );
}
