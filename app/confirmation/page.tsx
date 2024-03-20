"use client";

import { Box, Card, Divider, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useCart } from "../ui/CartContext";
import { useCustomer } from "../ui/CustomerContext";
import cheers from "/public/cheers.gif";

export default function ConfirmationPage() {
  const { customer } = useCustomer();
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

  const totalAmount = calculateTotalPrice();

  return (
    <Box
      component="main"
      sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}
    >
      <Box
        component="div"
        sx={{
          flexGrow: "4",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#F1DDCF",
          margin: "10px",
          borderRadius: "0px 15px 15px 0px",
          padding: "10px",
          justifyContent: "space-evenly",
        }}
      >
        <Typography
          sx={{
            color: "#881C1C",
            fontSize: "30px",
            textAlign: "center",
            fontVariant: "small-caps",
            paddingBottom: "10px",
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
                borderRadius: "0px 10px 10px 0px",
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
                ) : (
                  <Typography
                    data-cy="product-price"
                    sx={{ fontFamily: "Josefin Sans" }}
                  >
                    Price: {item.price * item.quantity} :-
                  </Typography>
                )}

                <Typography
                  data-cy="product-quantity"
                  sx={{ fontFamily: "Josefin Sans" }}
                >
                  {item.quantity} pc
                </Typography>
              </Box>
            </Card>
          ))}
        </Box>
        <Divider sx={{ color: "#881C1C", padding: "5px" }} />
        <Typography
          sx={{
            fontFamily: "Josefin Sans",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          TOTAL: {totalAmount} SEK
        </Typography>
      </Box>

      {/*    sektion 2 */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: "5",
          background: "#f1ddcf",
          margin: "10px",
          borderRadius: "10px 0px 0px 10px",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            margin: "10px",
            color: "#881c1c",
            fontVariant: "small-caps",
          }}
        >
          Thank you for your purchase!
        </Typography>
        <Box
          sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}
        >
          {customer && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: "8",
                margin: "auto",
                textAlign: "left",
                padding: "15px 10px",
                gap: "5px",
              }}
            >
              <Typography
                variant="h5"
                sx={{ fontFamily: "karla", marginTop: "30px" }}
              >
                Your Shipping Information:
              </Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                Your orderId is:
              </Typography>
              <Typography component="span" sx={{}}>
                {" "}
                {orderId}
              </Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                Name:{" "}
                <Typography component="span">{customer.fullname}</Typography>
              </Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                Email:{" "}
                <Typography component="span">{customer.email}</Typography>
              </Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                Phone number:{" "}
                <Typography component="span">{customer.phonenumber}</Typography>
              </Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                Adress:{" "}
                <Typography component="span">{customer.address}</Typography>
              </Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                Zip code:{" "}
                <Typography component="span">{customer.zipcode}</Typography>
              </Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                City: <Typography component="span">{customer.city}</Typography>
              </Typography>
            </Box>
          )}
          <Box
            sx={{
              display: "flex",
              flexGrow: "2",
              justifyContent: "center",
              alignItems: "center",
              marginRight: "20px",
            }}
          >
            <Image src={cheers} alt="cheers" width={100} height={100} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
