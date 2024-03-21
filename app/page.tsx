import { products } from "@/data";
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
import Image from "next/image";
import NextLink from "next/link";
import AddButton from "./ui/AddButton";

export default function StartPage() {
  return (
    /* får man ändra från main till box enligt cypress - fråga david! */
    <Box component="main" sx={{ background: "#F9F1EC", padding: "10px 20px" }}>
      <Box
        sx={{ display: "flex", justifyContent: "center", padding: "10px 0px" }}
      >
        <Image
          src="https://i.ibb.co/9N98vQ0/bild-2.png"
          alt="Wine and glasses"
          width={800}
          height={400}
          style={{ width: "100%", height: "100%" }}
        />
      </Box>
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
                        data-cy="product-title"
                        sx={{
                          fontFamily: "josefin sans",
                          "&:hover": { color: "#881C1C" },
                        }}
                      >
                        {product.title}
                      </Typography>

                      <Box sx={{ display: "flex", gap: "15px" }}>
                        <Typography
                          variant="body1"
                          color="text.secondary"
                          data-cy="product-price"
                          sx={{
                            fontFamily: "josefin sans",
                            color: "black",
                            marginBottom: "10px",
                            ...(product.salePrice && {
                              textDecoration: "line-through",
                            }), //överstruket på normalpris om reapris finns
                          }}
                        >
                          {product.price} :-
                        </Typography>

                        {product.salePrice && (
                          <Typography
                            variant="body1"
                            color="red" //röd färg på reapris
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
