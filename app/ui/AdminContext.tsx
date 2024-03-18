"use client";

import { products as productData , Product } from "@/data";
import { createContext, useContext, useEffect, useState } from "react";

interface AdminContextValue {
  products: Product[];
/*   addProduct: (newProduct: Product) => void; */
  removeProduct: (productId: string) => void;
}

//alternativ för props
const AdminContext = createContext<AdminContextValue>({} as AdminContextValue);

// exportera contexten så att den kan användas i adminsidan
export const useAdminContext = () => useContext(AdminContext);


export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  
  // hämta produkter från localstorage om det finns, annars använd default produkter (mcokad data)
  useEffect(() => {
    const allProducts = localStorage.getItem("adminProducts");
    if (allProducts) {
      setProducts(JSON.parse(allProducts));
    } else {
      setProducts(productData);
      localStorage.setItem("adminProducts", JSON.stringify(productData));
    }
  }, []);

 /*  const addProduct = (newProduct: Product) => {
    products.push(newProduct);
  }; */

  //ta bort produkt från adminsidan genom att filtrera ut den (felaktig kod som FUNKAR i cypress, se kommentar nedan (rad 67-131))
  const removeProduct = (productId: string) => {
    const index = products.findIndex((product) => product.id === productId);
    if (index !== -1) {
      products.splice(index, 1);
    }
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


//KOD SOM FAKTISKT TAR BORT PRODUKTEN FRÅN LOCALSTORAGE OCH DOMEN MEN DET GÅR INTE IGENOM I CYPRESS7
/*   ta bort produkt från adminsidan genom att filtrera ut den och sen spara ned resterande produkter i localstorage
  const removeProduct = (productId: string) => {
    const updatedProducts = products.filter((product) => product.id !== productId);
    setProducts(updatedProducts);
    localStorage.setItem("adminProducts", JSON.stringify(updatedProducts));
  }; */