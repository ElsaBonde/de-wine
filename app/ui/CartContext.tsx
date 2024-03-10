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
  getCartItems: () => CartItem[];
  calculateTotalPrice: (cartItems: CartItem[]) => number;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  removeFromCart: (product: Product) => void;
  // clearCart: () => void;
}

//Motorväg - ett alternativ för props??
const CountContext = createContext<ContextValue>({} as ContextValue);

export const initialValue: CartItem[] = [];

//Påfarten tydligen, en väg till det som skickas ut över kontexten??
//detta är vår provider som vi kommer att använda för att skicka data över kontexten
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

  // LÄGG ALL LOGIK NÄRA TILLSTÅNDET
  const addToCart = (product: Product) => {
    const existingProductInCart = cart.find((item) => item.id === product.id);

    if (existingProductInCart) {
      const updatedCart = cart.map((item) => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      setCart(updatedCart);
      saveCartInLocalStorage(updatedCart);
      return;
    }

    //om produkten inte finns i kundkorgen, lägg till den
    const updatedCart = [...cart, { ...product, quantity: 1 }];
    setCart(updatedCart);
    saveCartInLocalStorage(updatedCart);
  };

  // Funktion för att öka antalet av en produkt i kundkorgen
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

  //hämta kundvagnsobjekt
  const getCartItems = () => {
    return cart;
  };

  //beräknar totalpriset av alla varor i kundvagnen
  const calculateTotalPrice = (cartItems: CartItem[]) => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  //minska antalet av en viss produkt i kundvagnen
  const decreaseQuantity = (productId: string) => {
    const updatedCart = cart.map((item) => {
      if (item.id === productId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }  else if (item.id === productId && item.quantity === 1) {
        removeFromCart(item);
      }
      return item;
    });
    setCart(updatedCart);
    saveCartInLocalStorage(updatedCart);
  };

  const removeFromCart = ( cartItem: CartItem) => {
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

  //Eventuellt lägger man uppdateringslogik här (incrament, decrament (add to cart, remove from cart))
  return (
    /* bilarna, vad är de här? value det som skickas över kontexten? */
    /* lägg till changeQuantity, removeFromCart, clearCart när vi gjort sidor för det */
    <CountContext.Provider
      value={{
        cart,
        addToCart,
        incrementQuantity,
        getCartItems,
        calculateTotalPrice,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {" "}
      {/* Inkludera incrementQuantity i context-värdet */}
      {props.children}
    </CountContext.Provider>
  );
}

//Avfarten, för att kunna ta emot kontext data i komponenterna
//DETTA ÄR VÅR HOOK SOM VI KOMMER ATT ANVÄNDA
const useCart = () => useContext(CountContext);

export { useCart };
