import { products } from "@/data";
import { KeyboardDoubleArrowRight } from "@mui/icons-material";
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


import AddButton from "./ui/AddButton";

export default function StartPage() {
  return (
    /* får man ändra från main till box enligt cypress - fråga david! */
    <main style={{background: "#F9F1EC"}}>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id} data-cy="product">
            <Link href={`/product/${product.id}`}>
              <CardActionArea sx={{background: "white"}}>
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
                      >
                        {product.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        data-cy="product-price"
                      >
                        {product.price} :-
                      </Typography>
                    </Box>
                    <CardActions>
                      <AddButton add={1} />
                    </CardActions>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      data-cy="product-description"
                    >
                      {product.description}
                    </Typography>

                    <KeyboardDoubleArrowRight />
                  </Box>
                </CardContent>
               
              </CardActionArea>
            </Link>
          </Grid>
        ))}
      </Grid>
    </main>
  );
}

// Glöm inte, förstora bilden på "infosidan", vi påbörjade snackbar... vi påbörjade local storage...
