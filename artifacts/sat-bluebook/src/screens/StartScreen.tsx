import { useState } from "react";

interface StartScreenProps {
  onStart: (code: string) => void;
}

export default function StartScreen({ onStart }: StartScreenProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = code.trim();
    if (!trimmed) { setError("Please enter a start code."); return; }
    if (trimmed.length < 4) { setError("Start code must be at least 4 characters."); return; }
    setError("");
    onStart(trimmed);
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        background: "#fff",
      }}
    >
      {/* Header — matches TestScreen header style */}
      <header
        style={{
          background: "#E6EDF8",
          borderBottom: "1px solid #c8d5e8",
          padding: "0 28px",
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        {/* Left: CB logo + Bluebook wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* College Board "CB" shield */}
          <div
            style={{
              width: 30,
              height: 30,
              background: "#1a1f71",
              borderRadius: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                color: "#fff",
                fontSize: 13,
                fontWeight: 900,
                letterSpacing: "-0.5px",
                fontFamily: "serif",
              }}
            >
              CB
            </span>
          </div>
          <span
            style={{
              fontSize: 17,
              fontWeight: 700,
              color: "#1a1f71",
              letterSpacing: "-0.2px",
            }}
          >
            Bluebook
          </span>
        </div>

        {/* Right: College Board label */}
        <span style={{ fontSize: 12, color: "#555", letterSpacing: "0.02em" }}>
          College Board
        </span>
      </header>

      {/* Main content */}
      <main
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 24px",
          background: "#fff",
        }}
      >
        <div style={{ width: "100%", maxWidth: 440 }}>
          {/* Title */}
          <h1
            style={{
              fontSize: 26,
              fontWeight: 700,
              color: "#1a1f71",
              margin: "0 0 6px",
              textAlign: "center",
            }}
          >
            Enter Your Start Code
          </h1>
          <p
            style={{
              fontSize: 14,
              color: "#555",
              textAlign: "center",
              margin: "0 0 32px",
              lineHeight: 1.5,
            }}
          >
            Enter the start code given by your test administrator.
          </p>

          <form onSubmit={handleSubmit} noValidate>
            {/* Input box — matches Bluebook input style */}
            <div
              style={{
                border: error ? "2px solid #c0392b" : "2px solid #1a1f71",
                borderRadius: 4,
                padding: "12px 16px",
                marginBottom: error ? 6 : 20,
                background: "#fff",
                display: "flex",
                alignItems: "center",
              }}
            >
              <input
                type="text"
                value={code}
                onChange={(e) => { setCode(e.target.value.toUpperCase()); setError(""); }}
                placeholder="e.g. ABCD1234"
                autoFocus
                maxLength={20}
                style={{
                  width: "100%",
                  border: "none",
                  outline: "none",
                  fontSize: 18,
                  fontWeight: 600,
                  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                  color: "#1a1f71",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  background: "transparent",
                  textAlign: "center",
                }}
              />
            </div>

            {error && (
              <p
                style={{
                  fontSize: 13,
                  color: "#c0392b",
                  margin: "0 0 16px",
                  paddingLeft: 2,
                }}
              >
                {error}
              </p>
            )}

            {/* Submit button */}
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "13px 0",
                background: code.trim().length >= 4 ? "#1a1f71" : "#8d92b5",
                color: "#fff",
                border: "none",
                borderRadius: 4,
                fontSize: 15,
                fontWeight: 700,
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                cursor: code.trim().length >= 4 ? "pointer" : "default",
                letterSpacing: "0.03em",
                transition: "background 0.15s",
              }}
            >
              Continue
            </button>
          </form>

          {/* Disclaimer */}
          <p
            style={{
              fontSize: 12,
              color: "#888",
              textAlign: "center",
              margin: "24px 0 0",
              lineHeight: 1.5,
            }}
          >
            By continuing, you agree to the College Board's testing terms and conditions.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          background: "#E6EDF8",
          borderTop: "1px solid #c8d5e8",
          height: 44,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: 12, color: "#666" }}>
          © 2025 College Board · Privacy Center · bluebook.collegeboard.org
        </span>
      </footer>
    </div>
  );
}
