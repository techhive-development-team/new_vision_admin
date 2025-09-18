import useSWR from "swr";
import { API_URLS } from "../enum/urls";
import { happeningRepository } from "../repositories/happeningRepository";

export const useGetHappening = (params?: { limit?: number; offset?: number }) => {
  const key = params ? [`${API_URLS.HAPPENING}`, params] : API_URLS.IMAGE;

  const { data, error, isLoading, mutate } = useSWR(key, () =>
    happeningRepository.getAll(params)
  );
  return {
    data: data?.data,
    error,
    isLoading,
    mutate,
    total: data?.meta?.total,
  };
};

export const useGetHappeningById = (id: string) => {
  const key = id ? [`${API_URLS.HAPPENING}/${id}`] : null;

  const { data, error, isLoading, mutate } = useSWR(key, () =>
    happeningRepository.getHappeningById(id)
  );
  return {
    data: data?.data,
    error,
    isLoading,
    mutate,
  };
};