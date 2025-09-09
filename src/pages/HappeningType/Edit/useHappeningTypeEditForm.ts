import { useForm, type UseFormReturn } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useGetHappeningTypeById } from "../../../hooks/useGetHappeningType";
import {
  type HappeningTypeEditForm as Form,
  HappeningTypeEditSchema,
} from "../HappeningTypeValidationSchema";
import { useFormState } from "../../../hooks/useFormState";
import { happeningTypeRepository } from "../../../repositories/happeningTypeRepository";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

export const useHappeningTypeEditForm = () => {
  const { id } = useParams();
  const { data: HappeningTypeData } = useGetHappeningTypeById(
    id?.toString() || ""
  );
  const methods: UseFormReturn<Form> = useForm<Form>({
    resolver: zodResolver(HappeningTypeEditSchema),
    defaultValues: {
      typeName: "",
    },
  });

  useEffect(() => {
    if (HappeningTypeData) {
      methods.reset(HappeningTypeData);
    }
  }, [HappeningTypeData]);

  const { loading, success, message, show, handleSubmit } =
    useFormState<Form>();

  const onSubmit = (data: Form) =>
    handleSubmit(() =>
      happeningTypeRepository.updateHappeningType(id?.toString() || "", data)
    );
  return { ...methods, onSubmit, loading, success, message, show };
};
