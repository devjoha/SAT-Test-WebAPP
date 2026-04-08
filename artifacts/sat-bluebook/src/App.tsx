import { useState, useEffect, useCallback } from "react";
import { modules } from "./data/questions";
import TestScreen from "./screens/TestScreen";
import StartScreen from "./screens/StartScreen";
import BreakScreen from "./screens/BreakScreen";
import ReviewScreen from "./screens/ReviewScreen";
import DoneScreen from "./screens/DoneScreen";

type Screen = "start" | "test" | "break" | "review" | "done";

export interface ModuleState {
  answers: Record<number, string>;
  flagged: Set<number>;
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("start");
  const [moduleIndex, setModuleIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [timerHidden, setTimerHidden] = useState(false);
  const [moduleStates, setModuleStates] = useState<ModuleState[]>(
    modules.map(() => ({ answers: {}, flagged: new Set<number>() }))
  );

  const currentModule = modules[moduleIndex];
  const currentState = moduleStates[moduleIndex];

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
    setScreen(isLastModule ? "done" : "break");
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

  function handleRestart() {
    setScreen("start");
    setModuleIndex(0);
    setCurrentQuestion(1);
    setModuleStates(modules.map(() => ({ answers: {}, flagged: new Set<number>() })));
  }

  if (screen === "start") return <StartScreen onStart={handleStart} />;
  if (screen === "break") return <BreakScreen onContinue={handleBreakContinue} />;
  if (screen === "done") {
    const totalAnswered = moduleStates.reduce((a, ms) => a + Object.keys(ms.answers).length, 0);
    const totalQuestions = modules.reduce((a, m) => a + m.questions.length, 0);
    return <DoneScreen totalAnswered={totalAnswered} totalQuestions={totalQuestions} onRestart={handleRestart} />;
  }
  if (screen === "review") {
    return (
      <ReviewScreen
        moduleName={currentModule.name}
        totalQuestions={currentModule.questions.length}
        currentQuestion={currentQuestion}
        answers={currentState.answers}
        flagged={currentState.flagged}
        onNavigate={(n) => { setCurrentQuestion(n); setScreen("test"); }}
        onReturnToTest={() => setScreen("test")}
        onSubmit={handleSubmit}
      />
    );
  }

  return (
    <TestScreen
      module={currentModule}
      currentQuestion={currentQuestion}
      answers={currentState.answers}
      flagged={currentState.flagged}
      timeRemaining={timeRemaining}
      timerHidden={timerHidden}
      onToggleTimer={() => setTimerHidden((h) => !h)}
      onSelectAnswer={handleSelectAnswer}
      onToggleMark={handleToggleMark}
      onPrevious={() => currentQuestion > 1 && setCurrentQuestion((n) => n - 1)}
      onNext={() => {
        if (currentQuestion < currentModule.questions.length) setCurrentQuestion((n) => n + 1);
        else setScreen("review");
      }}
      onNavigate={setCurrentQuestion}
      onReview={() => setScreen("review")}
      onSubmit={handleSubmit}
    />
  );
}
