import axios from "axios";

export const api = axios.create({
  baseURL:
    import.meta.env.VITE_ENV === "development"
      ? "http://localhost:3000/api"
      : "/api", // change to your backend
  withCredentials: true, // important if using cookies for refresh token
  timeout: 10000, //Maximum time (in milliseconds) Axios will wait for a response from the server before aborting the request.
});

export const refreshToken = async () => {
  return axios.post(
    `${import.meta.env.VITE_API_URL}/api/auth/refresh`,
    {},
    {
      withCredentials: true,
    },
  );
};
