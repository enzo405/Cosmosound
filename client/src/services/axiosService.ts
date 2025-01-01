import axios from "axios";
import UserService from "./userService";

axios.defaults.withCredentials = true;

const apiClient = axios.create({
  baseURL: "http://localhost:4000",
});

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401) {
      if (originalRequest.url === "/auth/refresh" || originalRequest.url === "/auth/me") {
        return Promise.reject(error);
      }
      try {
        return apiClient(await UserService.refreshToken());
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
  },
);

export { apiClient };
