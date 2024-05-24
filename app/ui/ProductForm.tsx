"use client";
 
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { ProductCreate, createProduct } from "../actions/productActions";
import FormCategories from "./formCategories";
import SelectCategories from "./SelectCategories";
import { getCategoryByTitle } from "../actions/categoryActions";
 
interface ProductFormProps {
  onSave: (product: ProductCreate) => Promise<void>;
  product? : ProductCreate;
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
    .min(1, { message: "Please select at least one category." })
    .optional(),
});
 
export default function ProductForm({ onSave, product }: ProductFormProps) {
  const router = useRouter();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [defaultCategories, setDefaultCategories] = useState<string[]>([]);
 
  const form = useForm<ProductCreate>({
    resolver: zodResolver(ProductSchema),
    defaultValues: product || {
      image: "",
      title: "",
      price: 0,
      description: "",
      inventory: 0,
      categories: defaultCategories,
    }
  });
 
  const { register, formState, handleSubmit, setValue } = form;
 
  useEffect(() => {
    if (product) {
      product.categories.forEach(async (category) => {
        const existingCategory = await getCategoryByTitle(category.title);
        if (existingCategory) {
          setValue("categories", [...product.categories]);
        }
      });
    }
  }, [defaultCategories, product, setValue]);
 
 
  const onSubmit = async (formData: ProductCreate) => {
    const combinedData = {
      ...formData,
      categories: selectedCategories,
    };
    try {
      await createProduct(combinedData);
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
        />
        {formState.errors.inventory && (
          <Typography data-cy="product-inventory-error">
            {formState.errors.inventory.message}
          </Typography>
        )}
      </Grid>
      <SelectCategories
        categories={selectedCategories}
        onChange={setSelectedCategories}
      />
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
 