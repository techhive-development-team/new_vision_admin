import useSWR from "swr";
import { API_URLS } from "../enum/urls";
import { happeningTypeRepository } from "../repositories/happeningTypeRepository";

export const useGetHappeningType = (params?: { limit?: number; offset?: number}) => {
    const key = params ? [`${API_URLS.HAPPENINGTYPE}`, params] : API_URLS.HAPPENINGTYPE;

    const {data, error, isLoading, mutate} = useSWR(key, () => 
        happeningTypeRepository.getAll(params)
    );
    return{
        data: data?.data,
        error,
        isLoading,
        mutate,
        total: data?.meta?.total,
    };
};

export const useGetHappeningTypeById = (id: string) => {
    const { data, error, isLoading, mutate } = useSWR(
        id ? `${API_URLS.HAPPENINGTYPE}/${id}` : null,
        () => happeningTypeRepository.getHappeningTypeById(id)
    );

    return {
        data: data?.data,
        error,
        isLoading,
        mutate,
    };
};