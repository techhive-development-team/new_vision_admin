import { zodResolver } from "@hookform/resolvers/zod";
import {
  type HappeningCreateForm,
  HappeningSchema,
} from "../HappeningValidationSchema";
import { useForm } from "react-hook-form";
import { useFormState } from "../../../hooks/useFormState";
import { happeningRepository } from "../../../repositories/happeningRepository";

export const useHappeningCreateForm = () => {
  const methods = useForm<HappeningCreateForm>({
    resolver: zodResolver(HappeningSchema(false)),
  });

  const { loading, success, message, show, handleSubmit } =
    useFormState<HappeningCreateForm>();
  const onSubmit = (data: HappeningCreateForm) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("happeningTypeId", data.happeningTypeId);
    if (data.embeddedLink) formData.append("embeddedLink", data.embeddedLink);
    if (data.mainImage instanceof File)
      formData.append("mainImage", data.mainImage);
    if (Array.isArray(data.album_images)) {
      data.album_images.forEach((file) => {
        if (file instanceof File) formData.append("album_images", file);
      });
    }
    handleSubmit(() => happeningRepository.createHappening(formData));
  };

  return { ...methods, onSubmit, loading, success, show, message };
};
