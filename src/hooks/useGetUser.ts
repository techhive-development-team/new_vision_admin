import useSWR from "swr";
import { API_URLS } from "../enum/urls";
import { userRepository } from "../repositories/userRepository";

export const useGetUser = () => {
  const { data } = useSWR(API_URLS.USER, userRepository.getAll);
  return { data };
};
