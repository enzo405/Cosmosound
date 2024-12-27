import axios from "axios";

axios.defaults.withCredentials = true;

const apiClient = axios.create({
  baseURL: "http://localhost:4000",
});

export { apiClient };
