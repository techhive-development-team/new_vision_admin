import useSWR from "swr";
import { API_URLS } from "../enum/urls";
import { educationPartnerRepository } from "../repositories/educationPartnerRepository";

export const useGetEducationPartner = (params?: { limit?: number; offset?: number }) => {
  const key = params ? [`${API_URLS.EDUCATION_PARTNER}`, params] : API_URLS.EDUCATION_PARTNER;

  const { data, error, isLoading, mutate } = useSWR(key, () =>
    educationPartnerRepository.getAll(params)
  );

  return {
    data: data?.data,
    error,
    isLoading,
    mutate,
    total: data?.meta?.total,
  };
};

export const useGetEducationPartnerById = (id: string) => {
  const key = id ? [`${API_URLS.EDUCATION_PARTNER}/${id}`] : null;

  const { data, error, isLoading, mutate } = useSWR(key, () =>
    educationPartnerRepository.getById(id)
  );

  return {
    data: data?.data,
    error,
    isLoading,
    mutate,
  };
};
