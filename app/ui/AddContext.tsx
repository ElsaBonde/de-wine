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

  useEffect(() => {
    const savedCount = localStorage.getItem("cart-items-count-badge");
    if (savedCount) {
      setCount(parseInt(savedCount));
    }
  }, []);

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

