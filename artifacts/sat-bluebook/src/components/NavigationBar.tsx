interface NavigationBarProps {
  currentQuestion: number;
  totalQuestions: number;
  onPrevious: () => void;
  onNext: () => void;
  onReview: () => void;
}

export default function NavigationBar({
  currentQuestion,
  totalQuestions,
  onPrevious,
  onNext,
  onReview,
}: NavigationBarProps) {
  const isFirst = currentQuestion === 1;
  const isLast = currentQuestion === totalQuestions;

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 flex items-center justify-between px-6 z-50">
      <button
        onClick={onPrevious}
        disabled={isFirst}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-medium transition-colors ${
          isFirst
            ? "border-gray-200 text-gray-300 cursor-not-allowed"
            : "border-gray-300 text-gray-700 hover:bg-gray-50 active:bg-gray-100"
        }`}
      >
        <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        Previous
      </button>

      <button
        onClick={onReview}
        className="text-sm font-medium text-blue-600 hover:text-blue-700 px-4 py-2.5 rounded-full hover:bg-blue-50 transition-colors"
      >
        Question {currentQuestion} of {totalQuestions}
        <svg className="w-4 h-4 inline-block ml-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      <button
        onClick={onNext}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
          isLast
            ? "bg-green-600 hover:bg-green-700 text-white"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        {isLast ? "Submit" : "Next"}
        {!isLast && (
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        )}
      </button>
    </div>
  );
}
