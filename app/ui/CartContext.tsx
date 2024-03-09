"use client";

import { CartItem, Product } from "@/data";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

//Vad som skickas över kontexten
interface ContextValue {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  // removeFromCart: (product: Product) => void;
  // clearCart: () => void;
}

//Motorväg - ett alternativ för props??
const CountContext = createContext<ContextValue>({} as ContextValue);

export const initialValue: CartItem[] = [];

//Påfarten tydligen, en väg till det som skickas ut över kontexten??
export default function CartContext(props: PropsWithChildren) {
  const [cart, setCart] = useState<CartItem[]>(initialValue);

  //alla ls funktioner i useEffect
  // SYNKA TILLSTÅNDET MED LOCALSTORAGE
  useEffect(() => {
    const cartFromLS = localStorage.getItem("cart");
    if (cartFromLS) {
      setCart(JSON.parse(cartFromLS));
    }
  }, []);

  const saveCartInLocalStorage = (updatedCart: CartItem[]) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  //ta bort från kundkorgen
  /* const removeFromCart = (productID: string) => { 
    const updatedCart = cart.filter((item) => item.id !== productID);
    setCart(updatedCart);
    saveCartInLocalStorage(updatedCart);
  }; */

  //ändra antal av produkt i kundkorgen
 /*  const changeQuantity = (productID: string, newQuantity: number) => {
    const updatedCart = cart.map((item) => {
      if (item.id === productID) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCart(updatedCart);
    saveCartInLocalStorage(updatedCart);
  }; */

  // LÄGG ALL LOGIK NÄRA TILLSTÅNDET
  const addToCart = (product: Product) => {
    //kolla om produkten redan finns i kundkorgen
   /*  const existingProduct = cart.find((item) => item.id === product.id); */

    //om produkten redan finns i kundkorgen, öka antalet (ändras nu bara i ls, inte i gränssnittet countbadge)
  /*   if (existingProduct) {
      changeQuantity(product.id, existingProduct.quantity + 1);
      return;
    } */

    //om produkten inte finns i kundkorgen, lägg till den
    const updatedCart = [...cart, { ...product, quantity: 1 }];
    setCart(updatedCart);
    saveCartInLocalStorage(updatedCart);
  };

  //Eventuellt lägger man uppdateringslogik här (incrament, decrament (add to cart, remove from cart))
  return (
    /* bilarna, vad är de här? value det som skickas över kontexten? */
    /* lägg till changeQuantity, removeFromCart, clearCart när vi gjort sidor för det */
    <CountContext.Provider value={{ cart, addToCart, }}>
      {props.children}
    </CountContext.Provider>
  );
}

//Avfarten, för att kunna ta emot kontext data i komponenterna
//DETTA ÄR VÅR HOOK SOM VI KOMMER ATT ANVÄNDA
export const useCart = () => useContext(CountContext);
