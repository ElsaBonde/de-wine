import { getProductById } from "@/app/actions/productActions";
import AddButton from "@/app/ui/AddButton";
import "@fontsource/josefin-sans";
import { Box, CardMedia, Divider, Typography } from "@mui/material";

type PageProps = { params: { slug: string } };

export default async function ProductPage({ params }: PageProps) {
  const product = await getProductById(params.slug);

  if (!product) {
    return (
      <main>
        <h1>Product does not exist...</h1>
      </main>
    );
  } else if (product.isArchived) {
    return (
      <main>
        <h1>Product has been discontinued... 😭</h1>
      </main>
    );
  }

  return (
    <Box
      component="main"
      sx={{
        padding: "10px 20px",
        background: "white ",
        display: "flex",
        flexDirection: "column",
        gap: "25px",
      }}
    >
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "column",
            md: "row",
          },
        }}
      >
        {/*  box för produktens bild */}
        <Box component="div" sx={{ width: "100%", height: "40vh" }}>
          <CardMedia
            component="img"
            image={product.image}
            alt={product.title}
            sx={{
              maxWidth: "100%",
              height: "auto",
              minHeight: "40vh",
              borderRadius: {
                xs: "15px 15px 0px 0px",
                md: "15px 0px 0px 15px",
              },
            }}
          />
        </Box>

        <Box /* box där informationen om produkten ligger */
          component="div"
          sx={{
            backgroundColor: "white",
            borderRadius: { xs: "0px 0px 15px 15px", md: "0px 15px 15px 0px" },
            padding: "20px 40px",
            height: "100%",
          }}
        >
          <Box
            component="div"
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Box component="div">
              {" "}
              {/* boxen där texten och sånt ligger */}
              <Typography variant="h5" sx={{ fontFamily: "josefin sans" }}>
                {product.title}
              </Typography>
              <Box sx={{ display: "flex", gap: "15px" }}>
                <Typography
                  sx={{
                    fontFamily: "josefin sans",
                    color: "black",
                    marginBottom: "10px",
                  }}
                >
                  {product.price.toString()}$
                </Typography>
              </Box>
            </Box>
            <Box sx={{ cursor: "pointer" }}>
              <AddButton product={product} />
            </Box>
          </Box>
          <Typography sx={{ marginTop: "15px", fontFamily: "josefin sans" }}>
            {product.description}
          </Typography>
          <Divider sx={{ margin: "20px 0px" }} />
          <Box>
            <Typography
              variant="h5"
              sx={{ fontFamily: "josefin sans", marginBottom: "10px" }}
            >
              Enjoy with:
            </Typography>
            <Typography sx={{ fontFamily: "josefin sans" }}>
              {/* {product.compatibility} */} här kan vi lägga in lite käck text
              om något, kanske lägga till ett attribut i databasen för detta? de
              blir lite snyggare när det är uppdelat. Nu skriver jag rätt mycket
              här för att se ungefär hur de skulle se ut om vi gjorde så här,
              men ni fattar poängen? tralala
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
