import {
  getCategoryByTitle,
  getProductsByCategory,
} from "@/app/actions/categoryActions";
import AddButton from "@/app/ui/AddButton";
import VideoCategory from "@/app/ui/VideoCategory";
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

type PageProps = { params: { slug: string } };

export default async function CategoryPage({ params }: PageProps) {
  const category = await getCategoryByTitle(params.slug);

  if (!category) {
    return (
      <main>
        <h1>Category does not exist... yet 😊</h1>
      </main>
    );
  }

  const products = await getProductsByCategory(category.id);
  const activeProducts = products.filter((product) => !product.isArchived);

  return (
    <Box sx={{ padding: "10px 20px", marginX: { xs: "0px", md: "100px" } }}>
      <VideoCategory category={category} />
      <Divider>
        <Typography
          variant="h4"
          sx={{
            fontFamily: "Josefin sans",
            textAlign: "center",
            marginY: "15px",
          }}
        >
          Our {category.title} wines:
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
                color: "#1F1724",
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
                            color: "#1F1724",
                            marginBottom: "10px",
                          }}
                        >
                          {product.price.toString()}
                        </Typography>
                      </Box>
                    </Box>
                    <CardActions>
                      <AddButton product={product} isProductPage={false} />
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
