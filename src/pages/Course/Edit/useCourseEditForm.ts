import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetCourseById } from "../../../hooks/useGetCourse";
import { useForm, type UseFormReturn } from "react-hook-form";
import {
  CourseCreateSchema,
  type CourseCreateForm,
} from "../courseValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { courseRepository } from "../../../repositories/courseRepository";
import { useFormState } from "../../../hooks/useFormState";

export const useCourseEditForm = () => {
  const { id } = useParams();
  const { data: courseData } = useGetCourseById(id?.toString() || "");
  const methods: UseFormReturn<CourseCreateForm> = useForm<CourseCreateForm>({
    resolver: zodResolver(CourseCreateSchema),
    defaultValues: {
      name: "",
      programOverview: "",
      duration: "",
      level: "",
      location: "online",
      expireDate: "",
      price: "",
      quiz: "",
      image: undefined,
      skills: [],
    },
  });

  const { reset } = methods;

  useEffect(() => {
    if (courseData) {
      reset({
        name: courseData.name,
        programOverview: courseData.programOverview,
        duration: courseData.duration,
        level: courseData.level,
        location: courseData.location as "online" | "onsite",
        expireDate: courseData.expireDate
          ? courseData.expireDate.split("T")[0]
          : "",
        price: courseData.price?.toString() || "",
        quiz: courseData.quiz || "",
        image: courseData.image,
        skills: courseData.skills || [],
      });
    }
  }, [courseData, reset]);

  const { loading, success, message, show, handleSubmit } =
    useFormState<CourseCreateForm>();

  const onSubmit = (data: CourseCreateForm) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("programOverview", data.programOverview);
    formData.append("duration", data.duration);
    formData.append("location", data.location);
    formData.append("level", data.level);
    if (data.expireDate) formData.append("expireDate", data.expireDate);
    if (data.price) formData.append("price", data.price);
    if (data.quiz) formData.append("quiz", data.quiz);
    formData.append("file", data.image);
    data.skills.forEach((skill) => formData.append("skills[]", skill));
    handleSubmit(async () => {
      return await courseRepository.updateCourse(
        id?.toString() || "",
        formData
      );
    });
  };
  return { ...methods, onSubmit, loading, success, message, show };
};
