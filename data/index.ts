
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
 export const mockedProducts: Product[] = [
  {
    id: "1",
    image: "/redWine.jpeg",
    title: "Luxury Box",
    description: "Indulge in the exquisite flavors and aromas of our curated collection of fine wines. From the rolling hills of Bordeaux to the sun-drenched valleys of Napa, each bottle tells a story of craftsmanship and passion.",
    price: 19999,
  }, 
  {
      id: "2",
      image: "/redWine2.jpeg",
      title: "Sommelier's Selection",
      description: "Delve into a world of sophisticated flavors with our Sommelier's Selection. Handpicked from renowned vineyards worldwide, this curated assortment features an array of premium reds, whites, and rosés, meticulously chosen to elevate your wine journey to new heights.",
      price: 1599,
  }, 
  {
      id: "3",
      image: "/wine.jpeg",
      title: "Taste of Tuscany",
      description: "Experience the essence of Italy with our Taste of Tuscany collection. Indulge in a selection of robust reds and crisp whites, sourced from the sun-kissed vineyards of the Tuscan countryside. Each bottle encapsulates the rich heritage and unparalleled craftsmanship of this renowned winemaking region.",
      price: 2000,
  }, 
  {
      id: "4",
      image: "/wine2.jpeg",
      title: "Globetrotter's Discovery",
      description: "Embark on a journey around the world from the comfort of your glass with our Globetrotter's Discovery. Featuring a diverse ensemble of wines from France, Spain, Argentina, and beyond, this collection promises to awaken your palate and ignite your wanderlust with every sip.",
      price: 1799,
  }, 
  {
      id: "5",
       image: "wine3.jpeg", 
      title: "Sunset Serenade",
      description: "Unwind in style with our Sunset Serenade collection. Delight in a symphony of flavors as you sip on a selection of velvety reds and crisp whites, perfectly paired to complement the tranquil hues of twilight. Let each bottle transport you to a blissful moment of relaxation and indulgence.",
      price: 1499,
      
  },
  {
      id: "6",
       image: "/wine4.jpeg", 
      title: "The Wallet-friendly",
      description: "Introducing our selection of wallet-friendly wines that don't compromise on quality. Whether you're hosting a casual get-together or unwinding after a long day, these bottles offer great value without breaking the bank.",
      price: 700,
  },
  ];

   export function getProductById(slug: string) {
    const product = mockedProducts.find(product => product.id === slug);
    if (product) {
  
      product.image = getImageSrc(product.image);
    }
    return product;
  }
  // Funktion för att spara produkter till local storage
export function saveProductsToLocalStorage(products: Product[]) {
  try {
    // Konvertera produkterna till en JSON-sträng och spara den i local storage under en viss nyckel
    localStorage.setItem('products', JSON.stringify(products));
    console.log('Products saved to local storage successfully!');
  } catch (error) {
    console.error('Error saving products to local storage:', error);
  }
}
 

  
  function getImageSrc(image: string) {
    return image; 
  }