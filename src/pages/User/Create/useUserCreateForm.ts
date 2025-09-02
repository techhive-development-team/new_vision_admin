import { useForm, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormState } from "../../../hooks/useFormState";
import {
  UserCreateSchema,
  type UserCreateForm as Form,
} from "../userValidationSchema";
import { userRepository } from "../../../repositories/userRepository";

export const useUserCreateForm = () => {
  const methods: UseFormReturn<Form> = useForm<Form>({
    resolver: zodResolver(UserCreateSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { loading, success, message, show, handleSubmit } =
    useFormState<Form>();

  const onSubmit = (data: Form) =>
    handleSubmit(() => userRepository.createUser(data));

  return { ...methods, onSubmit, loading, success, message, show };
};
