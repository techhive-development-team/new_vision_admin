import { useParams } from "react-router-dom";
import { useGetStudentReviewById } from "../../../hooks/useGetStudentReview";
import { useForm, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  StudentReviewCreateSchema,
  type StudentReviewUpdateForm as Form,
} from "../useStudentReviewValidationSchema";
import { useEffect } from "react";
import { useFormState } from "../../../hooks/useFormState";
import { studentReviewRepository } from "../../../repositories/studentReviewRepository";

export const useStudentReviewEditForm = () => {
  const { id } = useParams();
  const { data: studentReviewData } = useGetStudentReviewById(
    id?.toString() || ""
  );

  const methods: UseFormReturn<Form> = useForm<Form>({
    resolver: zodResolver(StudentReviewCreateSchema),
    defaultValues: {
      name: "",
      batch: "",
      student_img: null,
      educationPartnerId: "",
      review: "",
      qualification: "",
    },
  });

  useEffect(() => {
    if (studentReviewData) {
      methods.reset({
        name: studentReviewData.name,
        batch: studentReviewData.batch,
        student_img: studentReviewData.student_img,
        educationPartnerId:
          studentReviewData.educationPartnerId.toString() || "",
        review: studentReviewData.review,
        qualification: studentReviewData.qualification,
      });
    }
  }, [studentReviewData, methods]);

  const { loading, success, message, show, handleSubmit } =
    useFormState<Form>();

  const onSubmit = async (data: Form) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("batch", data.batch);
    formData.append("student_img", data.student_img);
    formData.append("educationPartnerId", data.educationPartnerId);
    formData.append("review", data.review || "");
    formData.append("qualification", data.qualification || "");

    handleSubmit(() =>
      studentReviewRepository.updateStudentReview(
        id?.toString() || "",
        formData
      )
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
