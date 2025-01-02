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
    // Handle 401 Unauthorized error with token refresh logic
    if (error.response?.status === 401) {
      if (originalRequest.url === "/auth/refresh" || originalRequest.url === "/auth/me") {
        return Promise.reject(error); // Reject if refresh token or current user validation fails to avoid infinite requests
      }
      try {
        // Attempt to refresh the token and retry the original request
        await UserService.refreshToken();
        return apiClient(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError); // Reject if token refresh fails
      }
    }
    return Promise.reject(error);
  },
);

export { apiClient };
