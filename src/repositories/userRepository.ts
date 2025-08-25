import { API_URLS } from "../enum/urls";
import { client } from "./client";

const getAll = async () => {
  const response = await client.exec(API_URLS.USER, {
    method: "get",
  });
  return response;
};

export const userRepository = {
  getAll,
};
