"use client";

import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

//Vad som skickas över kontexten
interface ContextValue {
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
}

//Motorväg - ett alternativ för props?? Ursäkta mig?
const CountContext = createContext<ContextValue>({} as ContextValue);

//Påfarten tydligen, en väg till det som skickas ut över kontexten??
export default function AddContext(props: PropsWithChildren) {
  const [count, setCount] = useState(0);

  //här lagras värdet på kundvagnen (hur många varor) i localstorage
  useEffect(() => {
    const savedCount = localStorage.getItem("cart-items-count-badge");
    if (savedCount) {
      setCount(parseInt(savedCount));
    }
  }, []);

  // ökar antalet items av en viss sort i kundkorgen
  const incrementCount = () => {
    setCount((prevCount) => prevCount + 1);
    localStorage.setItem("cart-items-count-badge", (count + 1).toString());
  };

  //minskar antalet items av en viss sort i kundkorgen
  const decrementCount = () => {
    if (count > 1) {
      setCount((prevCount) => prevCount - 1);
      localStorage.setItem("cart-items-count-badge", (count - 1).toString());
    }
  };

  //Eventuellt lägger man uppdateringslogik här (incrament, decrament (add to cart, remove from cart))
  return (
    /* bilarna, vad fuck är de här? value det som skickas över kontexten? */
    <CountContext.Provider value={{ count, setCount }}>
      {props.children}
    </CountContext.Provider>
  );
}

//Avfarten, för att kunna ta emot kontext data i komponenterna
//DETTA ÄR VÅR HOOK SOM VI KOMMER ATT ANVÄNDA
export const useCount = () => useContext(CountContext);
