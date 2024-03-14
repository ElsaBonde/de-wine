import { products } from "@/data";
import {
  Box,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import AddButton from "../ui/AddButton";

export default function AdminPage() {
  return (
    <Box component="main" sx={{ background: "#F9F1EC", padding: "10px 20px" }}>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id} data-cy="product">
            <Link
              component={NextLink}
              href={`/product/${product.id}`}
              sx={{
                textDecoration: "none",
                color: "black",
              }}
            >
              <CardActionArea sx={{ background: "white", borderRadius: "8px" }}>
                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.title}
                  sx={{
                    maxWidth: "100%",
                    height: "auto",
                  }}
                />
                <CardContent>
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        data-cy="product-title"
                        sx={{
                          fontFamily: "josefin sans",
                          "&:hover": { color: "#881C1C" },
                        }}
                      >
                        {product.title}
                      </Typography>
                      <Typography data-cy="product-id">{product.id}</Typography>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        data-cy="product-price"
                        sx={{ fontFamily: "josefin sans" }}
                      >
                        {product.price} :-
                      </Typography>
                    </Box>
                    <CardActions>
                      <AddButton product={product} />
                    </CardActions>
                  </Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    data-cy="product-description"
                    sx={{ fontFamily: "josefin sans" }}
                  >
                    {product.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
