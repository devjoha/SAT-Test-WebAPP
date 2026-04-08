interface ReviewScreenProps {
  totalQuestions: number;
  currentQuestion: number;
  answers: Record<number, string>;
  flagged: Set<number>;
  onNavigate: (n: number) => void;
  onReturnToTest: () => void;
  onSubmit: () => void;
}

export default function ReviewScreen({
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
  const flaggedCount = flagged.size;

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      <div className="h-16 bg-white border-b border-gray-200 flex items-center px-6">
        <h1 className="text-base font-semibold text-gray-900">Section Review</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 max-w-3xl w-full mx-auto">
        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-3">
            Review your answers below. Click any question number to return to it.
          </p>

          <div className="flex gap-6 mb-5">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <div className="w-5 h-5 rounded bg-blue-600" />
              <span>Current</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <div className="w-5 h-5 rounded bg-gray-800" />
              <span>Answered ({answered})</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <div className="w-5 h-5 rounded border-2 border-gray-300" />
              <span>Unanswered ({unanswered})</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <div className="w-5 h-5 rounded bg-yellow-400 relative">
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-yellow-600 rounded-full" />
              </div>
              <span>Flagged ({flaggedCount})</span>
            </div>
          </div>

          <div className="grid grid-cols-10 gap-2">
            {Array.from({ length: totalQuestions }, (_, i) => i + 1).map((n) => {
              const isCurrent = n === currentQuestion;
              const isAnswered = !!answers[n];
              const isFlagged = flagged.has(n);

              let cls =
                "relative flex items-center justify-center aspect-square rounded text-sm font-medium border cursor-pointer transition-all ";
              if (isCurrent) {
                cls += "bg-blue-600 text-white border-blue-600 shadow ";
              } else if (isAnswered) {
                cls += "bg-gray-800 text-white border-gray-800 ";
              } else {
                cls += "bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:bg-blue-50 ";
              }

              return (
                <button
                  key={n}
                  onClick={() => { onNavigate(n); onReturnToTest(); }}
                  className={cls}
                >
                  {n}
                  {isFlagged && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-yellow-400 rounded-full border border-white" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {unanswered > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-amber-800 font-medium">
              You have {unanswered} unanswered question{unanswered !== 1 ? "s" : ""}.
            </p>
            <p className="text-xs text-amber-600 mt-1">
              You won't be able to change your answers after submitting.
            </p>
          </div>
        )}

        {flaggedCount > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-yellow-800 font-medium">
              You have {flaggedCount} question{flaggedCount !== 1 ? "s" : ""} marked for review.
            </p>
          </div>
        )}
      </div>

      <div className="h-16 bg-white border-t border-gray-200 flex items-center justify-between px-6">
        <button
          onClick={onReturnToTest}
          className="px-5 py-2.5 rounded-full border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Return to Test
        </button>
        <button
          onClick={onSubmit}
          className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold"
        >
          Submit Section
        </button>
      </div>
    </div>
  );
}
