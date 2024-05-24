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
import { deleteProduct } from "../actions/productActions";
import DeleteButton from "../ui/DeleteButton";
import AddProductCard from "./addProductCard";

interface ShowProductsProps {
  products: Product[];
}

export default function ShowProducts({ products }: ShowProductsProps) {
  if (!products) {
    return <div>Loading...</div>;
  }

  const handleDelete = async (productId: string) => {
    console.log("Deleting product with id: ", productId); //visar id på produkten som ska tas bort
    await deleteProduct(productId);
  };

  return (
    <Grid container spacing={4} sx={{ marginTop: "0px" }}>
      <AddProductCard />
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} key={product.id} data-cy="product">
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
                    {product.price.toString()} :-
                  </Typography>
                </Box>
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
            <CardActions>
              <DeleteButton product={product} onDelete={handleDelete} />
              <Link href={`/admin/product/${product.id}`}>
                <ModeEditOutlineOutlinedIcon
                  sx={{
                    color: "text.secondary",
                    "&:hover": { color: "#881c1c" },
                  }}
                  data-cy="admin-edit-product"
                />
              </Link>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
