import { useForm, type UseFormReturn } from "react-hook-form";
import { InquirySchema, type InquiryCreateForm as Form } from "../InquiryValidationSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFormState } from "../../../hooks/useFormState";
import { inquiryRepository } from "../../../repositories/inquiryRepository";

export const useInquiryCreateForm = () => {
    const methods : UseFormReturn<Form> = useForm<Form>({
        resolver: zodResolver(InquirySchema),
        defaultValues:{
            name: "",
            email: "",
            phone: "",
            description: "",
        },
    });

    const { loading, success, message, show, handleSubmit} =
    useFormState<Form>();
    const onSubmit = (data: Form) =>
        handleSubmit(()=> inquiryRepository.createInquiry(data));

    return { ...methods, onSubmit, loading, success, message, show };
}