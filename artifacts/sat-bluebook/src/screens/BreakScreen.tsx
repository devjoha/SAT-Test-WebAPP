import { useEffect, useState } from "react";

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

  useEffect(() => {
    if (remaining <= 0) { onContinue(); return; }
    const id = setInterval(() => setRemaining((t) => Math.max(0, t - 1)), 1000);
    return () => clearInterval(id);
  }, [remaining, onContinue]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#1a1a1a",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        color: "#fff",
      }}
    >
      {/* Main content area */}
      <div style={{ flex: 1, display: "flex", alignItems: "flex-start", padding: "60px 80px", gap: 80 }}>
        {/* Left: timer */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20, flexShrink: 0, paddingTop: 80 }}>
          <div
            style={{
              border: "1.5px solid #555",
              borderRadius: 4,
              padding: "24px 36px",
              textAlign: "center",
              minWidth: 200,
            }}
          >
            <p style={{ fontSize: 14, color: "#ccc", margin: "0 0 8px", fontWeight: 500 }}>
              Remaining Break Time:
            </p>
            <p
              style={{
                fontSize: 52,
                fontWeight: 700,
                color: remaining < 60 ? "#ef4444" : "#fff",
                margin: 0,
                fontVariantNumeric: "tabular-nums",
                letterSpacing: "0.02em",
              }}
            >
              {formatTime(remaining)}
            </p>
          </div>

          <button
            onClick={onContinue}
            style={{
              background: "#f5c518",
              color: "#111",
              border: "none",
              borderRadius: 9999,
              padding: "10px 28px",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Resume Testing
          </button>
        </div>

        {/* Right: instructions */}
        <div style={{ flex: 1, maxWidth: 480 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: "#fff", margin: "0 0 12px" }}>
            Practice Test Break
          </h2>
          <p style={{ fontSize: 14, color: "#bbb", lineHeight: 1.65, margin: "0 0 24px" }}>
            You can resume this practice test as soon as you're ready to move on. On test day, you'll
            wait until the clock counts down. Read below to see how breaks work on test day.
          </p>

          <hr style={{ border: "none", borderTop: "1px solid #444", margin: "0 0 24px" }} />

          <h3 style={{ fontSize: 22, fontWeight: 700, color: "#fff", margin: "0 0 12px" }}>
            Take a Break: Do Not Close Your Device
          </h3>
          <p style={{ fontSize: 14, color: "#bbb", lineHeight: 1.65, margin: "0 0 16px" }}>
            After the break, a <strong style={{ color: "#fff" }}>Resume Testing Now</strong> button
            will appear and you'll start the next section.
          </p>
          <p style={{ fontSize: 14, fontWeight: 700, color: "#ccc", margin: "0 0 10px" }}>
            Follow these rules during the break:
          </p>
          <ol style={{ fontSize: 14, color: "#bbb", lineHeight: 1.8, paddingLeft: 20, margin: 0 }}>
            <li>Do not disturb students who are still testing.</li>
            <li>Do not exit the app or close your laptop.</li>
            <li>Do not access phones, smartwatches, textbooks, notes, or the internet.</li>
            <li>Do not eat or drink near any testing device.</li>
            <li>Do not speak in the testing room; outside the room, do not discuss the exam with anyone.</li>
          </ol>
        </div>
      </div>

      {/* Bottom: username */}
      <div style={{ padding: "16px 24px", borderTop: "1px solid #333" }}>
        <span style={{ fontSize: 13, color: "#aaa" }}>abbvsss Abdusattorov</span>
      </div>
    </div>
  );
}
