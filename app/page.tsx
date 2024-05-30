import "@fontsource/josefin-sans";
import {
  Box,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import { getProducts } from "./actions/productActions";
import AddButton from "./ui/AddButton";
import CategoriesCards from "./ui/CategoriesCards";

export default async function StartPage() {
  const products = await getProducts();
  const activeProducts = products.filter((product) => !product.isArchived);

  return (
    <Box component="main" sx={{ background: "white ", padding: "10px 20px" }}>
      <CategoriesCards />
      <Divider>
        <Typography
          variant="h4"
          sx={{
            fontFamily: "Josefin sans",
            textAlign: "center",
            marginY: "15px",
          }}
        >
          Our wine boxes:
        </Typography>
      </Divider>
      <Grid container spacing={4}>
        {activeProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Link
              component={NextLink}
              href={`/product/${product.id}`}
              sx={{
                textDecoration: "none",
                color: "black",
              }}
            >
              <CardActionArea
                sx={{
                  background: "white",
                  borderRadius: "8px",
                  "&:hover": {
                    transform: "scale(1.02)",
                    transition: "transform 0.6s",
                  },
                }}
              >
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
                        variant="h5"
                        component="div"
                        sx={{
                          fontFamily: "josefin sans",
                          "&:hover": { color: "white" },
                        }}
                      >
                        {product.title}
                      </Typography>

                      <Box sx={{ display: "flex", gap: "15px" }}>
                        <Typography
                          variant="body1"
                          color="text.secondary"
                          sx={{
                            fontFamily: "josefin sans",
                            color: "black",
                            marginBottom: "10px",
                            ...(product.salesPrice && {
                              textDecoration: "line-through",
                            }), //överstruket på normalpris om reapris finns
                          }}
                        >
                          {product.price.toString()} $
                        </Typography>

                        {product.salesPrice && (
                          <Typography
                            variant="body1"
                            color="red" //röd färg på reapris
                            sx={{
                              fontFamily: "josefin sans",
                              color: "red",
                              marginBottom: "10px",
                            }}
                          >
                            {product.salesPrice.toString()} $
                          </Typography>
                        )}
                      </Box>
                    </Box>
                    <CardActions>
                      <AddButton product={product} />
                    </CardActions>
                  </Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
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
