"use client";

import { Product, products as productData } from "@/data";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface AdminContextValue {
  products: Product[];
  /*   addProduct: (newProduct: Product) => void; */
  removeProduct: (productId: string) => void;
}

//alternativ för props
const AdminContext = createContext<AdminContextValue>({} as AdminContextValue);

// exportera contexten så att den kan användas i adminsidan
export const useAdminContext = () => useContext(AdminContext);

export const AdminProvider = ({ children }: PropsWithChildren) => {
  const [products, setProducts] = useState<Product[]>([]);

  // hämta produkter från localstorage om det finns, annars använd default produkter (mcokad data)
  useEffect(() => {
    const allProducts = localStorage.getItem("products");
    if (allProducts) {
      setProducts(JSON.parse(allProducts));
    } else {
      setProducts(productData);
      localStorage.setItem("products", JSON.stringify(productData));
    }
  }, []);

  /*  const addProduct = (newProduct: Product) => {
    products.push(newProduct);
  }; */

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
    /*     addProduct, */
    removeProduct,
  };

  return (
    <AdminContext.Provider value={contextValue}>
      {children}
    </AdminContext.Provider>
  );
};
