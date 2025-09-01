import { API_URLS } from "../enum/urls";
import { client } from "./client";

const createImage = async (imageData: FormData) => {
  const response = await client.execFormData(
    `${API_URLS.IMAGE}/upload`,
    imageData
  );
  return response;
};

export const imageRepository = { createImage };
