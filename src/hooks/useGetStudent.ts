import useSWR from "swr";
import { API_URLS } from "../enum/urls";
import { studentRepository } from "../repositories/studentRepository";

export const useGetStudent = (params?: {
  limit?: number;
  offset?: number;
  studentName?: string;
  courseId?: string;
  studyAbroad?: string;
  joinRaffles?: string;
  transactionId?: string;
  status?: string;
  paymentOption?: string;
  fromDate?: string;
  toDate?: string;
}) => {
  const key = params ? [`${API_URLS.STUDENT}`, params] : API_URLS.STUDENT;
  console.log("useGetStudent params:", params)
  const { data, error, isLoading, mutate } = useSWR(key, () =>
    studentRepository.getAll(params)
  );
  return {
    data: data?.data,
    error,
    isLoading,
    mutate,
    total: data?.meta?.total,
  };
};

export const useGetStudentById = (id: string) => {
  const key = id ? [`${API_URLS.STUDENT}/${id}`] : null;

  const { data, error, isLoading, mutate } = useSWR(key, () =>
    studentRepository.getStudentById(id)
  );
  return {
    data: data?.data,
    error,
    isLoading,
    mutate,
  };
};
