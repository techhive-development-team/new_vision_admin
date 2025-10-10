import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  CourseCreateSchema,
  type CourseCreateForm,
} from "../courseValidationSchema";
import { useFormState } from "../../../hooks/useFormState";
import { courseRepository } from "../../../repositories/courseRepository";

export const useCourseCreateForm = () => {
  const methods = useForm({
    resolver: zodResolver(CourseCreateSchema(false)),
  });

  const { loading, success, message, show, handleSubmit } =
    useFormState<CourseCreateForm>();

  const onSubmit = (data: CourseCreateForm) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("programOverview", data.programOverview);
    formData.append("duration", data.duration);
    formData.append("location", data.location);
    formData.append("programType", data.programType);
    formData.append("level", data.level);
    if (data.expireDate) formData.append("expireDate", data.expireDate);
    if (data.price) formData.append("price", data.price);
    if (data.quiz) formData.append("quiz", data.quiz);
    formData.append("image", data.image);
    data.skills.forEach((skill) => formData.append("skills[]", skill));
    handleSubmit(async () => {
      return await courseRepository.createCourse(formData);
    });
  };
  return { ...methods, loading, success, message, show, onSubmit };
};
