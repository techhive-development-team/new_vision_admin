import { baseUrl } from "../enum/urls";

const exec = async (endPoint: RequestInfo, config?: RequestInit) => {
  const token = localStorage.getItem("token");
  const headers: HeadersInit = {
    "content-type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const response = await fetch(`${baseUrl}${endPoint}`, {
    ...config,
    headers: {
      ...headers,
      ...config?.headers,
    },
  });
  return await response.json();
};

export const client = { exec };
