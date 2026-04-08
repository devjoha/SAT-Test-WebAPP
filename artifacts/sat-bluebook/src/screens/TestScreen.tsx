import { useState } from "react";
import type { Module } from "../data/questions";
import type { ModuleState } from "../App";
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
  onReview,
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
    <div className="fixed inset-0 flex flex-col bg-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* TOP BAR ROW 1 */}
      <div className="flex items-center justify-between px-4 h-9 bg-white border-b border-gray-200">
        <span className="text-sm font-semibold text-gray-900">{module.name}</span>
        <span
          className={`text-xl font-bold tabular-nums leading-none ${
            isLowTime ? "text-red-600" : "text-gray-900"
          } ${timerHidden ? "invisible" : ""}`}
        >
          {formatTime(timeRemaining)}
        </span>
        <div className="flex items-center gap-3">
          <button className="text-gray-500 hover:text-gray-700">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
            </svg>
          </button>
          <button className="text-gray-500 hover:text-gray-700">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
            </svg>
          </button>
          <span className="text-xs text-gray-500">⋮⋮⋮</span>
        </div>
      </div>

      {/* TOP BAR ROW 2 */}
      <div className="flex items-center justify-between px-4 h-8 bg-white border-b border-gray-200">
        <button className="flex items-center gap-1 text-sm text-gray-700 hover:text-gray-900 font-medium">
          Directions
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        <button
          onClick={onToggleTimer}
          className="text-xs px-3 py-0.5 rounded border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium"
        >
          {timerHidden ? "Show" : "Hide"}
        </button>
        <div className="flex items-center gap-3 text-xs text-gray-600 font-medium">
          <button className="hover:text-gray-900">Highlights &amp; Notes</button>
          <span className="text-gray-300">|</span>
          <button className="hover:text-gray-900">More</button>
        </div>
      </div>

      {/* PRACTICE TEST BANNER */}
      <div className="bg-[#1e3a5f] text-white text-center text-xs font-semibold tracking-widest uppercase py-1.5">
        This is a practice test
      </div>

      {/* MAIN CONTENT */}
      <div className="flex flex-1 overflow-hidden">

        {/* LEFT PANEL - Passage */}
        <div className="flex-1 overflow-y-auto px-10 py-8 border-r border-gray-200">
          {question.passage ? (
            <p className="text-gray-900 text-[15px] leading-[1.75] whitespace-pre-wrap">
              {question.passage}
            </p>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-300 text-sm">
              No passage for this question
            </div>
          )}
        </div>

        {/* CENTER HANDLE */}
        <div className="relative flex items-center justify-center w-5 border-r border-l border-gray-200 bg-gray-50 flex-shrink-0 cursor-col-resize">
          <div className="flex flex-col gap-0.5">
            <div className="w-1 h-1 rounded-full bg-gray-400" />
            <div className="w-1 h-1 rounded-full bg-gray-400" />
            <div className="w-1 h-1 rounded-full bg-gray-400" />
          </div>
        </div>

        {/* RIGHT PANEL - Question + Answers */}
        <div className="flex-1 overflow-y-auto flex flex-col">

          {/* Question header row */}
          <div className="flex items-center justify-between px-6 pt-4 pb-3 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-7 h-7 bg-gray-900 text-white text-sm font-bold rounded-sm">
                {currentQuestion}
              </span>
              <button
                onClick={onToggleMark}
                className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${
                  isMarked ? "text-[#1e3a5f]" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4"
                  fill={isMarked ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                </svg>
                Mark for Review
              </button>
            </div>
            <button className="flex items-center justify-center w-7 h-7 rounded border border-gray-300 text-xs font-bold text-gray-600 hover:bg-gray-50">
              A<sub className="text-[8px]">Z</sub>
            </button>
          </div>

          {/* Question text */}
          <div className="px-6 pt-4 pb-5">
            <p className="text-gray-900 text-[15px] leading-relaxed">{question.text}</p>
          </div>

          {/* Answer choices */}
          <div className="px-6 pb-6 space-y-2.5">
            {question.choices.map((choice) => {
              const isSelected = selectedAnswer === choice.letter;
              return (
                <button
                  key={choice.letter}
                  onClick={() => onSelectAnswer(choice.letter)}
                  className={`w-full flex items-center gap-0 rounded border text-left transition-all group ${
                    isSelected
                      ? "border-[#1e3a5f] bg-white"
                      : "border-gray-300 bg-white hover:border-gray-400"
                  }`}
                >
                  {/* Letter circle */}
                  <div className="flex-shrink-0 flex items-center justify-center w-11 h-12">
                    <span
                      className={`flex items-center justify-center w-7 h-7 rounded-full border-2 text-sm font-semibold transition-colors ${
                        isSelected
                          ? "border-[#1e3a5f] bg-[#1e3a5f] text-white"
                          : "border-gray-400 text-gray-700 group-hover:border-gray-600"
                      }`}
                    >
                      {choice.letter}
                    </span>
                  </div>

                  {/* Answer text */}
                  <span className={`flex-1 py-3 text-[14px] leading-snug pr-2 ${isSelected ? "text-gray-900" : "text-gray-800"}`}>
                    {choice.text}
                  </span>

                  {/* Right icon (accessibility / reference) */}
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-12">
                    <span
                      className={`flex items-center justify-center w-6 h-6 rounded-full border text-[10px] font-bold transition-colors ${
                        isSelected
                          ? "border-[#1e3a5f] text-[#1e3a5f]"
                          : "border-gray-300 text-gray-400 group-hover:border-gray-400"
                      }`}
                    >
                      {choice.letter}
                      <span className="text-[6px] leading-none">+</span>
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="flex items-center justify-between px-4 h-14 bg-white border-t border-gray-200 flex-shrink-0">
        {/* Left: user name */}
        <span className="text-sm font-medium text-gray-700 w-40 truncate">Test Taker</span>

        {/* Center: question palette trigger */}
        <button
          onClick={() => setShowPalette(true)}
          className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors"
        >
          Question {currentQuestion} of {totalQuestions}
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
        </button>

        {/* Right: nav buttons */}
        <div className="flex items-center gap-2 w-40 justify-end">
          {!isFirst && (
            <button
              onClick={onPrevious}
              className="px-5 py-2 rounded-full border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
          )}
          <button
            onClick={onNext}
            className="px-6 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors"
          >
            {isLast ? "Review" : "Next"}
          </button>
        </div>
      </div>

      {/* PALETTE MODAL */}
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
