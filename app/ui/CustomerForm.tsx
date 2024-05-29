import "@fontsource/karla";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { signIn, useSession } from "next-auth/react";
import NextLink from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createOrder } from "../actions/orderActions";
import { CartItem } from "../actions/productActions";
import { Customer, CustomerSchema, useCustomer } from "./CustomerContext";

type ChecokoutFormProps = {
  cart: CartItem[];
};

//komponent för formulär för att skriva in personuppgifter
export default function CheckoutForm({ cart }: ChecokoutFormProps) {
  const router = useRouter();
  const { setCustomer } = useCustomer();
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (session) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [session]);

  //useForm hook för att hantera formuläret, resolver för att använda zodschema
  const form = useForm<Customer>({
    resolver: zodResolver(CustomerSchema),
  });

  //funktion för att skicka meddelandet som rensar formuläret och anropar onMessageSent
  const sendForm = async (customer: Customer) => {
    setCustomer(customer);
    const orderInfo = await createOrder(cart, customer);
    if (!orderInfo) {
      return;
    }
    router.push(`/confirmation/${orderInfo.id}`);
  };

  return (
    <>
      <Container>
        <React.Fragment>
          <Typography
            variant="h5"
            gutterBottom
            justifyContent={"center"}
            sx={{
              fontFamily: "Karla",
              fontWeight: "800",
              fontVariant: "small-caps",
            }}
          >
            Checkout information
          </Typography>
          <Grid
            component="form"
            onSubmit={form.handleSubmit(sendForm)}
            container
            spacing={3}
          >
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="name"
                label="Name"
                fullWidth
                autoComplete="name"
                variant="standard"
                {...form.register("name")}
              />
              {/* Visa felmeddelanden om validering misslyckas */}
              {form.formState.errors.name && (
                <Typography sx={{ color: "red" }}>
                  {form.formState.errors.name.message}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="phone"
                label="Phone"
                fullWidth
                autoComplete="tel"
                variant="standard"
                {...form.register("phone")}
              />
              {form.formState.errors.phone && (
                <Typography sx={{ color: "red" }}>
                  {form.formState.errors.phone.message}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="street"
                label="Street"
                fullWidth
                autoComplete="street-address"
                variant="standard"
                {...form.register("street")}
              />
              {form.formState.errors.street && (
                <Typography sx={{ color: "red" }}>
                  {form.formState.errors.street.message}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="zip"
                label="Zip code"
                fullWidth
                autoComplete="postal-code"
                variant="standard"
                {...form.register("zip")}
              />
              {form.formState.errors.zip && (
                <Typography sx={{ color: "red" }}>
                  {form.formState.errors.zip.message}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="city"
                label="City"
                fullWidth
                autoComplete="address-level2"
                variant="standard"
                {...form.register("city")}
              />
              {form.formState.errors.city && (
                <Typography sx={{ color: "red" }}>
                  {form.formState.errors.city.message}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="saveAddress"
                    value="yes"
                    sx={{
                      color: "#757575",
                      "&.Mui-checked": {
                        color: "#424242",
                      },
                      "& .MuiSvgIcon-root": {
                        fontSize: 28,
                      },
                    }}
                  />
                }
                label="I accept the terms and conditions."
              />
            </Grid>
            {isAuthenticated ? (
              <Button
                onClick={form.handleSubmit(sendForm)}
                type="submit"
                sx={{
                  backgroundColor: "rgba(242, 239, 239, 0.8) ",
                  color: "white",
                  marginTop: "10px",
                  fontWeight: "bold",
                  justifyContent: "center",
                }}
              >
                Place Order
              </Button>
            ) : (
              <Typography sx={{ color: "#1F1724", fontFamily: "josefin sans" }}>
                Please{" "}
                <Typography
                  component={NextLink}
                  href={"/signin"}
                  sx={{ color: "#1F1724", fontFamily: "josefin sans" }}
                  onClick={() => signIn(undefined, { callbackUrl: pathname })}
                >
                  sign in
                </Typography>{" "}
                to place an order
              </Typography>
            )}
          </Grid>
        </React.Fragment>
      </Container>
    </>
  );
}
