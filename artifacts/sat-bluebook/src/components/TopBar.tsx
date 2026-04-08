interface TopBarProps {
  sectionName: string;
  timeRemaining: number;
  currentQuestion: number;
  totalQuestions: number;
  onReviewClick: () => void;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function TopBar({
  sectionName,
  timeRemaining,
  currentQuestion,
  totalQuestions,
  onReviewClick,
}: TopBarProps) {
  const isLowTime = timeRemaining < 300;

  return (
    <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-50">
      <div className="flex items-center gap-4 min-w-0 flex-1">
        <span className="text-sm font-medium text-gray-700 truncate">{sectionName}</span>
      </div>

      <div className="flex flex-col items-center flex-shrink-0">
        <span
          className={`text-xl font-bold tabular-nums ${
            isLowTime ? "text-red-600" : "text-gray-900"
          }`}
        >
          {formatTime(timeRemaining)}
        </span>
        {isLowTime && (
          <span className="text-xs text-red-500 font-medium">Low Time</span>
        )}
      </div>

      <div className="flex items-center gap-4 min-w-0 flex-1 justify-end">
        <button
          onClick={onReviewClick}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium underline underline-offset-2"
        >
          Review
        </button>
        <span className="text-sm font-medium text-gray-600">
          Question {currentQuestion} of {totalQuestions}
        </span>
      </div>
    </div>
  );
}
