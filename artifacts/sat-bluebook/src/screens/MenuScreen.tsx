import { useState } from "react";
import { APP_CONFIG } from "../config";

const BLUE = "#3b3ff2";

const BluebookLogoSmall = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
    <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
      <path d="M16 2 L18.5 10 L27 10 L20.5 15.5 L23 24 L16 19 L9 24 L11.5 15.5 L5 10 L13.5 10 Z" fill={BLUE}/>
    </svg>
    <span style={{ fontSize: 17, fontWeight: 700, color: "#111", letterSpacing: "-0.3px", fontFamily: "'Georgia', serif" }}>
      Bluebook™
    </span>
  </div>
);

const AvatarIcon = () => (
  <div
    style={{
      width: 34,
      height: 34,
      borderRadius: "50%",
      border: "2px solid #ccc",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#f0f0f0",
    }}
  >
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  </div>
);

const TestPreviewIcon = () => (
  <svg width="52" height="52" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Timer */}
    <rect x="2" y="8" width="28" height="20" rx="2" fill="#e8edf5" stroke="#b0bbd0" strokeWidth="1.5"/>
    <rect x="4" y="10" width="24" height="9" rx="1" fill="#fff" stroke="#b0bbd0" strokeWidth="1"/>
    <rect x="4" y="21" width="10" height="4" rx="1" fill="#4a90e2"/>
    <rect x="16" y="21" width="12" height="4" rx="1" fill="#ccd5e0"/>
    {/* Calculator */}
    <rect x="34" y="4" width="26" height="36" rx="3" fill="#e8edf5" stroke="#b0bbd0" strokeWidth="1.5"/>
    <rect x="37" y="7" width="20" height="10" rx="1" fill="#fff" stroke="#b0bbd0" strokeWidth="1"/>
    <circle cx="41" cy="22" r="2.5" fill="#4a90e2"/>
    <circle cx="50" cy="22" r="2.5" fill="#4a90e2"/>
    <circle cx="59" cy="22" r="2.5" fill="#4a90e2"/>
    <circle cx="41" cy="31" r="2.5" fill="#b0bbd0"/>
    <circle cx="50" cy="31" r="2.5" fill="#b0bbd0"/>
    <circle cx="59" cy="31" r="2.5" fill="#e07c4a"/>
    {/* Digital clock display */}
    <text x="6" y="18" fontSize="6" fill="#4a90e2" fontFamily="monospace" fontWeight="700">00:00</text>
  </svg>
);

const FullLengthIcon = () => (
  <svg width="52" height="52" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Document / test form */}
    <rect x="8" y="2" width="48" height="58" rx="3" fill="#e8edf5" stroke="#b0bbd0" strokeWidth="1.5"/>
    <rect x="14" y="10" width="36" height="5" rx="1" fill="#4a90e2"/>
    <rect x="14" y="20" width="28" height="3" rx="1" fill="#b0bbd0"/>
    <rect x="14" y="27" width="32" height="3" rx="1" fill="#b0bbd0"/>
    <rect x="14" y="34" width="24" height="3" rx="1" fill="#b0bbd0"/>
    <rect x="14" y="41" width="28" height="3" rx="1" fill="#b0bbd0"/>
    <circle cx="14" cy="21.5" r="0" fill="none"/>
    {/* Checkmark top right on the document */}
    <circle cx="46" cy="46" r="10" fill="#4a90e2"/>
    <path d="M40 46 L44 50 L52 42" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

interface MenuScreenProps {
  onStartTest: () => void;
}

