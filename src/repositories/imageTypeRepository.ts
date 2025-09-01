import { API_URLS } from "../enum/urls";
import { client } from "./client";

const getAll = async () => {
  const response = await client.exec(`${API_URLS.IMAGETYPE}`, {
    method: "GET",
  });
  return response;
};

export const imageTypeRepository = {
  getAll,
};
