import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UserSchema, type UserForm as form } from "../userValidationSchema";
import { useState } from "react";
import { userRepository } from "../../../repositories/userRepository";

export const useUserCreateForm = () => {
  const methods = useForm<form>({
    resolver: zodResolver(UserSchema),
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState<string | string[]>("");

  const onSubmit = async (data: form) => {
    setLoading(true);
    setShow(false);
    setMessage("");
    try {
      const response = await userRepository.createUser(data);

      if (response?.statusCode === 200) {
        setSuccess(true);
        setMessage("User created successfully");
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
