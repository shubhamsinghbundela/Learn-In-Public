import { Loader2 } from "lucide-react";

export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-3 rounded-xl bg-white px-8 py-6 shadow-lg">
        <Loader2 className="h-10 w-10 animate-spin text-[#1c398e]" />
        <p className="text-sm font-medium text-[#1c398e]">Please wait...</p>
      </div>
    </div>
  );
}
