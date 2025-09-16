import { API_URLS } from "../enum/urls"
import { client } from "./client"

const createStudentReview = async (studentReviewData: FormData) => {
    const response = await client.execFormData(
        `${API_URLS.STUDENTREVIEW}/upload`,
        studentReviewData
    );
    return response;
}
const getAll = async (params?: { limit?: number; offset?: number }) =>{
    const query = new URLSearchParams(params as any).toString();
    const response = await client.exec(`${API_URLS.STUDENTREVIEW}?${query}`,{
        method: "get",
    });
    return response;
};

const deleteStudentReview = async (id: string) => {
    const response = await client.exec(`${API_URLS.STUDENTREVIEW}/${id}`,{
        method: "delete",
    });
    return response;
};

const getStudentReviewById = async (id: string) => {
  const response = await client.exec(`${API_URLS.STUDENTREVIEW}/${id}`, {
    method: "get",
  });
  return response;
};

const updateStudentReview = async (id: string, studentReviewData: FormData) => {
  const response = await client.execFormData(
    `${API_URLS.STUDENTREVIEW}/${id}`,
    studentReviewData,
    {
      method: "put",
    }
  );
  return response;
};

export const studentReviewRepository = {
    createStudentReview,
    getAll,
    deleteStudentReview,
    getStudentReviewById,
    updateStudentReview,
}