import useSWR from "swr";
import { API_URLS } from "../enum/urls";
import { courseRepository } from "../repositories/courseRepository";

export const useGetCourse = (params?: { limit?: number; offset?: number }) => {
  const key = params ? [`${API_URLS.COURSE}`, params] : API_URLS.COURSE;

  const { data, error, isLoading, mutate } = useSWR(key, () =>
    courseRepository.getAll(params)
  );
  return {
    data: data?.data,
    error,
    isLoading,
    mutate,
    total: data?.meta?.total,
  };
};

export const useGetCourseById = (id: string) => {
  const key = id ? [`${API_URLS.COURSE}/${id}`] : null;

  const { data, error, isLoading, mutate } = useSWR(key, () =>
    courseRepository.getCourseById(id)
  );
  return {
    data: data?.data,
    error,
    isLoading,
    mutate,
  };
};
