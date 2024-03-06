import { getProductById } from "@/data";
import { AddShoppingCart } from "@mui/icons-material";
import { Button } from "@mui/material";

type PageProps = { params: { slug: string } };

export default function ProductPage({ params }: PageProps) {
  const product = getProductById(params.slug);
  if (!product) {
    return (
      <main className="p-4">
        <h1>Product does not exist.</h1>
      </main>
    );
  }

  return (
    <main className="p-4">
      <img src={product.image} alt={product.title} width={200} height={200} />{" "}
      {/* david behöver fixa, måste va img och inte image för att funka i cypress */}
      <h2 className="text-5xl mt-4 mb-4" data-cy="product-title">
        {product.title}
      </h2>
      <p className="text-2xl mt-4 mb-2" data-cy="product-price">
        {product.price}
      </p>
      <hr className="border-stone-300" />
      <p className="py-2" data-cy="product-description">
        {product.description}
      </p>
      <Button color="primary">
        <AddShoppingCart data-cy="product-buy-button" />
      </Button>
    </main>
  );
}
