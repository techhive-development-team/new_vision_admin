import { API_URLS } from "../enum/urls";
import useSWR from "swr";
import { futureCountryRepository } from "../repositories/futureCountryRepository";

export const useGetFutureCountry = ( params?: { limit?: number; offset?: number } ) => {
    const key = params? [ `${ API_URLS.FUTURECOUNTRY }`, params ] : API_URLS.FUTURECOUNTRY;

    const { data, error, isLoading, mutate } = useSWR( key, () => futureCountryRepository.getAll( params ) );
    return {
        data: data?.data,
        error,
        isLoading,
        mutate,
        total: data?.meta?.total,
    };
};

export const useGetFutureCountryById = ( id: string ) => {
    const { data, error, isLoading, mutate } = useSWR(
        id ? `${ API_URLS.FUTURECOUNTRY }/${ id }` : null,
        () => futureCountryRepository.getFutureCountryById( id )
    );

    return {
        data: data?.data,
        error,
        isLoading,
        mutate,
    };
};