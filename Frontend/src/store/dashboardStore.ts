import { formatInTimeZone } from "date-fns-tz";
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
  selectedDate: string;

  setSelectedDate: (date: string) => void;

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
  selectedDate: formatInTimeZone(new Date(), "Asia/Kolkata", "yyyy-MM-dd"),

  setSelectedDate: (date) =>
    set({
      selectedDate: date,
    }),

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
