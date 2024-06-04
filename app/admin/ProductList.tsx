"use client";

import { useState } from 'react';
import { Grid } from "@mui/material";
import ProductRow from './ProductRow';
import { Product } from '@prisma/client';

interface Props {
  products: Product[];
}

export default function ProductList({ products }: Props) {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleClickOpen = (product: Product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        <ProductRow 
          key={product.id} 
          product={product} 
          open={open && selectedProduct?.id === product.id} 
          onOpen={() => handleClickOpen(product)} 
          onClose={handleClose} 
        />
      ))}
    </Grid>
  );
}
