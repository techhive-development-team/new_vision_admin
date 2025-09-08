import { API_URLS } from "../enum/urls";
import type { LoginFormValues } from "../pages/Auth/Login/loginValidationSchema";
import { client } from "./client";

export const authRepository = {
  async login(data: LoginFormValues): Promise<string> {
    const response = await client.exec(API_URLS.AUTH + "/login", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (response?.statusCode !== 200) {
      throw response.data;
    }
    return response.data;
  },
};
