import { useForm, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormState } from "../../../hooks/useFormState";
import {
  UserEditSchema,
  type UserEditForm as Form,
} from "../userValidationSchema";
import { useGetUserById } from "../../../hooks/useGetUser";
import { userRepository } from "../../../repositories/userRepository";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export const useUserEditForm = () => {
  const { id } = useParams();
  const { data: userData } = useGetUserById(id?.toString() || "");

  const methods: UseFormReturn<Form> = useForm<Form>({
    resolver: zodResolver(UserEditSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  // Reset form when user data is loaded
  useEffect(() => {
    if (userData) {
      methods.reset(userData);
    }
  }, [userData]);

  const { loading, success, message, show, handleSubmit } =
    useFormState<Form>();

  const onSubmit = (data: Form) =>
    handleSubmit(() => userRepository.updateUser(id?.toString() || "", data));

  return { ...methods, onSubmit, loading, success, message, show };
};
