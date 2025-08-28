import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type UseFormReturn } from "react-hook-form";
import { UserEditSchema, type UserEditForm as Form } from "../userValidationSchema";
import { useState, useEffect } from "react";
import { userRepository } from "../../../repositories/userRepository";
import { useGetUserById } from "../../../hooks/useGetUser";
import { useParams } from "react-router-dom";

export const useUserEditForm = () => {
  const { id } = useParams();
  const { data: userData } = useGetUserById(
    id?.toString() || ""
  );

  const methods: UseFormReturn<Form> = useForm<Form>({
    resolver: zodResolver(UserEditSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  // Update default values when userData is loaded
  useEffect(() => {
    if (userData) {
      methods.reset(userData);
    }
  }, [userData]);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState<string | string[]>("");

  const onSubmit = async (data: Form) => {
    setLoading(true);
    setShow(false);
    setMessage("");

    try {
      const response = await userRepository.updateUser(id?.toString() || "", data);

      if (response?.statusCode === 200) {
        setSuccess(true);
        setMessage("User updated successfully");
      } else if (response?.statusCode === 401) {
        setSuccess(false);
        setMessage("Please Log In Again");
      } else if (response?.statusCode === 400) {
        setSuccess(false);
        if (Array.isArray(response?.data)) {
          setMessage(response.data.map((err: any) => err.message));
        } else {
          setMessage(response?.data || "Invalid data");
        }
      } else {
        setSuccess(false);
        setMessage("Error creating user");
      }
    } catch (error: any) {
      setSuccess(false);
      setMessage(error?.response?.data || "Error creating user");
    } finally {
      setShow(true);
      setLoading(false);
    }
  };

  return { ...methods, onSubmit, loading, success, message, show };
};
