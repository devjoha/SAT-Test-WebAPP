import { useState, useEffect, useRef } from "react";
import { type User } from "../data/users";

const BLUE = "#3150b7";

const BluebookLogoSmall = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
    <svg width="25" height="25" viewBox="0 0 64 64" fill="none">
      <path d="M30 4 L38 27 L60 15 L43 34 L58 54 L36 42 L28 62 L27 39 L4 48 L23 31 L9 9 L30 22 Z" fill={BLUE} />
    </svg>
    <span style={{ fontSize: 22, fontWeight: 800, color: BLUE, letterSpacing: "-0.7px" }}>Bluebook</span>
    <span style={{ fontSize: 10, color: BLUE, marginLeft: -2, alignSelf: "flex-start", marginTop: 4 }}>™</span>
  </div>
);

const AvatarIcon = () => (
  <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#151515", display: "flex", alignItems: "center", justifyContent: "center" }}>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4.8 21a7.2 7.2 0 0 1 14.4 0" />
    </svg>
  </div>
);

const TestPreviewIcon = () => (
  <svg width="72" height="72" viewBox="0 0 80 80" fill="none">
    <rect x="13" y="31" width="35" height="31" rx="2" fill="#dff5fa" stroke="#65717d" strokeWidth="1.6" />
    <rect x="19" y="38" width="23" height="18" rx="1" fill="#fff" stroke="#27a7c8" strokeWidth="2" />
    <line x1="23" y1="43" x2="38" y2="43" stroke="#65717d" strokeWidth="1.5" />
    <line x1="23" y1="48" x2="38" y2="48" stroke="#65717d" strokeWidth="1.5" />
    <line x1="23" y1="53" x2="34" y2="53" stroke="#65717d" strokeWidth="1.5" />
    <rect x="15" y="13" width="30" height="18" rx="3" fill="#fff" stroke="#65717d" strokeWidth="1.5" />
    <text x="20" y="25" fill="#65717d" fontSize="10" fontWeight="700" fontFamily="Arial">00:00</text>
    <rect x="53" y="22" width="21" height="30" rx="2" fill="#b9dce7" stroke="#65717d" strokeWidth="1.5" />
    <rect x="57" y="26" width="13" height="5" rx="1" fill="#263d88" />
    <circle cx="58" cy="36" r="1.7" fill="#65717d" /><circle cx="64" cy="36" r="1.7" fill="#65717d" /><circle cx="70" cy="36" r="1.7" fill="#65717d" />
    <circle cx="58" cy="43" r="1.7" fill="#65717d" /><circle cx="64" cy="43" r="1.7" fill="#65717d" /><circle cx="70" cy="43" r="1.7" fill="#65717d" />
    <circle cx="58" cy="50" r="1.7" fill="#65717d" /><circle cx="64" cy="50" r="1.7" fill="#65717d" /><circle cx="70" cy="50" r="1.7" fill="#65717d" />
    <path d="M48 10c3 1 5 3 5 7" stroke="#d7d7d7" strokeWidth="2" strokeLinecap="round" />
    <path d="M51 7c6 3 9 7 9 13" stroke="#d7d7d7" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const FullLengthIcon = () => (
  <svg width="72" height="72" viewBox="0 0 80 80" fill="none">
    <rect x="19" y="18" width="42" height="45" rx="3" fill="#e8f4f7" stroke="#5f6871" strokeWidth="1.7" />
    <rect x="19" y="18" width="42" height="8" rx="3" fill="#e9f0f3" stroke="#5f6871" strokeWidth="1.7" />
    <circle cx="25" cy="22" r="1.5" fill="#f15a43" /><circle cx="31" cy="22" r="1.5" fill="#f4c33b" /><circle cx="37" cy="22" r="1.5" fill="#36b67d" />
    <rect x="27" y="33" width="26" height="4" fill="#7cc5d9" />
    <rect x="27" y="41" width="26" height="3" fill="#9ba5ad" />
    <rect x="27" y="48" width="26" height="3" fill="#9ba5ad" />
    <rect x="27" y="55" width="19" height="3" fill="#9ba5ad" />
  </svg>
);

const CheckIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
);

