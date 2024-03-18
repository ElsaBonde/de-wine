import { Product } from "@/data";
import { Grid, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

interface Props {
  product?: Product;
}

export default function ProductForm(props: Props) {
  const isEdit = Boolean(props.product);

  const form = useForm<Product>({
    defaultValues: props.product || { id: Date.now().toString() },
  });

  const save = () => {
    if (isEdit) {
      // Save Edit
    } else {
      // Add product
    }
  };

  return (
    <Grid
      component="form"
      onSubmit={form.handleSubmit(save)}
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
          /*  inputProps={{ "data-cy": "product-image" }} */
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="title"
          label="Title"
          fullWidth
          variant="standard"
          inputProps={{ "data-cy": "product-title" }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="price"
          label="Price"
          fullWidth
          variant="standard"
          inputProps={{ "data-cy": "product-price" }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="outlined-textarea"
          label="Description"
          multiline
          rows={4}
          fullWidth
          variant="standard"
          inputProps={{ "data-cy": "product-description" }}
        />
      </Grid>
    </Grid>
  );
}
