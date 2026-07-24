import { create } from "zustand";

interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
}

interface UserStore {
  user: User | null;

  addUser: (user: User) => void;
  removeUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,

  addUser: (user) =>
    set({
      user,
    }),

  removeUser: () =>
    set({
      user: null,
    }),
}));
