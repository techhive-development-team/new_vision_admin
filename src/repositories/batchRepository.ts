import { API_URLS } from "../enum/urls";
import { client } from "./client";

const getAll = async (params?: { limit?: number; offset?: number }) => {
  const query = new URLSearchParams(params as any).toString();
  const response = await client.exec(`${API_URLS.BATCH}?${query}`, {
    method: "get",
  });
  return response;
};

const getByCourse = async (
  courseId: string,
  params?: { limit?: number; offset?: number }
) => {
  const query = new URLSearchParams(params as any).toString();
  const response = await client.exec(
    `${API_URLS.BATCH}/course/${courseId}?${query}`,
    { method: "get" }
  );
  return response;
};

const getById = async (id: string) => {
  const response = await client.exec(`${API_URLS.BATCH}/${id}`, {
    method: "get",
  });
  return response;
};

const createBatch = async (data: any) => {
  const response = await client.exec(`${API_URLS.BATCH}`, {
    method: "post",
    body: JSON.stringify(data),
  });
  return response;
};

const updateBatch = async (id: string, data: any) => {
  const response = await client.exec(`${API_URLS.BATCH}/${id}`, {
    method: "put",
    body: JSON.stringify(data),
  });
  return response;
};

const deleteBatch = async (id: string) => {
  const response = await client.exec(`${API_URLS.BATCH}/${id}`, {
    method: "delete",
  });
  return response;
};

export const batchRepository = {
  getAll,
  getByCourse,
  getById,
  createBatch,
  updateBatch,
  deleteBatch,
};


