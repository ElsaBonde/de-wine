import { z } from "zod";

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
