interface ReviewScreenProps {
  moduleName: string;
  totalQuestions: number;
  currentQuestion: number;
  answers: Record<number, string>;
  flagged: Set<number>;
  onNavigate: (n: number) => void;
  onReturnToTest: () => void;
  onSubmit: () => void;
}

const RedBookmarkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#c0392b" stroke="none">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

const PinIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export default function ReviewScreen({
  moduleName,
  totalQuestions,
  currentQuestion,
  answers,
  flagged,
  onNavigate,
  onReturnToTest,
  onSubmit,
}: ReviewScreenProps) {
  const F = { fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" };

  return (
    <div style={{ ...F, position: "fixed", inset: 0, display: "flex", flexDirection: "column", background: "#f0f0f0" }}>
      {/* Main scrollable area */}
      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", alignItems: "center", padding: "40px 24px 24px" }}>

        {/* Title */}
        <h1 style={{ fontSize: 34, fontWeight: 400, color: "#111827", margin: "0 0 20px", textAlign: "center" }}>
          Check Your Work
        </h1>

        {/* Description */}
        <div style={{ maxWidth: 680, width: "100%", marginBottom: 24 }}>
          <p style={{ fontSize: 15, color: "#374151", margin: "0 0 6px", lineHeight: 1.55 }}>
            On test day, you won't be able to move on to the next module until time expires.
          </p>
          <p style={{ fontSize: 15, color: "#374151", margin: 0, lineHeight: 1.55 }}>
            For these practice questions, you can click <strong>Next</strong> when you're ready to move on.
          </p>
        </div>

        {/* Card */}
        <div
          style={{
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 2px 12px rgba(0,0,0,0.09)",
            padding: "28px 32px 32px",
            maxWidth: 680,
            width: "100%",
          }}
        >
          {/* Card header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: "#111827", margin: 0 }}>
              {moduleName} Questions
            </h2>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              {/* Unanswered legend */}
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div
                  style={{
                    width: 20,
                    height: 20,
                    border: "1.5px dashed #9ca3af",
                    borderRadius: 4,
                    background: "#fff",
                  }}
                />
                <span style={{ fontSize: 13, color: "#374151" }}>Unanswered</span>
              </div>
              {/* For review legend */}
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <RedBookmarkIcon />
                <span style={{ fontSize: 13, color: "#374151" }}>For Review</span>
              </div>
            </div>
          </div>

          <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "0 0 20px" }} />

          {/* Question grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(10, 1fr)", gap: 8 }}>
            {Array.from({ length: totalQuestions }, (_, i) => i + 1).map((n) => {
              const isCurrent = n === currentQuestion;
              const isAnswered = !!answers[n];
              const isFlagged = flagged.has(n);

              return (
                <div key={n} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                  <button
                    onClick={() => onNavigate(n)}
                    style={{
                      width: "100%",
                      aspectRatio: "1",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: isAnswered ? "1.5px solid #2563eb" : "1.5px dashed #9ca3af",
                      borderRadius: 6,
                      background: "#fff",
                      color: "#2563eb",
                      fontSize: 15,
                      fontWeight: 600,
                      cursor: "pointer",
                      position: "relative",
                      outline: isCurrent ? "2px solid #111827" : "none",
                      outlineOffset: 2,
                    }}
                  >
                    {n}
                    {isFlagged && (
                      <span style={{ position: "absolute", top: -6, right: -6 }}>
                        <RedBookmarkIcon />
                      </span>
                    )}
                  </button>
                  {isCurrent && (
                    <span style={{ display: "flex" }}>
                      <PinIcon />
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          height: 56,
          background: "#fff",
          borderTop: "1px solid #e5e7eb",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
          flexShrink: 0,
        }}
      >
        <button
          onClick={onReturnToTest}
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "#374151",
            padding: "7px 20px",
            borderRadius: 9999,
            border: "1.5px solid #d1d5db",
            background: "#fff",
            cursor: "pointer",
          }}
        >
          Return to Test
        </button>
        <button
          onClick={onSubmit}
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "#fff",
            padding: "7px 24px",
            borderRadius: 9999,
            border: "none",
            background: "#1a56db",
            cursor: "pointer",
          }}
        >
          Submit Section
        </button>
      </div>
    </div>
  );
}
