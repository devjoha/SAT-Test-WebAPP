interface QuestionPaletteModalProps {
  moduleName: string;
  totalQuestions: number;
  currentQuestion: number;
  answers: Record<number, string>;
  flagged: Set<number>;
  onNavigate: (n: number) => void;
  onClose: () => void;
  onSubmit: () => void;
}

export default function QuestionPaletteModal({
  moduleName,
  totalQuestions,
  currentQuestion,
  answers,
  flagged,
  onNavigate,
  onClose,
  onSubmit,
}: QuestionPaletteModalProps) {
  const answered = Object.keys(answers).length;
  const unanswered = totalQuestions - answered;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/20" />
      <div
        className="relative w-full bg-white shadow-2xl rounded-t-xl overflow-hidden"
        style={{ maxHeight: "70vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-0.5">Section</p>
            <h2 className="text-sm font-bold text-gray-900">{moduleName}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-4 overflow-y-auto" style={{ maxHeight: "calc(70vh - 130px)" }}>
          {/* Legend */}
          <div className="flex items-center gap-5 mb-5 text-xs text-gray-600">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded bg-gray-900" />
              <span>Current</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded border-2 border-gray-900 bg-gray-900" />
              <span>Answered ({answered})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded border-2 border-gray-400" />
              <span>Unanswered ({unanswered})</span>
            </div>
            <div className="flex items-center gap-1.5 relative">
              <div className="w-5 h-5 rounded border-2 border-gray-400 relative">
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-yellow-400 rounded-full border border-white" />
              </div>
              <span>For Review ({flagged.size})</span>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-10 gap-1.5">
            {Array.from({ length: totalQuestions }, (_, i) => i + 1).map((n) => {
              const isCurrent = n === currentQuestion;
              const isAnswered = !!answers[n];
              const isFlagged = flagged.has(n);

              let cls = "relative flex items-center justify-center aspect-square rounded text-sm font-semibold border-2 cursor-pointer transition-all select-none ";
              if (isCurrent) {
                cls += "bg-gray-900 text-white border-gray-900";
              } else if (isAnswered) {
                cls += "bg-gray-700 text-white border-gray-700";
              } else {
                cls += "bg-white text-gray-700 border-gray-400 hover:border-gray-600";
              }

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
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-white transition-colors"
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
    </div>
  );
}
