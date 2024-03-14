import AddButton from "@/app/ui/AddButton";
import { getProductById } from "@/data";
import "@fontsource/josefin-sans";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

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
        <Image
          src={product.image}
          alt={product.title}
          width={100}
          height={100}
          style={{
            width: "inherit",
            height: "inherit",
            objectFit: "contain",
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
        <Typography
          variant="h5"
          data-cy="product-title"
          sx={{ fontFamily: "josefin sans" }}
        >
          {product.title}
        </Typography>
        <Typography data-cy="product-price" sx={{ fontFamily: "josefin sans" }}>
          {product.price}
        </Typography>
        <Typography
          data-cy="product-description"
          sx={{ marginTop: "15px", fontFamily: "josefin sans" }}
        >
          {product.description}
        </Typography>
        <AddButton product={product} />
      </Box>
    </Box>
  );
}
