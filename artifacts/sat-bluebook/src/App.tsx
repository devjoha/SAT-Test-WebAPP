import { useState, useEffect, useCallback } from "react";
import { modules } from "./data/questions";
import TopBar from "./components/TopBar";
import QuestionPanel from "./components/QuestionPanel";
import AnswerPanel from "./components/AnswerPanel";
import NavigationBar from "./components/NavigationBar";
import QuestionPalette from "./components/QuestionPalette";
import StartScreen from "./components/StartScreen";
import BreakScreen from "./components/BreakScreen";
import ReviewScreen from "./components/ReviewScreen";

type Screen = "start" | "test" | "break" | "review" | "done";

interface ModuleState {
  answers: Record<number, string>;
  flagged: Set<number>;
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("start");
  const [moduleIndex, setModuleIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [showPalette, setShowPalette] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [moduleStates, setModuleStates] = useState<ModuleState[]>(
    modules.map(() => ({ answers: {}, flagged: new Set<number>() }))
  );

  const currentModule = modules[moduleIndex];
  const currentState = moduleStates[moduleIndex];
  const question = currentModule.questions[currentQuestion - 1];

  const resetTimer = useCallback((minutes: number) => {
    setTimeRemaining(minutes * 60);
  }, []);

  useEffect(() => {
    if (screen !== "test") return;
    if (timeRemaining <= 0) return;

    const id = setInterval(() => {
      setTimeRemaining((t) => {
        if (t <= 1) {
          clearInterval(id);
          handleModuleEnd();
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [screen, timeRemaining]);

  function handleStart() {
    resetTimer(currentModule.durationMinutes);
    setScreen("test");
  }

  function handleModuleEnd() {
    const isLastModule = moduleIndex === modules.length - 1;
    if (isLastModule) {
      setScreen("done");
    } else {
      setScreen("break");
    }
  }

  function handleBreakContinue() {
    const nextIndex = moduleIndex + 1;
    setModuleIndex(nextIndex);
    setCurrentQuestion(1);
    resetTimer(modules[nextIndex].durationMinutes);
    setScreen("test");
  }

  function handleSubmit() {
    handleModuleEnd();
    setShowPalette(false);
  }

  function handleSelectAnswer(letter: string) {
    setModuleStates((prev) => {
      const updated = [...prev];
      updated[moduleIndex] = {
        ...updated[moduleIndex],
        answers: { ...updated[moduleIndex].answers, [currentQuestion]: letter },
      };
      return updated;
    });
  }

  function handleToggleMark() {
    setModuleStates((prev) => {
      const updated = [...prev];
      const newFlagged = new Set(updated[moduleIndex].flagged);
      if (newFlagged.has(currentQuestion)) {
        newFlagged.delete(currentQuestion);
      } else {
        newFlagged.add(currentQuestion);
      }
      updated[moduleIndex] = { ...updated[moduleIndex], flagged: newFlagged };
      return updated;
    });
  }

  function handlePrevious() {
    if (currentQuestion > 1) setCurrentQuestion((n) => n - 1);
  }

  function handleNext() {
    if (currentQuestion < currentModule.questions.length) {
      setCurrentQuestion((n) => n + 1);
    } else {
      setScreen("review");
    }
  }

  if (screen === "start") {
    return <StartScreen onStart={handleStart} />;
  }

  if (screen === "break") {
    return <BreakScreen breakDurationMinutes={10} onContinue={handleBreakContinue} />;
  }

  if (screen === "done") {
    const totalAnswered = moduleStates.reduce(
      (acc, ms) => acc + Object.keys(ms.answers).length,
      0
    );
    const totalQuestions = modules.reduce((acc, m) => acc + m.questions.length, 0);
    return (
      <div className="fixed inset-0 bg-gray-50 flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-200 text-center overflow-hidden">
          <div className="bg-blue-600 px-8 py-6">
            <h1 className="text-white text-2xl font-bold">Section Complete</h1>
          </div>
          <div className="px-8 py-8 space-y-4">
            <div className="text-6xl">✓</div>
            <p className="text-gray-700 text-base">
              You have submitted your test. Your responses are being recorded.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
              <p>
                <span className="font-semibold text-gray-900">{totalAnswered}</span> of{" "}
                <span className="font-semibold text-gray-900">{totalQuestions}</span> questions answered
              </p>
            </div>
            <button
              onClick={() => {
                setScreen("start");
                setModuleIndex(0);
                setCurrentQuestion(1);
                setModuleStates(modules.map(() => ({ answers: {}, flagged: new Set<number>() })));
              }}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors text-sm"
            >
              Start New Test
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (screen === "review") {
    return (
      <ReviewScreen
        totalQuestions={currentModule.questions.length}
        currentQuestion={currentQuestion}
        answers={currentState.answers}
        flagged={currentState.flagged}
        onNavigate={setCurrentQuestion}
        onReturnToTest={() => setScreen("test")}
        onSubmit={handleSubmit}
      />
    );
  }

  return (
    <div className="fixed inset-0 flex flex-col bg-gray-100">
      <TopBar
        sectionName={currentModule.name}
        timeRemaining={timeRemaining}
        currentQuestion={currentQuestion}
        totalQuestions={currentModule.questions.length}
        onReviewClick={() => setShowPalette(true)}
      />

      <div className="flex flex-1 overflow-hidden" style={{ marginTop: 64, marginBottom: 64 }}>
        <div className="w-[60%] h-full overflow-hidden border-r border-gray-200 bg-white">
          <QuestionPanel
            questionNumber={currentQuestion}
            passage={question.passage}
            questionText={question.text}
            isMarked={currentState.flagged.has(currentQuestion)}
            onMarkToggle={handleToggleMark}
          />
        </div>

        <div className="w-[40%] h-full overflow-hidden bg-white">
          <AnswerPanel
            choices={question.choices}
            selectedAnswer={currentState.answers[currentQuestion] ?? null}
            onSelect={handleSelectAnswer}
          />
        </div>
      </div>

      <NavigationBar
        currentQuestion={currentQuestion}
        totalQuestions={currentModule.questions.length}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onReview={() => setScreen("review")}
      />

      {showPalette && (
        <QuestionPalette
          totalQuestions={currentModule.questions.length}
          currentQuestion={currentQuestion}
          answers={currentState.answers}
          flagged={currentState.flagged}
          onSelect={setCurrentQuestion}
          onClose={() => setShowPalette(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
