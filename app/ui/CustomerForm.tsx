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
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { Customer, CustomerSchema, useCustomer } from "./CustomerContext";

//komponent för formulär för att skriva in personuppgifter
export default function CheckoutForm() {
  const router = useRouter();
  const { setCustomer } = useCustomer();

  //useForm hook för att hantera formuläret, resolver för att använda zodschema
  const form = useForm<Customer>({
    resolver: zodResolver(CustomerSchema),
  });

  //funktion för att skicka meddelandet som rensar formuläret och anropar onMessageSent
  const sendForm = (customer: Customer) => {
    setCustomer(customer);
    router.push("/confirmation");
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
            data-cy="customer-form"
          >
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="fullName"
                label="Full name"
                fullWidth
                autoComplete="name"
                variant="standard"
                inputProps={{ "data-cy": "customer-name" }}
                {...form.register("fullname")}
              />
              {/* Visa felmeddelanden om validering misslyckas */}
              {form.formState.errors.fullname && (
                <Typography data-cy="customer-name-error" sx={{ color: "red" }}>
                  {form.formState.errors.fullname.message}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="Email Adress"
                label="Email Adress"
                fullWidth
                autoComplete="email"
                variant="standard"
                inputProps={{ "data-cy": "customer-email" }}
                {...form.register("email")}
              />
              {form.formState.errors.email && (
                <Typography
                  data-cy="customer-email-error"
                  sx={{ color: "red" }}
                >
                  {form.formState.errors.email.message}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="Phone Number"
                label="Phone Number"
                fullWidth
                autoComplete="tel"
                variant="standard"
                inputProps={{ "data-cy": "customer-phone" }}
                {...form.register("phonenumber")}
              />
              {form.formState.errors.phonenumber && (
                <Typography
                  data-cy="customer-phone-error"
                  sx={{ color: "red" }}
                >
                  {form.formState.errors.phonenumber.message}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="address"
                label="Address"
                fullWidth
                autoComplete="street-address"
                variant="standard"
                inputProps={{ "data-cy": "customer-address" }}
                {...form.register("address")}
              />
              {form.formState.errors.address && (
                <Typography
                  data-cy="customer-address-error"
                  sx={{ color: "red" }}
                >
                  {form.formState.errors.address.message}
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
                inputProps={{ "data-cy": "customer-zipcode" }}
                {...form.register("zipcode")}
              />
              {form.formState.errors.zipcode && (
                <Typography
                  data-cy="customer-zipcode-error"
                  sx={{ color: "red" }}
                >
                  {form.formState.errors.zipcode.message}
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
                inputProps={{ "data-cy": "customer-city" }}
                {...form.register("city")}
              />
              {form.formState.errors.city && (
                <Typography data-cy="customer-city-error" sx={{ color: "red" }}>
                  {form.formState.errors.city.message}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox color="secondary" name="saveAddress" value="yes" />
                }
                label="I accept the terms and conditions."
              />
            </Grid>
            <Button
              onClick={form.handleSubmit(sendForm)}
              type="submit"
              sx={{
                backgroundColor: "#F1DDCF",
                color: "#881C1C",
                marginTop: "10px",
                fontWeight: "bold",
                justifyContent: "center",
              }}
            >
              Place Order
            </Button>
          </Grid>
        </React.Fragment>
      </Container>
    </>
  );
}
