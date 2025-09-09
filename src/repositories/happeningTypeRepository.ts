import { API_URLS } from "../enum/urls";
import { client } from "./client";
import type {
  HappeningTypeCreateForm,
  HappeningTypeEditForm,
} from "./../pages/HappeningType/HappeningTypeValidationSchema";

const getAll = async (params?: { limit?: number; offset?: number }) => {
    const query = new URLSearchParams(params as any).toString();
    const response = await client.exec(`${API_URLS.HAPPENINGTYPE}?${query}`, {
        method: "get",
    });
    return response;
};

const createHappeningType = async (HappeningTypeData: HappeningTypeCreateForm) => {
    const response = await client.exec(API_URLS.HAPPENINGTYPE, {
        method: "post",
        body: JSON.stringify(HappeningTypeData),
    });
    return response;
};

const getHappeningTypeById = async (id: string) => {
    const response = await client.exec(`${API_URLS.HAPPENINGTYPE}/${id}`,{
        method: "get",
    });
    return response;
};

const updateHappeningType = async (id: string, data: HappeningTypeEditForm) => {
    const response = await client.exec(`${API_URLS.HAPPENINGTYPE}/${id}`,{
        method: "put",
        body: JSON.stringify(data),
    });
    return response;
}

const deleteHappeningType = async (id: string) => {
    const response = await client.exec(`${API_URLS.HAPPENINGTYPE}/${id}`,{
        method: "delete",
    });
    return response;
};

export const happeningTypeRepository ={
    getAll,
    createHappeningType,
    getHappeningTypeById,
    updateHappeningType,
    deleteHappeningType,
};