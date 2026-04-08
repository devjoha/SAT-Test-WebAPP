import { useState } from "react";
import type { Module } from "../data/questions";
import QuestionPaletteModal from "../components/QuestionPaletteModal";

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

const F = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

/* ── SVG icons ── */
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
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
const ChevronUp = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 15 12 9 18 15" />
  </svg>
);
const SmallBookmarkIcon = ({ filled }: { filled: boolean }) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill={filled ? "#c0392b" : "none"} stroke={filled ? "#c0392b" : "#6b7280"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);
const CalculatorIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <line x1="8" y1="6" x2="16" y2="6" /><line x1="8" y1="10" x2="10" y2="10" />
    <line x1="14" y1="10" x2="16" y2="10" /><line x1="8" y1="14" x2="10" y2="14" />
    <line x1="14" y1="14" x2="16" y2="14" /><line x1="8" y1="18" x2="16" y2="18" />
  </svg>
);
const ReferenceIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <text x="4" y="17" fontSize="13" fontWeight="700" fill="currentColor" stroke="none">x²</text>
  </svg>
);

/** The ABC annotation icon — navy square with yellow border */
const AbcIcon = () => (
  <div
    style={{
      width: 30,
      height: 24,
      background: "#1e3a5f",
      border: "2px solid #f5c518",
      borderRadius: 4,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      flexShrink: 0,
    }}
  >
    <span style={{ fontSize: 10, fontWeight: 800, color: "#fff", letterSpacing: "-0.5px", lineHeight: 1 }}>
      ABC
    </span>
  </div>
);

