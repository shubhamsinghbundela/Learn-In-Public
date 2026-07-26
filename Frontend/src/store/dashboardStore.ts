import { create } from "zustand";

interface Learning {
  _id: string;
  title: string;
  description: string;
  learningDate: string;
  localCreatedAt: string;
  createdAt: string;
}

interface Goal {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  goalDate: string;
  createdAt: string;
}

interface Heatmap {
  date: string;
  count: number;
  level: number;
}

interface DashboardState {
  currentStreak: number;
  longestStreak: number;
  todayLearnings: Learning[];
  goals: Goal[];
  heatmap: Heatmap[];

  setDashboard: (data: {
    currentStreak: number;
    longestStreak: number;
    todayLearnings: Learning[];
    goals: Goal[];
    heatmap: Heatmap[];
  }) => void;

  clearDashboard: () => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  currentStreak: 0,
  longestStreak: 0,
  todayLearnings: [],
  goals: [],
  heatmap: [],

  setDashboard: (data) =>
    set({
      currentStreak: data.currentStreak,
      longestStreak: data.longestStreak,
      todayLearnings: data.todayLearnings,
      goals: data.goals,
      heatmap: data.heatmap,
    }),

  clearDashboard: () =>
    set({
      currentStreak: 0,
      longestStreak: 0,
      todayLearnings: [],
      goals: [],
      heatmap: [],
    }),
}));
