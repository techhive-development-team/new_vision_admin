import { API_URLS } from "../enum/urls";
import type {
  UserEditForm,
  UserForm,
} from "../pages/User/userValidationSchema";
import { client } from "./client";

const getAll = async () => {
  const response = await client.exec(API_URLS.USER, {
    method: "get",
  });
  return response;
};

const createUser = async (userData: UserForm) => {
  const response = await client.exec(API_URLS.USER, {
    method: "post",
    body: JSON.stringify(userData),
  });
  return response;
};

const getUserById = async (id: string) => {
  const response = await client.exec(`${id}`, {
    method: "get",
  });
  return response;
};

const updateUser = async (id: string, data: UserEditForm) => {
  const response = await client.exec(`${API_URLS.USER}/${id}`, {
    method: "put",
    body: JSON.stringify(data),
  });
  return response;
};

export const userRepository = {
  getAll,
  createUser,
  getUserById,
  updateUser,
};