/** Circled letter icons (A) (B) (C) (D) matching the Bluebook right-side icons */
const CircledLetter = ({ letter, selected, crossedOut }: { letter: string; selected: boolean; crossedOut: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
    <circle
      cx="14" cy="14" r="12"
      fill="none"
      stroke={crossedOut ? "#f5a623" : selected ? "#1e3a5f" : "#9ca3af"}
      strokeWidth="1.5"
    />
    <text
      x="14" y="19"
      textAnchor="middle"
      fontSize="12"
      fontWeight="600"
      fill={crossedOut ? "#f5a623" : selected ? "#1e3a5f" : "#9ca3af"}
      fontFamily={F}
    >
      {letter}
    </text>
    {crossedOut && <line x1="4" y1="14" x2="24" y2="14" stroke="#f5a623" strokeWidth="1.5" />}
  </svg>
);

const DividerHandle = () => (
  <svg width="10" height="28" viewBox="0 0 10 28">
    <rect x="0" y="6" width="4" height="16" rx="2" fill="#cbd5e1" />
    <rect x="6" y="6" width="4" height="16" rx="2" fill="#cbd5e1" />
  </svg>
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
  const showPassagePanel = hasPassage;

  return (
    <div style={{ position: "fixed", inset: 0, display: "flex", flexDirection: "column", background: "#fff", fontFamily: F, userSelect: "none" }}>

      {/* ── ROW 1 ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", height: 38, borderBottom: "1px solid #e5e7eb", background: "#fff", flexShrink: 0 }}>
        <span style={{ fontSize: 14, fontWeight: 400, color: "#111827" }}>{module.name}</span>

        <span style={{
          fontSize: 20, fontWeight: 700, color: isLowTime ? "#dc2626" : "#111827",
          fontVariantNumeric: "tabular-nums", letterSpacing: "0.03em",
          visibility: timerHidden ? "hidden" : "visible",
        }}>
          {formatTime(timeRemaining)}
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: 14, color: "#6b7280" }}>
          {isMath && (
            <>
              <button onClick={() => setShowCalculator(v => !v)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, background: "none", border: "none", cursor: "pointer", color: "#374151" }}>
                <CalculatorIcon />
                <span style={{ fontSize: 10, color: "#374151" }}>Calculator</span>
              </button>
              <button onClick={() => setShowReference(v => !v)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, background: "none", border: "none", cursor: "pointer", color: "#374151" }}>
                <span style={{ fontSize: 15, fontWeight: 700, lineHeight: 1 }}>x²</span>
                <span style={{ fontSize: 10, color: "#374151" }}>Reference</span>
              </button>
            </>
          )}
          {!isMath && (
            <>
              <button style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280" }}><HighlightIcon /></button>
              <button style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280" }}><BookmarkOutlineIcon /></button>
            </>
          )}
          <button style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280" }}><MoreDotsIcon /></button>
        </div>
      </div>

      {/* ── ROW 2 ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", height: 32, borderBottom: "1.5px dashed #d1d5db", background: "#fff", flexShrink: 0 }}>
        <button
          onClick={() => setShowDirections(v => !v)}
          style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, fontWeight: 500, color: "#374151", background: "none", border: "none", cursor: "pointer" }}
        >
          Directions {showDirections ? <ChevronUp /> : <ChevronDown />}
        </button>
        <button
          onClick={onToggleTimer}
          style={{ fontSize: 12, fontWeight: 500, color: "#374151", padding: "2px 14px", borderRadius: 4, border: "1px solid #9ca3af", background: "#fff", cursor: "pointer" }}
        >
          {timerHidden ? "Show" : "Hide"}
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 500, color: "#374151" }}>
          <button style={{ background: "none", border: "none", cursor: "pointer", color: "#374151" }}>Highlights &amp; Notes</button>
          <span style={{ color: "#d1d5db" }}>|</span>
          <button style={{ background: "none", border: "none", cursor: "pointer", color: "#374151" }}>More</button>
        </div>
      </div>

      {/* ── PRACTICE TEST BANNER ── */}
      <div style={{ background: "#1e3a5f", color: "#fff", textAlign: "center", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "5px 0", flexShrink: 0 }}>
        This is a practice test
      </div>

      {/* ── DIRECTIONS MODAL ── */}
      {showDirections && (
        <div
          style={{ position: "absolute", top: 70, left: 0, right: 0, zIndex: 50, display: "flex", justifyContent: "center", pointerEvents: "none" }}
        >
          <div style={{ background: "#fff", border: "2px solid #f5a623", borderRadius: 4, padding: "24px 28px", maxWidth: 700, width: "95%", boxShadow: "0 4px 20px rgba(0,0,0,0.12)", pointerEvents: "all" }}>
            <p style={{ fontSize: 15, color: "#111827", lineHeight: 1.7, margin: "0 0 12px" }}>
              The questions in this section address a number of important reading and writing skills. Each question includes one or more passages, which may include a table or graph. Read each passage and question carefully, and then choose the best answer to the question based on the passage(s).
            </p>
            <p style={{ fontSize: 15, color: "#111827", lineHeight: 1.7, margin: 0 }}>
              All questions in this section are multiple-choice with four answer choices. Each question has a single best answer.
            </p>
          </div>
          <div style={{ position: "absolute", bottom: -14, right: 40 }}>
            <button
              onClick={() => setShowDirections(false)}
              style={{ background: "#f5c518", color: "#111", border: "none", borderRadius: 9999, padding: "8px 22px", fontSize: 14, fontWeight: 700, cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ── MAIN CONTENT ── */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

        {/* LEFT PANEL — passage (only shown when question has passage) */}
        {showPassagePanel && (
          <>
            <div style={{ flex: "0 0 50%", overflowY: "auto", padding: "28px 36px", background: "#fff" }}>
              <p style={{ fontSize: 15, lineHeight: 1.8, color: "#111827", fontWeight: 400, margin: 0 }}>
                {question.passage}
              </p>
            </div>

            {/* Divider */}
            <div style={{ width: 20, background: "#f9fafb", borderLeft: "1px solid #e5e7eb", borderRight: "1px solid #e5e7eb", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, cursor: "col-resize" }}>
              <DividerHandle />
            </div>
          </>
        )}

        {/* RIGHT PANEL — question + answers */}
        <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", background: "#fff" }}>

          {/* Question header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 24px 10px", borderBottom: "1px solid #f3f4f6", flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, background: "#111827", color: "#fff", fontSize: 13, fontWeight: 700, borderRadius: 4, flexShrink: 0 }}>
                {currentQuestion}
              </span>
              <button
                onClick={onToggleMark}
                style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, fontWeight: 500, color: isMarked ? "#c0392b" : "#6b7280", background: "none", border: "none", cursor: "pointer", padding: 0 }}
              >
                <SmallBookmarkIcon filled={isMarked} />
                Mark for Review
              </button>
            </div>
            <button style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
              <AbcIcon />
            </button>
          </div>

          {/* Question text */}
          <div style={{ padding: "16px 24px 10px" }}>
            <p style={{ fontSize: 15, color: "#111827", lineHeight: 1.65, margin: 0, fontWeight: 400 }}>
              {question.text}
            </p>
          </div>

          {/* Answer choices */}
          <div style={{ padding: "4px 24px 28px", display: "flex", flexDirection: "column", gap: 9 }}>
            {question.choices.map((choice) => {
              const isSelected = selectedAnswer === choice.letter;
              const isCrossed = crossedOut.has(choice.letter);

              return (
                <div key={choice.letter} style={{ display: "flex", alignItems: "center", gap: 0 }}>
                  {/* Main answer button */}
                  <button
                    onClick={() => { if (!isCrossed) onSelectAnswer(choice.letter); }}
                    onContextMenu={(e) => { e.preventDefault(); onToggleCrossOut(choice.letter); }}
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      minHeight: 50,
                      border: isSelected ? "2px solid #111827" : "1.5px solid #d1d5db",
                      borderRight: "none",
                      borderRadius: "6px 0 0 6px",
                      background: isCrossed ? "#f9fafb" : isSelected ? "#fff" : "#fff",
                      cursor: isCrossed ? "default" : "pointer",
                      textAlign: "left",
                      padding: 0,
                      outline: "none",
                    }}
                  >
                    {/* Letter circle */}
                    <div style={{ width: 50, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{
                        display: "inline-flex", alignItems: "center", justifyContent: "center",
                        width: 28, height: 28, borderRadius: "50%",
                        border: isSelected ? "2px solid #111827" : "1.5px solid #6b7280",
                        background: isSelected ? "#111827" : "#fff",
                        color: isSelected ? "#fff" : "#374151",
                        fontSize: 13, fontWeight: 600,
                        opacity: isCrossed ? 0.4 : 1,
                      }}>
                        {choice.letter}
                      </span>
                    </div>

                    {/* Answer text */}
                    <span style={{
                      flex: 1, fontSize: 14, color: isCrossed ? "#9ca3af" : "#111827",
                      lineHeight: 1.45, padding: "10px 8px 10px 0",
                      textDecoration: isCrossed ? "line-through" : "none",
                    }}>
                      {choice.text}
                    </span>
                  </button>

                  {/* Right side: circled letter OR "Undo" */}
                  {isCrossed ? (
                    <button
                      onClick={() => onToggleCrossOut(choice.letter)}
                      style={{
                        height: 50,
                        minHeight: 50,
                        padding: "0 10px",
                        border: "1.5px solid #f5a623",
                        borderLeft: "none",
                        borderRadius: "0 6px 6px 0",
                        background: "#fff",
                        color: "#92400e",
                        fontSize: 11,
                        fontWeight: 700,
                        cursor: "pointer",
                        letterSpacing: "0.02em",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      Undo
                    </button>
                  ) : (
                    <button
                      onClick={() => onToggleCrossOut(choice.letter)}
                      title="Eliminate answer"
                      style={{
                        height: 50,
                        minHeight: 50,
                        width: 40,
                        border: isSelected ? "2px solid #111827" : "1.5px solid #d1d5db",
                        borderLeft: "1px solid #e5e7eb",
                        borderRadius: "0 6px 6px 0",
                        background: "#fff",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 0,
                        outline: "none",
                      }}
                    >
                      <CircledLetter letter={choice.letter} selected={isSelected} crossedOut={false} />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div style={{ height: 56, background: "#fff", borderTop: "1.5px dashed #d1d5db", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", flexShrink: 0 }}>
        <span style={{ fontSize: 13, fontWeight: 400, color: "#374151", minWidth: 140 }}>abbvsss Abdusattorov</span>

        <button
          onClick={() => setShowPalette(true)}
          style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#111827", color: "#fff", fontSize: 13, fontWeight: 600, padding: "7px 20px", borderRadius: 9999, border: "none", cursor: "pointer" }}
        >
          Question {currentQuestion} of {totalQuestions}
          <ChevronUp />
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 140, justifyContent: "flex-end" }}>
          {!isFirst && (
            <button
              onClick={onPrevious}
              style={{ fontSize: 13, fontWeight: 600, color: "#374151", padding: "7px 18px", borderRadius: 9999, border: "1.5px solid #d1d5db", background: "#fff", cursor: "pointer" }}
            >
              Back
            </button>
          )}
          <button
            onClick={onNext}
            style={{ fontSize: 13, fontWeight: 600, color: "#fff", padding: "7px 22px", borderRadius: 9999, border: "none", background: isLast ? "#059669" : "#1a56db", cursor: "pointer" }}
          >
            {isLast ? "Review" : "Next"}
          </button>
        </div>
      </div>

      {/* ── PALETTE MODAL ── */}
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
        <div style={{ position: "absolute", top: 72, right: 20, zIndex: 60, background: "#fff", border: "1px solid #d1d5db", borderRadius: 8, boxShadow: "0 4px 20px rgba(0,0,0,0.15)", width: 340, overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", background: "#1e3a5f", color: "#fff" }}>
            <div style={{ display: "flex", gap: 2 }}>
              <button style={{ background: "rgba(255,255,255,0.15)", border: "none", color: "#fff", padding: "4px 12px", borderRadius: 4, cursor: "pointer", fontSize: 12, fontWeight: 600 }}>Graphing</button>
              <button style={{ background: "none", border: "none", color: "#ccc", padding: "4px 12px", borderRadius: 4, cursor: "pointer", fontSize: 12 }}>Scientific</button>
            </div>
            <button onClick={() => setShowCalculator(false)} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", fontSize: 18 }}>×</button>
          </div>
          <div style={{ height: 240, background: "#f9fafb", display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid #e5e7eb" }}>
            <span style={{ fontSize: 12, color: "#9ca3af" }}>Graphing calculator</span>
          </div>
          <div style={{ padding: 12, background: "#fff" }}>
            <div style={{ fontSize: 11, color: "#6b7280", textAlign: "center" }}>Desmos Graphing Calculator</div>
          </div>
        </div>
      )}

      {/* ── REFERENCE SHEET OVERLAY ── */}
      {showReference && (
        <div style={{ position: "absolute", top: 72, right: 20, zIndex: 60, background: "#fff", border: "1px solid #d1d5db", borderRadius: 8, boxShadow: "0 4px 20px rgba(0,0,0,0.15)", width: 360, maxHeight: "70vh", overflowY: "auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", background: "#111827", color: "#fff" }}>
            <span style={{ fontSize: 14, fontWeight: 700 }}>Reference Sheet</span>
            <button onClick={() => setShowReference(false)} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", fontSize: 18 }}>×</button>
          </div>
          <div style={{ padding: "16px 20px", fontSize: 13, color: "#111827", lineHeight: 1.8 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              {[
                { f: "A = πr²", s: "C = 2πr", label: "Circle" },
                { f: "A = lw", label: "Rectangle" },
                { f: "A = ½bh", label: "Triangle" },
                { f: "c² = a² + b²", label: "Pythagorean" },
                { f: "V = lwh", label: "Box" },
                { f: "V = πr²h", label: "Cylinder" },
                { f: "V = 4/3πr³", label: "Sphere" },
                { f: "V = 1/3πr²h", label: "Cone" },
              ].map(({ f, s, label }) => (
                <div key={label} style={{ border: "1px solid #e5e7eb", borderRadius: 6, padding: "8px 12px", fontSize: 12 }}>
                  <div style={{ fontWeight: 700, color: "#374151", fontSize: 11, marginBottom: 4 }}>{label}</div>
                  <div style={{ fontFamily: "serif", fontSize: 13 }}>{f}</div>
                  {s && <div style={{ fontFamily: "serif", fontSize: 12, color: "#6b7280" }}>{s}</div>}
                </div>
              ))}
            </div>
            <p>The number of degrees of arc in a circle is 360.</p>
            <p>The number of radians of arc in a circle is 2π.</p>
            <p>The sum of the measures in degrees of the angles of a triangle is 180.</p>
          </div>
        </div>
      )}
    </div>
  );
}
