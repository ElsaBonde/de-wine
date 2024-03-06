import { getProductById } from "@/data";
import Image from "next/image";

type PageProps = { params: { slug: string } };

export default function ProductPage({ params }: PageProps) {
  const productData = getProductById(params.slug);
  if (!productData) {
    return (
      <main className="p-4">
        <h1>Product does not exist.</h1>
      </main>
    );
  }

  return (
    <main className="p-4">
      <Image
        src={productData.image}
        alt={productData.title}
        width={200}
        height={200}
      />
      <h2 className="text-5xl mt-4 mb-4" data-cy="product-title">{productData.title}</h2>
      <p className="text-2xl mt-4 mb-2" data-cy="product-price">{productData.price}</p>
      <hr className="border-stone-300" />
      <p className="py-2" data-cy="product-description">{productData.description}</p>
    </main>
  );
}
