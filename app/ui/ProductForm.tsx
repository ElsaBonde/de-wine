"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ProductCreate, createProduct } from "../actions/productActions";
import FormCategories from "./formCategories";

interface ProductFormProps {
  onSave: (product: ProductCreate) => Promise<void>;
}

export const ProductSchema = z.object({
  image: z.string().url({ message: "Please enter a valid URL-link" }),
  title: z.string().min(1, { message: "Please enter a valid title" }),
  price: z.coerce
    .number()
    .min(1, { message: "Please name a price for this product." }),
  description: z.string().min(1, { message: "Please write a desription." }),
  inventory: z.coerce
    .number()
    .min(1, { message: "Please enter the amount of products in stock." }),
  categories: z
    .array(z.string())
    .min(1, { message: "Please select at least one category." }),
});

export default function ProductForm({ onSave }: ProductFormProps) {
  const router = useRouter();

  const { register, formState, handleSubmit } = useForm<ProductCreate>({
    resolver: zodResolver(ProductSchema),
  });

 /*  const onSubmit = async (formData: ProductCreate, event: React.FormEvent) => {
    try {
      event.preventDefault();
      console.log("Form data:", formData);
      const result = await handleSubmit(onSubmit)(formData);
      console.log("handleSubmit result:", result);
      await createProduct(formData);
      router.push("/admin"); //tillbaka till admin när ny produkt sparats
    } catch (error) {
      console.error("Error saving product:", error);
    }
  }; */

  const onSubmit = async (formData: ProductCreate) => {
    try {
      if (productId) {
 
        console.log(productId)
        await updateProduct(productId, formData); // Anropa updateProduct med produktens ID och formulärdata
      } else {
        await createProduct(formData); // Skapa ny produkt med formulärdata
      }
      router.push("/admin");
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  return (
    <Grid
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      container
      spacing={3}
      data-cy="product-form"
    >
      <Grid item xs={12}>
        <TextField
          id="image"
          label="Image"
          fullWidth
          variant="standard"
          {...register("image")}
          inputProps={{ "data-cy": "product-image" }}
        />
        {formState.errors.image && (
          <Typography data-cy="product-image-error">
            {formState.errors.image.message}
          </Typography>
        )}
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="title"
          label="Title"
          fullWidth
          variant="standard"
          {...register("title")}
          inputProps={{ "data-cy": "product-title" }}
        />
        {formState.errors.title && (
          <Typography data-cy="product-title-error">
            {formState.errors.title.message}
          </Typography>
        )}
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="price"
          label="Price"
          fullWidth
          variant="standard"
          {...register("price")}
          inputProps={{ "data-cy": "product-price" }}
        />
        {formState.errors.price && (
          <Typography data-cy="product-price-error">
            {formState.errors.price.message}
          </Typography>
        )}
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="description"
          label="Description"
          rows={4}
          fullWidth
          variant="standard"
          {...register("description")}
          inputProps={{ "data-cy": "product-description" }}
        />
        {formState.errors.description && (
          <Typography data-cy="product-description-error">
            {formState.errors.description.message}
          </Typography>
        )}
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="inventory"
          label="Inventory"
          fullWidth
          variant="standard"
          {...register("inventory")}
          inputProps={{ "data-cy": "product-inventory" }}
        />
        {formState.errors.inventory && (
          <Typography data-cy="product-inventory-error">
            {formState.errors.inventory.message}
          </Typography>
        )}
      </Grid>
      <FormCategories />
      <Grid item xs={12}>
        <Button
          type="submit"
          sx={{
            backgroundColor: "#F1DDCF",
            color: "#881C1C",
            marginTop: "10px",
            fontWeight: "bold",
            justifyContent: "center",
          }}
        >
          Save
        </Button>
      </Grid>
    </Grid>
  );
}
