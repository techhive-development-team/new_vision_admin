import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  CourseCreateSchema,
  type CourseCreateForm,
} from "../courseValidationSchema";
import { useFormState } from "../../../hooks/useFormState";
import { courseRepository } from "../../../repositories/courseRepository";

export const useCourseCreateForm = () => {
  const methods = useForm<CourseCreateForm>({
    resolver: zodResolver(CourseCreateSchema(false)),
    defaultValues: {
      schedules: [
        { day: "MONDAY", startTime: "", endTime: "" },
        { day: "TUESDAY", startTime: "", endTime: "" },
        { day: "WEDNESDAY", startTime: "", endTime: "" },
        { day: "THURSDAY", startTime: "", endTime: "" },
        { day: "FRIDAY", startTime: "", endTime: "" },
        { day: "SATURDAY", startTime: "", endTime: "" },
        { day: "SUNDAY", startTime: "", endTime: "" },
      ],
    },
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
    formData.append("level", data.level || "");
    if (data.expireDate) formData.append("expireDate", data.expireDate);
    if (data.price) formData.append("price", data.price);
    if (data.quiz) formData.append("quiz", data.quiz);
    formData.append("image", data.image);
    if (data.schedules && data.schedules.length > 0) {
      const validSchedules = data.schedules.filter(
        (schedule) => schedule.startTime && schedule.endTime
      );
      if (validSchedules.length > 0) {
        formData.append("schedules", JSON.stringify(validSchedules));
      }
    }

    handleSubmit(async () => {
      return await courseRepository.createCourse(formData);
    });
  };

  return { ...methods, loading, success, message, show, onSubmit };
};