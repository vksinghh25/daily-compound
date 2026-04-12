"use client";

interface ProgressBarProps {
  completed: number;
  total: number;
  label?: string;
}

export default function ProgressBar({ completed, total, label = "topics" }: ProgressBarProps) {
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-4 flex-wrap">
      <div className="flex items-center gap-2 min-w-fit">
        <span className="text-sm font-medium text-gray-500">Progress</span>
        <span className="text-sm font-bold" style={{ color: "#1D9E75" }}>
          {completed}/{total} {label}
        </span>
      </div>
      <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${percentage}%`, backgroundColor: "#1D9E75" }}
        />
      </div>
      <span className="text-sm font-semibold text-gray-600 min-w-fit">
        {percentage}%
      </span>
      {percentage === 100 && (
        <span className="text-sm font-medium px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
          🎉 All done!
        </span>
      )}
      <span className="text-xs text-gray-400 italic ml-auto">
        Figures, rates, and tax rules quoted across this course reflect 2024–25 and are subject to change.
      </span>
    </div>
  );
}
