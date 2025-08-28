import useSWR from "swr";
import { API_URLS } from "../enum/urls";
import { userRepository } from "../repositories/userRepository";

export const useGetUser = () => {
  const { data } = useSWR(API_URLS.USER, userRepository.getAll);
  return { data: data?.data?.data };
};

export const useGetUserById = (id: string) => {
  const { data } = useSWR(`${API_URLS.USER}/${id}`, userRepository.getUserById);
  return { data: data?.data?.data };
};
