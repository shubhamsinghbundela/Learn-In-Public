import { useDashboardStore } from "@/store/dashboardStore";
import { ActivityCalendar } from "react-activity-calendar";

export default function ContributionGraph() {
  const fallback = [
    {
      date: new Date().toISOString().split("T")[0],
      count: 0,
      level: 0,
    },
  ];
  const heatmapData = useDashboardStore((state) => state.heatmap);

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-[#1c398e]">
          Learning Activity
        </h2>
        <p className="text-sm text-[#1c398e]">
          Your learning consistency over the past year.
        </p>
      </div>

      <ActivityCalendar
        data={heatmapData.length ? heatmapData : fallback}
        blockSize={14}
        blockMargin={4}
        showWeekdayLabels
        weekStart={1}
        theme={{
          light: ["#ebedf0", "#d6e4ff", "#91b4ff", "#4d7cff", "#1c398e"],
          dark: ["#161b22", "#d6e4ff", "#91b4ff", "#4d7cff", "#1c398e"],
        }}
      />
    </div>
  );
}
