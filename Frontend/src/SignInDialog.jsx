import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignInDialog({ open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 border-none">
        <Card className="border-0 shadow-none">
          <DialogHeader className="px-6 pt-6">
            <DialogTitle>Sign In</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 px-6 py-4">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" placeholder="Enter email" />
            </div>

            <div className="space-y-2">
              <Label>Password</Label>
              <Input type="password" placeholder="Password" />
            </div>
          </div>

          <DialogFooter className="flex justify-between px-6 pb-6">
            <Button variant="ghost">Create New Account</Button>

            <Button>Login</Button>
          </DialogFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
