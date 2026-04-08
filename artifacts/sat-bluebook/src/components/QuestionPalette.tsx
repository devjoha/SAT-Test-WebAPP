interface QuestionPaletteProps {
  totalQuestions: number;
  currentQuestion: number;
  answers: Record<number, string>;
  flagged: Set<number>;
  onSelect: (n: number) => void;
  onClose: () => void;
  onSubmit: () => void;
}

export default function QuestionPalette({
  totalQuestions,
  currentQuestion,
  answers,
  flagged,
  onSelect,
  onClose,
  onSubmit,
}: QuestionPaletteProps) {
  const answered = Object.keys(answers).length;
  const unanswered = totalQuestions - answered;

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/30" onClick={onClose}>
      <div
        className="w-full max-w-2xl bg-white rounded-t-2xl shadow-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-gray-900">Question Overview</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <div className="flex gap-4 mb-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded bg-blue-600" />
            <span className="text-gray-600">Current</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded bg-gray-800" />
            <span className="text-gray-600">Answered</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded border border-gray-300" />
            <span className="text-gray-600">Unanswered</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded bg-yellow-400 relative">
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-yellow-500 rounded-full" />
            </div>
            <span className="text-gray-600">Flagged</span>
          </div>
        </div>

        <div className="grid grid-cols-10 gap-2 mb-5">
          {Array.from({ length: totalQuestions }, (_, i) => i + 1).map((n) => {
            const isCurrent = n === currentQuestion;
            const isAnswered = !!answers[n];
            const isFlagged = flagged.has(n);

            let cls = "relative flex items-center justify-center w-full aspect-square rounded text-sm font-medium border transition-all cursor-pointer ";
            if (isCurrent) {
              cls += "bg-blue-600 text-white border-blue-600 shadow-md ";
            } else if (isAnswered) {
              cls += "bg-gray-800 text-white border-gray-800 ";
            } else {
              cls += "bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:bg-blue-50 ";
            }

            return (
              <button
                key={n}
                onClick={() => { onSelect(n); onClose(); }}
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

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            <span className="font-medium text-gray-800">{answered}</span> answered ·{" "}
            <span className="font-medium text-gray-800">{unanswered}</span> unanswered
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-full border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Return to Test
            </button>
            <button
              onClick={onSubmit}
              className="px-5 py-2 rounded-full bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700"
            >
              Submit Section
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
