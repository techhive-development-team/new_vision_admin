import useSWR from "swr";
import { API_URLS } from "../enum/urls";
import { imageRepository } from "../repositories/imageRepository";

export const useGetImage = (params?: { limit?: number; offset?: number }) => {
  const key = params ? [`${API_URLS.IMAGE}`, params] : API_URLS.IMAGE;

  const { data, error, isLoading, mutate } = useSWR(key, () =>
    imageRepository.getAll(params)
  );
  return {
    data: data?.data?.data,
    error,
    isLoading,
    mutate,
    total: data?.data?.total,
  };
};

export const useGetImageById = (id: string) => {
  const key = id ? [`${API_URLS.IMAGE}/${id}`] : null;

  const { data, error, isLoading, mutate } = useSWR(key, () =>
    imageRepository.getImageById(id)
  );
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
