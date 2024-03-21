"use client";

import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
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
import Image from "next/image";
import { PropsWithChildren } from "react";
import { useAdminContext } from "../ui/AdminContext";
import DeleteButton from "../ui/DeleteButton";
import AddImage from "/public/AddImage.png";

export default function AdminLayout({ children }: PropsWithChildren) {
  const { products, removeProduct, editProduct } = useAdminContext();

  const handleDelete = (productId: string) => {
    removeProduct(productId);
  };

  return (
    <Box component="main" sx={{ background: "#F9F1EC", padding: "10px 20px" }}>
      {children}
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4} data-cy="admin-add-product">
          <Link
            href="/admin/product/new"
            color="text.secondary"
            sx={{ textDecoration: "none" }}
          >
            <CardActionArea sx={{ background: "white", borderRadius: "8px" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  src={AddImage}
                  alt="addImage"
                  width={100}
                  height={100}
                  style={{ width: "75%", height: "auto", marginTop: "15px" }}
                />
              </Box>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  sx={{ fontFamily: "josefin sans", color: "black" }}
                >
                  Click to add new product
                </Typography>
                <Box sx={{ filter: "blur(2px)" }}>
                  <Typography sx={{ color: "black" }}>ID</Typography>

                  <Typography
                    sx={{
                      fontFamily: "josefin sans",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    123 :-
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontFamily: "josefin sans" }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Omnis, in a mollitia vel nulla sequi quam expedita? Incidunt
                    possimus exercitationem nisi ab expedita veritatis harum
                    iste, minus unde. Voluptatibus. Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Assumenda mollitia.
                  </Typography>
                </Box>
              </CardContent>
            </CardActionArea>
          </Link>
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
                    <Link href={`/admin/product/${product.id}`}>
                      <ModeEditOutlineOutlinedIcon
                        sx={{
                          color: "text.secondary",
                          "&:hover": { color: "#881c1c" },
                        }}
                        data-cy="admin-edit-product"
                        onClick={() => editProduct(product.id, product)}
                      />
                    </Link>
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
