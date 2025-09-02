import { useParams } from "react-router-dom";
import { useGetImageById } from "../../../hooks/useGetImage";
import { useForm, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useFormState } from "../../../hooks/useFormState";
import { imageRepository } from "../../../repositories/imageRepository";
import {
  ImageSchema,
  type ImageUpdateForm as Form,
} from "../imageValidationSchema";

export const useImageEditForm = () => {
  const { id } = useParams();
  const { data: imageData } = useGetImageById(id?.toString() || "");

  const methods: UseFormReturn<Form> = useForm<Form>({
    resolver: zodResolver(ImageSchema),
    defaultValues: {
      mainText: "",
      subText: "",
      imageTypeId: "",
      link: "",
      bg_img: null,
    },
  });

  useEffect(() => {
    if (imageData) {
      methods.reset(imageData);
    }
  }, [imageData]);

  const { loading, success, message, show, handleSubmit } =
    useFormState<Form>();

  const onSubmit = (data: Form) => {
    const formData = new FormData();
    formData.append("mainText", data.mainText);
    formData.append("subText", data.subText || "");
    formData.append("imageTypeId", data.imageTypeId);
    formData.append("link", data.link || "");
    formData.append("file", data.bg_img);

    handleSubmit(() =>
      imageRepository.updateImage(id?.toString() || "", formData)
    );
  };

  return { ...methods, onSubmit, loading, success, message, show };
};