const BigFuturePhoto = () => (
  <div style={{ width: 276, minHeight: 220, position: "relative", overflow: "hidden", borderRadius: "12px 0 0 12px", background: "linear-gradient(135deg,#dff4ff 0%,#d4ecf7 42%,#fff 43%,#fff 100%)" }}>
    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 70px 70px, #ff2d7a 0 44px, transparent 45px), radial-gradient(circle at 210px 10px, #ff2d7a 0 86px, transparent 87px)", opacity: .95 }} />
    <div style={{ position: "absolute", left: 48, bottom: 0, width: 86, height: 150, background: "#1d2732", borderRadius: "34px 34px 0 0" }} />
    <div style={{ position: "absolute", left: 66, bottom: 117, width: 52, height: 52, borderRadius: "50%", background: "#8a593f" }} />
    <div style={{ position: "absolute", left: 43, bottom: 162, width: 91, height: 15, background: "#111827", transform: "skew(-12deg)" }} />
    <div style={{ position: "absolute", left: 85, bottom: 174, width: 8, height: 58, background: "#111827" }} />
    <div style={{ position: "absolute", left: 142, bottom: 0, width: 92, height: 142, background: "#202a35", borderRadius: "38px 38px 0 0" }} />
    <div style={{ position: "absolute", left: 163, bottom: 111, width: 52, height: 55, borderRadius: "50%", background: "#6e4d3e" }} />
    <div style={{ position: "absolute", left: 139, bottom: 158, width: 98, height: 16, background: "#111827", transform: "skew(-12deg)" }} />
    <div style={{ position: "absolute", left: 181, bottom: 170, width: 8, height: 54, background: "#111827" }} />
    <div style={{ position: "absolute", left: 62, bottom: 16, width: 32, height: 80, background: "#f6f6f6", transform: "skew(8deg)" }} />
    <div style={{ position: "absolute", left: 172, bottom: 18, width: 36, height: 82, background: "#f6f6f6", transform: "skew(-8deg)" }} />
  </div>
);

interface MenuScreenProps {
  user: User;
  onStartTest: () => void;
  onLogout: () => void;
}

