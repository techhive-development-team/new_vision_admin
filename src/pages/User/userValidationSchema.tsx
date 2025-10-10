import z from "zod";

export const UserCreateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type UserCreateForm = z.infer<typeof UserCreateSchema>;

export const UserEditSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
});

export type UserEditForm = z.infer<typeof UserEditSchema>;
