import AddButton from "@/app/ui/AddButton";
import { getProductById } from "@/data";
import { Typography } from "@mui/material";
import Image from "next/image";
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
    <main style={{ padding: "10px 20px" }}>
      <Image src={product.image} alt={product.title} width={100} height={100} /> {/* fråga david hur fan man låter den ge oss %, auto + MQ */}

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
