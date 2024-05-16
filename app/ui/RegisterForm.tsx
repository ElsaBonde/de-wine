"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { savePost } from "../actions/userActions";

export const RegisterSchema = z.object({
  fullName: z.string().min(1, { message: "Please enter your full name" }),
  email: z.string().email({
    message:
      "Please enter a valid email address in the following format: name@example.com",
  }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  password: z
    .string()
    .min(1, { message: "Please enter a password with min 6 letters." }),
});

//typ för meddelandet
export type UserCreate = z.infer<typeof RegisterSchema>;

function Register() {
  const form = useForm<UserCreate>({ resolver: zodResolver(RegisterSchema) });
  //   const router = useRouter();

  //   const sendForm = (customer: Customer) => {
  //     // router.push("/confirmation");
  //   };
  const handleSubmit = async (data: UserCreate) => {
    try {
      await savePost(data);
      form.reset();
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <Container>
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
        Create a user
      </Typography>

      <Grid
        component="form"
        onSubmit={form.handleSubmit(handleSubmit)}
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
            {...form.register("fullName")}
          />
          {/* Visa felmeddelanden om validering misslyckas */}
          {form.formState.errors.fullName && (
            <Typography sx={{ color: "red" }}>
              {form.formState.errors.fullName.message}
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
            {...form.register("email")}
          />
          {form.formState.errors.email && (
            <Typography sx={{ color: "red" }}>
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
            id="password"
            label="Password"
            fullWidth
            autoComplete="password"
            variant="standard"
            type="password"
            {...form.register("password")}
          />
          {form.formState.errors.password && (
            <Typography sx={{ color: "red" }}>
              {form.formState.errors.password.message}
            </Typography>
          )}
        </Grid>

        <Button
          type="submit"
          onSubmit={form.handleSubmit(handleSubmit)}
          sx={{
            backgroundColor: "#F1DDCF",
            color: "#881C1C",
            marginTop: "10px",
            fontWeight: "bold",
            justifyContent: "center",
          }}
        >
          Save
        </Button>
      </Grid>
    </Container>
  );
}

export default Register;
