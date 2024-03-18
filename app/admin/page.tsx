"use client";

import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import {
  Box,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useAdminContext } from "../ui/AdminContext";
import DeleteButton from "../ui/DeleteButton";
import AddImage from "/public/AddImage.png";

export default function AdminPage() {
  const { products, removeProduct, editProduct } = useAdminContext();

  const handleDelete = (productId: string) => {
    removeProduct(productId);
  };

  return (
    <Box component="main" sx={{ background: "#F9F1EC", padding: "10px 20px" }}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4}>
          <CardActionArea sx={{ background: "white", borderRadius: "8px" }}>
            <Link href="/admin/product/new">
              <Image src={AddImage} alt="hora" width={200} height={200} />
              <Typography>Title</Typography>
              <Typography>price</Typography>
              <Typography>Description</Typography>
            </Link>
          </CardActionArea>
        </Grid>

        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id} data-cy="product">
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
                    <DeleteButton product={product} onDelete={handleDelete} />
                    <ModeEditOutlineOutlinedIcon
                      onClick={() => editProduct(product.id, product)}
                    />
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
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
