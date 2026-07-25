import { cn } from "@/lib/utils";
import { useState } from "react";

interface LearningCardProps {
  title: string;
  description: string;
  createdAt: string;
}

export default function LearningCard({
  title,
  description,
  createdAt,
}: LearningCardProps) {
  const [expanded, setExpanded] = useState(false);

  const MAX_LENGTH = 180;
  const isLong = description.length > MAX_LENGTH;

  const displayedText =
    expanded || !isLong
      ? description
      : `${description.slice(0, MAX_LENGTH)}...`;

  return (
    <div className="border-b p-5 last:border-b-0">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-base font-semibold">{title}</h3>

          <div
            className={cn(
              "mt-2 text-sm text-muted-foreground",
              expanded ? "max-h-64 overflow-y-auto" : "line-clamp-4",
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

        <span className="shrink-0 text-sm text-muted-foreground">
          {createdAt}
        </span>
      </div>
    </div>
  );
}
