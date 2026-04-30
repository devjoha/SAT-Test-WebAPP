import { useState, useEffect, useRef } from "react";
import type { Module } from "../data/questions";
import QuestionPaletteModal from "../components/QuestionPaletteModal";
import type { User } from "../data/users";

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function formatModuleName(name: string): string {
  if (name.startsWith("Reading and Writing - Module 1")) return "Section 1, Module 1: Reading and Writing";
  if (name.startsWith("Reading and Writing - Module 2")) return "Section 1, Module 2: Reading and Writing";
  if (name.startsWith("Math - Module 1")) return "Section 2, Module 1: Math";
  if (name.startsWith("Math - Module 2")) return "Section 2, Module 2: Math";
  return name;
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
const HighlightsIcon = () => (
  <svg width="31" height="18" viewBox="0 0 31 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m5.5 12.5-3 3 .8-4.1L9.7 5a1.8 1.8 0 0 1 2.6 2.6L5.5 12.5Z" />
    <path d="M15.5 2.5h10.8a1.2 1.2 0 0 1 1.2 1.2v10.6a1.2 1.2 0 0 1-1.2 1.2H15.5Z" />
    <path d="M18.5 6h6M18.5 9h6M18.5 12h4" />
  </svg>
);
const MoreIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="5" r="1.8" /><circle cx="12" cy="12" r="1.8" /><circle cx="12" cy="19" r="1.8" />
  </svg>
);
const CalcIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <line x1="8" y1="6" x2="16" y2="6" />
    <line x1="8" y1="10" x2="10" y2="10" /><line x1="14" y1="10" x2="16" y2="10" />
    <line x1="8" y1="14" x2="10" y2="14" /><line x1="14" y1="14" x2="16" y2="14" />
    <line x1="8" y1="18" x2="16" y2="18" />
  </svg>
);
const DragDotsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ opacity: 0.6 }}>
    <circle cx="9" cy="6" r="1.5"/><circle cx="15" cy="6" r="1.5"/>
    <circle cx="9" cy="12" r="1.5"/><circle cx="15" cy="12" r="1.5"/>
    <circle cx="9" cy="18" r="1.5"/><circle cx="15" cy="18" r="1.5"/>
  </svg>
);

declare global {
  interface Window {
    Desmos?: {
      GraphingCalculator: (el: HTMLElement, opts?: object) => unknown;
    };
  }
}

