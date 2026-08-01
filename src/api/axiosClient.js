import axios from "axios";
import { API_BASE_URL } from "../config";

const axiosClient = axios.create({
  baseURL: `${API_BASE_URL}/api`, // Spring Boot base URL
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


// later we add JWT interceptor here

export default axiosClient;
