import { Button } from "@/components/ui/button";

interface HeaderProps {
  onSignIn: () => void;
  onAddLearning: () => void;
  onCreateGoal: () => void;
}

export default function Header({
  onSignIn,
  onAddLearning,
  onCreateGoal,
}: HeaderProps) {
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
            Team Shiksha
          </h1>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
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

          <Button
            variant="outline"
            onClick={onSignIn}
            className="border-[#1c398e] text-[#1c398e] hover:bg-[#1c398e] hover:text-white"
          >
            Sign In
          </Button>
        </div>
      </header>
    </div>
  );
}
