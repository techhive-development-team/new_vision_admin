import { useForm, type UseFormReturn } from "react-hook-form";
import { useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useFormState } from "../../../hooks/useFormState";
import { FutureCountryCreateSchema, type FutureCountryCreateForm as Form  } from "../FutureCountryValidationSchema";
import { futureCountryRepository } from "../../../repositories/futureCountryRepository";
import { useGetFutureCountryById} from "../../../hooks/useGetFutureCountry";

export const useHappeningTypeEditForm = () => {
  const { id } = useParams();
  const { data: FutureCountryData } = useGetFutureCountryById(
    id?.toString() || ""
  );
  const methods: UseFormReturn<Form> = useForm<Form>({
    resolver: zodResolver(FutureCountryCreateSchema),
    defaultValues: {
      country: "",
    },
  });

  useEffect(() => {
    if (FutureCountryData) {
      methods.reset(FutureCountryData);
    }
  }, [FutureCountryData]);

  const { loading, success, message, show, handleSubmit } =
    useFormState<Form>();

  const onSubmit = (data: Form) =>
    handleSubmit(() =>
      futureCountryRepository.updateFutureCountry(id?.toString() || "", data)
    );
  return { ...methods, onSubmit, loading, success, message, show };
};