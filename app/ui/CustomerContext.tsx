"use client";

import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { z } from "zod";

// errormeddelenden för formulär
export const CustomerSchema = z.object({
  fullname: z.string().min(1, { message: "Please enter your full name" }),
  email: z.string().email({
    message:
      "Please enter a valid email address in the following format: name@example.com",
  }),
  phonenumber: z
    .string()
    .min(10, { message: "Please enter a valid phone number" }),
  address: z.string().min(1, { message: "Please enter a valid address" }),
  zipcode: z.coerce
    .number()
    .min(10000, { message: "Please enter a valid zip code" })
    .max(99999, { message: "Please enter a valid zip code" }),
  city: z.string().min(1, { message: "Please enter a valid city" }),
});

//typ för meddelandet
export type Customer = z.infer<typeof CustomerSchema>;

//Vad som skickas över kontexten
interface ContextValue {
  customer?: Customer;
  setCustomer: Dispatch<SetStateAction<Customer | undefined>>;
}

//Motorväg - ett alternativ för props??
const CountContext = createContext<ContextValue>({} as ContextValue);

//Påfarten tydligen, en väg till det som skickas ut över kontexten??
//detta är vår provider som vi använder för att skicka data över kontexten
export default function CustomerContext(props: PropsWithChildren) {
  const [customer, setCustomer] = useState<Customer>();

  //Eventuellt lägger man uppdateringslogik här (incrament, decrament (add to customer, remove from customer))
  return (
    /*  det som skickas över kontexten */
    <CountContext.Provider
      value={{
        customer,
        setCustomer,
      }}
    >
      {props.children}
    </CountContext.Provider>
  );
}

//Avfarten, för att kunna ta emot kontext data i komponenterna
//DETTA ÄR VÅR HOOK SOM VI KOMMER ATT ANVÄNDA
//hook för att ta emot data från contexten
const useCustomer = () => useContext(CountContext);

export { useCustomer };
