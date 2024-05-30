import { getOrderById } from "@/app/actions/orderActions";
import ClearCart from "@/app/ui/ClearCart";
import { auth } from "@/auth";
import { Box, Card, Divider, Typography, Button } from "@mui/material";
import Image from "next/image";

type PageProps = { params: { slug: string } };

export default async function ConfirmationPage({ params }: PageProps) {
  const session = await auth();
  const order = await getOrderById(params.slug);

  if (!order) {
    return (
      <Box>
        <Typography>Order not found</Typography>
      </Box>
    );
  }

  const rows = order.products;

  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        background: "white",
        padding: "10px 20px",
        flex: 1,
        marginTop: "40px",
        // maxWidth: "1000px", // Increase maxWidth to make it wider
        margin: "auto",
      }}
    >
      {/* Thank you for your purchase section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: "5",
          background: "rgba(242, 239, 239, 0.8)",
          margin: "50px",
          borderRadius: "10px",
          padding: "10px",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            margin: "10px",
            color: "black",
            fontVariant: "small-caps",
            fontFamily: "Karla",
          }}
        >
          Thank you for your purchase!
        </Typography>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
          {order && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: "8",
                margin: "auto",
                textAlign: "left",
                padding: "10px 20px",
                gap: "3px",
              }}
            >
              <Typography
                variant="h5"
                sx={{ fontFamily: "Karla", marginTop: "20px" }}
              >
                Your Shipping Information:
              </Typography>
              <Typography sx={{ fontWeight: "bold" }}>Your orderId is:</Typography>
              <Typography component="span">{order.id}</Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                Name: <Typography component="span">{order.name}</Typography>
              </Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                Email: <Typography component="span">{session?.user?.email}</Typography>
              </Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                Phone number: <Typography component="span">{order.phone}</Typography>
              </Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                Address: <Typography component="span">{order.street}</Typography>
              </Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                Zip code: <Typography component="span">{order.zip}</Typography>
              </Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                City: <Typography component="span">{order.city}</Typography>
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      {/* Order information  */}
      <Typography
        variant="h5"
        gutterBottom
        justifyContent={"center"}
        sx={{
          fontFamily: "Karla",
          fontWeight: "800",
          fontVariant: "small-caps",
          // marginX: "0", // Set marginX for full width
          // padding: "0 10px", // Add padding fspace around the text
          textAlign: "center", 
        }}
      >
        Your Wine Order
      </Typography>
      <Box>
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            // padding: "10px",
            alignItems: "center",
            background: "white",
            marginBottom: "40px",
            padding: "20px",
            // marginX: "auto", // Center the card page
            width: "100%", // Make card full width
            // maxWidth: "1000px", // Control max width to make it bigger???
          }}
        >
          {rows.map((item, index) => (
            <Box key={item.product.id} sx={{ width: "100%" }}>
              <Box sx={{ display: "flex" }}>
                <Box sx={{ marginRight: "10px" }}>
                  <Image
                    src={item.product.image}
                    alt={item.product.title}
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
                    paddingLeft: "10px",
                  }}
                >
                  <Typography sx={{ fontFamily: "Josefin Sans" }}>
                    {item.product.title}
                  </Typography>
                  <Typography sx={{ fontFamily: "Josefin Sans" }}>
                    Price: {item.product.price * item.quantity} $
                  </Typography>
                  <Typography sx={{ fontFamily: "Josefin Sans" }}>
                    {item.quantity} pc
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ margin: "15px 0", background: "#796e6e" }} />
            </Box>
          ))}
          <Box
            sx={{
              color: "black",
              padding: "5px",
              fontFamily: "Josefin Sans",
              textAlign: "center",
              fontWeight: "bold",
              width: "100%",
            }}
          >
            TOTAL: {order.total} $
          </Box>
        </Card>
      </Box>

      <ClearCart />
    </Box>
  );
}
