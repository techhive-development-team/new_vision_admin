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

const DAYS_OPTIONS = [
  { label: "Monday", value: "MONDAY" },
  { label: "Tuesday", value: "TUESDAY" },
  { label: "Wednesday", value: "WEDNESDAY" },
  { label: "Thursday", value: "THURSDAY" },
  { label: "Friday", value: "FRIDAY" },
  { label: "Saturday", value: "SATURDAY" },
  { label: "Sunday", value: "SUNDAY" },
] as const;

type DayType = "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";

interface Schedule {
  day: DayType;
  startTime?: string;
  endTime?: string;
}

export const useCourseEditForm = () => {
  const { id } = useParams<{ id: string }>();
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
      isOpened: false,
      schedules: [],
    },
  });

  const { reset } = methods;

  useEffect(() => {
    if (courseData) {
      // Create a map of existing schedules by day
      const scheduleMap = new Map<DayType, Schedule>();
      if (courseData.schedules && Array.isArray(courseData.schedules) && courseData.schedules.length > 0) {
        courseData.schedules.forEach((schedule: any) => {
          scheduleMap.set(schedule.day as DayType, schedule);
        });
      }

      // Create schedules array matching DAYS_OPTIONS order
      const schedulesArray: Schedule[] = DAYS_OPTIONS.map((day) => {
        const existingSchedule = scheduleMap.get(day.value as DayType);
        return {
          day: day.value as DayType,
          startTime: existingSchedule?.startTime || "",
          endTime: existingSchedule?.endTime || "",
        };
      });

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
        isOpened: courseData.isOpened,
        schedules: schedulesArray,
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
    if (data.schedules && data.schedules.length > 0) {
      const activeSchedules = data.schedules.filter(
        (schedule) => schedule.startTime || schedule.endTime
      );

      if (activeSchedules.length > 0) {
        formData.append("schedules", JSON.stringify(activeSchedules));
      }
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