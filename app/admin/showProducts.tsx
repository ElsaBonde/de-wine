import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { Product } from "@prisma/client";
import { archiveProduct } from "../actions/productActions";
import DeleteButton from "../ui/DeleteButton";
import AddProductCard from "./addProductCard";

interface ShowProductsProps {
  products: Product[];
}

export default function ShowProducts({ products }: ShowProductsProps) {
  if (!products) {
    return <div>Loading...</div>;
  }

  const handleArchive = async (productId: string) => {
    await archiveProduct(productId);
  };

  return (
    <>
      <AddProductCard />
      <Grid container spacing={4} sx={{ marginTop: "0px" }}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card sx={{ background: "white", borderRadius: "8px" }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.title}
                  sx={{
                    maxWidth: "100%",
                    height: "auto",
                  }}
                />
              </CardActionArea>
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
                      sx={{
                        fontFamily: "josefin sans",
                        "&:hover": { color: "#881C1C" },
                      }}
                    >
                      {product.title}
                    </Typography>
                    <Typography>{product.id}</Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ fontFamily: "josefin sans" }}
                    >
                      {product.price.toString()} :-
                    </Typography>
                  </Box>
                </Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontFamily: "josefin sans" }}
                >
                  {product.description}
                </Typography>
              </CardContent>
              <CardActions>
                <DeleteButton product={product} onDelete={handleArchive} />
                <Link href={`/admin/product/${product.id}`}>
                  <ModeEditOutlineOutlinedIcon
                    sx={{
                      color: "text.secondary",
                      "&:hover": { color: "#881c1c" },
                    }}
                  />
                </Link>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
