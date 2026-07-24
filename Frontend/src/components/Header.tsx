import { Button } from "@/components/ui/button";

interface HeaderProps {
  onSignIn: () => void;
}

export default function Header({ onSignIn }: HeaderProps) {
  return (
    <div className="mx-auto max-w-6xl px-6">
      <header className="flex h-20 items-center justify-between border-b">
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

        <Button
          onClick={onSignIn}
          className="bg-[#1c398e] hover:bg-[#162d72] text-white h-11 px-6"
        >
          Sign In
        </Button>
      </header>
    </div>
  );
}
