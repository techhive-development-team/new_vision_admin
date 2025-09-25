import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type UseFormReturn } from "react-hook-form";
import {useFormState } from "../../../hooks/useFormState";
import {
    type FutureCountryCreateForm as Form,
    FutureCountryCreateSchema } from "../FutureCountryValidationSchema";
import { futureCountryRepository } from "../../../repositories/futureCountryRepository";

export const useFutureCountryCreateForm = () => {
  const methods: UseFormReturn<Form> = useForm<Form>( {
    resolver: zodResolver( FutureCountryCreateSchema ),
    defaultValues: {
      country: "",
    },
  });

  const { loading, success, message, show, handleSubmit } = 
    useFormState<Form>();
    
  const onSubmit = ( data: Form ) =>
    handleSubmit( ()=> futureCountryRepository.createFutureCountry( data ) );
  return { ...methods, onSubmit, loading, success, message, show };
};