import AddButton from "@/app/ui/AddButton";
import { getProductById } from "@/data";
import "@fontsource/josefin-sans";
import { Box, CardMedia, Typography } from "@mui/material";

type PageProps = { params: { slug: string } };

export default function ProductPage({ params }: PageProps) {
  const product = getProductById(params.slug);
  if (!product) {
    return (
      <main>
        <h1>Product does not exist...</h1>
      </main>
    );
  }

  return (
    <Box
      component="main"
      sx={{
        padding: "10px 20px",
        background: "#F9F1EC",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <Box component="div" sx={{ width: "100%", height: "40vh" }}>
        <CardMedia
          component="img"
          image={product.image}
          alt={product.title}
          sx={{
            maxWidth: "100%",
            height: "auto",
          }}
        />
      </Box>
      <Box
        component="div"
        sx={{
          backgroundColor: "white",
          borderRadius: "15px",
          padding: "20px 40px",
        }}
      >
        <Box
          component="div"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Box component="div">
            <Typography
              variant="h5"
              data-cy="product-title"
              sx={{ fontFamily: "josefin sans" }}
            >
              {product.title}
            </Typography>

            <Box sx={{ display: "flex", gap: "15px" }}>
              <Typography
                data-cy="product-price"
                sx={{
                  fontFamily: "josefin sans",
                  color: "black",
                  marginBottom: "10px",
                  ...(product.salePrice && { textDecoration: "line-through" }),
                }}
              >
                {product.price} :-
              </Typography>

              {product.salePrice && (
                <Typography
                  sx={{
                    fontFamily: "josefin sans",
                    color: "red",
                    marginBottom: "10px",
                  }}
                >
                  {product.salePrice} :-
                </Typography>
              )}
            </Box>
          </Box>
          <AddButton product={product} />
        </Box>
        <Typography
          data-cy="product-description"
          sx={{ marginTop: "15px", fontFamily: "josefin sans" }}
        >
          {product.description}
        </Typography>
      </Box>
    </Box>
  );
}
