import { useState } from "react";

interface StartScreenProps {
  onStart: (code: string) => void;
}

export default function StartScreen({ onStart }: StartScreenProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = code.trim();
    if (!trimmed) {
      setError("Please enter a start code.");
      return;
    }
    if (trimmed.length < 4) {
      setError("Start code must be at least 4 characters.");
      return;
    }
    setError("");
    onStart(trimmed);
  }

  return (
    <div className="fixed inset-0 bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-blue-600 px-8 py-6 text-center">
          <div className="text-white text-xs font-semibold uppercase tracking-widest mb-2">College Board</div>
          <h1 className="text-white text-2xl font-bold">Digital SAT Suite</h1>
          <p className="text-blue-200 text-sm mt-1">Bluebook™</p>
        </div>

        <div className="px-8 py-8">
          <p className="text-gray-700 text-sm text-center mb-6 leading-relaxed">
            Enter the start code provided by your test coordinator to begin your test.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Start Code
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => { setCode(e.target.value); setError(""); }}
                placeholder="Enter start code"
                className={`w-full px-4 py-3 rounded-lg border text-gray-900 text-center text-lg font-mono tracking-widest outline-none transition-colors ${
                  error
                    ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                    : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                }`}
                maxLength={20}
                autoFocus
              />
              {error && (
                <p className="mt-1.5 text-xs text-red-500">{error}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-lg transition-colors text-sm"
            >
              Start Test
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-gray-400">
            By starting the test you agree to the testing terms and conditions.
          </p>
        </div>
      </div>
    </div>
  );
}
