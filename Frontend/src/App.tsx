import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import SignInDialog from "./components/dialogs/SignInDialog";
import SignUpDialog from "./components/dialogs/SignUpDialog";

function App() {
  const [signInOpen, setSignInOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  return (
    <>
      <div className="min-h-screen bg-white">
        <Header
          onSignIn={() => setSignInOpen(true)}
          onAddLearning={() => console.log("Add Learning")}
          onCreateGoal={() => console.log("Create Goal")}
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

      {/* <CommonDialog
        open={open}
        onOpenChange={setOpen}
        title="Add Learning"
        maxWidth="sm:max-w-2xl"
        leftButton={<Button variant="outline">Upload Image</Button>}
        rightButton={<Button>Login</Button>}
      >
        <div className="space-y-4">
          <Input placeholder="Title" />

          <textarea rows={10} placeholder="Write your learning..." />
        </div>
      </CommonDialog> */}
    </>
  );
}

export default App;
