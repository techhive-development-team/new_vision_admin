import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  EducationPartnerSchema,
  type EducationPartnerCreateForm,
} from "../EducationPartnerValidationSchema";
import { educationPartnerRepository } from "../../../repositories/educationPartnerRepository";
import { useFormState } from "../../../hooks/useFormState";

export const useEducationPartnerCreateForm = () => {
  const methods = useForm<EducationPartnerCreateForm>({
    resolver: zodResolver(EducationPartnerSchema(false, false)),
  });

  const { loading, success, message, show, handleSubmit } =
    useFormState<EducationPartnerCreateForm>();

  const onSubmit = (data: EducationPartnerCreateForm) => {
    const formData = new FormData();
    formData.append("overview", data.overview);
    formData.append("location", data.location);
    formData.append("foundedDate", data.foundedDate || "");
    formData.append("partnerType", data.partnerType || "");

    if (data.logo_img instanceof File)
      formData.append("logo_img", data.logo_img);
    if (data.bg_img instanceof File) formData.append("bg_img", data.bg_img);

    handleSubmit(() =>
      educationPartnerRepository.createEducationPartner(formData)
    );
  };

  return { ...methods, onSubmit, loading, success, show, message };
};
