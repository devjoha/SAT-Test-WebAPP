import { useState } from "react";
import { authenticate, type User } from "../data/users";

const BG = "#3349c9";
const LINK = "#27346d";

const BluebookStar = ({ size = 54, color = "white", opacity = 1 }: { size?: number; color?: string; opacity?: number }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" style={{ opacity }}>
    <path d="M30 4 L38 27 L60 15 L43 34 L58 54 L36 42 L28 62 L27 39 L4 48 L23 31 L9 9 L30 22 Z" fill={color} />
  </svg>
);

const BluebookLogo = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#fff", userSelect: "none" }}>
    <BluebookStar size={62} />
    <div style={{ fontSize: 48, fontWeight: 800, letterSpacing: "-1.8px", lineHeight: 1 }}>
      Bluebook<sup style={{ fontSize: 12, marginLeft: 4, verticalAlign: "top" }}>™</sup>
    </div>
  </div>
);

const TicketIcon = () => (
  <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9.5 9.5 3l2.1 2.1a2.2 2.2 0 0 0 3.1 3.1l2.1 2.1-6.5 6.5-2.1-2.1a2.2 2.2 0 0 0-3.1-3.1L3 9.5Z" />
    <path d="m9 7 8 8" />
  </svg>
);

const BottomIllustration = () => (
  <svg viewBox="0 0 1024 250" style={{ position: "absolute", left: 0, bottom: 0, width: "100%", height: 250, pointerEvents: "none" }} preserveAspectRatio="xMidYMax slice">
    <g stroke="#8aa0ee" strokeWidth="3" fill="none" opacity="0.34">
      <BluebookStar size={90} color="#8aa0ee" opacity={0.34} />
      <g transform="translate(0 74)">
        <rect x="34" y="28" width="214" height="146" rx="4" />
        <rect x="62" y="52" width="156" height="106" rx="2" />
        <rect x="86" y="72" width="110" height="76" rx="3" />
        <line x1="0" y1="178" x2="278" y2="178" />
        <rect x="304" y="0" width="132" height="92" rx="8" />
        <rect x="320" y="18" width="96" height="20" rx="3" />
        <line x1="320" y1="52" x2="416" y2="52" />
        <line x1="320" y1="70" x2="388" y2="70" />
        <circle cx="360" cy="176" r="32" />
        <line x1="360" y1="176" x2="360" y2="154" />
        <line x1="360" y1="176" x2="376" y2="166" />
        <rect x="464" y="112" width="54" height="74" rx="4" />
        <rect x="474" y="124" width="34" height="14" rx="2" />
        <g transform="translate(476 148)"><circle cx="0" cy="0" r="3"/><circle cx="14" cy="0" r="3"/><circle cx="28" cy="0" r="3"/><circle cx="0" cy="16" r="3"/><circle cx="14" cy="16" r="3"/><circle cx="28" cy="16" r="3"/></g>
        <path d="M548 108 Q598 82 648 108 V188 Q598 162 548 188 Z" />
        <path d="M648 108 Q698 82 748 108 V188 Q698 162 648 188 Z" />
        <rect x="770" y="106" width="46" height="78" rx="2" />
        <line x1="816" y1="158" x2="870" y2="104" />
        <rect x="780" y="116" width="26" height="22" />
        <path d="M852 104 884 136" />
        <rect x="842" y="90" width="154" height="96" rx="3" />
        <path d="M866 90 Q919 26 972 90" />
        <line x1="919" y1="46" x2="919" y2="90" />
        <rect x="888" y="126" width="24" height="60" rx="12" />
        <rect x="862" y="108" width="18" height="22" /><rect x="958" y="108" width="18" height="22" />
      </g>
      <path d="M944 73 Q958 47 982 58 Q995 32 1019 54 Q1045 50 1054 76" />
      <path d="M754 116 Q766 101 778 116" />
    </g>
  </svg>
);

