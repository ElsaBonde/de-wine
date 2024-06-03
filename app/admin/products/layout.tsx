import { getProducts } from "@/app/actions/productActions";
import { Divider, Grid } from "@mui/material";
import { PropsWithChildren } from "react";
import ProductRow from "../ProductRow";
import ProductList from "../ProductList";
import { Product } from "@prisma/client";

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
      <Divider sx={{marginTop: "35px"}} />
      <Grid container spacing={4} sx={{ marginTop: "0px" }}>
        {products.map((product) => (
        <ProductList key={products[0].id} products={products} />
      ))}
      </Grid>
      {props.children}
    </>
  );
}
