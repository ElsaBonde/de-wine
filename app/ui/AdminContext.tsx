"use client";

import { Product } from "@/data";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { getProducts } from "../actions/productActions";

interface AdminContextValue {
  products: Product[];
  addProduct: (newProduct: Product) => void;
  editProduct: (productId: string, updatedProduct: Partial<Product>) => void;
  removeProduct: (productId: string) => void;
}

export const ProductSchema = z.object({
  image: z.string().url({ message: "Please enter a valid URL-link" }),
  title: z.string().min(1, { message: "Please enter a valid title" }),
  price: z.coerce
    .number()
    .min(1, { message: "Please name a price for this product." }),
  description: z.string().min(1, { message: "Please write a desription." }),
  compatibility: z.string().optional(),
});

export type FormProduct = z.infer<typeof ProductSchema>;

//alternativ för props
const AdminContext = createContext<AdminContextValue>({} as AdminContextValue);

// exportera contexten så att den kan användas i adminsidan
export const useAdminContext = () => useContext(AdminContext);

export const AdminProvider = ({ children }: PropsWithChildren) => {
  const [products, setProducts] = useState<Product[]>([]);

  // hämta produkter från databas via getProducts()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("There was an error fetching products", error);
      }
    };

    fetchData();
  }, []);

  //genererar id
  const generateId = (): string => {
    const longId = uuidv4(); //genererar ett långt id
    const shortIdWithCharacter = longId.slice(0, 5); //gör att id max är 5 tecken
    const shortId = shortIdWithCharacter.replace(/-/g, ""); //tar bort tecken så som bindestreck osv
    return shortId;
  };

  //uppdatera produkt genom att hitta rätt produkt och uppdatera den
  const editProduct = (productId: string, updatedProduct: Partial<Product>) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.map((product) => {
        if (product.id === productId) {
          return { ...product, ...updatedProduct };
        }
        return product;
      });
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      return updatedProducts;
    });
  };

  const addProduct = (newProduct: Product) => {
    const productId = generateId();
    newProduct.id = productId;
    setProducts((prevProducts) => {
      const updatedProducts = [...prevProducts, newProduct];
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      return updatedProducts;
    });
    return newProduct;
  };

  //ta bort produkt från adminsidan genom att filtrera ut den
  const removeProduct = (productId: string) => {
    const updatedProducts = products.filter(
      (product) => product.id !== productId
    );
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  //funktioner som ska användas i adminsidan skickas till context
  const contextValue: AdminContextValue = {
    products,
    addProduct,
    editProduct,
    removeProduct,
  };

  return (
    <AdminContext.Provider value={contextValue}>
      {children}
    </AdminContext.Provider>
  );
};
