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

const execFormData = async (
  endPoint: RequestInfo,
  formData: FormData,
  config?: RequestInit
) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${baseUrl}${endPoint}`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
      ...config?.headers,
    },
    ...config,
  });

  return await response.json();
};

export const client = { exec, execFormData };
