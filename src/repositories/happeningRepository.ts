import { API_URLS } from "../enum/urls";
import { client } from "./client";

const createHappening = async (happening: FormData) => {
  const response = await client.execFormData(
    `${API_URLS.HAPPENING}/upload`,
    happening
  );
  return response;
};

const getAll = async (params?: { limit?: number; offset?: number }) => {
  const query = new URLSearchParams(params as any).toString();
  const response = await client.exec(`${API_URLS.HAPPENING}?${query}`, {
    method: "get",
  });
  return response;
};

const getHappeningById = async (id: string) => {
  const response = await client.exec(`${API_URLS.HAPPENING}/${id}`, {
    method: "get",
  });
  return response;
};

const deleteHappening = async (id: string) => {
  const response = await client.exec(`${API_URLS.HAPPENING}/${id}`, {
    method: "delete",
  });
  return response;
};

const updateHappening = async (id: string, happeningData: FormData) => {
  const response = await client.execFormData(
    `${API_URLS.HAPPENING}/${id}`,
    happeningData,
    {
      method: "put",
    }
  );
  return response;
};

export const happeningRepository = { createHappening, getAll, getHappeningById, deleteHappening, updateHappening };
