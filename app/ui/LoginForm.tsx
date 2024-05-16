"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CustomerSchema } from "./CustomerContext";

export const LoginSchema = z.object({
  email: z.string().email({
    message:
      "Please enter a valid email address in the following format: name@example.com",
  }),

  password: z.string().min(1, { message: "Wrong email or password" }),
});

//typ för meddelandet
export type Customer = z.infer<typeof LoginSchema>;

function LoginForm() {
  const router = useRouter();

  const form = useForm<Customer>({
    resolver: zodResolver(CustomerSchema),
  });

  const sendForm = (customer: Customer) => {
    router.push("/confirmation");
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
        Please log in here
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
            id="email"
            label="Email"
            fullWidth
            autoComplete="email"
            variant="standard"
            {...form.register("email")}
          />
          {/* Visa felmeddelanden om validering misslyckas */}
          {form.formState.errors.email && (
            <Typography sx={{ color: "red" }}>
              {form.formState.errors.email.message}
            </Typography>
          )}
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
            Log in
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default LoginForm;
