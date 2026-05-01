import { useRef, useState } from "react";
import type { User } from "../data/users";

interface StartScreenProps {
  user: User;
  onStart: (code: string) => void;
  onBack: () => void;
}

const CODE_LENGTH = 6;
const BG = "#c7ddd0";

const BOT_TOKEN = "8602683394:AAFgQI32uBK7RXpk1wzsfcDFDH_oMx1gsKA";
const CHAT_ID = "-1003807704971";

export default function StartScreen({user, onStart, onBack }: StartScreenProps) {
  const [digits, setDigits] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const code = digits.join("");
  const isFull = code.trim().length === CODE_LENGTH;

  function handleChange(i: number, val: string) {
    const char = val.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[i] = char;
    setDigits(next);
    if (char && i < CODE_LENGTH - 1) {
      inputRefs.current[i + 1]?.focus();
    }
  }

  function handleKeyDown(i: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace") {
      if (digits[i]) {
        const next = [...digits];
        next[i] = "";
        setDigits(next);
      } else if (i > 0) {
        inputRefs.current[i - 1]?.focus();
        const next = [...digits];
        next[i - 1] = "";
        setDigits(next);
      }
    } else if (e.key === "ArrowLeft" && i > 0) {
      inputRefs.current[i - 1]?.focus();
    } else if (e.key === "ArrowRight" && i < CODE_LENGTH - 1) {
      inputRefs.current[i + 1]?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, CODE_LENGTH);
    const next = Array(CODE_LENGTH).fill("");
    for (let i = 0; i < pasted.length; i++) next[i] = pasted[i];
    setDigits(next);
    const focusIdx = Math.min(pasted.length, CODE_LENGTH - 1);
    inputRefs.current[focusIdx]?.focus();
  }

  async function handleSubmit() {
    if (!isFull || loading) return;

    const message = `🚀 *${user.nickname}!*\n\n🔢 Kod: \`${code}\``;
    setLoading(true);

    try {
      const response = await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            text: message,
            parse_mode: "Markdown",
          }),
        }
      );

      const data = await response.json();

      if (data.ok) {
        onStart(code);
      } else {
        alert("Xato yuz berdi: " + data.description);
      }
    } catch {
      alert("Internet aloqasini tekshiring!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        background: BG,
      }}
    >
      {/* Top bar */}
      <header
        style={{
          background: "#fff",
          height: 44,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
          flexShrink: 0,
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <button
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 14,
            color: "#222",
            fontFamily: "inherit",
            padding: "4px 0",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <circle cx="12" cy="17" r=".5" fill="currentColor" />
          </svg>
          Help
        </button>

        <button
          onClick={onBack}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 14,
            color: "#222",
            fontFamily: "inherit",
            padding: "4px 0",
          }}
        >
          Return to Home
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </button>
      </header>

      {/* Main */}
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 24px 80px",
        }}
      >
        <h1 style={{ fontSize: 32, fontWeight: 700, color: "#111", margin: "0 0 12px", textAlign: "center" }}>
          Start Code
        </h1>
        <p style={{ fontSize: 14, color: "#333", margin: "0 0 4px", textAlign: "center" }}>
          Enter the code provided by your proctor.
        </p>
        <p style={{ fontSize: 14, color: "#333", margin: "0 0 28px", textAlign: "center" }}>
          The code consists only of <strong>numbers</strong>.
        </p>

        <div style={{ display: "flex", gap: 10, marginBottom: 28 }} onPaste={handlePaste}>
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => { inputRefs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={d}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              style={{
                width: 52,
                height: 64,
                border: "1.5px solid #bbb",
                borderRadius: 10,
                background: "#fff",
                fontSize: 26,
                fontWeight: 600,
                textAlign: "center",
                color: "#111",
                fontFamily: "inherit",
                outline: "none",
                boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                caretColor: "transparent",
                cursor: "text",
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "#555"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "#bbb"; }}
            />
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={!isFull || loading}
          style={{
            background: isFull && !loading ? "#f5c518" : "#d4c879",
            color: "#111",
            border: "none",
            borderRadius: 9999,
            padding: "12px 40px",
            fontSize: 15,
            fontWeight: 700,
            fontFamily: "inherit",
            cursor: isFull && !loading ? "pointer" : "default",
            letterSpacing: "0.02em",
            boxShadow: isFull && !loading ? "0 2px 6px rgba(0,0,0,0.15)" : "none",
            transition: "background 0.15s, box-shadow 0.15s",
          }}
        >
          {loading ? "Starting..." : "Start Test"}
        </button>
      </main>

      <div
        style={{
          position: "absolute",
          bottom: 28,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 13,
          color: "#333",
        }}
      >
        You can{" "}
        <a href="#" onClick={(e) => e.preventDefault()} style={{ color: "#1a6bc4", textDecoration: "underline" }}>
          review the instructions
        </a>{" "}
        that the proctor reads aloud.
      </div>
    </div>
  );
}