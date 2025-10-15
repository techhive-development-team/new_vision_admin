import useSWR from "swr";
import { API_URLS } from "../enum/urls";
import { batchRepository } from "../repositories/batchRepository";

export const useGetBatch = (params?: { limit?: number; offset?: number }) => {
  const key = params ? [`${API_URLS.BATCH}`, params] : API_URLS.BATCH;
  const { data, error, isLoading, mutate } = useSWR(key, () =>
    batchRepository.getAll(params)
  );
  return {
    data: data?.data,
    error,
    isLoading,
    mutate,
    total: data?.meta?.total,
  };
};


