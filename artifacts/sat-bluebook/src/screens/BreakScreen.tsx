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
    if (remaining <= 0) { onContinue(); return; }
    const id = setInterval(() => setRemaining((t) => Math.max(0, t - 1)), 1000);
    return () => clearInterval(id);
  }, [remaining, onContinue]);

  return (
    <div className="fixed inset-0 bg-[#f5f5f0] flex items-center justify-center" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div className="w-full max-w-sm bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden text-center">
        <div className="bg-[#1e3a5f] px-8 py-6">
          <h1 className="text-white text-xl font-bold">Break Time</h1>
          <p className="text-blue-200 text-sm mt-1">Section 1 complete</p>
        </div>
        <div className="px-8 py-8 space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Time Remaining</p>
            <div className={`text-5xl font-bold tabular-nums ${remaining < 60 ? "text-red-600" : "text-gray-900"}`}>
              {formatTime(remaining)}
            </div>
          </div>
          <div className="text-sm text-gray-500 leading-relaxed space-y-1">
            <p>Do not use your calculator or test materials during the break.</p>
            <p>The next section will start when you click Continue.</p>
          </div>
          <button
            onClick={onContinue}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors text-sm"
          >
            Continue to Next Section
          </button>
        </div>
      </div>
    </div>
  );
}
