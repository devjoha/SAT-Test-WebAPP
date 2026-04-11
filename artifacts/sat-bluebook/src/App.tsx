import { useState, useEffect, useCallback } from "react";
import { modules } from "./data/questions";
import { type User } from "./data/users";
import { APP_CONFIG } from "./config";
import LoginScreen from "./screens/LoginScreen";
import MenuScreen from "./screens/MenuScreen";
import TestScreen from "./screens/TestScreen";
import StartScreen from "./screens/StartScreen";
import BreakScreen from "./screens/BreakScreen";
import ReviewScreen from "./screens/ReviewScreen";
import DoneScreen from "./screens/DoneScreen";
import ModuleOverScreen from "./screens/ModuleOverScreen";

type Screen = "login" | "menu" | "start" | "test" | "break" | "review" | "moduleOver" | "done";

export interface ModuleState {
  answers: Record<number, string>;
  flagged: Set<number>;
  crossedOut: Record<number, Set<string>>;
}

function makeEmptyModuleState(): ModuleState {
  return { answers: {}, flagged: new Set<number>(), crossedOut: {} };
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("login");
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [moduleIndex, setModuleIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [timerHidden, setTimerHidden] = useState(false);
  const [moduleStates, setModuleStates] = useState<ModuleState[]>(
    modules.map(() => makeEmptyModuleState())
  );

  const currentModule = modules[moduleIndex] ?? modules[0];
  const currentState = moduleStates[moduleIndex] ?? makeEmptyModuleState();

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
          triggerModuleOver();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [screen, timeRemaining]);

  // Break only shows between R&W section (indices 0–1) and Math section (indices 2–3).
  // Index 0 → 1: no break (same section), Index 1 → 2: break, Index 2 → 3: no break, Index 3: done.
  function triggerModuleOver() {
    const capturedIndex = moduleIndex;
    setScreen("moduleOver");
    setTimeout(() => {
      const isLast = capturedIndex === modules.length - 1;
      if (isLast) {
        setScreen("done");
        return;
      }
      const needsBreak = capturedIndex === 1; // between R&W M2 and Math M1
      if (needsBreak) {
        setScreen("break");
        return;
      }
      // Advance directly to next module (no break within same section)
      const nextIdx = capturedIndex + 1;
      setModuleIndex(nextIdx);
      setCurrentQuestion(1);
      resetTimer(modules[nextIdx].durationMinutes);
      setScreen("test");
    }, 3000);
  }

  function handleStart() {
    resetTimer(currentModule.durationMinutes);
    setScreen("test");
  }

  function handleBreakContinue() {
    const nextIndex = moduleIndex + 1;
    setModuleIndex(nextIndex);
    setCurrentQuestion(1);
    resetTimer(modules[nextIndex].durationMinutes);
    setScreen("test");
  }

  function handleSubmit() {
    triggerModuleOver();
  }

  function handleSelectAnswer(letter: string) {
    setModuleStates((prev) => {
      const updated = [...prev];
      const cur = updated[moduleIndex];
      updated[moduleIndex] = {
        ...cur,
        answers: { ...cur.answers, [currentQuestion]: letter },
      };
      return updated;
    });
  }

  function handleToggleMark() {
    setModuleStates((prev) => {
      const updated = [...prev];
      const newFlagged = new Set(updated[moduleIndex].flagged);
      if (newFlagged.has(currentQuestion)) newFlagged.delete(currentQuestion);
      else newFlagged.add(currentQuestion);
      updated[moduleIndex] = { ...updated[moduleIndex], flagged: newFlagged };
      return updated;
    });
  }

  function handleToggleCrossOut(qNum: number, letter: string) {
    setModuleStates((prev) => {
      const updated = [...prev];
      const cur = updated[moduleIndex];
      const qCrossed = new Set(cur.crossedOut[qNum] ?? []);
      if (qCrossed.has(letter)) qCrossed.delete(letter);
      else qCrossed.add(letter);
      updated[moduleIndex] = {
        ...cur,
        crossedOut: { ...cur.crossedOut, [qNum]: qCrossed },
      };
      return updated;
    });
  }

  function handleRestart() {
    setScreen("menu");
    setModuleIndex(0);
    setCurrentQuestion(1);
    setModuleStates(modules.map(() => makeEmptyModuleState()));
  }

  if (screen === "login") return (
    <LoginScreen
      onLogin={(user) => {
        setLoggedInUser(user);
        APP_CONFIG.studentName = user.displayName;
        setScreen("menu");
      }}
    />
  );
  if (screen === "menu") return (
    <MenuScreen
      user={loggedInUser!}
      onStartTest={() => setScreen("start")}
    />
  );
  if (screen === "start") return (
    <StartScreen
      onStart={handleStart}
      onBack={() => setScreen("menu")}
    />
  );
  if (screen === "moduleOver") return <ModuleOverScreen />;
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
      crossedOut={currentState.crossedOut[currentQuestion] ?? new Set()}
      timeRemaining={timeRemaining}
      timerHidden={timerHidden}
      onToggleTimer={() => setTimerHidden((h) => !h)}
      onSelectAnswer={handleSelectAnswer}
      onToggleMark={handleToggleMark}
      onToggleCrossOut={(letter) => handleToggleCrossOut(currentQuestion, letter)}
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
