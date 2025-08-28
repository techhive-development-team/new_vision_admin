import z, { email } from "zod";

export const UserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type UserForm = z.infer<typeof UserSchema>;

export const UserEditSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
});

export type UserEditForm = z.infer<typeof UserEditSchema>;
