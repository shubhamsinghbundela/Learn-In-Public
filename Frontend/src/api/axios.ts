import axios from "axios";

const baseURL =
  import.meta.env.VITE_ENV === "development"
    ? import.meta.env.VITE_DEV_SERVER_URL
    : import.meta.env.VITE_PROD_SERVER_URL;

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
