import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080/api", // Spring Boot base URL
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