export default function MenuScreen({ user, onStartTest, onLogout }: MenuScreenProps) {
  const [yourTestsTab, setYourTestsTab] = useState<"active" | "past">("active");
  const [practiceTab, setPracticeTab] = useState<"active" | "past">("active");
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const accountMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showAccountMenu) return;
    function handleDocClick(e: MouseEvent) {
      if (accountMenuRef.current && !accountMenuRef.current.contains(e.target as Node)) {
        setShowAccountMenu(false);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setShowAccountMenu(false);
    }
    document.addEventListener("mousedown", handleDocClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleDocClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [showAccountMenu]);

  const TabButton = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
    <button onClick={onClick} style={{ minWidth: 80, height: 33, padding: "0 17px", fontSize: 15, fontWeight: 500, color: active ? "#fff" : "#111", background: active ? "#4c4c4c" : "#fff", border: "1px solid #9b9b9b", borderLeftWidth: label === "Past" ? 0 : 1, borderRadius: label === "Active" ? "8px 0 0 8px" : "0 8px 8px 0", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
      {active && <CheckIcon />}{label}
    </button>
  );

  const PracticeCard = ({ type, onClick }: { type: "preview" | "full"; onClick?: () => void }) => (
    <button onClick={onClick} style={{ width: 210, height: 190, border: "none", background: "#fff", borderRadius: 12, boxShadow: "0 3px 18px rgba(0,0,0,.12)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 11, cursor: "pointer", fontFamily: "inherit" }}>
      {type === "preview" ? <TestPreviewIcon /> : <FullLengthIcon />}
      <span style={{ fontSize: 20, lineHeight: 1.15, fontWeight: 800, color: "#111" }}>{type === "preview" ? <>Test<br />Preview</> : <>Full-Length<br />Practice</>}</span>
    </button>
  );

  return (
    <div style={{ position: "fixed", inset: 0, fontFamily: "Arial, Helvetica, sans-serif", background: "#f7f7f7", overflowY: "auto", color: "#111" }}>
      <header style={{ height: 82, background: "#e6ecf7", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 48px", position: "sticky", top: 0, zIndex: 4 }}>
        <BluebookLogoSmall />
        <div ref={accountMenuRef} style={{ position: "relative" }}>
          <button
            type="button"
            onClick={() => setShowAccountMenu(v => !v)}
            aria-haspopup="menu"
            aria-expanded={showAccountMenu}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 17,
              fontWeight: 800,
              background: "none",
              border: "none",
              padding: "4px 6px",
              borderRadius: 8,
              cursor: "pointer",
              fontFamily: "inherit",
              color: "#111",
            }}
          >
            <span>{user.displayName}</span>
            <AvatarIcon />
          </button>
          {showAccountMenu && (
            <div
              role="menu"
              style={{
                position: "absolute",
                top: "calc(100% + 8px)",
                right: 0,
                background: "#fff",
                border: "1px solid #d1d5db",
                borderRadius: 8,
                boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
                minWidth: 200,
                padding: "6px 0",
                zIndex: 20,
              }}
            >
              <div style={{ padding: "10px 14px 8px", borderBottom: "1px solid #eee" }}>
                <div style={{ fontSize: 13, color: "#666", fontWeight: 500 }}>Signed in as</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#111", marginTop: 2 }}>{user.displayName}</div>
              </div>
              <button
                type="button"
                role="menuitem"
                onClick={() => { setShowAccountMenu(false); onLogout(); }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  width: "100%",
                  background: "none",
                  border: "none",
                  textAlign: "left",
                  padding: "10px 14px",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#b91c1c",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Sign Out
              </button>
            </div>
          )}
        </div>
      </header>

      <main style={{ padding: "42px 48px 40px", maxWidth: 1040, margin: "0 auto" }}>
        <section style={{ marginBottom: 50 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <h1 style={{ fontSize: 33, lineHeight: 1, fontWeight: 800, margin: 0 }}>Your Tests</h1>
              <div style={{ display: "flex" }}><TabButton label="Active" active={yourTestsTab === "active"} onClick={() => setYourTestsTab("active")} /><TabButton label="Past" active={yourTestsTab === "past"} onClick={() => setYourTestsTab("past")} /></div>
            </div>
            <a href="#" onClick={(e) => e.preventDefault()} style={{ color: "#27346d", fontSize: 16, fontWeight: 800, textDecoration: "underline" }}>Don't see your test here?</a>
          </div>
          <div style={{ width: 362, background: "#fff", borderRadius: 12, boxShadow: "0 3px 18px rgba(0,0,0,.12)", padding: "32px 30px 34px", textAlign: "center" }}>
            <h2 style={{ fontSize: 17, margin: "0 0 12px", fontWeight: 800 }}>You Have No Upcoming Tests</h2>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.5 }}>Tests appear here a few weeks before test day. <strong>If you got a paper ticket from your school, <a href="#" onClick={(e) => e.preventDefault()} style={{ color: "#27346d" }}>sign out</a> and sign in with it.</strong></p>
          </div>
        </section>

        <section style={{ marginBottom: 50 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <h1 style={{ fontSize: 33, lineHeight: 1, fontWeight: 800, margin: 0 }}>Practice and Prepare</h1>
              <div style={{ display: "flex" }}><TabButton label="Active" active={practiceTab === "active"} onClick={() => setPracticeTab("active")} /><TabButton label="Past" active={practiceTab === "past"} onClick={() => setPracticeTab("past")} /></div>
            </div>
            <a href="#" onClick={(e) => e.preventDefault()} style={{ color: "#27346d", fontSize: 16, fontWeight: 800, textDecoration: "underline" }}>Learn more about practice</a>
          </div>
          <div style={{ display: "flex", gap: 24 }}><PracticeCard type="preview" /><PracticeCard type="full" onClick={onStartTest} /></div>
        </section>

        <section>
          <h1 style={{ fontSize: 33, lineHeight: 1, fontWeight: 800, margin: "0 0 20px" }}>Explore BigFuture</h1>
          <div style={{ display: "flex", background: "#fff", borderRadius: 12, boxShadow: "0 3px 18px rgba(0,0,0,.12)", overflow: "hidden", minHeight: 220 }}>
            <BigFuturePhoto />
            <div style={{ flex: 1, padding: "28px 26px" }}>
              <h2 style={{ fontSize: 20, fontWeight: 800, margin: "0 0 29px" }}>Plan for Life After High School</h2>
              <p style={{ fontSize: 16, lineHeight: 1.5, margin: "0 0 25px", maxWidth: 600 }}>Whether you’re interested in a four-year university, community college, or career training, BigFuture has what you need to start planning your future, your way.</p>
              <button style={{ height: 48, padding: "0 26px", borderRadius: 999, border: "1.5px solid #555", background: "#fff", fontWeight: 800, fontSize: 15, cursor: "pointer" }}>Go to BigFuture</button>
            </div>
          </div>
        </section>
      </main>
      <div style={{ position: "fixed", bottom: 8, right: 14, fontSize: 12, color: "#555", fontFamily: "monospace", pointerEvents: "none" }}>VSN-0.9.605 BT:2026-03-12 20:36</div>
    </div>
  );
}
