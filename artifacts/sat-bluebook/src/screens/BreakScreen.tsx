import { useEffect, useRef, useState } from "react";
import { APP_CONFIG } from "../config";

interface BreakScreenProps {
  breakDurationMinutes?: number;
  onContinue: () => void;
}

function formatTime(secs: number) {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function BreakScreen({ breakDurationMinutes = APP_CONFIG.breakDurationMinutes, onContinue }: BreakScreenProps) {
  const [remaining, setRemaining] = useState(breakDurationMinutes * 60);
  const onContinueRef = useRef(onContinue);
  onContinueRef.current = onContinue;

  useEffect(() => {
    const id = setInterval(() => {
      setRemaining((t) => {
        if (t <= 1) {
          clearInterval(id);
          onContinueRef.current();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const isLow = remaining < 60;

  return (
    <div className="break-screen">
      <div
        className="break-main"
        style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 48, width: "100%" }}
      >
        <div className="break-timer-block" style={{ flexShrink: 0 }}>
          <div className="break-timer-box">
            <p style={{ fontSize: 13, color: "#ccc", margin: "0 0 8px", fontWeight: 500 }}>
              Remaining Break Time:
            </p>
            <p
              style={{
                fontSize: 56,
                fontWeight: 700,
                color: isLow ? "#ef4444" : "#fff",
                margin: 0,
                fontVariantNumeric: "tabular-nums",
                letterSpacing: "0.02em",
                lineHeight: 1.1,
              }}
            >
              {formatTime(remaining)}
            </p>
          </div>
        </div>

        <div className="break-instructions">
          <h2 style={{ fontSize: 26, fontWeight: 700, color: "#fff", margin: "0 0 16px", lineHeight: 1.3 }}>
            Take a Break: Do Not Close Your Device
          </h2>
          <p style={{ fontSize: 15, color: "#d1d5db", lineHeight: 1.7, margin: "0 0 20px" }}>
            When the timer reaches zero, the next section will begin automatically.
          </p>

          <p style={{ fontSize: 15, fontWeight: 700, color: "#fff", margin: "0 0 12px" }}>
            Follow these rules during the break:
          </p>
          <ol style={{ fontSize: 15, color: "#d1d5db", lineHeight: 2, paddingLeft: 22, margin: 0 }}>
            <li>Do not disturb students who are still testing.</li>
            <li>Do not exit the app or close your laptop.</li>
            <li>Do not access phones, smartwatches, textbooks, notes, or the internet.</li>
            <li>Do not eat or drink near any testing device.</li>
            <li>Do not speak in the test room; outside the test room, do not discuss the exam with anyone.</li>
          </ol>
        </div>
      </div>

      <div className="break-footer">{APP_CONFIG.studentName}</div>
    </div>
  );
}