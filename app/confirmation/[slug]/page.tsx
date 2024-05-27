import { getOrderById } from "@/app/actions/orderActions";
import ClearCart from "@/app/ui/ClearCart";
import { Box, Card, Divider, Typography } from "@mui/material";
import Image from "next/image";

type PageProps = { params: { slug: string } };

export default async function ConfirmationPage({ params }: PageProps) {
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
          {rows.map((item, index) => (
            <Card
              key={item.product.id}
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
                src={item.product.image}
                alt={item.product.title}
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
                  {item.product.title}
                </Typography>
                {item.product.salesPrice ? (
                  <>
                    <Typography
                      sx={{
                        fontFamily: "Josefin Sans",
                        color: "red",
                      }}
                    >
                      Your Price: {item.product.salesPrice * item.quantity} :-
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "Josefin Sans",
                        textDecoration: "line-through",
                      }}
                    >
                      Old Price: {item.product.price * item.quantity} :-
                    </Typography>
                  </>
                ) : (
                  <Typography sx={{ fontFamily: "Josefin Sans" }}>
                    Price: {item.product.price * item.quantity} :-
                  </Typography>
                )}

                <Typography sx={{ fontFamily: "Josefin Sans" }}>
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
          TOTAL: {order.total} SEK
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
          {order && (
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
                {order.id}
              </Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                Name: <Typography component="span">{order.name}</Typography>
              </Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                Email:{" "}
                <Typography component="span">
                  HÄR SKA SESSION IN MED EMAIL
                </Typography>
              </Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                Phone number:{" "}
                <Typography component="span">{order.phone}</Typography>
              </Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                Adress: <Typography component="span">{order.street}</Typography>
              </Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                Zip code: <Typography component="span">{order.zip}</Typography>
              </Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                City: <Typography component="span">{order.city}</Typography>
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
            <Image src="/cheers.gif" alt="cheers" width={100} height={100} />
          </Box>
        </Box>
      </Box>
      <ClearCart />
    </Box>
  );
}
