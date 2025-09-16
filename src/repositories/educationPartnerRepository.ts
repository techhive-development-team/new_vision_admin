import { API_URLS } from "../enum/urls";
import { client } from "./client";

const createEducationPartner = async (partnerData: FormData) => {
  const response = await client.execFormData(
    `${API_URLS.EDUCATION_PARTNER}/upload`,
    partnerData
  );
  return response;
};

const getAll = async (params?: { limit?: number; offset?: number }) => {
  const query = new URLSearchParams(params as any).toString();
  const response = await client.exec(
    `${API_URLS.EDUCATION_PARTNER}?${query}`,
    { method: "get" }
  );
  return response;
};

const getById = async (id: string) => {
  const response = await client.exec(`${API_URLS.EDUCATION_PARTNER}/${id}`, {
    method: "get",
  });
  return response;
};

const updateEducationPartner = async (
  id: string,
  partnerData: FormData
) => {
  const response = await client.execFormData(
    `${API_URLS.EDUCATION_PARTNER}/${id}`,
    partnerData,
    {
      method: "put",
    }
  );
  return response;
};

const deleteEducationPartner = async (id: string) => {
  const response = await client.exec(`${API_URLS.EDUCATION_PARTNER}/${id}`, {
    method: "delete",
  });
  return response;
};

export const educationPartnerRepository = {
  createEducationPartner,
  getAll,
  getById,
  updateEducationPartner,
  deleteEducationPartner,
};
