import { useForm, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetImageTypeById } from "../../../hooks/useGetImageType";
import { useFormState } from "../../../hooks/useFormState";
import {
  ImageTypeEditSchema,
  type ImageTypeEditForm as Form,
} from "../ImageTypeValidationSchema";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { imageTypeRepository } from "../../../repositories/imageTypeRepository";

export const useImageTypeEditForm = () => {
  const { id } = useParams();
  const { data: imageTypeData } = useGetImageTypeById(id?.toString() || "");

  const methods: UseFormReturn<Form> = useForm<Form>({
    resolver: zodResolver(ImageTypeEditSchema),
    defaultValues: {
      typeName: "",
    },
  });

  useEffect(() => {
    if (imageTypeData) {
      methods.reset(imageTypeData);
    }
  }, [imageTypeData]);

  const { loading, success, message, show, handleSubmit } =
    useFormState<Form>();

  const onSubmit = (data: Form) =>
    handleSubmit(() =>
      imageTypeRepository.updateImageType(id?.toString() || "", data)
    );

  return { ...methods, onSubmit, loading, success, message, show };
};
