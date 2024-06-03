import { getProducts } from "@/app/actions/productActions";
import { Divider, Grid } from "@mui/material";
import { PropsWithChildren } from "react";
import ProductRow from "../ProductRow";

export default async function ProductsPage(props: PropsWithChildren) {
  const products = await getProducts();

  if (!products) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Divider sx={{marginTop: "35px"}} />
      <Grid container spacing={4} sx={{ marginTop: "0px" }}>
        {products.map((product) => (
          <ProductRow key={product.id} product={product} />
        ))}
      </Grid>
      {props.children}
    </>
  );
}
