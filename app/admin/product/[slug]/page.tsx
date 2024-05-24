import EditProductModal from "@/app/ui/Modal";
import ProductForm from "@/app/ui/ProductForm";
import { db } from "@/prisma/db";
import { Box } from "@mui/material";
import { getProductById } from "@/app/actions/productActions";

type PageProps = { params: { slug: string } };

export default async function EditProductPage({ params }: PageProps) {
  const product = await getProductById(params.slug);

  if (!product) {
    return (
      <main>
        <h1>Product does not exist...</h1>
      </main>
    );
  }

  return (
    <EditProductModal>
      <Box
        component="main"
        sx={{
          padding: "25px",
          bgcolor: "background.paper",
          width: "100%",
          maxWidth: "500px",
          margin: "15px",
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
        }}
      >
        {product && <ProductForm product={product} />}
      </Box>
    </EditProductModal>
  );
}
