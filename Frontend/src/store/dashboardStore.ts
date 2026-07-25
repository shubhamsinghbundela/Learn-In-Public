import { create } from "zustand";

interface Learning {
  _id: string;
  title: string;
  description: string;
}

interface Goal {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface DashboardState {
  currentStreak: number;
  longestStreak: number;
  todayLearnings: Learning[];
  goals: Goal[];

  setDashboard: (data: {
    currentStreak: number;
    longestStreak: number;
    todayLearnings: Learning[];
    goals: Goal[];
  }) => void;

  clearDashboard: () => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  currentStreak: 0,
  longestStreak: 0,
  todayLearnings: [],
  goals: [],

  setDashboard: (data) =>
    set({
      currentStreak: data.currentStreak,
      longestStreak: data.longestStreak,
      todayLearnings: data.todayLearnings,
      goals: data.goals,
    }),

  clearDashboard: () =>
    set({
      currentStreak: 0,
      longestStreak: 0,
      todayLearnings: [],
      goals: [],
    }),
}));
