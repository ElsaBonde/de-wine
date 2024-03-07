import AddButton from "@/app/ui/AddButton";
import { getProductById } from "@/data";
import { Typography } from "@mui/material";

type PageProps = { params: { slug: string } };

export default function ProductPage({ params }: PageProps) {
  const product = getProductById(params.slug);
  if (!product) {
    return (
      <main>
        <h1>Product does not exist...</h1>
      </main>
    );
  }

  return (
    <main style={{padding: "10px 20px"}}>
      <img src={product.image} alt={product.title} width={200} height={200} />
      {/* david behöver fixa, måste va img och inte image för att funka i cypress */}
      <Typography variant="h5" data-cy="product-title">
        {product.title}
      </Typography>
      <Typography data-cy="product-price">{product.price}</Typography>
      <hr />
      <Typography data-cy="product-description">
        {product.description}
      </Typography>
      <AddButton add={1} />
    </main>
  );
}
