interface ReviewScreenProps {
  moduleName: string;
  totalQuestions: number;
  currentQuestion: number;
  answers: Record<number, string>;
  flagged: Set<number>;
  onNavigate: (n: number) => void;
  onReturnToTest: () => void;
  onSubmit: () => void;
}

export default function ReviewScreen({
  moduleName,
  totalQuestions,
  currentQuestion,
  answers,
  flagged,
  onNavigate,
  onReturnToTest,
  onSubmit,
}: ReviewScreenProps) {
  const answered = Object.keys(answers).length;
  const unanswered = totalQuestions - answered;

  return (
    <div className="fixed inset-0 flex flex-col bg-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Header */}
      <div className="h-14 bg-[#1e3a5f] flex items-center px-6">
        <h1 className="text-white font-bold text-base">{moduleName}</h1>
        <span className="mx-2 text-blue-300">·</span>
        <span className="text-blue-200 text-sm">Review</span>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-6 py-8">
          <h2 className="text-lg font-bold text-gray-900 mb-1">Check Your Work</h2>
          <p className="text-sm text-gray-500 mb-6">
            Review your answers before submitting. Click a question to return to it.
          </p>

          {/* Stats */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1 rounded-lg border border-gray-200 p-4 text-center">
              <p className="text-2xl font-bold text-gray-900">{answered}</p>
              <p className="text-xs text-gray-500 mt-1 font-medium uppercase tracking-wide">Answered</p>
            </div>
            <div className={`flex-1 rounded-lg border p-4 text-center ${unanswered > 0 ? "border-amber-200 bg-amber-50" : "border-gray-200"}`}>
              <p className={`text-2xl font-bold ${unanswered > 0 ? "text-amber-600" : "text-gray-900"}`}>{unanswered}</p>
              <p className="text-xs text-gray-500 mt-1 font-medium uppercase tracking-wide">Unanswered</p>
            </div>
            <div className={`flex-1 rounded-lg border p-4 text-center ${flagged.size > 0 ? "border-yellow-200 bg-yellow-50" : "border-gray-200"}`}>
              <p className={`text-2xl font-bold ${flagged.size > 0 ? "text-yellow-600" : "text-gray-900"}`}>{flagged.size}</p>
              <p className="text-xs text-gray-500 mt-1 font-medium uppercase tracking-wide">For Review</p>
            </div>
          </div>

          {/* Legend */}
          <div className="flex gap-5 mb-4 text-xs text-gray-500">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded bg-gray-900" />
              <span>Current</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded bg-gray-700" />
              <span>Answered</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded border-2 border-gray-400" />
              <span>Unanswered</span>
            </div>
            <div className="flex items-center gap-1.5 relative">
              <div className="w-5 h-5 rounded border-2 border-gray-400 relative">
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-yellow-400 rounded-full border border-white" />
              </div>
              <span>For Review</span>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-10 gap-1.5 mb-6">
            {Array.from({ length: totalQuestions }, (_, i) => i + 1).map((n) => {
              const isCurrent = n === currentQuestion;
              const isAnswered = !!answers[n];
              const isFlagged = flagged.has(n);

              let cls = "relative flex items-center justify-center aspect-square rounded text-sm font-semibold border-2 cursor-pointer transition-all ";
              if (isCurrent) cls += "bg-gray-900 text-white border-gray-900";
              else if (isAnswered) cls += "bg-gray-700 text-white border-gray-700";
              else cls += "bg-white text-gray-700 border-gray-400 hover:border-gray-700";

              return (
                <button key={n} onClick={() => onNavigate(n)} className={cls}>
                  {n}
                  {isFlagged && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full border-2 border-white" />
                  )}
                </button>
              );
            })}
          </div>

          {unanswered > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-3">
              <p className="text-sm font-semibold text-amber-800">
                {unanswered} question{unanswered !== 1 ? "s" : ""} unanswered
              </p>
              <p className="text-xs text-amber-600 mt-0.5">
                You cannot change your answers after submitting.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="h-14 bg-white border-t border-gray-200 flex items-center justify-between px-6">
        <button
          onClick={onReturnToTest}
          className="px-5 py-2 rounded-full border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Return to Test
        </button>
        <button
          onClick={onSubmit}
          className="px-6 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors"
        >
          Submit Section
        </button>
      </div>
    </div>
  );
}
