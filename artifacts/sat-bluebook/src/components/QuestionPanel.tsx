interface QuestionPanelProps {
  questionNumber: number;
  passage?: string;
  questionText: string;
  isMarked: boolean;
  onMarkToggle: () => void;
}

export default function QuestionPanel({
  questionNumber,
  passage,
  questionText,
  isMarked,
  onMarkToggle,
}: QuestionPanelProps) {
  return (
    <div className="flex flex-col h-full overflow-y-auto bg-white">
      <div className="p-6 flex-1">
        <div className="max-w-prose">
          {passage && (
            <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <p className="text-gray-800 text-[15px] leading-relaxed">{passage}</p>
            </div>
          )}

          <div className="flex items-start gap-3">
            <div className="flex items-center gap-2 flex-shrink-0 mt-0.5">
              <span className="flex items-center justify-center w-7 h-7 bg-blue-600 text-white text-sm font-bold rounded-full">
                {questionNumber}
              </span>
              <button
                onClick={onMarkToggle}
                className={`flex items-center gap-1 text-xs px-2 py-1 rounded border transition-colors ${
                  isMarked
                    ? "bg-yellow-50 border-yellow-400 text-yellow-700"
                    : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                }`}
              >
                <svg
                  className={`w-3 h-3 ${isMarked ? "text-yellow-500" : "text-gray-400"}`}
                  fill={isMarked ? "currentColor" : "none"}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
                Mark for Review
              </button>
            </div>
          </div>

          <p className="mt-4 text-gray-900 text-[15px] leading-relaxed font-normal">
            {questionText}
          </p>
        </div>
      </div>
    </div>
  );
}
