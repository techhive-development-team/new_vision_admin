import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ImageSchema, type ImageCreateForm } from "../imageValidationSchema";
import { useState } from "react";
import { imageRepository } from "../../../repositories/imageRepository";

export const useImageCreate = () => {
  const methods = useForm({
    resolver: zodResolver(ImageSchema),
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState<string | string[]>("");

  const onSubmit = async (data: ImageCreateForm) => {
    setLoading(true);
    setShow(false);
    setMessage("");
    try {
      const formData = new FormData();
      formData.append("file", data.bg_img);
      formData.append("mainText", data.mainText);
      formData.append("subText", data.subText || "");
      formData.append("imageTypeId", data.imageTypeId);
      formData.append("link", data.link || "");
      const response = await imageRepository.createImage(formData);
      if (response?.statusCode === 200) {
        setSuccess(true);
        setMessage("Image created successfully");
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
        setMessage("Error uploading Image");
      }
    } catch (error: any) {
      setSuccess(false);
      setMessage(error?.response?.data || "Error Uploading Image");
    } finally {
      setShow(true);
      setLoading(false);
    }
  };

  return {
    ...methods,
    onSubmit,
    loading,
    success,
    show,
    message,
  };
};
