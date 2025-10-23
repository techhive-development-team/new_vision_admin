import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetCourseById } from "../../../hooks/useGetCourse";
import { useForm, type UseFormReturn } from "react-hook-form";
import {
  CourseEditSchema,
  type CourseEditForm,
} from "../courseValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { courseRepository } from "../../../repositories/courseRepository";
import { useFormState } from "../../../hooks/useFormState";

export const useCourseEditForm = () => {
  const { id } = useParams();
  const { data: courseData } = useGetCourseById(id?.toString() || "");
  const methods: UseFormReturn<CourseEditForm> = useForm<CourseEditForm>({
    resolver: zodResolver(CourseEditSchema(!!courseData?.image)),
    defaultValues: {
      name: "",
      programOverview: "",
      duration: "",
      level: "",
      location: "online",
      programType: "ART_DESIGN",
      expireDate: "",
      price: "",
      quiz: "",
      image: undefined,
      skills: [],
      isOpened: false,
    },
  });

  const { reset } = methods;

  useEffect(() => {
    if (courseData) {
      reset({
        name: courseData.name,
        programOverview: courseData.programOverview,
        duration: courseData.duration,
        level: courseData.level || "",
        location: courseData.location as "online" | "onsite",
        programType: courseData.programType as
          | "ART_DESIGN"
          | "TECHNOLOGY"
          | "CHILDRENS_CREATIVE",
        expireDate: courseData.expireDate
          ? courseData.expireDate.split("T")[0]
          : "",
        price: courseData.price?.toString() || "",
        quiz: courseData.quiz || "",
        image: courseData.image,
        skills: courseData.skills || [],
        isOpened: courseData.isOpened,
      });
    }
  }, [courseData, reset]);

  const { loading, success, message, show, handleSubmit } =
    useFormState<CourseEditForm>();

  const onSubmit = (data: CourseEditForm) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("programOverview", data.programOverview);
    formData.append("duration", data.duration);
    formData.append("location", data.location);
    formData.append("programType", data.programType);
    formData.append("level", data.level || "");
    formData.append("isOpened", data.isOpened.toString());
    if (data.expireDate) formData.append("expireDate", data.expireDate);
    if (data.price) formData.append("price", data.price);
    if (data.quiz) formData.append("quiz", data.quiz);
    formData.append("image", data.image);
    if (data.skills && data.skills.length > 0) {
      data.skills.forEach((skill) => formData.append("skills[]", skill));
    } else {
      formData.append("skills[]", "");
    }
    handleSubmit(async () => {
      return await courseRepository.updateCourse(
        id?.toString() || "",
        formData
      );
    });
  };
  return { ...methods, onSubmit, loading, success, message, show };
};
