import axios from "axios";

export const api = axios.create({
  baseURL: "/api",
  timeout: 5000
});

api.interceptors.response.use(
  res => res,
  error => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);
