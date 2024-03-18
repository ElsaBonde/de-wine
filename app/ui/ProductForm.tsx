import { Product } from "@/data";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Grid, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ProductSchema, useAdminContext } from "./AdminContext";

interface Props {
  product?: Product;
  onSave: (product: Product) => void;
}

export default function ProductForm(props: Props) {
  const isEdit = Boolean(props.product);
  const router = useRouter();
  const { addProduct } = useAdminContext();

  const { register, formState, handleSubmit } = useForm<Product>({
    defaultValues: props.product || { id: Date.now().toString() },
    resolver: zodResolver(ProductSchema),
  });

  const onSubmit = (formData: Product) => {
    if (isEdit) {
      props.onSave({ ...props.product, ...formData });
    } else {
      addProduct(formData);
    }

    router.push("/admin");
    console.log(formData);
  };

  return (
    <Grid
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      container
      spacing={3}
      data-cy="product-form"
    >
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="image"
          label="Image"
          fullWidth
          variant="standard"
          {...register("image")}
           inputProps={{ "data-cy": "product-image" }}
        />
        {formState.errors.image && <p>{formState.errors.image.message}</p>}
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="title"
          label="Title"
          fullWidth
          variant="standard"
          {...register("title")}
          inputProps={{ "data-cy": "product-title" }}
        />
        {formState.errors.title && <p>{formState.errors.title.message}</p>}
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="price"
          label="Price"
          fullWidth
          variant="standard"
          {...register("price")}
          inputProps={{ "data-cy": "product-price" }}
        />
        {formState.errors.price && <p>{formState.errors.price.message}</p>}
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          /* id="outlined-textarea" */
          id="description"
          label="Description"
          /* multiline */
          rows={4}
          fullWidth
          variant="standard"
          {...register("description")}
          inputProps={{ "data-cy": "product-description" }}
        />
        {formState.errors.description && (
          <p>{formState.errors.description.message}</p>
        )}
      </Grid>
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
  );
}
