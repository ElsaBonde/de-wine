import Image from "next/image";

import { userOrders } from "@/app/actions/orderActions";
import { auth } from "@/auth";
import { Box, Divider, Typography } from "@mui/material";

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
            backgroundColor: "white",
            borderRadius: "15px",
            display: "flex",
            padding: "20px",
          }}
        >
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
          <Box>
            <Typography
              variant="h4"
              sx={{
                color: "white",
                fontSize: "30px",
                paddingLeft: "20px",
              }}
            >
              Welcomme to you personal space, {session.user.name}!
            </Typography>
            <Typography
              sx={{ fontSize: "16px", color: "white", paddingLeft: "20px" }}
            >
              Explore your personal hub for all things wine-related! Here, you
              can track your order history, check the status of your deliveries,
              and discover the delightful contents of each package. <br />
              Relive your wine adventures by browsing through past orders, each
              bottle a testament to your palate's journey. Keep an eye on your
              current orders as they make their way to your doorstep, bringing
              with them the promise of new flavors and experiences.
              <br />
              So relax, uncork your favorite bottle, and enjoy the convenience
              and pleasure of your Vinoteca Space. Cheers to your vinous
              discoveries!
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
        <Box>
          {ordersNotShipped.map((order) => (
            <Box
              key={order.id}
              sx={{
                backgroundColor: "white",
                color: "white",
                fontSize: "20px",
              }}
            >
              <Typography variant="h6">Order Number: {order.id}</Typography>
              <Typography variant="h6">
                Total price: {order.total} :-
              </Typography>
              <Typography variant="h6">
                Order Date: {order.orderDate.toLocaleDateString()}
              </Typography>
              {order.products.map((product) => (
                <Box key={product.product.id}>
                  <Image
                    src={product.product.image}
                    alt={product.product.title}
                    width={100}
                    height={100}
                  />
                  <Typography variant="h6">
                    Product: {product.product.title}
                  </Typography>
                  <Typography variant="h6">
                    Quantity: {product.quantity}
                  </Typography>
                </Box>
              ))}
            </Box>
          ))}
        </Box>
        <Box>
          {ordersShipped.map((order) => (
            <Box
              key={order.id}
              sx={{
                color: "white",
                fontSize: "20px",
              }}
            >
              <Typography variant="h6">Order Number: {order.id}</Typography>
              <Typography variant="h6">
                Total price: {order.total} :-
              </Typography>
              <Typography variant="h6">
                Order Date: {order.orderDate.toLocaleDateString()}
              </Typography>
              {order.products.map((product) => (
                <Box key={product.product.id}>
                  <Typography variant="h6">
                    Product: {product.product.title}
                  </Typography>
                  <Typography variant="h6">
                    Quantity: {product.quantity}
                  </Typography>
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    );
  }
}
