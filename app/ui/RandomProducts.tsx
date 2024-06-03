"use client";

import {
  Box,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Product, getProducts } from "../actions/productActions";
import AddButton from "./AddButton";

type Props = {
  currentProductId: string;
};

export default function RandomProducts({ currentProductId }: Props) {
  const [randomProducts, setRandomProducts] = useState<Product[]>([]);

  useEffect(() => {
    const handleRandomProducts = async () => {
      const products = await getProducts();
      const activeProducts = products.filter(
        (product) => !product.isArchived && product.id !== currentProductId
      );
      const randomProducts = activeProducts
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);
      setRandomProducts(randomProducts);
    };

    handleRandomProducts();
  }, [currentProductId]);

  return (
    <Box sx={{ padding: "10px 20px", display: { xs: "none", md: "block" } }}>
      <Box>
        <Typography
          variant="h5"
          sx={{ fontFamily: "josefin sans", paddingBottom: "10px" }}
        >
          You might also like:
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {randomProducts.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <CardActionArea>
              ¨
              <Box sx={{ overflow: "hidden" }}>
                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.title}
                  sx={{
                    objectFit: "cover",
                    height: "auto",
                    transition: "transform 0.8s",
                    "&:hover": {
                      transform: "scale(1.1)",
                    },
                  }}
                />
              </Box>
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "Josefin sans",
                    }}
                  >
                    {product.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Josefin sans",
                    }}
                  >
                    {product.price}$
                  </Typography>
                </Box>
                <Box>
                  <AddButton product={product} isProductPage={false} />
                </Box>
              </CardContent>
            </CardActionArea>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
