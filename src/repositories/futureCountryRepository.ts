import { API_URLS } from "../enum/urls";
import type { FutureCountryCreateForm } from "../pages/FutureCountry/FutureCountryValidationSchema";
import { client } from "./client";

const getAll = async ( params?: { limit?: number; offset?: number } ) => {
    const query = new URLSearchParams( params as any ).toString();
    const response = await client.exec( `${ API_URLS.FUTURECOUNTRY }?${query}`, {
        method: "get",
    } );
    return response;
};

const createFutureCountry = async ( FutureCountryData: FutureCountryCreateForm ) => {
    const response = await client.exec( API_URLS.FUTURECOUNTRY, {
        method: "post",
        body: JSON.stringify(FutureCountryData),
    });
    return response;
};

const getFutureCountryById = async ( id: string ) => {
    const response = await client.exec( `${ API_URLS.FUTURECOUNTRY }/${ id }`, {
        method : "get",
    });
    return response;
};

const updateFutureCountry = async ( id: string, data: FutureCountryCreateForm ) => {
    const response = await client.exec( `${ API_URLS.FUTURECOUNTRY }/${ id }`, {
        method : "put",
        body: JSON.stringify( data ),
    });
    return response;
};

const deleteFutureCountry = async ( id: string ) => {
    const response = await client.exec(`${ API_URLS.FUTURECOUNTRY }/${ id }`, {
        method : "delete",
    });
    return response;
};

export const futureCountryRepository = {
    getAll,
    createFutureCountry,
    getFutureCountryById,
    updateFutureCountry,
    deleteFutureCountry,
}
