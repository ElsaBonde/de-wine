import { getProducts } from "@/app/actions/productActions";
import { Grid } from "@mui/material";
import { Product } from "@prisma/client";
import { PropsWithChildren } from "react";
import ProductList from "../ProductList";

interface ProductListProps {
  products: Product[];
}

export default async function ProductsPage(props: PropsWithChildren) {
  const products = await getProducts();

  if (!products) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Grid container spacing={4} sx={{ marginTop: "35px" }}>
        <ProductList products={products} />
      </Grid>
      {props.children}
    </>
  );
}
