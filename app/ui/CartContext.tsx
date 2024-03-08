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

//Påfarten tydligen, en väg till det som skickas ut över kontexten??
export default function CartContext(props: PropsWithChildren) {
  const [cart, setCart] = useState<CartItem[]>([]);

  //all ls i useeffect
  // SYNKA TILLSTÅNDET MED LOCALSTORAGE
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // LÄGG ALL LOGIK NÄRA TILLSTÅNDET
  const addToCart = (product: Product) => {
    // 1. När produkten finns i carten, öka antalet
    // 2. När produkten inte finns i carten, lägg till den
    setCart([...cart, { ...product, quantity: 1 }]);
  };

  // remove
  // clear

  //Eventuellt lägger man uppdateringslogik här (incrament, decrament (add to cart, remove from cart))
  return (
    /* bilarna, vad är de här? value det som skickas över kontexten? */
    <CountContext.Provider value={{ cart, addToCart }}>
      {props.children}
    </CountContext.Provider>
  );
}

//Avfarten, för att kunna ta emot kontext data i komponenterna
//DETTA ÄR VÅR HOOK SOM VI KOMMER ATT ANVÄNDA
export const useCart = () => useContext(CountContext);
