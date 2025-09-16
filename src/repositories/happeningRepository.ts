import { API_URLS } from "../enum/urls";
import { client } from "./client";

const createHappening = async (happening: FormData) => {
  const response = await client.execFormData(
    `${API_URLS.HAPPENING}/upload`,
    happening
  );
  return response;
};

export const happeningRepository = { createHappening };
