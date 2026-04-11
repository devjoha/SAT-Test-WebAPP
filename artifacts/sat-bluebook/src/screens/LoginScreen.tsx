import { useState } from "react";
import { authenticate, type User } from "../data/users";

const BG = "#3b3ff2";

// ── Bluebook 4-pointed star logo (matches real Bluebook spark shape) ──
const BluebookStar = ({ size = 28, color = "white" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <path
      d="M16 1 C15.2 8.5 8.5 15.2 1 16 C8.5 16.8 15.2 23.5 16 31 C16.8 23.5 23.5 16.8 31 16 C23.5 15.2 16.8 8.5 16 1 Z"
      fill={color}
    />
  </svg>
);

const BluebookLogo = ({ large = true }: { large?: boolean }) => (
  <div style={{ display: "flex", alignItems: "center", gap: large ? 10 : 6, userSelect: "none" }}>
    <BluebookStar size={large ? 30 : 18} color="white" />
    <span
      style={{
        fontSize: large ? 27 : 17,
        fontWeight: 700,
        color: "#fff",
        letterSpacing: "-0.5px",
        fontFamily: "'Georgia', 'Times New Roman', serif",
      }}
    >
      Bluebook
      <sup style={{ fontSize: large ? 12 : 8, fontWeight: 400, letterSpacing: 0 }}>™</sup>
    </span>
  </div>
);

const TicketIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/>
    <path d="m9 12 2 2 4-4"/>
  </svg>
);

const EyeIcon = ({ open }: { open: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round">
    {open ? (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </>
    ) : (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
        <line x1="1" y1="1" x2="23" y2="23"/>
      </>
    )}
  </svg>
);

const BackArrow = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
    strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
);

const Spinner = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
    strokeLinecap="round" style={{ animation: "spin 0.8s linear infinite" }}>
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
  </svg>
);

