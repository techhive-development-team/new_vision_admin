import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  StudentReviewCreateSchema,
  type StudentReviewCreateForm,
} from "../useStudentReviewValidationSchema";
import { studentReviewRepository } from "../../../repositories/studentReviewRepository";
import { useFormState } from "../../../hooks/useFormState";

export const useStudentReviewCreate = () => {
  const methods = useForm({
    resolver: zodResolver(StudentReviewCreateSchema),
  });

  const { loading, success, message, show, handleSubmit } =
    useFormState<StudentReviewCreateForm>();

  const onSubmit = async (data: StudentReviewCreateForm) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("batch", data.batch);
    formData.append("student_img", data.student_img);
    formData.append("educationPartnerId", data.educationPartnerId);
    formData.append("review", data.review || "");
    handleSubmit(async () => await studentReviewRepository.createStudentReview(formData));
  };
  return{
    ...methods,
    onSubmit,
    loading,
    success,
    show,
    message,
  };
};
