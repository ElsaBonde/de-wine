import { getProductById } from "@/app/actions/productActions";
import EditProductModal from "@/app/ui/Modal";
import ProductForm from "@/app/ui/ProductForm";
import { Box } from "@mui/material";

type PageProps = { params: { slug: string } };

export default async function EditProductPage({ params }: PageProps) {
  const product = await getProductById(params.slug);
  if (product) {
    const categoryIds = product.categories.map((category) => category.id);

    const defaultValues = {
      ...product,
      categories: categoryIds,
    };

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
          {/* Skicka produktdata som defaultValues till ProductForm */}
          {product && <ProductForm defaultValues={defaultValues} />}
        </Box>
      </EditProductModal>
    );
  }
}
