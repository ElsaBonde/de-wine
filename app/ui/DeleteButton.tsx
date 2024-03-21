import { Product } from "@/data";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { useState } from "react";

interface DeleteButtonProps {
  product: Product;
  onDelete: (productId: string) => void;
}

// beteende för att ta bort en produkt, öppnar en dialogruta för att bekräfta borttagning
export default function DeleteButton({ product, onDelete }: DeleteButtonProps) {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    onDelete(product.id);
    setOpen(false);
  };

  return (
    <>
      <IconButton
        sx={{
          color: "text.secondary",
          "&:hover": { color: "#881c1c", backgroundColor: "white" },
        }}
        data-cy="admin-remove-product"
        onClick={() => setOpen(true)}
      >
        <DeleteIcon />
      </IconButton>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{"Delete"}</DialogTitle>
        <DialogContent>
          <Typography>{`Are you sure you want to delete "${product.title}"?`}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            onClick={handleDelete}
            style={{ color: "red" }}
            data-cy="confirm-delete-button"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
