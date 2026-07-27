import axios from "axios";

const baseURL =
  import.meta.env.VITE_ENV === "development"
    ? "http://localhost:3000/api"
    : "/api";

export const api = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 10000,
});

// Used only for refreshing the access token.
// No interceptors are attached to this instance.
const refreshApi = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 10000,
});

export const refreshToken = () => {
  return refreshApi.post("/auth/refresh");
};
