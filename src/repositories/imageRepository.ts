import { API_URLS } from "../enum/urls";
import { client } from "./client";

const createImage = async (imageData: FormData) => {
  const response = await client.execFormData(
    `${API_URLS.IMAGE}/upload`,
    imageData
  );
  return response;
};

const getAll = async (params?: { limit?: number; offset?: number }) => {
  const query = new URLSearchParams(params as any).toString();
  const response = await client.exec(`${API_URLS.IMAGE}?${query}`, {
    method: "get",
  });
  return response;
};

const deleteImage = async (id: string) => {
  const response = await client.exec(`${API_URLS.IMAGE}/${id}`, {
    method: "delete",
  });
  return response;
};

const getImageById = async (id: string) => {
  const response = await client.exec(`${API_URLS.IMAGE}/${id}`, {
    method: "get",
  });
  return response;
};

const updateImage = async (id: string, imageData: FormData) => {
  const response = await client.execFormData(
    `${API_URLS.IMAGE}/${id}`,
    imageData,
    {
      method: "put",
    }
  );
  return response;
};

export const imageRepository = {
  createImage,
  getAll,
  deleteImage,
  getImageById,
  updateImage,
};
