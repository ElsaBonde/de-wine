import ArchiveIcon from "@mui/icons-material/Archive";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { Product } from "@prisma/client";
import { useState } from "react";

interface ArchiveButtonProps {
  product: Product;
  onArchive: (productId: string) => void;
}

// beteende för att ta bort en produkt, öppnar en dialogruta för att bekräfta arkivering
export default function ArchiveButton({
  product,
  onArchive,
}: ArchiveButtonProps) {
  const [open, setOpen] = useState(false);

  const handleArchive = () => {
    onArchive(product.id);
    setOpen(false);
  };

  return (
    <>
      <IconButton
        sx={{
          color: "text.secondary",
          "&:hover": { color: "black", backgroundColor: "white" },
        }}
        onClick={() => setOpen(true)}
      >
        <ArchiveIcon />
      </IconButton>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{"Archive"}</DialogTitle>
        <DialogContent>
          <Typography>{`Are you sure you want to archive "${product.title}"?`}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleArchive} style={{ color: "red" }}>
            Archive
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
