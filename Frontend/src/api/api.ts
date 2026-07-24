import { api } from "./axios";

type SignupFormData = {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
};

// SIGNUP
export const signupUser = async (data: SignupFormData) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};
