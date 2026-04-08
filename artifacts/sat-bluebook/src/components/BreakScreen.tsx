import { useEffect, useState } from "react";

interface BreakScreenProps {
  breakDurationMinutes?: number;
  onContinue: () => void;
}

function formatTime(secs: number) {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function BreakScreen({ breakDurationMinutes = 10, onContinue }: BreakScreenProps) {
  const [remaining, setRemaining] = useState(breakDurationMinutes * 60);

  useEffect(() => {
    if (remaining <= 0) return;
    const id = setInterval(() => setRemaining((t) => Math.max(0, t - 1)), 1000);
    return () => clearInterval(id);
  }, [remaining]);

  return (
    <div className="fixed inset-0 bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden text-center">
        <div className="bg-gray-800 px-8 py-6">
          <h1 className="text-white text-xl font-bold">Break Time</h1>
          <p className="text-gray-400 text-sm mt-1">Take a moment to rest</p>
        </div>

        <div className="px-8 py-8 space-y-6">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Time Remaining</p>
            <div
              className={`text-5xl font-bold tabular-nums ${
                remaining < 60 ? "text-red-600" : "text-gray-900"
              }`}
            >
              {formatTime(remaining)}
            </div>
          </div>

          <div className="text-sm text-gray-500 space-y-1">
            <p>You may not use your calculator or test materials during the break.</p>
            <p>The next module will begin automatically when time is up.</p>
          </div>

          <div className="space-y-3">
            <button
              onClick={onContinue}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors text-sm"
            >
              Continue to Next Section
            </button>
            <p className="text-xs text-gray-400">
              You can also wait for the timer to expire
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
