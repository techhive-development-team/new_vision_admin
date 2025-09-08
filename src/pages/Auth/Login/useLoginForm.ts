import { useForm, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, type LoginFormValues } from "./loginValidationSchema";
import { authRepository } from "../../../repositories/authRepository";

export const useLoginForm = () => {
  const methods: UseFormReturn<LoginFormValues> = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const result = await authRepository.login(data);
      return result.token; 
    } catch (errors: any) {
      errors.forEach((err: any) => {
        methods.setError(err.field as "email" | "password", { message: err.message });
      });
      throw errors; 
    }
  };

  return { methods, onSubmit };
};
