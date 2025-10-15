import { API_URLS } from "../enum/urls";
import { client } from "./client";

const getAll = async (params?: { limit?: number; offset?: number }) => {
  const query = new URLSearchParams(params as any).toString();
  const response = await client.exec(`${API_URLS.REGISTRATION}?${query}`, {
    method: "get",
  });
  return response;
};

const byStudent = async (
  studentId: string,
  params?: { limit?: number; offset?: number }
) => {
  const query = new URLSearchParams(params as any).toString();
  const response = await client.exec(
    `${API_URLS.REGISTRATION}/student/${studentId}?${query}`,
    { method: "get" }
  );
  return response;
};

const byBatch = async (
  batchId: string,
  params?: { limit?: number; offset?: number }
) => {
  const query = new URLSearchParams(params as any).toString();
  const response = await client.exec(
    `${API_URLS.REGISTRATION}/batch/${batchId}?${query}`,
    { method: "get" }
  );
  return response;
};

const createRegistration = async (data: any) => {
  const response = await client.exec(`${API_URLS.REGISTRATION}`, {
    method: "post",
    body: JSON.stringify(data),
  });
  return response;
};

const updateRegistration = async (id: string, data: any) => {
  const response = await client.exec(`${API_URLS.REGISTRATION}/${id}`, {
    method: "put",
    body: JSON.stringify(data),
  });
  return response;
};

const deleteRegistration = async (id: string) => {
  const response = await client.exec(`${API_URLS.REGISTRATION}/${id}`, {
    method: "delete",
  });
  return response;
};

export const registrationRepository = {
  getAll,
  byStudent,
  byBatch,
  createRegistration,
  updateRegistration,
  deleteRegistration,
};


