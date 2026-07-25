import { Flame, Target } from "lucide-react";
import StreakCircle from "./StreakCircle";
import GoalCard from "./GoalCard";
import { useDashboardStore } from "@/store/dashboardStore";

// interface Goal {
//   id: number;
//   title: string;
//   description: string;
//   progress: number;
// }

// const goals: Goal[] = [
//   {
//     id: 1,
//     title: "Master React Hooks",
//     description:
//       "Learn Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets. It has survived not only many decades, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised thanks to these sheets and more recently with desktop publishing software like Aldus PageMaker and Microsoft Word including versions of Lorem Ipsum. useMemo, useCallback, React.memo and build custom hooks. ",
//     progress: 60,
//   },
//   {
//     id: 2,
//     title: "Build Mini CEX",
//     description: "Implement order matching engine and websocket communication.",
//     progress: 45,
//   },
//   {
//     id: 3,
//     title: "Learn Redis Streams",
//     description:
//       "Understand consumer groups, pending entries and acknowledgements.",
//     progress: 20,
//   },
//   {
//     id: 4,
//     title: "DSA Practice",
//     description: "Solve 5 LeetCode problems related to graphs.",
//     progress: 15,
//   },
// ];

export default function ConsistencyCard() {
  const currentStreak = useDashboardStore((state) => state.currentStreak);

  const longestStreak = useDashboardStore((state) => state.longestStreak);

  const goals = useDashboardStore((state) => state.goals);
  return (
    <div className="flex h-[650px] flex-col rounded-xl border bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2 border-b p-5">
        <Flame className="h-5 w-5 text-orange-500" />
        <h2 className="text-xl font-semibold">Consistency</h2>
      </div>

      {/* Streak */}
      <div className="grid grid-cols-2 gap-4 p-5">
        <StreakCircle
          title="Current Streak"
          value={currentStreak}
          subtitle="Keep it going! 🔥"
          color="text-green-600"
          ring="border-green-500"
        />

        <StreakCircle
          title="Longest Streak"
          value={longestStreak}
          subtitle="Best record so far! 🎉"
          color="text-purple-600"
          ring="border-purple-500"
        />
      </div>

      {/* Goals */}
      <div className="flex flex-1 flex-col border-t min-h-0">
        <div className="flex items-center gap-2 border-b p-5 shrink-0">
          <Target className="h-5 w-5 text-red-500" />
          <h3 className="text-lg font-semibold">Today's Goals</h3>
        </div>

        <div className="flex-1 overflow-y-auto">
          {goals.length === 0 ? (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              No goals created yet.
            </div>
          ) : (
            goals.map((goal) => <GoalCard key={goal._id} goal={goal} />)
          )}
        </div>
      </div>
    </div>
  );
}
