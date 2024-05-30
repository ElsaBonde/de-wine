import { getProducts } from "@/app/actions/productActions";
import { Grid } from "@mui/material";
import ProductRow from "../ProductRow";
import AddProductCard from "../addProductCard";
import { PropsWithChildren } from "react";

export default async function ProductsPage(props: PropsWithChildren) {
  const products = await getProducts();

  if (!products) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <AddProductCard />
      <Grid container spacing={4} sx={{ marginTop: "0px" }}>
        {products.map((product) => (
          <ProductRow key={product.id} product={product} />
        ))}
      </Grid>
      {props.children}
    </>
  );
}
