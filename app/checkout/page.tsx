"use client";

import "@fontsource/karla";
import { Box, Button, Card, Divider, Typography } from "@mui/material";
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
      sx={{
        background: "white ",
        padding: "10px 20px",
        flex: 1,
      }}
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
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "white",
            marginBottom: "40px",
            padding: "20px",
            marginX: "200px",
            height: "auto",
            "@media (max-width:600px)": {
              marginX: "0px",
            },
          }}
        >
          {cart.map((item, index) => (
            <Box key={item.id} sx={{ width: "100%" }}>
              <Box sx={{ display: "flex" }}>
                <Box sx={{ marginRight: "10px" }}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    height={100}
                    width={100}
                    style={{ height: "100%", width: "auto" }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                    paddingLeft: "20px",
                  }}
                >
                  <Typography sx={{ fontFamily: "Josefin Sans" }}>
                    {item.title}
                  </Typography>

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
                    <Typography sx={{ fontFamily: "Josefin Sans" }}>
                      Price: {item.price * item.quantity} $
                    </Typography>
                  )}

                  <Box
                    sx={{
                      display: "flex",
                      // alignItems: "center",
                      // justifyContent: "center",
                      marginTop: "5px",
                    }}
                  >
                    <Button
                      sx={{
                        color: "white",
                        fontSize: "20px",
                        fontFamily: "Josefin Sans",
                        backgroundColor: "black",
                        borderRadius: "50%",
                        width: "25px",
                        height: "25px",
                        minWidth: "25px", // Ensures the button remains circular regardless of content
                        "&:hover": {
                          backgroundColor: "darkgrey",
                        },
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      -
                    </Button>
                    <Typography
                      sx={{ fontFamily: "Josefin Sans", margin: "0 10px" }}
                    >
                      {item.quantity} pc
                    </Typography>
                    <Button
                      sx={{
                        color: "white",
                        fontSize: "20px",
                        fontFamily: "Josefin Sans",
                        backgroundColor: "black",
                        borderRadius: "50%",
                        width: "25px",
                        height: "25px",
                        minWidth: "25px", // Ensures the button remains circular regardless of content
                        "&:hover": {
                          backgroundColor: "darkgrey",
                        },
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onClick={() => increaseQuantity(item.id)}
                    >
                      +
                    </Button>
                  </Box>
                </Box>
              </Box>

              <Divider
                sx={{ margin: "20px 0 20px 0", background: "#796e6e" }}
              />
            </Box>
          ))}
          <Box
            sx={{
              color: "black",
              padding: "5px",
              fontFamily: "Josefin Sans",
              textAlign: "left",
            }}
          >
            Your price: {calculateTotalSalePrice()} SEK
          </Box>
        </Card>
      </Box>

      <Box>
        <CheckoutForm cart={cart} />
      </Box>
    </Box>
  );
}
