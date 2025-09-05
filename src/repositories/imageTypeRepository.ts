
import { API_URLS } from "../enum/urls";
import { client } from "./client";
import type{
  ImageTypeCreateForm,
  ImageTypeEditForm,
} from './../pages/ImageType/ImageTypeValidationSchema';

const getAll = async (params?: { limit?: number; offset?: number }) => {
  const query = new URLSearchParams(params as any).toString();
  const response = await client.exec(`${API_URLS.IMAGETYPE}?${query}`, {
    method: "get",
  });
  return response;
};

const createImageType = async (ImageTypeData: ImageTypeCreateForm) => {
  const response = await client.exec(API_URLS.IMAGETYPE, {
    method: "post",
    body: JSON.stringify(ImageTypeData),
  });
  return response;
}

const getImageTypeById = async (id: string) => {
  const response = await client.exec(`${API_URLS.IMAGETYPE}/${id}`, {
    method: "get",
  });
  return response;
};

const updateImageType = async (id: string, data: ImageTypeEditForm) =>{
  const response = await client.exec(`${API_URLS.IMAGETYPE}/${id}`, {
    method: "put",
    body: JSON.stringify(data),
  });
  return response;
}

const deleteImageType = async (id: string) => {
  const response = await client.exec(`${API_URLS.IMAGETYPE}/${id}`, {
    method: "delete",
  });
  return response;
};
export const imageTypeRepository = {
  getAll,
  createImageType,
  getImageTypeById,
  updateImageType,
  deleteImageType,
};

