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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@mui/material";
import { Product } from "@prisma/client";
import { archiveProduct } from "../actions/productActions";
import ArchiveButton from "../ui/DeleteButton";
import { useState } from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import "@fontsource/karla";

interface Props {
  product: Product;
}

export default function ProductRow({ product }: Props) {
  const handleArchive = async (productId: string) => {
    await archiveProduct(productId);
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
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
            height: "100%",
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
                color: "white",
                backgroundColor: "#1F1724",
                fontFamily: "Karla"
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
                    fontFamily: "Karla",
                  }}
                >
                  {product.title}
                </Typography>
                <Typography>Product Id:</Typography>
                <Typography>{product.id}</Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ fontFamily: "Karla" }}
                >
                  {product.price.toString()} $
                </Typography>
              </Box>
            </Box>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontFamily: "Karla" }}
            >
              {product.description.substring(0, 150)}
            </Typography>
          </CardContent>
          <CardActions>
            <ArchiveButton product={product} onArchive={handleArchive} />
            <Link href={`/admin/products/${product.id}`}>
              <ModeEditOutlineOutlinedIcon
                sx={{
                  color: "text.secondary",
                  "&:hover": { color: "#1F1724" }, fontFamily: "Karla" 
                }}
              />
            </Link>
  <ArrowDropDownIcon
  onClick={handleClickOpen}
/>
<Dialog
  open={open}
  onClose={handleClose}
>
<DialogContent  style={{
    fontFamily: 'Karla, sans-serif',
  }}>
<img
    src={product.image}
    alt={product.title}
    style={{
      width: '200px',
      padding: '1em',
      objectFit: 'cover',
      borderRadius: '12px',
    }}
  />
<DialogTitle style={{ fontFamily: 'Karla'}} >{"Produktinformation"}</DialogTitle>
  <DialogContent style={{ fontFamily: 'Karla'}} >
    <DialogContentText>
      <Typography>Produkt-ID:</Typography> {product.id}
    <DialogContentText>
      <Typography>Produktpris:</Typography> {product.price} $
    </DialogContentText>
    </DialogContentText>
    <DialogContentText>
      <Typography>Produktbeskrivning:</Typography> {product.description}
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <ArrowDropDownIcon onClick={handleClose}/>
  </DialogActions>
  </DialogContent>
</Dialog>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
}
