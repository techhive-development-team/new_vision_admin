import { API_URLS } from "../enum/urls";
import { client } from "./client";

const getAll = async (params?: { limit?: number; offset?: number }) => {
  const query = new URLSearchParams(params as any).toString();
  const response = await client.exec(`${API_URLS.STUDENT}?${query}`, {
    method: "get",
  });
  return response;
};

const getStudentById = async (id: string) => {
  const response = await client.exec(`${API_URLS.STUDENT}/${id}`, {
    method: "get",
  });
  return response;
};

const updateStudent = async (id: string, studentData: FormData) => {
  const response = await client.execFormData(
    `${API_URLS.STUDENT}/${id}`,
    studentData,
    {
      method: "put",
    }
  );
  return response;
};

const deleteStudent = async (id: string) => {
  const response = await client.exec(`${API_URLS.STUDENT}/${id}`, {
    method: "delete",
  });
  return response;
};

const sendEmail = async (id: string) => {
  const response = await client.exec(`${API_URLS.STUDENT}/mail/send/${id}`, {
    method: "POST",
  });
  return response;
};

export const studentRepository = {
    getAll,
    getStudentById,
    updateStudent,
    deleteStudent,
    sendEmail,
}
