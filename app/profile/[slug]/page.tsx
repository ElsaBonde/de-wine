import Image from "next/image";
import { userOrders } from "@/app/actions/orderActions";
import { auth } from "@/auth";
import { Box, Divider, Typography } from "@mui/material";
import OrderHistory from "@/app/ui/OrderHistory";


export default async function UserProfilePage() {
  const session = await auth();

  if (session && session.user) {
    console.log(session.user.id);
    const userOrder = await userOrders(session.user.id);
    const ordersShipped = userOrder.filter((order) => order.isShipped);
    const ordersNotShipped = userOrder.filter((order) => !order.isShipped);


    return (
      <Box component="main" sx={{ background: "white ", padding: "10px 20px" }}>
        <Box
          sx={{
            backgroundColor: "#c9bcbc",
            borderRadius: "0px 15px 15px 0px",
            display: "flex",
            padding: "20px",
          }}
        >
            <Box sx={{ display: {xs: "none", md: "block"}}}>

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
          <Box sx={{ alignContent: "center", paddingLeft: {xs: "0px", md: "20px"} }}>
            <Typography
              variant="h4"
              sx={{
                color: "white",
                fontSize: "26px",
                paddingBottom: "10px",
              }}
            >
              Welcome to you personal space, {session.user.name}!
            </Typography>
            <Typography sx={{ fontSize: "16px", color: "white", width: "80%" }}>
              Over here you can explore your personal hub for all things
              wine-related! Here, you can track your order history, check the
              status of your deliveries, and discover the delightful contents of
              each package. <br />
            </Typography>
          </Box>
        </Box>
        <Divider>
          <Typography
            variant="h4"
            sx={{
              fontFamily: "Josefin sans",
              textAlign: "center",
              marginY: "15px",
            }}
          >
            Your Orders:
          </Typography>
        </Divider>
        <Box sx={{display: "flex", flexDirection: "column", gap: "20px"}} >
            <Box>
        <Typography sx={{ fontFamily: "Josefin sans" }}>
          Is being processed:
        </Typography>
        <OrderHistory orders={ordersNotShipped} />
            </Box>
            <Box>
        <Typography sx={{ fontFamily: "Josefin sans" }}>
          Has been shipped:
        </Typography>
       <OrderHistory orders={ordersShipped} />
            </Box>
        </Box>
      </Box>
    );
  }
}
