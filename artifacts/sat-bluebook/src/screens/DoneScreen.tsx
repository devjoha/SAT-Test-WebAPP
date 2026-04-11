import { useEffect, useState } from "react";

interface DoneScreenProps {
  totalAnswered: number;
  totalQuestions: number;
  onRestart: () => void;
}

const CONFETTI_PIECES = [
  { left: "5%", top: "8%", color: "#ef4444", w: 10, h: 14, rotate: 20 },
  { left: "12%", top: "20%", color: "#eab308", w: 8, h: 8, rotate: 0 },
  { left: "8%", top: "40%", color: "#06b6d4", w: 12, h: 6, rotate: -30 },
  { left: "3%", top: "60%", color: "#8b5cf6", w: 6, h: 12, rotate: 45 },
  { left: "15%", top: "75%", color: "#ef4444", w: 8, h: 10, rotate: -15 },
  { left: "20%", top: "55%", color: "#3b82f6", w: 10, h: 5, rotate: 60 },
  { left: "25%", top: "12%", color: "#06b6d4", w: 6, h: 14, rotate: -45 },
  { left: "18%", top: "88%", color: "#eab308", w: 12, h: 8, rotate: 30 },
  { left: "30%", top: "85%", color: "#8b5cf6", w: 8, h: 8, rotate: 0 },
  { left: "78%", top: "7%", color: "#ef4444", w: 10, h: 6, rotate: -20 },
  { left: "85%", top: "22%", color: "#06b6d4", w: 8, h: 12, rotate: 35 },
  { left: "92%", top: "38%", color: "#eab308", w: 6, h: 10, rotate: -50 },
  { left: "88%", top: "58%", color: "#8b5cf6", w: 12, h: 6, rotate: 15 },
  { left: "95%", top: "72%", color: "#3b82f6", w: 8, h: 8, rotate: 0 },
  { left: "80%", top: "85%", color: "#ef4444", w: 10, h: 14, rotate: -25 },
  { left: "72%", top: "92%", color: "#06b6d4", w: 6, h: 8, rotate: 40 },
  { left: "68%", top: "15%", color: "#eab308", w: 8, h: 10, rotate: -10 },
  { left: "40%", top: "5%", color: "#3b82f6", w: 12, h: 6, rotate: 55 },
  { left: "55%", top: "10%", color: "#8b5cf6", w: 6, h: 12, rotate: -35 },
  { left: "60%", top: "90%", color: "#ef4444", w: 10, h: 8, rotate: 20 },
  { left: "45%", top: "88%", color: "#eab308", w: 8, h: 6, rotate: -15 },
  { left: "35%", top: "30%", color: "#06b6d4", w: 6, h: 10, rotate: 70 },
  { left: "65%", top: "65%", color: "#3b82f6", w: 10, h: 6, rotate: -60 },
];

const LaptopSmiley = () => (
  <svg viewBox="0 0 220 190" width="180" height="160" aria-hidden="true">
    <circle cx="100" cy="92" r="72" fill="#dbeafe" />
    <rect x="28" y="38" width="144" height="96" rx="6" fill="#e5e7eb" stroke="#d1d5db" strokeWidth="2" />
    <rect x="35" y="45" width="130" height="82" rx="3" fill="white" />
    <rect x="8" y="132" width="184" height="14" rx="7" fill="#d1d5db" stroke="#c4c4c4" strokeWidth="1.5" />
    <rect x="72" y="132" width="56" height="5" rx="2.5" fill="#b5b5b5" />
    <circle cx="100" cy="84" r="25" fill="#bfdbfe" stroke="#93c5fd" strokeWidth="1.5" />
    <circle cx="91" cy="79" r="3" fill="#1f2937" />
    <circle cx="109" cy="79" r="3" fill="#1f2937" />
    <path d="M88 91 Q100 102 112 91" fill="none" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export default function DoneScreen({ onRestart }: DoneScreenProps) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#1a1f71",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        overflow: "hidden",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.4s ease",
      }}
    >
      {CONFETTI_PIECES.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: p.left,
            top: p.top,
            width: p.w,
            height: p.h,
            background: p.color,
            borderRadius: 2,
            transform: `rotate(${p.rotate}deg)`,
            opacity: 0.9,
          }}
        />
      ))}

      <div style={{ textAlign: "center", marginBottom: 24, position: "relative", zIndex: 1 }}>
        <h1 style={{ fontSize: 40, fontWeight: 700, color: "#fff", margin: "0 0 10px" }}>
          Congratulations!
        </h1>
        <p style={{ fontSize: 16, color: "#c7d2fe", margin: 0 }}>
          The test is complete, and your answers have been submitted.
        </p>
      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          width: "100%",
          maxWidth: 600,
          display: "flex",
          alignItems: "stretch",
          overflow: "hidden",
          boxShadow: "0 8px 40px rgba(0,0,0,0.25)",
          position: "relative",
          zIndex: 1,
          margin: "0 24px",
        }}
      >
        <div
          style={{
            padding: "32px 28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flex: "0 0 auto",
          }}
        >
          <LaptopSmiley />
        </div>

        <div style={{ width: 1, background: "#e5e7eb", flexShrink: 0, margin: "24px 0" }} />

        <div style={{ padding: "32px 28px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 20 }}>
          <p style={{ fontSize: 15, color: "#111", margin: 0, lineHeight: 1.6 }}>
            <strong>Your proctor will dismiss you</strong>
            {" "}when it's time to go.
          </p>
          <p style={{ fontSize: 15, color: "#111", margin: 0, lineHeight: 1.6 }}>
            <strong>Please be quiet</strong>; other students may still be testing.
          </p>
        </div>
      </div>

      <div style={{ marginTop: 28, position: "relative", zIndex: 1 }}>
        <button
          onClick={onRestart}
          style={{
            background: "#facc15",
            color: "#111",
            border: "none",
            borderRadius: 9999,
            padding: "13px 36px",
            fontSize: 15,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "inherit",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}
        >
          Return to Homepage
        </button>
      </div>
    </div>
  );
}
