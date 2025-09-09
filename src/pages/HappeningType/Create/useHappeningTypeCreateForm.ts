import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type UseFormReturn } from "react-hook-form";
import {
  type HappeningTypeEditForm as Form,
  HappeningTypeEditSchema,
} from "../HappeningTypeValidationSchema";
import {useFormState } from "../../../hooks/useFormState";
import { happeningTypeRepository } from "../../../repositories/happeningTypeRepository";

export const useHappeningTypeCreateForm = () => {
  const methods: UseFormReturn<Form> = useForm<Form>({
    resolver: zodResolver(HappeningTypeEditSchema),
    defaultValues: {
      typeName: "",
    },
  });

  const { loading, success, message, show, handleSubmit } = 
    useFormState<Form>();
    
  const onSubmit = (data: Form) =>
    handleSubmit(()=> happeningTypeRepository.createHappeningType(data));
  return { ...methods, onSubmit, loading, success, message, show };
};