interface StreakCircleProps {
  title: string;
  value: number;
  subtitle: string;
  color: string;
  ring: string;
}

export default function StreakCircle({
  title,
  value,
  subtitle,
  color,
  ring,
}: StreakCircleProps) {
  return (
    <div className="rounded-lg border p-4 text-center">
      <p className="mb-4 text-sm font-medium text-[#1c398e]">{title}</p>

      <div
        className={`mx-auto flex h-28 w-28 items-center justify-center rounded-full border-[6px] ${ring}`}
      >
        <div>
          <p className={`text-3xl font-bold ${color}`}>{value}</p>
          <p className="text-xs  text-[#1c398e]">days</p>
        </div>
      </div>

      <p className="mt-4 text-xs text-[#1c398e]">{subtitle}</p>
    </div>
  );
}
