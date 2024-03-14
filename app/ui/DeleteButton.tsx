import { Product } from "@/data";
import { IconButton } from "@mui/material";

export default function DeleteButton({ product }: { product: Product }) {
  const { deleteProduct } = useAdmin();
  return (
    <IconButton
      data-cy="delete-product"
      onClick={() => deleteProduct(product.id)}
    >
    </IconButton>
  );
}
