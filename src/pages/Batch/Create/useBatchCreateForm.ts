import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  batchCreateSchema,
  type batchCreateForm,
} from "../batchValidationSchema";
import { useFormState } from "../../../hooks/useFormState";
import { batchRepository } from "../../../repositories/batchRepository";

export const useBatchCreateForm = () => {
  const methods = useForm({
    resolver: zodResolver(batchCreateSchema),
  });

  const { loading, success, message, show, handleSubmit } =
    useFormState<batchCreateForm>();

  const onSubmit = (data: batchCreateForm) => {
    handleSubmit(() => batchRepository.createBatch(data));
  };

  return { ...methods, loading, success, message, show, onSubmit };
};
