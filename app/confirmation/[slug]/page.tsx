import "@fontsource/karla";
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
        margin: "auto",
      }}
    >
      {/* Thank you for your purchase section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: "white",
          marginBottom: "20px",
          padding: "20px",
          width: "100%",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            margin: "10px",
            color: "darkpurple",
            fontVariant: "small-caps",
            fontFamily: "Karla",
          }}
        >
          Thank you for your purchase!
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "center",
            alignItems: "stretch",
            // gap: "10px",
          }}
        >
          {order && (
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                textAlign: "left",
                padding: {
                  xs: "10px 20px 20px 5px", // mindre för små skärmar
                  sm: "10px 60px 20px 20px", // medium  för medelstora skärmar
                  md: "10px 150px 20px 20px", // större för stora skärmar
                },
                gap: "3px",
                flex: 1,
                width: "100%",
              }}
            >
              <Typography
                variant="h5"
                sx={{ fontFamily: "Karla", marginTop: "10px" , marginBottom: "20px"}}
              >
                Your Shipping Information:
              </Typography>
              <Typography sx={{ fontWeight: "bold" }}>Your order number:</Typography>
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
            </Card>
          )}
        </Box>
      </Box>

      {/* Order information  */}
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontFamily: "Karla",
          fontWeight: "800",
          fontVariant: "small-caps",
          textAlign: "left",
          color: "darkpurple",
        }}
      >
        Your wine order
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "stretch",
          width: "100%",
        }}
      >
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "white",
            marginBottom: "40px",
            padding: "20px",
            flex: 1,
            maxWidth: "100%"
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
                    style={{ height: "100%", width: "auto" , borderRadius: "5px" }}
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
                  <Typography sx={{ fontFamily: "Karla" }}>
                    {item.product.title}
                  </Typography>
                  <Typography sx={{ fontFamily: "Karla" }}>
                    Price: {item.product.price * item.quantity} $
                  </Typography>
                  <Typography sx={{ fontFamily: "Karla" }}>
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
              fontFamily: "Karla",
              textAlign: "center",
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
