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
  incrementQuantity: (productId: string) => void;
  calculateTotalPrice: () => number;
  calculateTotalSalePrice: () => number;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  removeFromCart: (cartItem: CartItem) => void;
  clearCart: () => void;
}

//Motorväg - ett alternativ för props??
const CountContext = createContext<ContextValue>({} as ContextValue);

export const initialValue: CartItem[] = [];

//Påfarten tydligen, en väg till det som skickas ut över kontexten??
//detta är vår provider som vi använder för att skicka data över kontexten
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

  //spara kundkorgen i localstorage
  const saveCartInLocalStorage = (updatedCart: CartItem[]) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  //lägger till en produkt i kundvagnen
  const addToCart = (product: Product) => {
    const existingProductInCart = cart.find((item) => item.id === product.id);

    if (existingProductInCart) {
      //om produkten redan finns i kundkorgen, öka antalet
      const updatedCart = cart.map((item) => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity + 1 };
        } //om produkten inte finns i kundkorgen, lägg till den
        return item;
      });
      setCart(updatedCart);
      saveCartInLocalStorage(updatedCart);
      return;
    }

    //om produkten inte finns i kundkorgen, lägg till den
    const updatedCart = [
      ...cart,
      { ...product, quantity: 1, salePrice: product.salePrice}, //spara ner reapris i cart om de finns ett
    ];
    setCart(updatedCart);
    saveCartInLocalStorage(updatedCart);
  };

  //ökar antalet på quantity i kundvagnen när man trycker på buy knappen, så det inte blir flera "rader" av samma produkt i kundvagnen och ls
  const incrementQuantity = (productId: string) => {
    const updatedCart = cart.map((item) => {
      if (item.id === productId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCart(updatedCart);
    saveCartInLocalStorage(updatedCart);
  };

  //beräknar totalpriset av alla varor i kundvagnen
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateTotalSalePrice = () => {
    return cart.reduce((total, item) => {
      if (item.salePrice) {
        return total + item.salePrice * item.quantity;
      } else {
        return total + item.price * item.quantity;
      }
    }, 0);
  };

  //minska antalet av en viss produkt i kundvagnen
  const decreaseQuantity = (productId: string) => {
    const updatedCart = cart.map((item) => {
      //här minskas antalet av en produkt i kundvagnen
      if (item.id === productId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCart(updatedCart);
    saveCartInLocalStorage(updatedCart);

    //om antalet av en produkt i kundvagnen är 1, ta bort den helt och hållet med removeFromCart
    const itemToRemove = cart.find(
      (item) => item.id === productId && item.quantity === 1
    );
    if (itemToRemove) {
      removeFromCart(itemToRemove);
    }
  };

  // tar bort en produkt helt från kundvagnen och ls
  const removeFromCart = (cartItem: CartItem) => {
    const updatedCart = cart.filter((item) => item.id !== cartItem.id);
    setCart(updatedCart);
    saveCartInLocalStorage(updatedCart);
  };

  //öka antalet av en viss produkt i kundvagnen
  const increaseQuantity = (productId: string) => {
    const updatedCart = cart.map((item) => {
      if (item.id === productId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCart(updatedCart);
    saveCartInLocalStorage(updatedCart);
  };

  //rensar kundvagnen och ls från alla produkter
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  //Eventuellt lägger man uppdateringslogik här (incrament, decrament (add to cart, remove from cart))
  return (
    /*  det som skickas över kontexten */
    <CountContext.Provider
      value={{
        cart,
        addToCart,
        incrementQuantity,
        calculateTotalPrice,
        calculateTotalSalePrice,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {props.children}
    </CountContext.Provider>
  );
}

//Avfarten, för att kunna ta emot kontext data i komponenterna
//DETTA ÄR VÅR HOOK SOM VI KOMMER ATT ANVÄNDA
//hook för att ta emot data från contexten
const useCart = () => useContext(CountContext);

export { useCart };
