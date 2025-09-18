import { useParams } from "react-router-dom";
import { useGetHappeningById } from "../../../hooks/useGetHappening";
import { useForm } from "react-hook-form";
import {
  type HappeningCreateForm,
  HappeningSchema,
} from "../HappeningValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useFormState } from "../../../hooks/useFormState";
import { happeningRepository } from "../../../repositories/happeningRepository";

export const useHappeningEditForm = () => {
  const { id } = useParams();
  const { data: happeningData } = useGetHappeningById(id?.toString() || "");
  const methods = useForm<HappeningCreateForm>({
    resolver: zodResolver(HappeningSchema(true, true)),
    defaultValues: {
      title: "",
      description: "",
      happeningTypeId: "",
      mainImage: "",
      album_images: [],
    },
  });

  useEffect(() => {
    if (happeningData) {
      methods.reset(happeningData);
    }
  }, [happeningData]);

  const { loading, success, message, show, handleSubmit } =
    useFormState<HappeningCreateForm>();
  const onSubmit = (data: HappeningCreateForm) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("happeningTypeId", data.happeningTypeId);

    if (data.mainImage instanceof File)
      formData.append("bg_image", data.mainImage);
    if (Array.isArray(data.album_images)) {
      data.album_images.forEach((file) => {
        if (file instanceof File) formData.append("album_images", file);
      });
    }
    handleSubmit(() =>
      happeningRepository.updateHappening(id?.toString() || "", formData)
    );
  };

  return { ...methods, onSubmit, loading, success, message, show };
};
