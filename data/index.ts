/**
 * Beskriver en produkt som ska säljas på sidan.
 * OBS: Kan utökas men inte ändras pga cypress.
 **/
export interface Product {
  id: string;
  image: string;
  title: string;
  description: string;
  price: number;
}
export interface CartItem extends Product {
  quantity: number;
}

/* Lägg till era produkter här */
export const products: Product[] = [
  {
    id: "1",
    image: "https://i.ibb.co/Z8mGht4/redWine.jpg", 
    title: "Luxury Box",
    description:
      "Marvel at our Luxury Box, a tribute to the elegance of red wine. Each bottle selection, carefully chosen from vineyards around the world, offers an exclusive collection of premium red wines. Experience a world of sophisticated indulgence and let your wine journey become unforgettable.",
    price: 19999,
  },
  {
    id: "2",
    image: "https://i.ibb.co/LRpW3QX/redWine2.jpg",
    title: "Sommelier's Pick",
    description:
      "Delve into a world of sophisticated flavors with our Sommelier's Pick. Handpicked from renowned vineyards worldwide, this curated assortment features an array of premium reds, whites, and rosés, meticulously chosen to elevate your wine journey to new heights. Experience luxury with each taste.",
    price: 1599,
  },
  {
    id: "3",
    image: "https://i.ibb.co/18JL0PW/wine.jpg",
    title: "Taste of Tuscany",
    description:
      "Experience Italy's essence with our Tuscan Revelry collection. Savor robust reds and crisp whites from Tuscany's sun-kissed vineyards. Each bottle encapsulates the region's rich heritage and craftsmanship, promising an unforgettable journey. Let the journey begin.",
    price: 2000,
  },
  {
    id: "4",
    image: "https://i.ibb.co/26KrQHp/wine2.jpg",
    title: "Globe Discovery",
    description:
      "Embark on a journey around the world from the comfort of your glass with our Globetrotter's Discovery. Featuring a diverse ensemble of wines from France, Spain, Argentina, and beyond, this collection promises to awaken your palate and ignite your wanderlust with every sip.",
    price: 1799,
  },
  {
    id: "5",
    image: "https://i.ibb.co/k5tL4J9/wine3.jpg",
    title: "Sunset Serenade",
    description:
      "Unwind in style with our Sunset Serenade collection. Delight in a symphony of flavors as you sip on a selection of velvety reds and crisp whites, perfectly paired to complement the tranquil hues of twilight. Let each bottle transport you to a blissful moment of relaxation and indulgence.",
    price: 1499,
  },
  {
    id: "6",
    image: "https://i.ibb.co/rM4bJJy/wine4.jpg",
    title: "The Wallet-friendly",
    description:
      "Introducing our budget-friendly wine collection, where quality meets affordability. Ideal for casual gatherings or relaxing moments, these bottles offer exceptional value without compromising on taste. Discover the perfect companion for any occasion without overspending.",
    price: 700,
  },
];

export function getProductById(slug: string) {
  const product = products.find((product) => product.id === slug);
  if (product) {
    product.image = getImageSrc(product.image);
  }
  return product;
}

function getImageSrc(image: string) {
  return image;
}
