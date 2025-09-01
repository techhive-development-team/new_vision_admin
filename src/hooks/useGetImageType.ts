import useSWR from "swr";
import { imageTypeRepository } from "../repositories/imageTypeRepository";
import { API_URLS } from "../enum/urls";

export const useGetImageType = () => {
  const { data, error, isLoading, mutate } = useSWR(API_URLS.IMAGETYPE, () =>
    imageTypeRepository.getAll()
  );

  return { data, error, isLoading, mutate };
};
