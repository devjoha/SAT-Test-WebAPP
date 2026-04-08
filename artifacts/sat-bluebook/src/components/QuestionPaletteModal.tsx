interface QuestionPaletteModalProps {
  moduleName: string;
  totalQuestions: number;
  currentQuestion: number;
  answers: Record<number, string>;
  flagged: Set<number>;
  onNavigate: (n: number) => void;
  onClose: () => void;
  onReview: () => void;
}

const PinIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const RedBookmarkIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="#c0392b" stroke="none">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

export default function QuestionPaletteModal({
  moduleName,
  totalQuestions,
  currentQuestion,
  answers,
  flagged,
  onNavigate,
  onClose,
  onReview,
}: QuestionPaletteModalProps) {
  const F = { fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        background: "rgba(0,0,0,0.10)",
      }}
      onClick={onClose}
    >
      {/* Popup card — sits just above the bottom bar */}
      <div
        style={{
          ...F,
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0 -4px 32px rgba(0,0,0,0.18)",
          width: "100%",
          maxWidth: 640,
          marginBottom: 56, /* above bottom bar */
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ padding: "20px 20px 12px", display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <h2 style={{ fontSize: 17, fontWeight: 700, color: "#111827", margin: 0, lineHeight: 1.3, maxWidth: 480 }}>
            {moduleName} Questions
          </h2>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280", fontSize: 20, lineHeight: 1, padding: 4, marginTop: -2 }}
          >
            ×
          </button>
        </div>

        {/* Divider */}
        <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "0 20px" }} />

        {/* Legend */}
        <div style={{ padding: "12px 20px", display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <PinIcon />
            <span style={{ fontSize: 13, color: "#374151" }}>Current</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 18, height: 18, border: "1.5px dashed #9ca3af", borderRadius: 3, background: "#fff" }} />
            <span style={{ fontSize: 13, color: "#374151" }}>Unanswered</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <RedBookmarkIcon />
            <span style={{ fontSize: 13, color: "#374151" }}>For Review</span>
          </div>
        </div>

        {/* Divider */}
        <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "0 20px" }} />

        {/* Grid */}
        <div style={{ padding: "16px 20px 8px", display: "grid", gridTemplateColumns: "repeat(10, 1fr)", gap: 6 }}>
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
                    fontSize: 14,
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
                {isCurrent && <PinIcon />}
              </div>
            );
          })}
        </div>

        {/* Go to Review Page button */}
        <div style={{ padding: "16px 20px 20px", display: "flex", justifyContent: "center" }}>
          <button
            onClick={onReview}
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: "#111827",
              padding: "8px 28px",
              borderRadius: 9999,
              border: "1.5px solid #374151",
              background: "#fff",
              cursor: "pointer",
            }}
          >
            Go to Review Page
          </button>
        </div>
      </div>

      {/* Triangle pointer pointing down toward the bottom bar button */}
      <div
        style={{
          position: "absolute",
          bottom: 56 + 4,
          left: "50%",
          transform: "translateX(-50%)",
          width: 0,
          height: 0,
          borderLeft: "10px solid transparent",
          borderRight: "10px solid transparent",
          borderTop: "10px solid #fff",
          filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))",
          zIndex: 101,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
