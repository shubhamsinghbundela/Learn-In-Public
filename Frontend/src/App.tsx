import { useState } from "react";
import "./App.css";
import Header from "./components/Header";

function App() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="min-h-screen bg-white">
        <Header onSignIn={() => setOpen(true)} />
      </div>
      {/* <CommonDialog
        open={open}
        onOpenChange={setOpen}
        title="Sign In"
        leftButton={
          <Button variant="ghost" className="p-0">
            Create New Account
          </Button>
        }
        rightButton={<Button>Login</Button>}
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Email</Label>
            <Input />
          </div>

          <div className="space-y-2">
            <Label>Password</Label>
            <Input type="password" />
          </div>
        </div>
      </CommonDialog> */}

      {/* <CommonDialog
        open={open}
        onOpenChange={setOpen}
        title="Sign Up"
        leftButton={<Button variant="ghost">Already have an account?</Button>}
        rightButton={<Button>Login</Button>}
      >
        <div className="space-y-4">
          <Input placeholder="First Name" />
          <Input placeholder="Last Name" />
          <Input placeholder="Username" />
          <Input placeholder="Email" />
          <Input placeholder="Password" />
        </div>
      </CommonDialog> */}

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
