import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/userStore";
import { clearTokens, getAccessToken } from "@/utils/token";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Copy, LogOut } from "lucide-react";
import { logout } from "@/api/api";
import { showToast } from "@/utils/toast";
import { useDashboardStore } from "@/store/dashboardStore";

interface HeaderProps {
  isPublicPage?: boolean;
  onSignIn: () => void;
  onAddLearning: () => void;
  onCreateGoal: () => void;
}

export default function Header({
  isPublicPage,
  onSignIn,
  onAddLearning,
  onCreateGoal,
}: HeaderProps) {
  const user = useUserStore((state) => state.user);
  const token = getAccessToken();
  const removeUser = useUserStore((state) => state.removeUser);
  const clearDashboard = useDashboardStore((state) => state.clearDashboard);
  const handleLogout = async () => {
    try {
      await logout();
      clearDashboard();
      showToast.success("Logged Out", "See you again!");
    } catch (error) {
      // Ignore API errors
    } finally {
      clearTokens();
      removeUser();
    }
  };

  const handleCopyProfile = async () => {
    if (!user?.username) return;

    const url = `${window.location.origin}/${user.username}`;

    try {
      await navigator.clipboard.writeText(url);

      showToast.success(
        "Profile link copied!",
        "Share your learning journey with others.",
      );
    } catch {
      showToast.error("Copy failed", "Unable to copy profile link.");
    }
  };
  return (
    <div className="mx-auto max-w-6xl px-6">
      <header className="flex h-20 items-center justify-between border-b">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src="/fa-logo-blue-bg.svg"
            alt="Team Shiksha"
            className="h-9 w-9 rounded-md"
          />

          <h1 className="text-2xl font-bold tracking-tight text-[#1c398e]">
            Learn In Public
          </h1>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {!isPublicPage && (
            <>
              {token && user && (
                <>
                  <Button
                    variant="outline"
                    onClick={handleCopyProfile}
                    className="border-[#1c398e] text-[#1c398e] hover:bg-[#1c398e] hover:text-white"
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Share Profile
                  </Button>

                  <Button
                    variant="outline"
                    onClick={onAddLearning}
                    className="border-[#1c398e] text-[#1c398e] hover:bg-[#1c398e] hover:text-white"
                  >
                    Add Learning
                  </Button>

                  <Button
                    variant="outline"
                    onClick={onCreateGoal}
                    className="border-[#1c398e] text-[#1c398e] hover:bg-[#1c398e] hover:text-white"
                  >
                    Create Goal
                  </Button>
                </>
              )}

              {token && user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar className="cursor-pointer border border-[#1c398e]">
                      <AvatarFallback className="bg-white text-[#1c398e]">
                        {`${user.firstName[0]}${user.lastName[0]}`}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="w-44 border-[#1c398e]">
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="cursor-pointer text-[#1c398e] focus:bg-[#1c398e] focus:text-white"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  variant="outline"
                  onClick={onSignIn}
                  className="border-[#1c398e] text-[#1c398e] hover:bg-[#1c398e] hover:text-white"
                >
                  Sign In
                </Button>
              )}
            </>
          )}
        </div>
      </header>
    </div>
  );
}
