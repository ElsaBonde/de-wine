import { userOrders } from "@/app/actions/orderActions";
import OrderHistory from "@/app/ui/OrderHistory";
import SignOutButton from "@/app/ui/SignOutButton";

import { auth } from "@/auth";

import "@fontsource/josefin-sans";
import "@fontsource/karla";


import { Box, Typography } from "@mui/material";
import Image from "next/image";

export default async function UserProfilePage() {
  const session = await auth();

  if (session && session.user) {
    console.log(session.user.id);
    const userOrder = await userOrders(session.user.id);
    const ordersShipped = userOrder.filter((order) => order.isShipped);
    const ordersNotShipped = userOrder.filter((order) => !order.isShipped);

    return (
      <Box
        component="main"
        sx={{
          background: "white ",
          padding: "10px 20px",
          marginX: { xs: "0px", md: "100px" },
        }}
      >
        <Box
          sx={{
            backgroundColor: "#1F1724",
            borderRadius: "0px 15px 15px 0px",
            display: "flex",
            padding: "20px",
          }}
        >
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <Image
              src={session.user.image ?? ""}
              alt="User profile"
              width={100}
              height={100}
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                marginLeft: "10px",
              }}
            />
          </Box>
          <Box
            sx={{
              alignContent: "center",
              paddingLeft: { xs: "0px", md: "20px" },
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: "white",
                fontSize: "26px",
                paddingBottom: "10px",
                fontFamily: "Josefin sans",
              }}
            >
              Welcome to you personal space, {session.user.name}!
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                color: "white",
                width: "80%",
                fontFamily: "Karla",
              }}
            >
              Over here you can explore your personal hub for all things
              wine-related! Here, you can track your order history, check the
              status of your deliveries, and discover the delightful contents of
              each package. <br />
            </Typography>
          </Box>
          <Box>
            <SignOutButton />
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            marginTop: "35px",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontFamily: "Josefin sans",

                fontSize: "22px",
                fontWeight: "bold",
                marginBottom: "20px",
              }}
            >
              Is being processed:
            </Typography>
            <OrderHistory orders={ordersNotShipped} />
          </Box>

          <Box sx={{ marginTop: "35px" }}>
            <Typography
              sx={{
                fontFamily: "Josefin sans",
                fontSize: "22px",
                fontWeight: "bold",

              }}
            >
              Has been shipped:
            </Typography>
            <OrderHistory orders={ordersShipped} />
          </Box>
        </Box>
      </Box>
    );
  }
}
