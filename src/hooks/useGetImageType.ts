import useSWR from "swr";
import { imageTypeRepository } from "../repositories/imageTypeRepository";
import { API_URLS } from "../enum/urls";

export const useGetImageType = (params?: { limit?: number; offset?: number}) => {
  const key= params ? [`${API_URLS.IMAGETYPE}`, params] : API_URLS.IMAGETYPE;

  const {data, error, isLoading, mutate}= useSWR(key, () => 
    imageTypeRepository.getAll(params)
  );
  return{
    data: data?.data?.data,
    error,
    isLoading,
    mutate,
    total: data?.data?.total,
  };
};

export const useGetImageTypeById = (id: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    id ? `${API_URLS.USER}/${id}` : null,
    () => imageTypeRepository.getImageTypeById(id)
  );

  return {
    data: data?.data?.data,
    error,
    isLoading,
    mutate,
  };
};
