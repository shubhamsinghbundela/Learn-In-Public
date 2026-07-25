import { useEffect, useState } from "react";

import Header from "@/components/Header";
import SignInDialog from "@/components/dialogs/SignInDialog";
import SignUpDialog from "@/components/dialogs/SignUpDialog";
import { getMe } from "@/api/api";
import { useUserStore } from "@/store/userStore";
import { clearTokens, getAccessToken } from "@/utils/token";

export default function MainPage() {
  const [signInOpen, setSignInOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);

  const addUser = useUserStore((state) => state.addUser);
  const removeUser = useUserStore((state) => state.removeUser);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const token = getAccessToken();

    if (!token) return;

    try {
      const res = await getMe();

      addUser(res.data.user);
    } catch (error) {
      clearTokens();
      removeUser();
    }
  };

  return (
    <>
      <div className="min-h-screen bg-white">
        <Header
          onSignIn={() => setSignInOpen(true)}
          onAddLearning={() => {}}
          onCreateGoal={() => {}}
        />
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
    </>
  );
}
