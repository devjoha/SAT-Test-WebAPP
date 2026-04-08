interface DoneScreenProps {
  totalAnswered: number;
  totalQuestions: number;
  onRestart: () => void;
}

export default function DoneScreen({ totalAnswered, totalQuestions, onRestart }: DoneScreenProps) {
  return (
    <div className="fixed inset-0 bg-[#f5f5f0] flex items-center justify-center" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div className="w-full max-w-sm bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden text-center">
        <div className="bg-[#1e3a5f] px-8 py-7">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 mx-auto mb-3">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-white text-xl font-bold">Test Complete</h1>
          <p className="text-blue-200 text-sm mt-1">Your responses have been submitted</p>
        </div>
        <div className="px-8 py-7 space-y-5">
          <div className="bg-gray-50 rounded-lg p-5">
            <p className="text-3xl font-bold text-gray-900">
              {totalAnswered}<span className="text-gray-400 text-xl font-normal"> / {totalQuestions}</span>
            </p>
            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mt-1">Questions Answered</p>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            Your official score report will be available in your College Board account within a few weeks.
          </p>
          <button
            onClick={onRestart}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors text-sm"
          >
            Take Another Practice Test
          </button>
        </div>
      </div>
    </div>
  );
}
