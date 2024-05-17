import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message:
      "Please enter a valid email address in the following format: name@example.com",
  }),

  password: z.string().min(1, { message: "Wrong email or password" }),
});

//typ för meddelandet
export type Customer = z.infer<typeof LoginSchema>;
