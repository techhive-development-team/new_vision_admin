import { useParams } from "react-router-dom";
import { useGetEducationPartnerById } from "../../../hooks/useGetEducationPartner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useFormState } from "../../../hooks/useFormState";
import { educationPartnerRepository } from "../../../repositories/educationPartnerRepository";
import {
  EducationPartnerSchema,
  type EducationPartnerUpdateForm as Form,
} from "../EducationPartnerValidationSchema";

export const useEducationPartnerEditForm = () => {
  const { id } = useParams();
  const { data: partnerData } = useGetEducationPartnerById(
    id?.toString() || ""
  );

  const methods = useForm<Form>({
    resolver: zodResolver(
      EducationPartnerSchema(!!partnerData?.logo_img, !!partnerData?.bg_img)
    ),
    defaultValues: {
      overview: "",
      location: "",
      foundedDate: "",
      partnerType: "INSTITUTE",
      logo_img: "",
      bg_img: "",
    },
  });

  useEffect(() => {
    if (partnerData) {
      methods.reset(partnerData);
    }
  }, [partnerData]);

  const { loading, success, message, show, handleSubmit } =
    useFormState<Form>();

  const onSubmit = (data: Form) => {
    const formData = new FormData();
    formData.append("overview", data.overview);
    formData.append("location", data.location);
    formData.append("foundedDate", data.foundedDate || "");
    formData.append("partnerType", data.partnerType || "");

    // Append files only if they are File instances
    if (data.logo_img instanceof File)
      formData.append("logo_img", data.logo_img);
    if (data.bg_img instanceof File) formData.append("bg_img", data.bg_img);

    handleSubmit(() =>
      educationPartnerRepository.updateEducationPartner(
        id?.toString() || "",
        formData
      )
    );
  };

  return { ...methods, onSubmit, loading, success, message, show };
};
