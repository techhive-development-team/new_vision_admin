import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  EducationPartnerSchema,
  type EducationPartnerCreateForm,
} from "../EducationPartnerValidationSchema";
import { educationPartnerRepository } from "../../../repositories/educationPartnerRepository";
import { useFormState } from "../../../hooks/useFormState";

export const useEducationPartnerCreateForm = () => {
  const methods = useForm({
    resolver: zodResolver(EducationPartnerSchema),
  });

  const { loading, success, message, show, handleSubmit } =
    useFormState<EducationPartnerCreateForm>();

  const onSubmit = async (data: EducationPartnerCreateForm) => {
    const formData = new FormData();
    formData.append("overview", data.overview);
    formData.append("location", data.location);
    formData.append("foundedDate", data.foundedDate || "");
    formData.append("partnerType", data.partnerType || "");
    formData.append("logo_img", data.logo_img);
    formData.append("bg_img", data.bg_img);

    handleSubmit(
      async () =>
        await educationPartnerRepository.createEducationPartner(formData)
    );
  };

  return {
    ...methods,
    onSubmit,
    loading,
    success,
    show,
    message,
  };
};
