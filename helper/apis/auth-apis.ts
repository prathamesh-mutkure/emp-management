import { AUTH_ENDPOINTS, server } from "@/constants/api-endpoints";
import { AxiosError } from "axios";

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await server.post(AUTH_ENDPOINTS.login, {
      username,
      password,
    });

    return response.data as {
      token: string;
    };
  } catch (err: any) {
    const error = err as AxiosError;

    throw new Error((error.response?.data as string) ?? "Failed to login");
  }
};
