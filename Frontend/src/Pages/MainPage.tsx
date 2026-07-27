import { useEffect, useState } from "react";

import Header from "@/components/Header";
import SignInDialog from "@/components/dialogs/SignInDialog";
import SignUpDialog from "@/components/dialogs/SignUpDialog";
import { getDashboard, getMe, getPublicDashboard } from "@/api/api";
import { useUserStore } from "@/store/userStore";
import { clearTokens, getAccessToken } from "@/utils/token";
import AddLearningDialog from "@/components/dialogs/AddLearningDialog";
import CreateGoalDialog from "@/components/dialogs/CreateGoalDialog";
import { showToast } from "@/utils/toast";
import TodayLearningCard from "@/components/learning-card/TodayLearningCard";
import ConsistencyCard from "@/components/consistency-streak-card/ConsistencyCard";
import { useDashboardStore } from "@/store/dashboardStore";
import { useParams } from "react-router-dom";
import ContributionGraph from "@/components/contribution-graph/ContributionGraph";

export default function MainPage() {
  const { username } = useParams();
  const isPublicPage = !!username;
  const [signInOpen, setSignInOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [addLearningOpen, setAddLearningOpen] = useState(false);
  const [createGoalOpen, setCreateGoalOpen] = useState(false);

  const addUser = useUserStore((state) => state.addUser);
  const removeUser = useUserStore((state) => state.removeUser);

  const selectedDate = useDashboardStore((state) => state.selectedDate);

  const setDashboard = useDashboardStore((state) => state.setDashboard);
  const user = useUserStore((state) => state.user);

  const clearDashboard = useDashboardStore((state) => state.clearDashboard);

  // Load user only once
  useEffect(() => {
    if (isPublicPage) return;

    fetchUser();
  }, []);

  // Fetch dashboard whenever dependencies change
  useEffect(() => {
    if (isPublicPage) {
      fetchPublicDashboard(selectedDate);
      return;
    }

    if (!user) return;

    fetchDashboard(selectedDate);
  }, [selectedDate, user, isPublicPage, username]);

  const fetchPublicDashboard = async (date: string) => {
    clearDashboard();
    try {
      const res = await getPublicDashboard(username!, date);

      setDashboard({
        currentStreak: res.data.streak.currentStreak,
        longestStreak: res.data.streak.longestStreak,
        todayLearnings: res.data.todayLearnings,
        goals: res.data.goals,
        heatmap: res.data.heatmap,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDashboard = async (date: string) => {
    clearDashboard();
    try {
      const res = await getDashboard(date);

      setDashboard({
        currentStreak: res.data.streak.currentStreak,
        longestStreak: res.data.streak.longestStreak,
        todayLearnings: res.data.todayLearnings,
        goals: res.data.goals,
        heatmap: res.data.heatmap,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUser = async () => {
    const token = getAccessToken();

    if (!token) return;

    try {
      const res = await getMe();

      addUser(res.data.user);

      // await fetchDashboard(selectedDate);
    } catch (error) {
      clearTokens();
      removeUser();
    }
  };

  const handleAddLearning = () => {
    const token = getAccessToken();

    if (!token) {
      showToast.info(
        "Sign in required",
        "Please sign in to add your learning.",
      );
      setSignInOpen(true);
      return;
    }

    setAddLearningOpen(true);
  };

  const handleCreateGoal = () => {
    const token = getAccessToken();

    if (!token) {
      showToast.info("Sign in required", "Please sign in to create a goal.");
      setSignInOpen(true);
      return;
    }

    setCreateGoalOpen(true);
  };

  return (
    <>
      <div className="min-h-screen bg-white">
        <Header
          isPublicPage={isPublicPage}
          onSignIn={() => setSignInOpen(true)}
          onAddLearning={handleAddLearning}
          onCreateGoal={handleCreateGoal}
        />
        <main className="mx-auto max-w-6xl px-6 py-8 ">
          <div className="flex gap-6">
            <div className="w-1/2">
              <TodayLearningCard />
            </div>

            <div className="w-1/2">
              <ConsistencyCard />
            </div>
          </div>

          <div className="mt-8">
            <ContributionGraph />
          </div>
        </main>
      </div>

      <SignInDialog
        open={signInOpen}
        onOpenChange={setSignInOpen}
        onCreateAccount={() => {
          setSignInOpen(false);
          setSignUpOpen(true);
        }}
      />

      <SignUpDialog
        open={signUpOpen}
        onOpenChange={setSignUpOpen}
        onSignInClick={() => {
          setSignUpOpen(false);
          setSignInOpen(true);
        }}
      />

      <AddLearningDialog
        open={addLearningOpen}
        onOpenChange={setAddLearningOpen}
        onSuccess={() => fetchDashboard(selectedDate)}
      />

      <CreateGoalDialog
        open={createGoalOpen}
        onOpenChange={setCreateGoalOpen}
        onSuccess={() => fetchDashboard(selectedDate)}
      />
    </>
  );
}
