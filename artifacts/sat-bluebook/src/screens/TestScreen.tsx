import { useState } from "react";
import type { Module } from "../data/questions";
import QuestionPaletteModal from "../components/QuestionPaletteModal";

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

interface TestScreenProps {
  module: Module;
  currentQuestion: number;
  answers: Record<number, string>;
  flagged: Set<number>;
  timeRemaining: number;
  timerHidden: boolean;
  onToggleTimer: () => void;
  onSelectAnswer: (letter: string) => void;
  onToggleMark: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onNavigate: (n: number) => void;
  onReview: () => void;
  onSubmit: () => void;
}

/* SVG icons matching Bluebook exactly */
const HighlightIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const BookmarkIcon = ({ filled }: { filled?: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

const MoreDotsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="5" r="1.5" />
    <circle cx="12" cy="12" r="1.5" />
    <circle cx="12" cy="19" r="1.5" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const ChevronUpIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 15 12 9 18 15" />
  </svg>
);

const SmallBookmarkIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

/* The "AZ" accessibility/annotation icon visible on the right of the question header */
const AnnotationIcon = () => (
  <svg width="22" height="22" viewBox="0 0 36 36" fill="none">
    <rect x="1" y="1" width="34" height="34" rx="17" fill="white" stroke="#888" strokeWidth="1.5" />
    <text x="18" y="16" textAnchor="middle" fontSize="11" fontWeight="700" fill="#333" fontFamily="system-ui">A</text>
    <text x="18" y="27" textAnchor="middle" fontSize="9" fontWeight="600" fill="#555" fontFamily="system-ui">Z</text>
    <line x1="9" y1="19" x2="27" y2="19" stroke="#888" strokeWidth="1.2" />
  </svg>
);

/* Right-side answer reference icon (the small circle with letter+ seen in screenshot) */
const AnswerRefIcon = ({ letter, selected }: { letter: string; selected: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 36 36" fill="none">
    <circle cx="18" cy="18" r="16" fill="white" stroke={selected ? "#1a56db" : "#aaa"} strokeWidth="1.5" />
    <text x="14" y="22" fontSize="11" fontWeight="600" fill={selected ? "#1a56db" : "#777"} fontFamily="system-ui">{letter}</text>
    <text x="23" y="17" fontSize="8" fontWeight="700" fill={selected ? "#1a56db" : "#888"} fontFamily="system-ui">+</text>
  </svg>
);

/* Center divider icon — two vertical bars like the Bluebook "section progress" indicator */
const DividerIcon = () => (
  <svg width="12" height="24" viewBox="0 0 12 24" fill="none">
    <rect x="1" y="4" width="4" height="16" rx="1" fill="#adb5bd" />
    <rect x="7" y="4" width="4" height="16" rx="1" fill="#adb5bd" />
  </svg>
);

export default function TestScreen({
  module,
  currentQuestion,
  answers,
  flagged,
  timeRemaining,
  timerHidden,
  onToggleTimer,
  onSelectAnswer,
  onToggleMark,
  onPrevious,
  onNext,
  onNavigate,
  onSubmit,
}: TestScreenProps) {
  const [showPalette, setShowPalette] = useState(false);
  const question = module.questions[currentQuestion - 1];
  const totalQuestions = module.questions.length;
  const isMarked = flagged.has(currentQuestion);
  const selectedAnswer = answers[currentQuestion] ?? null;
  const isLowTime = timeRemaining < 300;
  const isFirst = currentQuestion === 1;
  const isLast = currentQuestion === totalQuestions;

  return (
    <div
      className="fixed inset-0 flex flex-col bg-white select-none"
      style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
    >
      {/* ── TOP BAR ROW 1 ── */}
      <div className="flex items-center justify-between px-5 bg-white" style={{ height: 40, borderBottom: "1px solid #e5e7eb" }}>
        {/* Section name — regular weight, dark */}
        <span style={{ fontSize: 14, fontWeight: 400, color: "#111827", letterSpacing: 0 }}>
          {module.name}
        </span>

        {/* Timer — bold, center */}
        <span
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: isLowTime ? "#dc2626" : "#111827",
            fontVariantNumeric: "tabular-nums",
            visibility: timerHidden ? "hidden" : "visible",
            letterSpacing: "0.02em",
          }}
        >
          {formatTime(timeRemaining)}
        </span>

        {/* Icons right — highlight pen, bookmark, vertical dots */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, color: "#6b7280" }}>
          <button className="hover:text-gray-900 transition-colors" title="Highlights">
            <HighlightIcon />
          </button>
          <button className="hover:text-gray-900 transition-colors" title="Bookmarks">
            <BookmarkIcon />
          </button>
          <button className="hover:text-gray-900 transition-colors" title="More">
            <MoreDotsIcon />
          </button>
        </div>
      </div>

      {/* ── TOP BAR ROW 2 ── dashed separator below */}
      <div
        className="flex items-center justify-between px-5 bg-white"
        style={{
          height: 34,
          borderBottom: "1.5px dashed #d1d5db",
        }}
      >
        {/* Directions dropdown */}
        <button
          style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, fontWeight: 500, color: "#374151" }}
          className="hover:text-gray-900 transition-colors"
        >
          Directions <ChevronDownIcon />
        </button>

        {/* Hide/Show button */}
        <button
          onClick={onToggleTimer}
          style={{
            fontSize: 12,
            fontWeight: 500,
            color: "#374151",
            padding: "2px 14px",
            borderRadius: 4,
            border: "1px solid #9ca3af",
            background: "#fff",
            cursor: "pointer",
          }}
          className="hover:bg-gray-50 transition-colors"
        >
          {timerHidden ? "Show" : "Hide"}
        </button>

        {/* Highlights & Notes | More */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 500, color: "#374151" }}>
          <button className="hover:text-gray-900 transition-colors">Highlights &amp; Notes</button>
          <span style={{ color: "#d1d5db" }}>|</span>
          <button className="hover:text-gray-900 transition-colors">More</button>
        </div>
      </div>

      {/* ── PRACTICE TEST BANNER ── */}
      <div
        style={{
          background: "#1e3a5f",
          color: "#fff",
          textAlign: "center",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          padding: "6px 0",
        }}
      >
        This is a practice test
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* LEFT — passage */}
        <div
          className="overflow-y-auto"
          style={{ flex: "0 0 50%", padding: "32px 40px", background: "#fff" }}
        >
          {question.passage ? (
            <p
              style={{
                fontSize: 15,
                lineHeight: 1.8,
                color: "#111827",
                fontWeight: 400,
                margin: 0,
              }}
            >
              {question.passage}
            </p>
          ) : (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "#9ca3af", fontSize: 14 }}>
              No passage for this question
            </div>
          )}
        </div>

        {/* CENTER divider */}
        <div
          style={{
            width: 20,
            background: "#f9fafb",
            borderLeft: "1px solid #e5e7eb",
            borderRight: "1px solid #e5e7eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "col-resize",
            flexShrink: 0,
          }}
        >
          <DividerIcon />
        </div>

        {/* RIGHT — question + answers */}
        <div className="flex-1 overflow-y-auto flex flex-col" style={{ background: "#fff" }}>

          {/* Question header row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "14px 24px 10px",
              borderBottom: "1px solid #f3f4f6",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {/* Question number badge — dark square */}
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 28,
                  height: 28,
                  background: "#111827",
                  color: "#fff",
                  fontSize: 13,
                  fontWeight: 700,
                  borderRadius: 4,
                  flexShrink: 0,
                }}
              >
                {currentQuestion}
              </span>
              {/* Mark for review */}
              <button
                onClick={onToggleMark}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  fontSize: 13,
                  fontWeight: 500,
                  color: isMarked ? "#1a56db" : "#6b7280",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                <SmallBookmarkIcon />
                Mark for Review
              </button>
            </div>

            {/* Annotation/AZ icon — top right of question panel */}
            <button title="Annotate" style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
              <AnnotationIcon />
            </button>
          </div>

          {/* Question text */}
          <div style={{ padding: "16px 24px 12px" }}>
            <p style={{ fontSize: 15, color: "#111827", lineHeight: 1.65, margin: 0, fontWeight: 400 }}>
              {question.text}
            </p>
          </div>

          {/* Answer choices */}
          <div style={{ padding: "4px 24px 24px", display: "flex", flexDirection: "column", gap: 10 }}>
            {question.choices.map((choice) => {
              const isSelected = selectedAnswer === choice.letter;
              return (
                <button
                  key={choice.letter}
                  onClick={() => onSelectAnswer(choice.letter)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    minHeight: 52,
                    border: isSelected ? "2px solid #111827" : "1.5px solid #d1d5db",
                    borderRadius: 6,
                    background: "#fff",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "border-color 0.12s, background 0.12s",
                    outline: "none",
                    gap: 0,
                    padding: 0,
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) (e.currentTarget as HTMLButtonElement).style.borderColor = "#6b7280";
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) (e.currentTarget as HTMLButtonElement).style.borderColor = "#d1d5db";
                  }}
                >
                  {/* Letter circle */}
                  <div style={{ width: 52, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 30,
                        height: 30,
                        borderRadius: "50%",
                        border: isSelected ? "2px solid #111827" : "1.5px solid #6b7280",
                        background: isSelected ? "#111827" : "#fff",
                        color: isSelected ? "#fff" : "#111827",
                        fontSize: 13,
                        fontWeight: 600,
                        transition: "all 0.12s",
                      }}
                    >
                      {choice.letter}
                    </span>
                  </div>

                  {/* Answer text */}
                  <span
                    style={{
                      flex: 1,
                      fontSize: 14,
                      color: "#111827",
                      lineHeight: 1.45,
                      padding: "10px 8px 10px 0",
                    }}
                  >
                    {choice.text}
                  </span>

                  {/* Right reference icon */}
                  <div style={{ width: 44, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <AnswerRefIcon letter={choice.letter} selected={isSelected} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div
        style={{
          height: 56,
          background: "#fff",
          borderTop: "1px solid #e5e7eb",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          flexShrink: 0,
        }}
      >
        {/* Left: username */}
        <span style={{ fontSize: 13, fontWeight: 400, color: "#374151", minWidth: 120 }}>
          abbvsss Abdusattorov
        </span>

        {/* Center: Question palette trigger */}
        <button
          onClick={() => setShowPalette(true)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "#111827",
            color: "#fff",
            fontSize: 13,
            fontWeight: 600,
            padding: "7px 20px",
            borderRadius: 9999,
            border: "none",
            cursor: "pointer",
          }}
        >
          Question {currentQuestion} of {totalQuestions}
          <ChevronUpIcon />
        </button>

        {/* Right: Back + Next */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 120, justifyContent: "flex-end" }}>
          {!isFirst && (
            <button
              onClick={onPrevious}
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#374151",
                padding: "7px 18px",
                borderRadius: 9999,
                border: "1.5px solid #d1d5db",
                background: "#fff",
                cursor: "pointer",
              }}
            >
              Back
            </button>
          )}
          <button
            onClick={onNext}
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "#fff",
              padding: "7px 22px",
              borderRadius: 9999,
              border: "none",
              background: isLast ? "#059669" : "#1a56db",
              cursor: "pointer",
            }}
          >
            {isLast ? "Review" : "Next"}
          </button>
        </div>
      </div>

      {/* Palette modal */}
      {showPalette && (
        <QuestionPaletteModal
          moduleName={module.name}
          totalQuestions={totalQuestions}
          currentQuestion={currentQuestion}
          answers={answers}
          flagged={flagged}
          onNavigate={(n) => { onNavigate(n); setShowPalette(false); }}
          onClose={() => setShowPalette(false)}
          onSubmit={() => { setShowPalette(false); onSubmit(); }}
        />
      )}
    </div>
  );
}
