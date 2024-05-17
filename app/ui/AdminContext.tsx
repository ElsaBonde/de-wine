"use client";

import { Product } from "@/data";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { z } from "zod";
import {
  createProduct,
  deleteProduct,
  getProducts,
} from "../actions/productActions";

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
  inventory: z.coerce
    .number()
    .min(1, { message: "Please enter the amount of products in stock." }),
  /*  categories: z
    .array(z.string())
    .min(1, { message: "Please select a category." }), */
});

export type ProductCreate = z.infer<typeof ProductSchema>;

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

  const addProduct = async (newProduct: Product) => {
    try {
      const createdProduct = await createProduct(newProduct);
      setProducts((prevProducts) => [...prevProducts, createdProduct]);
      return createdProduct;
    } catch (error) {
      console.error("There was an error creating the product", error);
      throw error;
    }
  };

  //ta bort produkt från databasen och uppdatera state i frontend
  const removeProduct = async (productId: string) => {
    const deletedProduct = await deleteProduct(productId);
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== deletedProduct.id)
    );
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
