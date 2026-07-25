import { cn } from "@/lib/utils";
import { useState } from "react";

interface Goal {
  id: number;
  title: string;
  description: string;
  progress: number;
}

export default function GoalCard({ goal }: { goal: Goal }) {
  const [expanded, setExpanded] = useState(false);

  const MAX_LENGTH = 120;

  const isLong = goal.description.length > MAX_LENGTH;

  const displayedText =
    expanded || !isLong
      ? goal.description
      : `${goal.description.slice(0, MAX_LENGTH)}...`;

  return (
    <div className="border-b p-5 last:border-b-0">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">{goal.title}</h4>
          </div>

          <div
            className={cn(
              "mt-2 text-sm text-muted-foreground",
              expanded ? "max-h-40 overflow-y-auto" : "line-clamp-3",
            )}
          >
            {displayedText}
          </div>

          {isLong && (
            <button
              onClick={() => setExpanded((prev) => !prev)}
              className="mt-2 text-sm font-medium text-blue-600 hover:underline"
            >
              {expanded ? "Show less" : "Read more"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
