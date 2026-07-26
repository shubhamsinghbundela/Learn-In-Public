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

// Intl.DateTimeFormat(): Creates an object for formatting dates according to the user's browser settings.
// Intl.DateTimeFormat().resolvedOptions(): Returns the browser's date/time configuration.
// {
//   locale: "en-IN",
//   calendar: "gregory",
//   numberingSystem: "latn",
//   timeZone: "Asia/Kolkata",
//   hourCycle: "h12"
// }
export const addLearning = async (data: {
  title: string;
  description: string;
}) => {
  return api.post("/learning/addLearning", data, {
    headers: {
      "x-timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
  });
};

export const createGoal = async (data: {
  title: string;
  description: string;
}) => {
  return api.post("/goal/createGoal", data, {
    headers: {
      "x-timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
  });
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

export const getHeatmap = () => {
  return api.get("/heatmap/getHeatmap");
};