export default function MenuScreen({ onStartTest }: MenuScreenProps) {
  const [yourTestsTab, setYourTestsTab] = useState<"active" | "past">("active");
  const [practiceTab, setPracticeTab] = useState<"active" | "past">("active");

  const firstName = APP_CONFIG.studentName.split(" ")[0];

  const TabButton = ({
    label,
    active,
    onClick,
  }: {
    label: string;
    active: boolean;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      style={{
        padding: "5px 14px",
        fontSize: 13,
        fontWeight: active ? 600 : 400,
        color: active ? "#fff" : "#555",
        background: active ? "#333" : "transparent",
        border: active ? "none" : "1px solid #ccc",
        borderRadius: active ? 6 : 6,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 5,
        fontFamily: "inherit",
        transition: "background 0.1s",
      }}
    >
      {active && <CheckIcon />}
      {label}
    </button>
  );

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
        display: "flex",
        flexDirection: "column",
        background: "#f5f5f5",
        overflowY: "auto",
      }}
    >
      {/* Top header — light blue */}
      <div style={{ background: "#dde5f4", flexShrink: 0 }}>
        {/* Nav bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 28px",
            borderBottom: "1px solid #c8d4ea",
          }}
        >
          <BluebookLogoSmall />
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 14, fontWeight: 500, color: "#333" }}>
              {APP_CONFIG.studentName}
            </span>
            <AvatarIcon />
          </div>
        </div>

        {/* Welcome bar */}
        <div style={{ padding: "22px 28px 24px" }}>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 400,
              color: BLUE,
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            Welcome, {firstName}. Good luck on test day!
          </h1>
        </div>
      </div>

      {/* Body */}
      <div
        style={{
          flex: 1,
          padding: "28px 28px 48px",
          maxWidth: 900,
          width: "100%",
          margin: "0 auto",
          boxSizing: "border-box",
        }}
      >

        {/* ── Your Tests ── */}
        <section style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: "#111", margin: 0 }}>Your Tests</h2>
              <div style={{ display: "flex", gap: 4 }}>
                <TabButton label="Active" active={yourTestsTab === "active"} onClick={() => setYourTestsTab("active")} />
                <TabButton label="Past" active={yourTestsTab === "past"} onClick={() => setYourTestsTab("past")} />
              </div>
            </div>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              style={{ fontSize: 14, color: BLUE, textDecoration: "underline", fontFamily: "inherit" }}
            >
              Don&apos;t see your test here?
            </a>
          </div>

          {/* Empty state card */}
          <div
            style={{
              background: "#fff",
              border: "1px solid #e0e0e0",
              borderRadius: 10,
              padding: "28px 32px",
              maxWidth: 340,
            }}
          >
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#111", margin: "0 0 10px", textAlign: "center" }}>
              You Have No Upcoming Tests
            </h3>
            <p style={{ fontSize: 13.5, color: "#444", margin: 0, textAlign: "center", lineHeight: 1.6 }}>
              Tests appear here a few weeks before test day.{" "}
              <strong>
                If you got a paper ticket from your school,{" "}
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  style={{ color: BLUE }}
                >
                  sign out
                </a>
                {" "}and sign in with it.
              </strong>
            </p>
          </div>
        </section>

        {/* ── Practice and Prepare ── */}
        <section>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: "#111", margin: 0 }}>Practice and Prepare</h2>
              <div style={{ display: "flex", gap: 4 }}>
                <TabButton label="Active" active={practiceTab === "active"} onClick={() => setPracticeTab("active")} />
                <TabButton label="Past" active={practiceTab === "past"} onClick={() => setPracticeTab("past")} />
              </div>
            </div>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              style={{ fontSize: 14, color: BLUE, textDecoration: "underline", fontFamily: "inherit" }}
            >
              Learn more about practice
            </a>
          </div>

          <div style={{ display: "flex", gap: 16 }}>
            {/* Test Preview card */}
            <button
              style={{
                background: "#fff",
                border: "1px solid #e0e0e0",
                borderRadius: 10,
                padding: "24px 20px",
                width: 160,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 14,
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "box-shadow 0.15s, border-color 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(59,63,242,0.12)";
                e.currentTarget.style.borderColor = "#9fa3f5";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = "#e0e0e0";
              }}
            >
              <TestPreviewIcon />
              <span style={{ fontSize: 14, fontWeight: 700, color: "#111", textAlign: "center", lineHeight: 1.3 }}>
                Test<br/>Preview
              </span>
            </button>

            {/* Full-Length Practice card */}
            <button
              onClick={onStartTest}
              style={{
                background: "#fff",
                border: "1px solid #e0e0e0",
                borderRadius: 10,
                padding: "24px 20px",
                width: 160,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 14,
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "box-shadow 0.15s, border-color 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(59,63,242,0.12)";
                e.currentTarget.style.borderColor = "#9fa3f5";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = "#e0e0e0";
              }}
            >
              <FullLengthIcon />
              <span style={{ fontSize: 14, fontWeight: 700, color: "#111", textAlign: "center", lineHeight: 1.3 }}>
                Full-Length<br/>Practice
              </span>
            </button>
          </div>
        </section>
      </div>

      {/* Version label */}
      <div
        style={{
          position: "fixed",
          bottom: 8,
          right: 14,
          fontSize: 11,
          color: "#aaa",
          fontFamily: "monospace",
          pointerEvents: "none",
        }}
      >
        VSN-0.9.605 BT:2026-03-12 20:36
      </div>
    </div>
  );
}
