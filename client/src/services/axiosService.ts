import axios from "axios";

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
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (originalRequest.url === "/auth/refresh") {
        return Promise.reject(error);
      }
      try {
        await apiClient.post("/auth/refresh");
        originalRequest._retry = true;
        return apiClient(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
  },
);

export { apiClient };