function DesmosCalculator({ onClose }: { onClose: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const calcRef = useRef<unknown>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const existingScript = document.getElementById("desmos-api");

    function initCalc() {
      if (containerRef.current && window.Desmos) {
        calcRef.current = window.Desmos.GraphingCalculator(containerRef.current, {
          keypad: true,
          expressions: true,
          settingsMenu: false,
          expressionsTopbar: true,
          zoomButtons: true,
          lockViewport: false,
        });
        setLoaded(true);
      }
    }

    if (existingScript && window.Desmos) {
      initCalc();
    } else if (!existingScript) {
      const script = document.createElement("script");
      script.id = "desmos-api";
      script.src = "https://www.desmos.com/api/v1.8/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6";
      script.async = true;
      script.onload = () => initCalc();
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        top: 88,
        left: 20,
        zIndex: 60,
        background: "#fff",
        borderRadius: 4,
        boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
        width: 430,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Dark header matching the reference */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "7px 10px",
          background: "#2d2d2d",
          color: "#fff",
          gap: 8,
          cursor: "default",
          userSelect: "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 600 }}>Calculator</span>
          <DragDotsIcon />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <button
            style={{
              background: "none",
              border: "1px solid rgba(255,255,255,0.4)",
              color: "#fff",
              borderRadius: 3,
              padding: "2px 10px",
              fontSize: 12,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Expand
          </button>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "#fff",
              cursor: "pointer",
              fontSize: 20,
              lineHeight: 1,
              padding: "0 2px",
            }}
          >
            ×
          </button>
        </div>
      </div>

      {/* Desmos calculator container */}
      {!loaded && (
        <div style={{ height: 480, display: "flex", alignItems: "center", justifyContent: "center", background: "#f5f5f5" }}>
          <span style={{ fontSize: 13, color: "#888" }}>Loading calculator…</span>
        </div>
      )}
      <div
        ref={containerRef}
        style={{ width: "100%", height: 480, display: loaded ? "block" : "none" }}
      />
    </div>
  );
}

interface TestScreenProps {
  user: User;
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
  onExit: () => void;
}

export default function TestScreen({
  module,
  user,
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
  onExit,
}: TestScreenProps) {
  function handleExit() {
    const ok = window.confirm(
      "Return to the home screen? Your current test progress will be cleared."
    );
    if (ok) onExit();
  }
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
          <div className="section-name">{formatModuleName(module.name)}</div>
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
              <button
                className={`tool-item${showCalculator ? " tool-item-active" : ""}`}
                onClick={() => { setShowCalculator(v => !v); setShowReference(false); }}
              >
                <CalcIcon />
                <span>Calculator</span>
              </button>
              <button
                className={`tool-item${showReference ? " tool-item-active" : ""}`}
                onClick={() => { setShowReference(v => !v); setShowCalculator(false); }}
              >
                <span style={{ fontSize: 17, fontWeight: 700, lineHeight: 1 }}>x²</span>
                <span>Reference</span>
              </button>
              <button className="tool-item" onClick={handleExit} title="Return to home">
                <MoreIcon /><span>More</span>
              </button>
            </>
          ) : (
            <>
              <button className="tool-item">
                <HighlightsIcon /><span>Highlights &amp; Notes</span>
              </button>
              <button className="tool-item" onClick={handleExit} title="Return to home">
                <MoreIcon /><span>More</span>
              </button>
            </>
          )}
        </div>
      </header>

      {/* ── PRACTICE TEST BANNER ── */}
      {/* <div className="practice-test-banner"></div> */}

      {/* ── DIRECTIONS DROPDOWN ── */}
      {showDirections && (
        <div style={{  position: "absolute", top: 80, left: -100, right: 0, zIndex: 60, display: "flex", justifyContent: "center", padding: "0 20px" }}>
          <div style={{ background: "#f0f0f0", border: "#f0f0f0", padding: "22px 28px 18px", maxWidth: 1600, height: 795, width: "100%", boxShadow: "0 6px 24px rgba(0,0,0,0.13)" }}>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: "#111", marginBottom: 12 }}>
              {isMath
                ? "The questions in this section address a number of important math skills. Use of a calculator is permitted for all questions. A reference sheet, calculator, and these directions can be accessed throughout the test."
                : "The questions in this section address a number of important reading and writing skills. Each question includes one or more passages, which may include a table or graph. Read each passage and question carefully, and then choose the best answer."}
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: "#111", marginBottom: 16 }}>
              {isMath
                ? "Unless otherwise indicated, all variables and expressions represent real numbers. Figures are drawn to scale. All figures lie in a plane unless otherwise indicated. The domain of a given function is the set of all real numbers for which the function has defined values."
                : "All questions in this section are multiple-choice with four answer choices. Each question has a single best answer."}
            </p>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button onClick={() => setShowDirections(false)} style={{ position: "absolute", bottom: 18, background: "#f5c518", color: "#111", border: "1px solid #4b4343", borderRadius: 9999, padding: "8px 24px", fontSize: 15, fontWeight: 900, cursor: "pointer" }}>
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
            <button className="abc-btn">ABC</button>
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

                  <button
                    className={isCrossed ? "undo-btn" : "crossout-circle"}
                    onClick={() => onToggleCrossOut(choice.letter)}
                    title={isCrossed ? `Undo eliminate choice ${choice.letter}` : `Eliminate choice ${choice.letter}`}
                  >
                    {isCrossed ? "Undo" : choice.letter}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer className="test-footer">
        <span className="user-name">{user.displayName}</span>

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

      {/* ── DESMOS CALCULATOR ── */}
      {showCalculator && (
        <DesmosCalculator onClose={() => setShowCalculator(false)} />
      )}

      {/* ── REFERENCE OVERLAY ── */}
      {showReference && (
        <div style={{ position: "absolute", top: 88, right: 20, zIndex: 60, background: "#fff", border: "1px solid #d1d5db", borderRadius: 4, boxShadow: "0 6px 24px rgba(0,0,0,0.15)", width: 420, maxHeight: "76vh", overflowY: "auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", background: "#1a1a1a", color: "#fff", position: "sticky", top: 0, zIndex: 1 }}>
            <span style={{ fontSize: 14, fontWeight: 700 }}>Reference</span>
            <button onClick={() => setShowReference(false)} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", fontSize: 20, lineHeight: 1 }}>×</button>
          </div>
          <div style={{ padding: "16px 20px 20px", fontSize: 13, color: "#111", lineHeight: 1.8 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
              {[
                { label: "Circle", f: "A = πr²", s: "C = 2πr" },
                { label: "Rectangle", f: "A = lw" },
                { label: "Triangle", f: "A = ½bh" },
                { label: "Pythagorean Theorem", f: "c² = a² + b²" },
                { label: "Rectangular Box", f: "V = lwh" },
                { label: "Cylinder", f: "V = πr²h" },
                { label: "Sphere", f: "V = 4/3πr³" },
                { label: "Cone", f: "V = 1/3πr²h" },
                { label: "Pyramid", f: "V = 1/3lwh" },
              ].map(({ f, s, label }) => (
                <div key={label} style={{ border: "1px solid #e5e7eb", borderRadius: 4, padding: "8px 12px" }}>
                  <div style={{ fontWeight: 600, color: "#555", fontSize: 10, marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</div>
                  <div style={{ fontFamily: "Georgia, serif", fontSize: 14 }}>{f}</div>
                  {s && <div style={{ fontFamily: "Georgia, serif", color: "#6b7280", fontSize: 12 }}>{s}</div>}
                </div>
              ))}
            </div>
            <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: 12, fontSize: 13 }}>
              <p style={{ marginBottom: 6 }}>The number of degrees of arc in a circle is 360.</p>
              <p style={{ marginBottom: 6 }}>The number of radians of arc in a circle is 2π.</p>
              <p>The sum of the measures in degrees of the angles of a triangle is 180.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
