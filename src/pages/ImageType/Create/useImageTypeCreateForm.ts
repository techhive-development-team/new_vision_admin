import { zodResolver } from "@hookform/resolvers/zod";
import { type UseFormReturn, useForm } from "react-hook-form";
import {
  type ImageTypeEditForm as Form,
  ImageTypeEditSchema,
} from "../ImageTypeValidationSchema";
import { useFormState } from "../../../hooks/useFormState";
import { imageTypeRepository } from "../../../repositories/imageTypeRepository";

export const useImageTypeCreateForm = () => {
  const methods: UseFormReturn<Form> = useForm<Form>({
    resolver: zodResolver(ImageTypeEditSchema),
    defaultValues: {
      typeName: "",
    },
  });

  const { loading, success, message, show, handleSubmit } =
    useFormState<Form>();

  const onSubmit = (data: Form) =>
    handleSubmit(() => imageTypeRepository.createImageType(data));

  return { ...methods, onSubmit, loading, success, message, show };
};
