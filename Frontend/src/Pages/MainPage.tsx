import { useState } from "react";

import Header from "@/components/Header";
import SignInDialog from "@/components/dialogs/SignInDialog";
import SignUpDialog from "@/components/dialogs/SignUpDialog";

export default function MainPage() {
  const [signInOpen, setSignInOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);

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
