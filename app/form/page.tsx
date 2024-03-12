"use client";

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
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

//typ för props till onMessageSent
type onMessageSent = () => void;

//interface för props
interface MessageFormProps {
  onMessageSent: onMessageSent;
}

export default function MessageForm({ onMessageSent }: MessageFormProps) {
  // error meddelenden för formulär
  const MessageSchema = z.object({
    firstname: z
      .string()
      .min(1, { message: "Please enter your full first name" }),
    surname: z.string().min(1, { message: "Please enter your full surname" }),
    email: z.string().email({
      message:
        "Please enter a valid email address in the following format: name@example.com",
    }),
    phonenumber: z
      .string()
      .min(10, { message: "Please enter a valid phone number (10 digits)" }),
    address: z.string().min(1, { message: "Please enter a valid address" }),
    zipcode: z.string().min(5, { message: "Please enter a valid zip code" }), // om vi har z.number får vi inte rätt felmeddelande fråga DAVID!!!!!
    city: z.string().min(1, { message: "Please enter a valid city" }),
  });

  //typ för meddelandet
  type Message = z.infer<typeof MessageSchema>;

  //useForm hook för att hantera formuläret, resolver för att använda zodschema
  const form = useForm<Message>({
    resolver: zodResolver(MessageSchema),
  });

  //funktion för att skicka meddelandet som rensar formuläret och anropar onMessageSent
  const sendMessage = () => {
    form.reset();
    onMessageSent();
  };

  return (
    <>
      <Container>
        <React.Fragment>
          <Typography variant="h6" gutterBottom justifyContent={"center"}>
            Checkout information
          </Typography>
          <Grid component="form" container spacing={3} data-cy="customer-form">
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="firstName"
                label="First name"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                data-cy="customer-name"
                {...form.register("firstname")}
              />
              {/* Visa felmeddelanden om validering misslyckas */}
              {form.formState.errors.firstname && (
                <Typography data-cy="customer-name-error" sx={{ color: "red" }}>
                  {form.formState.errors.firstname.message}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="lastName"
                label="Last name"
                fullWidth
                autoComplete="family-name"
                variant="standard"
                data-cy="customer-name"
                {...form.register("surname")}
              />
              {form.formState.errors.surname && (
                <Typography data-cy="customer-name-error" sx={{ color: "red" }}>
                  {form.formState.errors.surname.message}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="Email Adress"
                label="Email Adress"
                fullWidth
                autoComplete="shipping adEmail Adressdress-level2"
                variant="standard"
                data-cy="customer-email"
                {...form.register("email")}
              />
              {/* Visa felmeddelanden om validering misslyckas */}
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
                autoComplete="Phone Number Level-2"
                variant="standard"
                data-cy="customer-phone"
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
            <Grid item xs={12}>
              <TextField
                required
                id="address"
                label="Address"
                fullWidth
                autoComplete="shipping address-line1"
                variant="standard"
                data-cy="customer-address"
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
                autoComplete="shipping postal-code"
                variant="standard"
                data-cy="customer-zipcode"
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
                autoComplete="shipping address-level2"
                variant="standard"
                data-cy="customer-city"
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
          </Grid>
        </React.Fragment>
        <Button
          onClick={form.handleSubmit(sendMessage)}
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
      </Container>
    </>
  );
}
