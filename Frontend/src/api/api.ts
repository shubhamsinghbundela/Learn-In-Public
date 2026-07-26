import { api } from "./axios";

type SignupFormData = {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
};

// SIGNUP
export const signupUser = async (data: SignupFormData) => {
  const res = await api.post("/auth/signup", data);
  return res.data;
};

export const signinUser = async (data: {
  username: string;
  password: string;
}) => {
  const res = await api.post("/auth/signin", data);

  return res.data;
};

export const getMe = async () => {
  const res = await api.get("/auth/getme");
  return res.data;
};

export const logout = async () => {
  const res = await api.post("/auth/logout");
  return res.data;
};

export const addLearning = async (data: {
  title: string;
  description: string;
}) => {
  return api.post("/learning/addLearning", data);
};

export const createGoal = async (data: {
  title: string;
  description: string;
}) => {
  return api.post("/goal/createGoal", data);
};

export const getDashboard = async (date: string) => {
  const res = await api.get("/dashboard", {
    params: {
      date,
    },
  });

  return res.data;
};

export const getPublicDashboard = async (username: string, date: string) => {
  const res = await api.get(`/dashboard/public/${username}`, {
    params: { date },
  });

  return res.data;
};
