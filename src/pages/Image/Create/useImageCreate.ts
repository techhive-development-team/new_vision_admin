import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ImageSchema, type ImageCreateForm } from "../imageValidationSchema";
import { imageRepository } from "../../../repositories/imageRepository";
import { useFormState } from "../../../hooks/useFormState";

export const useImageCreate = () => {
  const methods = useForm({
    resolver: zodResolver(ImageSchema),
  });

  const { loading, success, message, show, handleSubmit } =
    useFormState<ImageCreateForm>();

  const onSubmit = async (data: ImageCreateForm) => {
    const formData = new FormData();
    formData.append("bg_img", data.bg_img);
    formData.append("mainText", data.mainText);
    formData.append("subText", data.subText || "");
    formData.append("imageTypeId", data.imageTypeId);
    formData.append("link", data.link || "");
    handleSubmit(async () => await imageRepository.createImage(formData));
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