const BottomIllustration = () => (
  <svg
    viewBox="0 0 1024 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: 180, pointerEvents: "none" }}
    preserveAspectRatio="xMidYMax meet"
  >
    <line x1="0" y1="155" x2="1024" y2="155" stroke="white" strokeOpacity="0.18" strokeWidth="1.5"/>
    {/* Laptop */}
    <rect x="40" y="80" width="110" height="72" rx="4" stroke="white" strokeOpacity="0.32" strokeWidth="2"/>
    <rect x="44" y="84" width="102" height="58" rx="2" stroke="white" strokeOpacity="0.18" strokeWidth="1.5"/>
    <rect x="50" y="90" width="48" height="36" rx="2" stroke="white" strokeOpacity="0.22" strokeWidth="1.5"/>
    <rect x="104" y="94" width="36" height="6" rx="1" stroke="white" strokeOpacity="0.22" strokeWidth="1.5"/>
    <rect x="104" y="104" width="36" height="6" rx="1" stroke="white" strokeOpacity="0.22" strokeWidth="1.5"/>
    <rect x="104" y="114" width="28" height="6" rx="1" stroke="white" strokeOpacity="0.22" strokeWidth="1.5"/>
    <rect x="20" y="152" width="150" height="5" rx="2.5" stroke="white" strokeOpacity="0.18" strokeWidth="1.5"/>
    <text x="28" y="150" fill="white" fillOpacity="0.28" fontSize="26" fontFamily="Georgia, serif" fontWeight="700">X²</text>
    {/* Star */}
    <path d="M232 105 C231 113 224 120 216 121 C224 122 231 129 232 137 C233 129 240 122 248 121 C240 120 233 113 232 105 Z"
      stroke="white" strokeOpacity="0.28" strokeWidth="1.5" fill="none"/>
    {/* Calculator */}
    <rect x="320" y="88" width="60" height="68" rx="4" stroke="white" strokeOpacity="0.32" strokeWidth="2"/>
    <rect x="328" y="96" width="44" height="18" rx="2" stroke="white" strokeOpacity="0.22" strokeWidth="1.5"/>
    <circle cx="333" cy="124" r="4" stroke="white" strokeOpacity="0.22" strokeWidth="1.5"/>
    <circle cx="350" cy="124" r="4" stroke="white" strokeOpacity="0.22" strokeWidth="1.5"/>
    <circle cx="367" cy="124" r="4" stroke="white" strokeOpacity="0.22" strokeWidth="1.5"/>
    <circle cx="333" cy="140" r="4" stroke="white" strokeOpacity="0.22" strokeWidth="1.5"/>
    <circle cx="350" cy="140" r="4" stroke="white" strokeOpacity="0.22" strokeWidth="1.5"/>
    <circle cx="367" cy="140" r="4" stroke="white" strokeOpacity="0.22" strokeWidth="1.5"/>
    {/* Stopwatch */}
    <circle cx="450" cy="118" r="37" stroke="white" strokeOpacity="0.28" strokeWidth="2"/>
    <circle cx="450" cy="118" r="27" stroke="white" strokeOpacity="0.22" strokeWidth="1.5"/>
    <line x1="450" y1="91" x2="450" y2="118" stroke="white" strokeOpacity="0.32" strokeWidth="2" strokeLinecap="round"/>
    <line x1="450" y1="118" x2="466" y2="106" stroke="white" strokeOpacity="0.32" strokeWidth="2" strokeLinecap="round"/>
    <rect x="443" y="75" width="14" height="6" rx="3" stroke="white" strokeOpacity="0.28" strokeWidth="1.5"/>
    <line x1="436" y1="71" x2="430" y2="64" stroke="white" strokeOpacity="0.25" strokeWidth="2" strokeLinecap="round"/>
    <line x1="464" y1="71" x2="470" y2="64" stroke="white" strokeOpacity="0.25" strokeWidth="2" strokeLinecap="round"/>
    {/* Books stack */}
    <rect x="545" y="108" width="80" height="12" rx="2" stroke="white" strokeOpacity="0.32" strokeWidth="2"/>
    <rect x="550" y="97" width="72" height="12" rx="2" stroke="white" strokeOpacity="0.26" strokeWidth="1.5"/>
    <rect x="555" y="86" width="66" height="12" rx="2" stroke="white" strokeOpacity="0.2" strokeWidth="1.5"/>
    {/* Open book */}
    <path d="M660 155 L660 93 Q680 83 700 93 L700 155" stroke="white" strokeOpacity="0.28" strokeWidth="2"/>
    <path d="M700 93 Q720 83 740 93 L740 155" stroke="white" strokeOpacity="0.28" strokeWidth="2"/>
    <line x1="660" y1="155" x2="740" y2="155" stroke="white" strokeOpacity="0.28" strokeWidth="2"/>
    <line x1="700" y1="93" x2="700" y2="155" stroke="white" strokeOpacity="0.28" strokeWidth="2"/>
    {/* Signal waves */}
    <path d="M790 130 Q800 110 810 130" stroke="white" strokeOpacity="0.28" strokeWidth="2" strokeLinecap="round"/>
    <path d="M782 140 Q800 104 818 140" stroke="white" strokeOpacity="0.22" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="800" cy="143" r="3" fill="white" fillOpacity="0.28"/>
    {/* Buildings */}
    <rect x="840" y="95" width="30" height="60" rx="2" stroke="white" strokeOpacity="0.32" strokeWidth="2"/>
    <rect x="875" y="75" width="40" height="80" rx="2" stroke="white" strokeOpacity="0.32" strokeWidth="2"/>
    <rect x="920" y="100" width="28" height="55" rx="2" stroke="white" strokeOpacity="0.28" strokeWidth="2"/>
    <rect x="952" y="110" width="52" height="45" rx="2" stroke="white" strokeOpacity="0.28" strokeWidth="2"/>
    <rect x="847" y="105" width="8" height="8" rx="1" stroke="white" strokeOpacity="0.22" strokeWidth="1.5"/>
    <rect x="847" y="120" width="8" height="8" rx="1" stroke="white" strokeOpacity="0.22" strokeWidth="1.5"/>
    <rect x="883" y="83" width="8" height="8" rx="1" stroke="white" strokeOpacity="0.22" strokeWidth="1.5"/>
    <rect x="897" y="83" width="8" height="8" rx="1" stroke="white" strokeOpacity="0.22" strokeWidth="1.5"/>
    <rect x="883" y="100" width="8" height="8" rx="1" stroke="white" strokeOpacity="0.22" strokeWidth="1.5"/>
    <rect x="897" y="100" width="8" height="8" rx="1" stroke="white" strokeOpacity="0.22" strokeWidth="1.5"/>
    <path d="M883 75 Q895 56 907 75" stroke="white" strokeOpacity="0.28" strokeWidth="2"/>
    <line x1="895" y1="56" x2="895" y2="75" stroke="white" strokeOpacity="0.28" strokeWidth="1.5"/>
    {/* Clouds */}
    <path d="M930 42 Q935 32 945 34 Q948 25 958 27 Q968 22 972 32 Q982 30 984 40 Q986 48 978 48 L933 48 Q926 48 930 42 Z"
      stroke="white" strokeOpacity="0.18" strokeWidth="1.5" fill="none"/>
  </svg>
);

