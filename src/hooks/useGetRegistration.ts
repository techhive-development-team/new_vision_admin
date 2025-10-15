import useSWR from "swr";
import { API_URLS } from "../enum/urls";
import { registrationRepository } from "../repositories/registrationRepository";

export const useGetRegistration = (
  params?: { limit?: number; offset?: number }
) => {
  const key = params
    ? [`${API_URLS.REGISTRATION}`, params]
    : API_URLS.REGISTRATION;
  const { data, error, isLoading, mutate } = useSWR(key, () =>
    registrationRepository.getAll(params)
  );
  return {
    data: data?.data,
    error,
    isLoading,
    mutate,
    total: data?.meta?.total,
  };
};


