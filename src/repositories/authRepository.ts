import { API_URLS } from "../enum/urls";
import { client } from "./client";

interface LoginData {
  email: string;
  password: string;
}

export const authRepository = {
  async login(data: LoginData): Promise<{ token: string }> {
    const response = await client.exec(API_URLS.AUTH + "/login", {
      method: "POST",
      body: JSON.stringify(data),
    });

    // parse JSON directly from response (client.exec must return a JS object)
    const result = response; 

    if (!result.success) {
      // throw field-specific error
      throw result.data; 
    }

    // return token
    return { token: result.data.data };
  },
};
