"use client";

import "@fontsource/karla";
import { Box, Button, Card, Divider, Typography } from "@mui/material";
import Image from "next/image";
import { useCart } from "../ui/CartContext";
import CheckoutForm from "../ui/CustomerForm";

export default function CheckoutPage() {
  const { cart, calculateTotalSalePrice, decreaseQuantity, increaseQuantity } =
    useCart();

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
        Cart is empty..
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
        marginTop: "40px",
        marginX: { xs: "0px", md: "100px" },
      }}
    >
      <Box>
        <Typography
          variant="h5"
          gutterBottom
          justifyContent={"center"}
          sx={{
            fontFamily: "Karla",
            fontWeight: "800",
            fontVariant: "small-caps",
            marginX: { xs: "0px", md: "150px" , lg: "200px" },
          }}
        >
          Your wine order
        </Typography>
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "white",
            marginBottom: "40px",
            padding: "20px",
            height: "auto",
            marginX: { xs: "0px", md: "150px" , lg: "200px" },
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
                  <Typography sx={{ fontFamily: "Josefin Sans" }}>
                    Price: {item.price * item.quantity} $
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",

                      marginTop: "5px",
                    }}
                  >
                    <Button
                      sx={{
                        color: "white",
                        fontSize: "20px",
                        fontFamily: "Josefin Sans",
                        backgroundColor: "#1F1724",
                        borderRadius: "50%",
                        width: "25px",
                        height: "25px",
                        minWidth: "25px",
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
                        backgroundColor: "#1F1724",
                        borderRadius: "50%",
                        width: "25px",
                        height: "25px",
                        minWidth: "25px",
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
              color: "#1F1724",
              padding: "5px",
              fontFamily: "Josefin Sans",
              textAlign: "left",
              fontWeight: "bold",
            }}
          >
            Your price: {calculateTotalSalePrice()}$
          </Box>
        </Card>
      </Box>

      <Box>
        <CheckoutForm cart={cart} />
      </Box>
    </Box>
  );
}
