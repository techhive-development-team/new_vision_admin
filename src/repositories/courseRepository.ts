import { API_URLS } from "../enum/urls";
import { client } from "./client";

const createCourse = async (courseData: FormData) => {
  const response = await client.execFormData(`${API_URLS.COURSE}`, courseData);
  return response;
};

const getAll = async (params?: { limit?: number; offset?: number }) => {
  const query = new URLSearchParams(params as any).toString();
  const response = await client.exec(`${API_URLS.COURSE}?${query}`, {
    method: "get",
  });
  return response;
};

const deleteCourse = async (id: string) => {
  const response = await client.exec(`${API_URLS.COURSE}/${id}`, {
    method: "delete",
  });
  return response;
};

const getCourseById = async (id: string) => {
  const response = await client.exec(`${API_URLS.COURSE}/${id}`, {
    method: "get",
  });
  return response;
};

const updateCourse = async (id: string, imageData: FormData) => {
  const response = await client.execFormData(
    `${API_URLS.COURSE}/${id}`,
    imageData,
    {
      method: "put",
    }
  );
  return response;
};

export const courseRepository = {
  createCourse,
  getAll,
  deleteCourse,
  getCourseById,
  updateCourse,
};
