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
      sx={{ background: "white ", padding: "10px 20px", flex: 1 }}
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
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              background: "white",
              marginBottom: "10px",
              padding: "10px",
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
              <Typography sx={{ fontFamily: "Josefin Sans" }}>
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
                    Your Price: {item.salePrice * item.quantity} $
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Josefin Sans",
                      textDecoration: "line-through",
                    }}
                  >
                    Old Price: {item.price * item.quantity} $
                  </Typography>
                </>
              ) : (
                /* annars visa bara vanliga priset */ <Typography
                  sx={{ fontFamily: "Josefin Sans" }}
                >
                  Price: {item.price * item.quantity} $
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
                    color: "white",
                    fontSize: "18px",
                    fontFamily: "Josefin sans",
                  }}
                  onClick={() => decreaseQuantity(item.id)}
                >
                  -
                </Button>
                <Typography sx={{ fontFamily: "Josefin Sans" }}>
                  {item.quantity} pc
                </Typography>
                <Button
                  sx={{
                    color: "white",
                    fontSize: "18px",
                    fontFamily: "josefin sans",
                  }}
                  onClick={() => increaseQuantity(item.id)}
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
          sx={{
            backgroundColor: "rgba(242, 239, 239, 0.8) ",
            borderRadius: "5px",
            color: "black",
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
            backgroundColor: "rgba(242, 239, 239, 0.8) ",
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
        <CheckoutForm cart={cart} />
      </Box>
    </Box>
  );
}
