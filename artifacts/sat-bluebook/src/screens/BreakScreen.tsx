import { useEffect, useRef, useState } from "react";

interface BreakScreenProps {
  breakDurationMinutes?: number;
  onContinue: () => void;
}

function formatTime(secs: number) {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function BreakScreen({ breakDurationMinutes = 10, onContinue }: BreakScreenProps) {
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
      <div className="break-main">
        {/* Left: timer */}
        <div className="break-timer-block">
          <div className="break-timer-box">
            <p style={{ fontSize: 13, color: "#ccc", margin: "0 0 8px", fontWeight: 500 }}>
              Remaining Break Time:
            </p>
            <p
              style={{
                fontSize: 52,
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
          <button className="break-resume-btn" onClick={onContinue}>
            Resume Testing
          </button>
        </div>

        {/* Right: instructions */}
        <div className="break-instructions">
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#fff", margin: "0 0 12px" }}>
            Practice Test Break
          </h2>
          <p style={{ fontSize: 14, color: "#bbb", lineHeight: 1.65, margin: "0 0 22px" }}>
            You can resume this practice test as soon as you're ready to move on. On test day,
            you'll wait until the clock counts down. Read below to see how breaks work on test day.
          </p>

          <hr style={{ border: "none", borderTop: "1px solid #444", margin: "0 0 22px" }} />

          <h3 style={{ fontSize: 19, fontWeight: 700, color: "#fff", margin: "0 0 10px" }}>
            Take a Break: Do Not Close Your Device
          </h3>
          <p style={{ fontSize: 14, color: "#bbb", lineHeight: 1.65, margin: "0 0 14px" }}>
            After the break, a{" "}
            <strong style={{ color: "#fff" }}>Resume Testing Now</strong> button will appear and
            you'll start the next section.
          </p>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#ccc", margin: "0 0 8px" }}>
            Follow these rules during the break:
          </p>
          <ol style={{ fontSize: 13, color: "#bbb", lineHeight: 1.85, paddingLeft: 18, margin: 0 }}>
            <li>Do not disturb students who are still testing.</li>
            <li>Do not exit the app or close your laptop.</li>
            <li>Do not access phones, smartwatches, textbooks, notes, or the internet.</li>
            <li>Do not eat or drink near any testing device.</li>
            <li>
              Do not speak in the testing room; outside the room, do not discuss the exam with
              anyone.
            </li>
          </ol>
        </div>
      </div>

      {/* Footer */}
      <div className="break-footer">abbvsss Abdusattorov</div>
    </div>
  );
}
