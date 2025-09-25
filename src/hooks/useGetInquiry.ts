import useSWR from "swr";
import { API_URLS } from "../enum/urls";
import { inquiryRepository } from "../repositories/inquiryRepository";

export const useGetInquiry = (params?: { limit?: number; offset?: number }) => {
  const key = params ? [`${API_URLS.INQUIRY}`, params] : API_URLS.INQUIRY;

  const { data, error, isLoading, mutate } = useSWR(key, () =>
    inquiryRepository.getAll(params)
  );
  return{
        data: data?.data,
        error,
        isLoading,
        mutate,
        total: data?.meta?.total,
    };
};

export const useGetInquirybyId = (id: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    id? `${API_URLS.INQUIRY}/${id}` : null,
    () => inquiryRepository.getInquiryById(id)
  );
  return{
        data: data?.data,
        error,
        isLoading,
        mutate,
    };
};