interface LoginScreenProps {
  onLogin: (user: User) => void;
}

type LoginView = "buttons" | "ticket" | "account";

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [view, setView] = useState<LoginView>("buttons");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function resetForm() {
    setUsername("");
    setPassword("");
    setShowPassword(false);
    setError(null);
    setLoading(false);
  }

  function goBack() {
    resetForm();
    setView("buttons");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!username.trim() || !password) return;
    setError(null);
    setLoading(true);
    // Small delay to simulate a network call
    setTimeout(() => {
      const user = authenticate(username.trim(), password);
      if (user) {
        onLogin(user);
      } else {
        setError("The username or password you entered is incorrect.");
        setLoading(false);
      }
    }, 500);
  }

  const canSubmit = username.trim().length > 0 && password.length > 0 && !loading;

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "11px 14px",
    fontSize: 15,
    fontFamily: "inherit",
    border: "1.5px solid #d0d0d0",
    borderRadius: 8,
    outline: "none",
    background: "#fff",
    color: "#111",
    boxSizing: "border-box",
    transition: "border-color 0.15s",
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: BG,
        fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Spinner keyframe */}
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>

      {/* Top bar */}
      <div style={{ display: "flex", justifyContent: "flex-end", padding: "16px 24px", flexShrink: 0 }}>
        <button
          style={{
            background: "transparent",
            border: "1.5px solid rgba(255,255,255,0.65)",
            color: "#fff",
            borderRadius: 9999,
            padding: "8px 20px",
            fontSize: 14,
            fontWeight: 500,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontFamily: "inherit",
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2"/>
            <path d="m8 21 4-4 4 4"/><path d="M12 17v4"/>
          </svg>
          Test Your Device
        </button>
      </div>

      {/* Center content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 24px 160px",
          gap: 28,
        }}
      >
        {/* Logo */}
        <BluebookLogo large />

        {/* Card */}
        <div
          style={{
            background: "#fff",
            borderRadius: 12,
            padding: view === "buttons" ? "36px 48px 32px" : "28px 48px 32px",
            width: "100%",
            maxWidth: 460,
            boxShadow: "0 8px 40px rgba(0,0,0,0.2)",
            transition: "padding 0.2s",
          }}
        >
          {view === "buttons" ? (
            <>
              <h1 style={{ fontSize: 26, fontWeight: 700, color: "#111", textAlign: "center", margin: "0 0 28px", fontFamily: "inherit" }}>
                Sign In
              </h1>

              {/* Yellow primary button */}
              <button
                onClick={() => setView("ticket")}
                style={{
                  width: "100%",
                  background: "#f5c518",
                  border: "none",
                  borderRadius: 9999,
                  padding: "14px 24px",
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#111",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  fontFamily: "inherit",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  transition: "filter 0.15s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.filter = "brightness(0.94)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.filter = "brightness(1)"; }}
              >
                <TicketIcon />
                Use a sign-in ticket from your school
              </button>

              {/* OR divider */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0" }}>
                <div style={{ flex: 1, height: 1, background: "#e0e0e0" }} />
                <span style={{ fontSize: 13, color: "#999", fontWeight: 500 }}>OR</span>
                <div style={{ flex: 1, height: 1, background: "#e0e0e0" }} />
              </div>

              {/* Outlined secondary button */}
              <button
                onClick={() => setView("account")}
                style={{
                  width: "100%",
                  background: "#fff",
                  border: "1.5px solid #bbb",
                  borderRadius: 9999,
                  padding: "13px 24px",
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#111",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "inherit",
                  transition: "border-color 0.15s, background 0.15s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#555"; e.currentTarget.style.background = "#f7f7f7"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#bbb"; e.currentTarget.style.background = "#fff"; }}
              >
                Sign in with a College Board student account
              </button>

              {/* Footer links */}
              <div style={{ marginTop: 24, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                <a href="#" onClick={(e) => e.preventDefault()} style={{ fontSize: 14, color: BG, textDecoration: "underline" }}>
                  I&apos;m an educator
                </a>
                <a href="#" onClick={(e) => e.preventDefault()} style={{ fontSize: 14, color: BG, textDecoration: "underline" }}>
                  Need help signing in?
                </a>
              </div>
            </>
          ) : (
            /* ── Login Form ── */
            <form onSubmit={handleSubmit} noValidate>
              {/* Back button */}
              <button
                type="button"
                onClick={goBack}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  fontSize: 13,
                  color: "#555",
                  fontFamily: "inherit",
                  padding: "0 0 16px",
                  fontWeight: 500,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#111"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "#555"; }}
              >
                <BackArrow />
                Sign in options
              </button>

              <h1 style={{ fontSize: 24, fontWeight: 700, color: "#111", margin: "0 0 24px", fontFamily: "inherit" }}>
                {view === "ticket" ? "Sign In with School Ticket" : "Sign In"}
              </h1>

              {/* Username */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#333", marginBottom: 6 }}>
                  Username
                </label>
                <input
                  type="text"
                  autoComplete="username"
                  autoFocus
                  value={username}
                  onChange={(e) => { setUsername(e.target.value); setError(null); }}
                  style={inputStyle}
                  placeholder="Enter your username"
                  onFocus={(e) => { e.currentTarget.style.borderColor = BG; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "#d0d0d0"; }}
                />
              </div>

              {/* Password */}
              <div style={{ marginBottom: 8 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#333", marginBottom: 6 }}>
                  Password
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(null); }}
                    style={{ ...inputStyle, paddingRight: 44 }}
                    placeholder="Enter your password"
                    onFocus={(e) => { e.currentTarget.style.borderColor = BG; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "#d0d0d0"; }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    style={{
                      position: "absolute",
                      right: 12,
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#888",
                      padding: 2,
                      display: "flex",
                      alignItems: "center",
                    }}
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    <EyeIcon open={showPassword} />
                  </button>
                </div>
              </div>

              {/* Error message */}
              {error && (
                <div
                  style={{
                    background: "#fef2f2",
                    border: "1px solid #fca5a5",
                    borderRadius: 8,
                    padding: "10px 14px",
                    fontSize: 13,
                    color: "#dc2626",
                    marginBottom: 12,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  {error}
                </div>
              )}

              {/* Sign In button */}
              <button
                type="submit"
                disabled={!canSubmit}
                style={{
                  width: "100%",
                  background: canSubmit ? BG : "#9396f0",
                  border: "none",
                  borderRadius: 9999,
                  padding: "14px 24px",
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#fff",
                  cursor: canSubmit ? "pointer" : "default",
                  fontFamily: "inherit",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  marginTop: 4,
                  transition: "background 0.15s, filter 0.15s",
                }}
                onMouseEnter={(e) => { if (canSubmit) e.currentTarget.style.filter = "brightness(1.1)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.filter = "brightness(1)"; }}
              >
                {loading ? <><Spinner /> Signing in…</> : "Sign In"}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Bottom illustrations */}
      <BottomIllustration />

      {/* Version label */}
      <div
        style={{
          position: "absolute",
          bottom: 8,
          right: 14,
          fontSize: 11,
          color: "rgba(255,255,255,0.35)",
          fontFamily: "monospace",
          pointerEvents: "none",
        }}
      >
        VSN-0.9.605 BT:2026-03-12 20:36
      </div>
    </div>
  );
}
