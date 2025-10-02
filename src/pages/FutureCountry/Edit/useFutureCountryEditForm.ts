import { useForm, type UseFormReturn } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useGetFutureCountryById } from "../../../hooks/useGetFutureCountry";
import {
  type FutureCountryCreateForm as Form,
  FutureCountryCreateSchema,
} from "../FutureCountryValidationSchema";
import { useFormState } from "../../../hooks/useFormState";
import { futureCountryRepository } from "../../../repositories/futureCountryRepository";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

export const useFutureCountryEditForm = () => {
  const { id } = useParams();
  const { data: futureCountryData } = useGetFutureCountryById(id?.toString() || "");

  const methods: UseFormReturn<Form> = useForm<Form>({
    resolver: zodResolver(FutureCountryCreateSchema),
    defaultValues: {
      country: "",
    },
  });

  useEffect(() => {
    if (futureCountryData) {
      methods.reset(futureCountryData);
    }
  }, [futureCountryData]);

  const { loading, success, message, show, handleSubmit } = useFormState<Form>();

  const onSubmit = (data: Form) =>
    handleSubmit(() =>
      futureCountryRepository.updateFutureCountry(id?.toString() || "", data)
    );

  return { ...methods, onSubmit, loading, success, message, show };
};