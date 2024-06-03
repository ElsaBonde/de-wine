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
        background: "white ",
        padding: "10px 20px",
        flex: 1,
        marginTop: "40px", marginX: {xs: "0px", md: "100px"},
      }}
    >
      <Box
      >
       <Typography
        variant="h5"
        gutterBottom
        justifyContent={"center"}
        sx={{
          fontFamily: "Karla",
          fontWeight: "800",
          fontVariant: "small-caps",
          marginX: { xs: "0px", md: "200px" },
          
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
            marginX: { xs: "0px", md: "200px" },
          }}
        >
          {order && (
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                textAlign: "left",
                width: "100%",
                gap: "3px",
                marginBottom: "40px",
                padding: "20px",
              }}
            >
              <Typography
                
                sx={{ fontFamily: "Karla", marginTop: "10px" , marginBottom: "20px", fontSize: "23px"}}>
                Your Shipping Information:
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontWeight: "bold" , fontFamily: "Karla"}}>Order number: </Typography>
            <Typography component="span" sx={{ fontFamily: "Karla" , marginLeft: 1}}>{order.id}</Typography>
              </Box>
              <Typography sx={{ fontWeight: "bold" , fontFamily: "Karla"}}>
                Name: <Typography component="span" sx={{ fontFamily: "Karla"}}>{order.name}</Typography>
              </Typography>
              <Typography sx={{ fontWeight: "bold" , fontFamily: "Karla"}}>
                Email: <Typography component="span" sx={{ fontFamily: "Karla" }}>{session?.user?.email}</Typography>
              </Typography>
              <Typography sx={{ fontWeight: "bold" , fontFamily: "Karla"}}>
                Phone number: <Typography component="span" sx={{ fontFamily: "Karla" }}>{order.phone}</Typography>
              </Typography>
              <Typography sx={{ fontWeight: "bold" , fontFamily: "Karla"}}>
                Address: <Typography component="span" sx={{ fontFamily: "Karla" }}>{order.street}</Typography>
              </Typography>
              <Typography sx={{ fontWeight: "bold" , fontFamily: "Karla"}}>
                Zip code: <Typography component="span" sx={{ fontFamily: "Karla" }}>{order.zip}</Typography>
              </Typography>
              <Typography sx={{ fontWeight: "bold" , fontFamily: "Karla"}}>
                City: <Typography component="span" sx={{ fontFamily: "Karla" }}>{order.city}</Typography>
              </Typography>
            </Card>
          )}
        </Box>
      </Box>

      <Typography
        variant="h5"
        gutterBottom
        justifyContent={"center"}
        sx={{
          fontFamily: "Karla",
          fontWeight: "800",
          fontVariant: "small-caps",
          marginX: { xs: "0px", md: "200px" },
          
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
          marginX: { xs: "0px", md: "200px" },
          height: "auto",
          "@media (max-width:600px)": {
            marginX: "0px",
          },
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
              color: "#1F1724",
              padding: "5px",
              fontFamily: "Karla",
              textAlign: "center",
              width: "100%",
              fontWeight: "bold",
            }}
          >
            Total: {order.total}$
          </Box>
        </Card>
      <ClearCart />
    </Box>
  );
}
