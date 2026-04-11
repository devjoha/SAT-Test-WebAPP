import { useState } from "react";
import type { Module } from "../data/questions";
import QuestionPaletteModal from "../components/QuestionPaletteModal";
import { APP_CONFIG } from "../config";

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

const ChevronUp = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 15 12 9 18 15" />
  </svg>
);
const ChevronDown = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
const BookmarkIcon = ({ filled }: { filled: boolean }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? "#c0392b" : "none"} stroke={filled ? "#c0392b" : "#555"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);
const HighlightIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);
const MoreIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="5" r="1.8" /><circle cx="12" cy="12" r="1.8" /><circle cx="12" cy="19" r="1.8" />
  </svg>
);
const CalcIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <line x1="8" y1="6" x2="16" y2="6" />
    <line x1="8" y1="10" x2="10" y2="10" /><line x1="14" y1="10" x2="16" y2="10" />
    <line x1="8" y1="14" x2="10" y2="14" /><line x1="14" y1="14" x2="16" y2="14" />
    <line x1="8" y1="18" x2="16" y2="18" />
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
    <div className="test-screen">

      {/* ── HEADER ── */}
      <header className="test-header">
        <div>
          <div className="section-name">{module.name}</div>
          <button className="directions-btn" onClick={() => setShowDirections(v => !v)}>
            Directions {showDirections ? <ChevronUp /> : <ChevronDown />}
          </button>
        </div>

        <div className="timer-block">
          <span
            className={`timer-value${isLowTime ? " low-time" : ""}`}
            style={{ visibility: timerHidden ? "hidden" : "visible" }}
          >
            {formatTime(timeRemaining)}
          </span>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button className="hide-btn" onClick={onToggleTimer}>
              {timerHidden ? "Show" : "Hide"}
            </button>
          </div>
        </div>

        <div className="header-right">
          {isMath ? (
            <>
              <button className="tool-item" onClick={() => setShowCalculator(v => !v)}>
                <CalcIcon />
                <span>Calculator</span>
              </button>
              <button className="tool-item" onClick={() => setShowReference(v => !v)}>
                <span style={{ fontSize: 16, fontWeight: 700, lineHeight: 1 }}>x²</span>
                <span>Reference</span>
              </button>
              <button className="tool-item">
                <MoreIcon /><span>More</span>
              </button>
            </>
          ) : (
            <>
              <button className="tool-item">
                <HighlightIcon /><span>Highlights &amp; Notes</span>
              </button>
              <button className="tool-item">
                <MoreIcon /><span>More</span>
              </button>
            </>
          )}
        </div>
      </header>

      {/* ── PRACTICE TEST BANNER ── */}
      <div className="practice-test-banner">THIS IS A PRACTICE TEST</div>

      {/* ── DIRECTIONS DROPDOWN ── */}
      {showDirections && (
        <div style={{ position: "absolute", top: 80, left: 0, right: 0, zIndex: 60, display: "flex", justifyContent: "center", padding: "0 20px" }}>
          <div style={{ background: "#fff", border: "2px solid #f5a623", borderRadius: 4, padding: "22px 28px 18px", maxWidth: 700, width: "100%", boxShadow: "0 6px 24px rgba(0,0,0,0.13)" }}>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: "#111", marginBottom: 12 }}>
              The questions in this section address a number of important reading and writing skills. Each question includes one or more passages, which may include a table or graph. Read each passage and question carefully, and then choose the best answer.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: "#111", marginBottom: 16 }}>
              All questions in this section are multiple-choice with four answer choices. Each question has a single best answer.
            </p>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button onClick={() => setShowDirections(false)} style={{ background: "#f5c518", color: "#111", border: "none", borderRadius: 9999, padding: "8px 24px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MAIN ── */}
      <main className={hasPassage ? "test-main" : "test-main test-main-math"}>

        {hasPassage && (
          <div className="test-pane test-left-pane">
            <p>{question.passage}</p>
          </div>
        )}

        {hasPassage && (
          <div className="divider-handle">
            <span /><span />
          </div>
        )}

        <div className={hasPassage ? "test-pane test-right-pane" : "test-pane test-math-pane"}>

          {/* Question header row */}
          <div className="question-header">
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span className="question-number">{currentQuestion}</span>
              <button className={`mark-review-btn${isMarked ? " marked" : ""}`} onClick={onToggleMark}>
                <BookmarkIcon filled={isMarked} />
                Mark for Review
              </button>
            </div>
            <button className="abc-btn">APX</button>
          </div>

          <hr className="question-header-separator" />

          {/* Question text */}
          <p className="question-text">{question.text}</p>

          {/* Answer options */}
          <div className="option-container">
            {question.choices.map((choice) => {
              const isSelected = selectedAnswer === choice.letter;
              const isCrossed = crossedOut.has(choice.letter);

              let cls = "option";
              if (isCrossed) cls += " crossed";
              else if (isSelected) cls += " selected";

              return (
                <div key={choice.letter} className="option-row">
                  <div
                    className={cls}
                    onClick={() => { if (!isCrossed) onSelectAnswer(choice.letter); }}
                    onContextMenu={(e) => { e.preventDefault(); onToggleCrossOut(choice.letter); }}
                  >
                    <div className="option-letter">{choice.letter}</div>
                    <div className="option-text">{choice.text}</div>
                  </div>

                  {isCrossed ? (
                    <button
                      className="undo-btn"
                      onClick={() => onToggleCrossOut(choice.letter)}
                    >
                      Undo
                    </button>
                  ) : (
                    <button
                      className="crossout-circle"
                      onClick={() => onToggleCrossOut(choice.letter)}
                      title={`Eliminate choice ${choice.letter}`}
                    >
                      {choice.letter}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer className="test-footer">
        <span className="user-name">{APP_CONFIG.studentName}</span>

        <button className="question-nav-pill" onClick={() => setShowPalette(true)}>
          Question {currentQuestion} of {totalQuestions} <ChevronUp />
        </button>

        <div className="footer-right">
          {!isFirst && (
            <button className="back-btn" onClick={onPrevious}>Back</button>
          )}
          <button
            className={`next-btn${isLast ? " review" : ""}`}
            onClick={onNext}
          >
            {isLast ? "Review" : "Next"}
          </button>
        </div>
      </footer>

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
        <div style={{ position: "absolute", top: 88, right: 20, zIndex: 60, background: "#fff", border: "1px solid #d1d5db", borderRadius: 10, boxShadow: "0 6px 24px rgba(0,0,0,0.15)", width: 340, overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 14px", background: "#1a1f71" }}>
            <div style={{ display: "flex", gap: 2 }}>
              <button style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "#fff", padding: "4px 14px", borderRadius: 4, cursor: "pointer", fontSize: 12, fontWeight: 700 }}>Graphing</button>
              <button style={{ background: "none", border: "none", color: "#ccc", padding: "4px 14px", borderRadius: 4, cursor: "pointer", fontSize: 12 }}>Scientific</button>
            </div>
            <button onClick={() => setShowCalculator(false)} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", fontSize: 20, lineHeight: 1 }}>×</button>
          </div>
          <div style={{ height: 240, background: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 13, color: "#9ca3af" }}>Desmos Graphing Calculator</span>
          </div>
        </div>
      )}

      {/* ── REFERENCE OVERLAY ── */}
      {showReference && (
        <div style={{ position: "absolute", top: 88, right: 20, zIndex: 60, background: "#fff", border: "1px solid #d1d5db", borderRadius: 10, boxShadow: "0 6px 24px rgba(0,0,0,0.15)", width: 380, maxHeight: "72vh", overflowY: "auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", background: "#111827", color: "#fff", position: "sticky", top: 0 }}>
            <span style={{ fontSize: 14, fontWeight: 700 }}>Reference Sheet</span>
            <button onClick={() => setShowReference(false)} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", fontSize: 20, lineHeight: 1 }}>×</button>
          </div>
          <div style={{ padding: "16px 20px 20px", fontSize: 13, color: "#111", lineHeight: 1.8 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
              {[
                { label: "Circle", f: "A = πr²", s: "C = 2πr" },
                { label: "Rectangle", f: "A = lw" },
                { label: "Triangle", f: "A = ½bh" },
                { label: "Pythagorean", f: "c² = a² + b²" },
                { label: "Box", f: "V = lwh" },
                { label: "Cylinder", f: "V = πr²h" },
                { label: "Sphere", f: "V = 4/3πr³" },
                { label: "Cone", f: "V = 1/3πr²h" },
              ].map(({ f, s, label }) => (
                <div key={label} style={{ border: "1px solid #e5e7eb", borderRadius: 6, padding: "8px 12px" }}>
                  <div style={{ fontWeight: 700, color: "#6b7280", fontSize: 10, marginBottom: 3, textTransform: "uppercase" }}>{label}</div>
                  <div style={{ fontFamily: "Georgia, serif" }}>{f}</div>
                  {s && <div style={{ fontFamily: "Georgia, serif", color: "#6b7280", fontSize: 12 }}>{s}</div>}
                </div>
              ))}
            </div>
            <p style={{ marginBottom: 6, fontSize: 13 }}>The number of degrees of arc in a circle is 360.</p>
            <p style={{ marginBottom: 6, fontSize: 13 }}>The number of radians of arc in a circle is 2π.</p>
            <p style={{ fontSize: 13 }}>The sum of the measures in degrees of the angles of a triangle is 180.</p>
          </div>
        </div>
      )}
    </div>
  );
}
