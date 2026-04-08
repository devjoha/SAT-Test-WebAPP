import { useState } from "react";
import type { Module } from "../data/questions";
import QuestionPaletteModal from "../components/QuestionPaletteModal";

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

const F = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

/* ────────── icons ────────── */

const HighlightIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const BookmarkOutlineIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

const MoreDotsIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="5" r="1.8" /><circle cx="12" cy="12" r="1.8" /><circle cx="12" cy="19" r="1.8" />
  </svg>
);

const ChevronDown = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const ChevronUp = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 15 12 9 18 15" />
  </svg>
);

const SmallBookmarkIcon = ({ filled }: { filled: boolean }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? "#c0392b" : "none"} stroke={filled ? "#c0392b" : "#6b7280"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

/** ⊕ style: circle + crosshair + letter centered */
const CrosshairCircle = ({ letter, selected }: { letter: string; selected: boolean }) => {
  const stroke = selected ? "#1e3a5f" : "#9ca3af";
  return (
    <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="11.5" stroke={stroke} strokeWidth="1.5" />
      {/* crosshair lines — shorter so they sit inside the circle */}
      <line x1="14" y1="3.5" x2="14" y2="24.5" stroke={stroke} strokeWidth="1" />
      <line x1="3.5" y1="14" x2="24.5" y2="14" stroke={stroke} strokeWidth="1" />
      <text
        x="14" y="18.5"
        textAnchor="middle"
        fontSize="10"
        fontWeight="700"
        fill={stroke}
        fontFamily={F}
      >
        {letter}
      </text>
    </svg>
  );
};

/** ABC icon — navy square, yellow border */
const AbcIcon = () => (
  <div style={{ width: 32, height: 26, background: "#1e3a5f", border: "2.5px solid #f5c518", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
    <span style={{ fontSize: 10, fontWeight: 800, color: "#fff", letterSpacing: "-0.5px", lineHeight: 1 }}>ABC</span>
  </div>
);

/** Vertical panel divider */
const Divider = () => (
  <div
    style={{
      width: 6,
      background: "linear-gradient(180deg, #1e3a5f 0%, #2563eb 50%, #1e3a5f 100%)",
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "col-resize",
    }}
  >
    <div style={{ height: 40, width: 6, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3 }}>
      <div style={{ width: 2, height: 10, background: "rgba(255,255,255,0.55)", borderRadius: 2 }} />
      <div style={{ width: 2, height: 10, background: "rgba(255,255,255,0.55)", borderRadius: 2 }} />
    </div>
  </div>
);

interface TestScreenProps {
  module: Module;
  currentQuestion: number;
  answers: Record<number, string>;
  flagged: Set<number>;
  crossedOut: Set<string>;
  timeRemaining: number;
  timerHidden: boolean;
  onToggleTimer: () => void;
  onSelectAnswer: (letter: string) => void;
  onToggleMark: () => void;
  onToggleCrossOut: (letter: string) => void;
  onPrevious: () => void;
  onNext: () => void;
  onNavigate: (n: number) => void;
  onReview: () => void;
  onSubmit: () => void;
}

export default function TestScreen({
  module,
  currentQuestion,
  answers,
  flagged,
  crossedOut,
  timeRemaining,
  timerHidden,
  onToggleTimer,
  onSelectAnswer,
  onToggleMark,
  onToggleCrossOut,
  onPrevious,
  onNext,
  onNavigate,
  onReview,
  onSubmit,
}: TestScreenProps) {
  const [showPalette, setShowPalette] = useState(false);
  const [showDirections, setShowDirections] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showReference, setShowReference] = useState(false);

  const question = module.questions[currentQuestion - 1];
  const totalQuestions = module.questions.length;
  const isMarked = flagged.has(currentQuestion);
  const selectedAnswer = answers[currentQuestion] ?? null;
  const isLowTime = timeRemaining < 300;
  const isFirst = currentQuestion === 1;
  const isLast = currentQuestion === totalQuestions;
  const isMath = module.name.toLowerCase().includes("math");
  const hasPassage = !!question.passage;

  return (
    <div style={{ position: "fixed", inset: 0, display: "flex", flexDirection: "column", background: "#fff", fontFamily: F, userSelect: "none" }}>

      {/* ── ROW 1: section name | timer | toolbar ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", height: 40, borderBottom: "1.5px solid #e5e7eb", background: "#fff", flexShrink: 0 }}>
        {/* BOLD module name */}
        <span style={{ fontSize: 14, fontWeight: 700, color: "#111827", letterSpacing: "0.01em" }}>
          {module.name}
        </span>

        <span style={{
          fontSize: 21, fontWeight: 700, color: isLowTime ? "#dc2626" : "#111827",
          fontVariantNumeric: "tabular-nums", letterSpacing: "0.04em",
          visibility: timerHidden ? "hidden" : "visible",
          minWidth: 80, textAlign: "center",
        }}>
          {formatTime(timeRemaining)}
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: 16, color: "#6b7280" }}>
          {isMath ? (
            <>
              <button onClick={() => setShowCalculator(v => !v)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1, background: "none", border: "none", cursor: "pointer", color: "#374151" }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="2" width="16" height="20" rx="2" />
                  <line x1="8" y1="6" x2="16" y2="6" /><line x1="8" y1="10" x2="10" y2="10" />
                  <line x1="14" y1="10" x2="16" y2="10" /><line x1="8" y1="14" x2="10" y2="14" />
                  <line x1="14" y1="14" x2="16" y2="14" /><line x1="8" y1="18" x2="16" y2="18" />
                </svg>
                <span style={{ fontSize: 9.5, color: "#374151", fontWeight: 500 }}>Calculator</span>
              </button>
              <button onClick={() => setShowReference(v => !v)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1, background: "none", border: "none", cursor: "pointer", color: "#374151" }}>
                <span style={{ fontSize: 16, fontWeight: 700, lineHeight: 1 }}>x²</span>
                <span style={{ fontSize: 9.5, color: "#374151", fontWeight: 500 }}>Reference</span>
              </button>
              <button style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280" }}>
                <MoreDotsIcon />
              </button>
            </>
          ) : (
            <>
              <button style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280" }}><HighlightIcon /></button>
              <button style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280" }}><BookmarkOutlineIcon /></button>
              <button style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280" }}><MoreDotsIcon /></button>
            </>
          )}
        </div>
      </div>

      {/* ── ROW 2: Directions | Hide | Highlights & Notes | More ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", height: 30, borderBottom: "2px dashed #94a3b8", background: "#fff", flexShrink: 0 }}>
        <button
          onClick={() => setShowDirections(v => !v)}
          style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, fontWeight: 600, color: "#374151", background: "none", border: "none", cursor: "pointer", padding: 0 }}
        >
          Directions {showDirections ? <ChevronUp /> : <ChevronDown />}
        </button>

        <button
          onClick={onToggleTimer}
          style={{ fontSize: 12, fontWeight: 500, color: "#374151", padding: "2px 16px", borderRadius: 5, border: "1.5px solid #9ca3af", background: "#fff", cursor: "pointer" }}
        >
          {timerHidden ? "Show" : "Hide"}
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 500, color: "#374151" }}>
          <button style={{ background: "none", border: "none", cursor: "pointer", color: "#374151", fontWeight: 600, fontSize: 12 }}>Highlights &amp; Notes</button>
          <span style={{ color: "#d1d5db" }}>|</span>
          <button style={{ background: "none", border: "none", cursor: "pointer", color: "#374151", fontWeight: 600, fontSize: 12 }}>More</button>
        </div>
      </div>

      {/* ── PRACTICE TEST BANNER ── */}
      <div style={{ background: "#1e3a5f", color: "#fff", textAlign: "center", fontSize: 11, fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase", padding: "5px 0", flexShrink: 0 }}>
        This is a practice test
      </div>

      {/* ── DIRECTIONS DROPDOWN ── */}
      {showDirections && (
        <div style={{ position: "absolute", top: 72, left: 0, right: 0, zIndex: 50, display: "flex", justifyContent: "center" }}>
          <div style={{ background: "#fff", border: "2px solid #f5a623", borderRadius: 4, padding: "24px 32px 20px", maxWidth: 680, width: "95%", boxShadow: "0 6px 24px rgba(0,0,0,0.13)", position: "relative" }}>
            <p style={{ fontSize: 15, color: "#111827", lineHeight: 1.7, margin: "0 0 10px" }}>
              The questions in this section address a number of important reading and writing skills. Each question includes one or more passages, which may include a table or graph. Read each passage and question carefully, and then choose the best answer based on the passage(s).
            </p>
            <p style={{ fontSize: 15, color: "#111827", lineHeight: 1.7, margin: "0 0 20px" }}>
              All questions in this section are multiple-choice with four answer choices. Each question has a single best answer.
            </p>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                onClick={() => setShowDirections(false)}
                style={{ background: "#f5c518", color: "#111", border: "none", borderRadius: 9999, padding: "8px 26px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MAIN CONTENT ── */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

        {/* LEFT passage panel */}
        {hasPassage && (
          <>
            <div style={{ flex: "0 0 50%", overflowY: "auto", padding: "28px 48px", background: "#fff" }}>
              <p style={{ fontSize: 15, lineHeight: 1.85, color: "#111827", fontWeight: 400, margin: 0 }}>
                {question.passage}
              </p>
            </div>
            <Divider />
          </>
        )}

        {/* RIGHT panel — question + answers */}
        <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", background: "#fff" }}>

          {/* Question header */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "12px 24px",
            borderBottom: "2.5px dashed #94a3b8",
            flexShrink: 0,
            background: "#fff",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {/* Question number — bold black square */}
              <span style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                width: 30, height: 30, background: "#111827", color: "#fff",
                fontSize: 14, fontWeight: 800, borderRadius: 4, flexShrink: 0,
              }}>
                {currentQuestion}
              </span>
              <button
                onClick={onToggleMark}
                style={{
                  display: "flex", alignItems: "center", gap: 5,
                  fontSize: 13, fontWeight: 600, color: isMarked ? "#c0392b" : "#6b7280",
                  background: "none", border: "none", cursor: "pointer", padding: 0,
                }}
              >
                <SmallBookmarkIcon filled={isMarked} />
                Mark for Review
              </button>
            </div>
            <button style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
              <AbcIcon />
            </button>
          </div>

          {/* Question + answers — constrained width with generous side gaps */}
          <div style={{
            flex: 1,
            overflowY: "auto",
            padding: "20px 64px 32px",
            maxWidth: 760,
            width: "100%",
            boxSizing: "border-box",
          }}>

            {/* Question text */}
            <p style={{ fontSize: 15, color: "#111827", lineHeight: 1.7, margin: "0 0 22px", fontWeight: 400 }}>
              {question.text}
            </p>

            {/* Answer choices */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {question.choices.map((choice) => {
                const isSelected = selectedAnswer === choice.letter;
                const isCrossed = crossedOut.has(choice.letter);

                return (
                  <div key={choice.letter} style={{ display: "flex", alignItems: "stretch", gap: 0 }}>
                    {/* Main answer button */}
                    <button
                      onClick={() => { if (!isCrossed) onSelectAnswer(choice.letter); }}
                      onContextMenu={(e) => { e.preventDefault(); onToggleCrossOut(choice.letter); }}
                      style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        minHeight: 52,
                        borderTop: isSelected ? "2px solid #111827" : "1.5px solid #d1d5db",
                        borderLeft: isSelected ? "2px solid #111827" : "1.5px solid #d1d5db",
                        borderBottom: isSelected ? "2px solid #111827" : "1.5px solid #d1d5db",
                        borderRight: "none",
                        borderRadius: "8px 0 0 8px",
                        background: isCrossed ? "#f9fafb" : "#fff",
                        cursor: isCrossed ? "default" : "pointer",
                        textAlign: "left",
                        padding: 0,
                        outline: "none",
                        transition: "border-color 0.12s",
                      }}
                    >
                      {/* Letter circle */}
                      <div style={{ width: 54, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <span style={{
                          display: "inline-flex", alignItems: "center", justifyContent: "center",
                          width: 30, height: 30, borderRadius: "50%",
                          border: isSelected ? "2px solid #111827" : "1.5px solid #6b7280",
                          background: isSelected ? "#111827" : "#fff",
                          color: isSelected ? "#fff" : "#374151",
                          fontSize: 13, fontWeight: 600,
                          opacity: isCrossed ? 0.35 : 1,
                          transition: "all 0.12s",
                        }}>
                          {choice.letter}
                        </span>
                      </div>

                      {/* Answer text */}
                      <span style={{
                        flex: 1, fontSize: 14.5, color: isCrossed ? "#9ca3af" : "#111827",
                        lineHeight: 1.5, padding: "12px 10px 12px 0",
                        textDecoration: isCrossed ? "line-through" : "none",
                        fontWeight: 400,
                      }}>
                        {choice.text}
                      </span>
                    </button>

                    {/* Right side: ⊕ icon or Undo */}
                    {isCrossed ? (
                      <button
                        onClick={() => onToggleCrossOut(choice.letter)}
                        style={{
                          minHeight: 52, padding: "0 12px",
                          border: "1.5px solid #f5a623", borderLeft: "none",
                          borderRadius: "0 8px 8px 0",
                          background: "#fff", color: "#92400e",
                          fontSize: 11, fontWeight: 700, cursor: "pointer",
                          display: "flex", alignItems: "center",
                          letterSpacing: "0.02em",
                        }}
                      >
                        Undo
                      </button>
                    ) : (
                      <button
                        onClick={() => onToggleCrossOut(choice.letter)}
                        title="Eliminate answer"
                        style={{
                          minHeight: 52, width: 44,
                          borderTop: isSelected ? "2px solid #111827" : "1.5px solid #d1d5db",
                          borderRight: isSelected ? "2px solid #111827" : "1.5px solid #d1d5db",
                          borderBottom: isSelected ? "2px solid #111827" : "1.5px solid #d1d5db",
                          borderLeft: "1px solid #e5e7eb",
                          borderRadius: "0 8px 8px 0",
                          background: "#fff", cursor: "pointer",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          padding: 0, outline: "none",
                        }}
                      >
                        <CrosshairCircle letter={choice.letter} selected={isSelected} />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div style={{ height: 56, background: "#fff", borderTop: "2px dashed #94a3b8", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", flexShrink: 0 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: "#374151", minWidth: 160 }}>
          abbvsss Abdusattorov
        </span>

        <button
          onClick={() => setShowPalette(true)}
          style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#111827", color: "#fff", fontSize: 13, fontWeight: 700, padding: "7px 22px", borderRadius: 9999, border: "none", cursor: "pointer" }}
        >
          Question {currentQuestion} of {totalQuestions}
          <ChevronUp />
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 160, justifyContent: "flex-end" }}>
          {!isFirst && (
            <button
              onClick={onPrevious}
              style={{ fontSize: 13, fontWeight: 600, color: "#374151", padding: "7px 20px", borderRadius: 9999, border: "1.5px solid #9ca3af", background: "#fff", cursor: "pointer" }}
            >
              Back
            </button>
          )}
          <button
            onClick={onNext}
            style={{ fontSize: 13, fontWeight: 700, color: "#fff", padding: "7px 24px", borderRadius: 9999, border: "none", background: isLast ? "#059669" : "#1a56db", cursor: "pointer" }}
          >
            {isLast ? "Review" : "Next"}
          </button>
        </div>
      </div>

      {/* ── QUESTION PALETTE MODAL ── */}
      {showPalette && (
        <QuestionPaletteModal
          moduleName={module.name}
          totalQuestions={totalQuestions}
          currentQuestion={currentQuestion}
          answers={answers}
          flagged={flagged}
          onNavigate={(n) => { onNavigate(n); setShowPalette(false); }}
          onClose={() => setShowPalette(false)}
          onReview={() => { setShowPalette(false); onReview(); }}
        />
      )}

      {/* ── CALCULATOR OVERLAY ── */}
      {showCalculator && (
        <div style={{ position: "absolute", top: 74, right: 20, zIndex: 60, background: "#fff", border: "1px solid #d1d5db", borderRadius: 10, boxShadow: "0 6px 24px rgba(0,0,0,0.15)", width: 350, overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 14px", background: "#1e3a5f" }}>
            <div style={{ display: "flex", gap: 2 }}>
              <button style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "#fff", padding: "4px 14px", borderRadius: 4, cursor: "pointer", fontSize: 12, fontWeight: 700 }}>Graphing</button>
              <button style={{ background: "none", border: "none", color: "#ccc", padding: "4px 14px", borderRadius: 4, cursor: "pointer", fontSize: 12 }}>Scientific</button>
            </div>
            <button onClick={() => setShowCalculator(false)} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", fontSize: 20, lineHeight: 1 }}>×</button>
          </div>
          <div style={{ height: 260, background: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 13, color: "#9ca3af" }}>Desmos Graphing Calculator</span>
          </div>
        </div>
      )}

      {/* ── REFERENCE OVERLAY ── */}
      {showReference && (
        <div style={{ position: "absolute", top: 74, right: 20, zIndex: 60, background: "#fff", border: "1px solid #d1d5db", borderRadius: 10, boxShadow: "0 6px 24px rgba(0,0,0,0.15)", width: 380, maxHeight: "72vh", overflowY: "auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", background: "#111827", color: "#fff", position: "sticky", top: 0 }}>
            <span style={{ fontSize: 14, fontWeight: 700 }}>Reference Sheet</span>
            <button onClick={() => setShowReference(false)} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", fontSize: 20, lineHeight: 1 }}>×</button>
          </div>
          <div style={{ padding: "16px 20px 20px", fontSize: 13, color: "#111827", lineHeight: 1.8 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
              {[
                { label: "Circle", f: "A = πr²", s: "C = 2πr" },
                { label: "Rectangle", f: "A = lw" },
                { label: "Triangle", f: "A = ½bh" },
                { label: "Pythagorean Thm", f: "c² = a² + b²" },
                { label: "Box", f: "V = lwh" },
                { label: "Cylinder", f: "V = πr²h" },
                { label: "Sphere", f: "V = 4/3πr³" },
                { label: "Cone", f: "V = 1/3πr²h" },
              ].map(({ f, s, label }) => (
                <div key={label} style={{ border: "1px solid #e5e7eb", borderRadius: 6, padding: "8px 12px" }}>
                  <div style={{ fontWeight: 700, color: "#6b7280", fontSize: 10, marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</div>
                  <div style={{ fontFamily: "Georgia, serif", fontSize: 13 }}>{f}</div>
                  {s && <div style={{ fontFamily: "Georgia, serif", fontSize: 12, color: "#6b7280" }}>{s}</div>}
                </div>
              ))}
            </div>
            <p style={{ margin: "0 0 6px", fontSize: 13 }}>The number of degrees of arc in a circle is 360.</p>
            <p style={{ margin: "0 0 6px", fontSize: 13 }}>The number of radians of arc in a circle is 2π.</p>
            <p style={{ margin: 0, fontSize: 13 }}>The sum of the measures in degrees of the angles of a triangle is 180.</p>
          </div>
        </div>
      )}
    </div>
  );
}
