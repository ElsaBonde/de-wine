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
  salePrice?: number;
  compatibility: string;
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
    salePrice: 16999,
    compatibility: "From rich and robust Cabernet Sauvignons perfect for hearty beef dishes to elegant Pinot Noirs that beautifully accompany roasted poultry and salmon. These wines are also versatile companions to artisanal cheeses and decadent chocolate desserts. Elevate your dining experience with the perfect pairing from our Luxury Box.",
  },
  {
    id: "2",
    image: "https://i.ibb.co/LRpW3QX/redWine2.jpg",
    title: "Sommelier's Pick",
    description:
      "Discover sophisticated flavors with our Sommelier's Pick. Meticulously chosen to elevate your experience. From bold Cabernet Sauvignons to elegant Merlots, each bottle promises to elevate your palate. Immerse yourself in luxury as you explore the complexities of these exceptional reds.",
    price: 1599,
    compatibility: "Savor these handpicked red wines, each meticulously selected to elevate your dining experience. With bold Cabernet Sauvignons perfect for pairing with hearty beef dishes and elegant Merlots ideal for chicken, pasta, and soft cheeses, these wines are versatile companions for a variety of culinary adventures. Whether you're hosting a dinner party with friends, enjoying a cozy evening in, or celebrating a special occasion, these wines will enhance the moment with their rich flavors and smooth textures.",
  },
  {
    id: "3",
    image: "https://i.ibb.co/18JL0PW/wine.jpg",
    title: "Taste of Tuscany",
    description:
      "Experience Italy's essence with our Tuscan Revelry collection. Savor robust reds and crisp whites from Tuscany's sun-kissed vineyards. Each bottle encapsulates the region's rich heritage and craftsmanship, promising an unforgettable journey. Let the journey begin.",
    price: 2000,
    salePrice: 1549,
    compatibility: "Savor a versatile selection of red, white, and sparkling wines perfect for any occasion. The bold reds, such as the Viliera, complement rich meat dishes like steak and lamb, while the crisp whites, like Chardonnay, pair beautifully with seafood and poultry. The sparkling wine adds a touch of celebration, perfect for toasting special moments or enjoying with appetizers. Whether you're hosting a dinner party, celebrating with friends, or simply unwinding after a long day, this box offers something for every palate and every moment.",
  },
  {
    id: "4",
    image: "https://i.ibb.co/26KrQHp/wine2.jpg",
    title: "Globe Discovery",
    description:
      "Embark on a journey around the world from the comfort of your glass with our Globetrotter's Discovery. Featuring a diverse ensemble of wines from France, Spain, Argentina, and beyond, this collection promises to awaken your palate and ignite your wanderlust with every sip.",
    price: 1799,
    compatibility: "Indulge in our 'Globe Discovery' collection, a global odyssey through the world of wine. Featuring two robust reds, two refreshing rosés, and two crisp whites sourced from France, Spain and Argentina, this selection promises to delight every palate. Pair the rich reds with hearty beef dishes or savory stews, while the vibrant rosés complement light salads and seafood. For a refreshing accompaniment to warm evenings, enjoy the crisp whites with grilled chicken or fresh pasta dishes. Explore the flavors of the world with each sip, making every meal an adventure to remember. Explore the flavors of the world with each sip, making every meal an adventure to remember.",
  },
  {
    id: "5",
    image: "https://i.ibb.co/k5tL4J9/wine3.jpg",
    title: "Sunset Serenade",
    description:
      "Indulge in the tranquil ambiance of twilight with our Sunset Serenade collection, featuring a symphony of flavors in velvety reds, crisp whites, and refreshing rosé wines. Each bottle promises to transport you to a blissful moment of relaxation, making every sip a memorable experience.",
    price: 1499,
    compatibility: "Unbox a delightful selection of wines with our 'Sunset Serenade' collection, featuring three exquisite reds, a refreshing rosé, and two crisp whites. Whether you're hosting a dinner party or enjoying a quiet evening at home, these wines offer versatility and sophistication. Pair the robust reds with grilled meats or hearty pasta dishes, while the crisp whites beautifully complement seafood and salads. The refreshing rosé adds a touch of elegance to any occasion, making this collection a perfect choice for wine enthusiasts seeking variety and quality. Elevate your dining experience with these carefully curated wines, enhancing the flavors of your favorite dishes and creating unforgettable culinary moments",
  },
  {
    id: "6",
    image: "https://i.ibb.co/rM4bJJy/wine4.jpg",
    title: "The Wallet-friendly",
    description:
      "Introducing our budget-friendly wine collection, where quality meets affordability. Ideal for casual gatherings or relaxing moments, these bottles offer exceptional value without compromising on taste. Discover the perfect companion for any occasion without overspending.",
    price: 700,
    compatibility: "'The Wallet-friendly' wine is not only an excellent choice for any dining occasion but also pairs wonderfully with a variety of cuisines. Its versatile flavor profile, characterized by fruity notes and a balanced taste, complements a range of dishes, from pasta and pizza to grilled meats and seafood. Whether you're indulging in a cozy Italian dinner or savoring a backyard barbecue, this budget-friendly wine elevates the dining experience without overspending. Cheers to affordable good wines and delightful culinary adventures!",
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
