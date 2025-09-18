import useSWR from "swr";
import { API_URLS } from "../enum/urls";
import { studentReviewRepository } from "../repositories/studentReviewRepository";

export const useGetStudentReview = (params?: {
  limit?: number;
  offset?: number;
}) => {
  const key = params
    ? [`${API_URLS.STUDENTREVIEW}`, params]
    : API_URLS.STUDENTREVIEW;

  const { data, error, isLoading, mutate } = useSWR(key, () =>
    studentReviewRepository.getAll(params)
  );
  return {
    data: data?.data,
    error,
    isLoading,
    mutate,
    total: data?.meta?.total,
  };
};

export const useGetStudentReviewById = (id: string) => {
  const key = id ? [`${API_URLS.STUDENTREVIEW}/${id}`] : null;

  const { data, error, isLoading, mutate } = useSWR(key, () =>
    studentReviewRepository.getStudentReviewById(id)
  );
  return {
    data: data?.data,
    error,
    isLoading,
    mutate,
  };
};
