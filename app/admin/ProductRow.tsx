"use client";

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
import ArchiveButton from "../ui/DeleteButton";

interface Props {
  product: Product;
}

export default function ProductRow({ product }: Props) {
  const handleArchive = async (productId: string) => {
    await archiveProduct(productId);
  };

  return (
    <>
      <Grid item xs={12} sm={6} md={4} key={product.id}>
        <Card
          sx={{
            background: product.isArchived ? "#e7e7e7" : "white",
            borderRadius: "8px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              image={product.image}
              alt={product.title}
              sx={{
                maxWidth: "100%",
                height: "auto",
                filter: product.isArchived ? "blur(3px)" : "none",
              }}
            />
          </CardActionArea>
          {/* här lägger vi in arkiveringslogik i admin */}
          {product.isArchived && (
            <Typography
              variant="h6"
              color="#1F1724"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                marginTop: "5px",
                borderStyle: "solid",
                borderColor: "#1F1724",
              }}
            >
              ARCHIVED
            </Typography>
          )}
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
                    "&:hover": { color: "grey" },
                  }}
                >
                  {product.title}
                </Typography>
                <Typography>Product Id: {product.id}</Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ fontFamily: "josefin sans" }}
                >
                  {product.price.toString()} $
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
            <ArchiveButton product={product} onArchive={handleArchive} />
            <Link href={`/admin/products/${product.id}`}>
              <ModeEditOutlineOutlinedIcon
                sx={{
                  color: "text.secondary",
                  "&:hover": { color: "black" },
                }}
              />
            </Link>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
}