const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6Z" />
    <circle cx="12" cy="12" r="2.6" />
    <line x1="4" y1="20" x2="20" y2="4" />
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
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const canSubmit = username.trim().length > 0 && password.length > 0 && !loading;

  function goBack() {
    setView("buttons");
    setUsername("");
    setPassword("");
    setError(null);
    setLoading(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setError(null);
    setLoading(true);
    setTimeout(() => {
      const user = authenticate(username.trim(), password);
      if (user) onLogin(user);
      else {
        setError("The email address or password you entered is incorrect.");
        setLoading(false);
      }
    }, 350);
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    height: 60,
    border: "1.4px solid #7d7d7d",
    borderRadius: 10,
    padding: "0 14px",
    fontSize: 17,
    outline: "none",
    background: "#fff",
    color: "#111",
    fontFamily: "inherit",
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: BG, fontFamily: "Arial, Helvetica, sans-serif", overflow: "hidden", color: "#111" }}>
      <div style={{ position: "absolute", top: 10, right: 34 }}>
        <button style={{ height: 68, padding: "0 32px", borderRadius: 999, border: "2px solid #fff", boxShadow: "inset 0 0 0 1px rgba(0,0,0,.75)", background: "rgba(255,255,255,.34)", color: "#111", fontWeight: 800, fontSize: 17, cursor: "pointer", textDecoration: "underline", display: "flex", alignItems: "center", gap: 10 }}>
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="7" width="14" height="9" rx="1"/><path d="M8 19h8M12 16v3"/></svg>
          Test Your Device
        </button>
      </div>

      <div style={{ minHeight: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "82px 24px 136px", position: "relative", zIndex: 1 }}>
        <BluebookLogo />

        <div style={{ marginTop: 34, width: "100%", maxWidth: view === "buttons" ? 570 : 572, background: "#fff", borderRadius: 18, padding: view === "buttons" ? "39px 40px 38px" : "20px 40px 45px", boxShadow: "0 1px 0 rgba(0,0,0,.12)", minHeight: view === "buttons" ? 480 : 638 }}>
          {view === "buttons" ? (
            <>
              <h1 style={{ textAlign: "center", fontSize: 38, lineHeight: 1, fontWeight: 800, margin: "3px 0 43px" }}>Sign In</h1>
              <button onClick={() => setView("ticket")} style={{ width: "100%", height: 60, borderRadius: 999, border: "1.6px solid #111", background: "#ffd80c", fontSize: 17, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
                <TicketIcon /> Use a sign-in ticket from your school
              </button>
              <div style={{ display: "flex", alignItems: "center", margin: "36px 0", gap: 10 }}>
                <div style={{ flex: 1, height: 1, background: "#d8d8d8" }} /><span style={{ fontSize: 22, color: "#222" }}>OR</span><div style={{ flex: 1, height: 1, background: "#d8d8d8" }} />
              </div>
              <button onClick={() => setView("account")} style={{ width: "100%", height: 62, borderRadius: 999, border: "1.7px solid #111", background: "#fff", fontSize: 16, fontWeight: 800, cursor: "pointer" }}>
                Sign in with a College Board student account
              </button>
              <div style={{ marginTop: 43, display: "flex", flexDirection: "column", alignItems: "center", gap: 18, fontSize: 18 }}>
                <a href="#" onClick={(e) => e.preventDefault()} style={{ color: LINK, textDecoration: "underline" }}>I'm an educator</a>
                <a href="#" onClick={(e) => e.preventDefault()} style={{ color: LINK, textDecoration: "underline" }}>Need help signing in?</a>
              </div>
            </>
          ) : (
            <form onSubmit={handleSubmit} autoComplete="off" data-form-type="other">
              <button type="button" onClick={goBack} style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", color: "#111", fontWeight: 800, fontSize: 16, cursor: "pointer", padding: "0 0 33px" }}>
                <span style={{ width: 28, height: 28, border: "1px solid #e3e3e3", borderRadius: 5, display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#555", fontSize: 22, lineHeight: 1 }}>‹</span>
                Back
              </button>
              <h1 style={{ fontSize: 36, lineHeight: 1.08, fontWeight: 800, margin: "0 0 56px" }}>
                {view === "ticket" ? "Sign In with School Ticket" : "Sign In with a Student Account"}
              </h1>
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: "block", fontSize: 20, fontWeight: 800, marginBottom: 9 }}>{view === "ticket" ? "Ticket Number" : "Email Address"}</label>
                <input
                  name="bluebook-username"
                  value={username}
                  onChange={(e) => { setUsername(e.target.value); setError(null); }}
                  style={inputStyle}
                  autoFocus
                  autoComplete="off"
                  spellCheck={false}
                  data-lpignore="true"
                  data-form-type="other"
                />
              </div>
              <div style={{ marginBottom: 5 }}>
                <label style={{ display: "block", fontSize: 20, fontWeight: 800, marginBottom: 9 }}>Password</label>
                <div style={{ position: "relative" }}>
                  <input
                    type="text"
                    name="bluebook-secret"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(null); }}
                    style={{
                      ...inputStyle,
                      paddingRight: 48,
                      ...(showPassword
                        ? {}
                        : ({ WebkitTextSecurity: "disc", textSecurity: "disc" } as React.CSSProperties)),
                    }}
                    autoComplete="off"
                    spellCheck={false}
                    data-lpignore="true"
                    data-form-type="other"
                    aria-label="Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(v => !v)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    style={{
                      position: "absolute",
                      right: 12,
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      padding: 6,
                      cursor: "pointer",
                      color: "#555",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <EyeIcon />
                  </button>
                </div>
              </div>
              <a href="#" onClick={(e) => e.preventDefault()} style={{ color: LINK, textDecoration: "underline", fontSize: 18 }}>Forgot password?</a>
              {error && <div style={{ marginTop: 16, color: "#b91c1c", fontWeight: 700, fontSize: 14 }}>{error}</div>}
              <button type="submit" disabled={!canSubmit} style={{ width: "100%", height: 60, marginTop: error ? 36 : 53, borderRadius: 999, border: "1.3px solid #8f8f8f", background: canSubmit ? "#3349c9" : "#f2f2f2", color: canSubmit ? "#fff" : "#7f7f7f", fontSize: 17, fontWeight: 800, cursor: canSubmit ? "pointer" : "default" }}>
                {loading ? "Submitting…" : "Submit"}
              </button>
              <div style={{ textAlign: "center", marginTop: 44 }}>
                <a href="#" onClick={(e) => e.preventDefault()} style={{ color: LINK, textDecoration: "underline", fontSize: 20 }}>Need help signing in?</a>
              </div>
            </form>
          )}
        </div>
      </div>
      <BottomIllustration />
      <div style={{ position: "absolute", right: 8, bottom: 8, background: "rgba(255,255,255,.85)", color: "#333", fontSize: 12, fontFamily: "monospace", padding: "7px 8px" }}>VSN-0.9.605 BT:2026-03-12 20:36</div>
    </div>
  );
}
