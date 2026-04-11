const BG = "#3b3ff2";

const BluebookLogo = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M16 2 L18.5 10 L27 10 L20.5 15.5 L23 24 L16 19 L9 24 L11.5 15.5 L5 10 L13.5 10 Z" fill="white" opacity="0.9"/>
    </svg>
    <span style={{ fontSize: 26, fontWeight: 700, color: "#fff", letterSpacing: "-0.5px", fontFamily: "'Georgia', serif" }}>
      Bluebook
      <sup style={{ fontSize: 12, fontWeight: 400, verticalAlign: "super", letterSpacing: 0 }}>™</sup>
    </span>
  </div>
);

const TicketIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/>
    <path d="m9 12 2 2 4-4"/>
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
    {/* Ground line */}
    <line x1="0" y1="155" x2="1024" y2="155" stroke="white" strokeOpacity="0.2" strokeWidth="1.5"/>

    {/* Laptop left */}
    <rect x="40" y="80" width="110" height="72" rx="4" stroke="white" strokeOpacity="0.35" strokeWidth="2"/>
    <rect x="44" y="84" width="102" height="58" rx="2" stroke="white" strokeOpacity="0.2" strokeWidth="1.5"/>
    <rect x="50" y="90" width="48" height="36" rx="2" stroke="white" strokeOpacity="0.25" strokeWidth="1.5"/>
    <rect x="104" y="94" width="36" height="6" rx="1" stroke="white" strokeOpacity="0.25" strokeWidth="1.5"/>
    <rect x="104" y="104" width="36" height="6" rx="1" stroke="white" strokeOpacity="0.25" strokeWidth="1.5"/>
    <rect x="104" y="114" width="36" height="6" rx="1" stroke="white" strokeOpacity="0.25" strokeWidth="1.5"/>
    <rect x="20" y="152" width="150" height="5" rx="2.5" stroke="white" strokeOpacity="0.2" strokeWidth="1.5"/>

    {/* X² symbol */}
    <text x="30" y="150" fill="white" fillOpacity="0.3" fontSize="28" fontFamily="Georgia, serif" fontWeight="700">X²</text>

    {/* Star/cursor icon center-left */}
    <path d="M220 100 L225 85 L230 100 L245 100 L233 110 L238 125 L225 115 L212 125 L217 110 L205 100 Z"
      stroke="white" strokeOpacity="0.3" strokeWidth="1.5" fill="none"/>

    {/* Calculator */}
    <rect x="320" y="88" width="60" height="70" rx="4" stroke="white" strokeOpacity="0.35" strokeWidth="2"/>
    <rect x="328" y="96" width="44" height="18" rx="2" stroke="white" strokeOpacity="0.25" strokeWidth="1.5"/>
    <circle cx="333" cy="125" r="4" stroke="white" strokeOpacity="0.25" strokeWidth="1.5"/>
    <circle cx="350" cy="125" r="4" stroke="white" strokeOpacity="0.25" strokeWidth="1.5"/>
    <circle cx="367" cy="125" r="4" stroke="white" strokeOpacity="0.25" strokeWidth="1.5"/>
    <circle cx="333" cy="140" r="4" stroke="white" strokeOpacity="0.25" strokeWidth="1.5"/>
    <circle cx="350" cy="140" r="4" stroke="white" strokeOpacity="0.25" strokeWidth="1.5"/>
    <circle cx="367" cy="140" r="4" stroke="white" strokeOpacity="0.25" strokeWidth="1.5"/>

    {/* Stopwatch */}
    <circle cx="450" cy="120" r="38" stroke="white" strokeOpacity="0.3" strokeWidth="2"/>
    <circle cx="450" cy="120" r="28" stroke="white" strokeOpacity="0.25" strokeWidth="1.5"/>
    <line x1="450" y1="92" x2="450" y2="120" stroke="white" strokeOpacity="0.35" strokeWidth="2" strokeLinecap="round"/>
    <line x1="450" y1="120" x2="466" y2="108" stroke="white" strokeOpacity="0.35" strokeWidth="2" strokeLinecap="round"/>
    <rect x="443" y="76" width="14" height="6" rx="3" stroke="white" strokeOpacity="0.3" strokeWidth="1.5"/>
    <line x1="436" y1="72" x2="430" y2="65" stroke="white" strokeOpacity="0.3" strokeWidth="2" strokeLinecap="round"/>
    <line x1="464" y1="72" x2="470" y2="65" stroke="white" strokeOpacity="0.3" strokeWidth="2" strokeLinecap="round"/>

    {/* Books stack */}
    <rect x="545" y="108" width="80" height="12" rx="2" stroke="white" strokeOpacity="0.35" strokeWidth="2"/>
    <rect x="550" y="97" width="72" height="12" rx="2" stroke="white" strokeOpacity="0.3" strokeWidth="1.5"/>
    <rect x="555" y="86" width="66" height="12" rx="2" stroke="white" strokeOpacity="0.25" strokeWidth="1.5"/>
    <rect x="545" y="120" width="80" height="35" rx="0" stroke="white" strokeOpacity="0.1" strokeWidth="1.5"/>

    {/* Open book */}
    <path d="M660 155 L660 95 Q680 85 700 95 L700 155" stroke="white" strokeOpacity="0.3" strokeWidth="2"/>
    <path d="M700 95 Q720 85 740 95 L740 155" stroke="white" strokeOpacity="0.3" strokeWidth="2"/>
    <line x1="660" y1="155" x2="740" y2="155" stroke="white" strokeOpacity="0.3" strokeWidth="2"/>
    <line x1="700" y1="95" x2="700" y2="155" stroke="white" strokeOpacity="0.3" strokeWidth="2"/>

    {/* Signal/WiFi waves */}
    <path d="M790 130 Q800 110 810 130" stroke="white" strokeOpacity="0.3" strokeWidth="2" strokeLinecap="round"/>
    <path d="M782 140 Q800 105 818 140" stroke="white" strokeOpacity="0.25" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="800" cy="143" r="3" fill="white" fillOpacity="0.3"/>

    {/* Buildings right */}
    <rect x="840" y="95" width="30" height="60" rx="2" stroke="white" strokeOpacity="0.35" strokeWidth="2"/>
    <rect x="875" y="75" width="40" height="80" rx="2" stroke="white" strokeOpacity="0.35" strokeWidth="2"/>
    <rect x="920" y="100" width="28" height="55" rx="2" stroke="white" strokeOpacity="0.3" strokeWidth="2"/>
    <rect x="952" y="110" width="52" height="45" rx="2" stroke="white" strokeOpacity="0.3" strokeWidth="2"/>
    {/* windows */}
    <rect x="847" y="105" width="8" height="8" rx="1" stroke="white" strokeOpacity="0.25" strokeWidth="1.5"/>
    <rect x="847" y="120" width="8" height="8" rx="1" stroke="white" strokeOpacity="0.25" strokeWidth="1.5"/>
    <rect x="883" y="83" width="8" height="8" rx="1" stroke="white" strokeOpacity="0.25" strokeWidth="1.5"/>
    <rect x="897" y="83" width="8" height="8" rx="1" stroke="white" strokeOpacity="0.25" strokeWidth="1.5"/>
    <rect x="883" y="100" width="8" height="8" rx="1" stroke="white" strokeOpacity="0.25" strokeWidth="1.5"/>
    <rect x="897" y="100" width="8" height="8" rx="1" stroke="white" strokeOpacity="0.25" strokeWidth="1.5"/>
    {/* dome */}
    <path d="M883 75 Q895 55 907 75" stroke="white" strokeOpacity="0.3" strokeWidth="2"/>
    <line x1="895" y1="55" x2="895" y2="75" stroke="white" strokeOpacity="0.3" strokeWidth="1.5"/>

    {/* Clouds top right */}
    <path d="M930 45 Q935 35 945 37 Q948 28 958 30 Q968 25 972 35 Q982 33 984 42 Q986 50 978 50 L933 50 Q926 50 930 45 Z"
      stroke="white" strokeOpacity="0.2" strokeWidth="1.5" fill="none"/>
    <path d="M955 60 Q959 52 967 54 Q970 47 978 49 Q984 52 983 58 L958 60 Z"
      stroke="white" strokeOpacity="0.15" strokeWidth="1.5" fill="none"/>
  </svg>
);

interface LoginScreenProps {
  onLogin: () => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
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
      {/* Top bar */}
      <div style={{ display: "flex", justifyContent: "flex-end", padding: "16px 24px", flexShrink: 0 }}>
        <button
          style={{
            background: "transparent",
            border: "1.5px solid rgba(255,255,255,0.7)",
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
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2"/>
            <path d="m8 21 4-4 4 4"/>
            <path d="M12 17v4"/>
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
        <BluebookLogo />

        {/* Card */}
        <div
          style={{
            background: "#fff",
            borderRadius: 12,
            padding: "36px 48px 32px",
            width: "100%",
            maxWidth: 460,
            boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
          }}
        >
          <h1
            style={{
              fontSize: 26,
              fontWeight: 700,
              color: "#111",
              textAlign: "center",
              margin: "0 0 28px",
              fontFamily: "inherit",
            }}
          >
            Sign In
          </h1>

          {/* Yellow primary button */}
          <button
            onClick={onLogin}
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
              boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
              transition: "filter 0.15s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.filter = "brightness(0.95)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.filter = "brightness(1)"; }}
          >
            <TicketIcon />
            Use a sign-in ticket from your school
          </button>

          {/* OR divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              margin: "20px 0",
            }}
          >
            <div style={{ flex: 1, height: 1, background: "#e0e0e0" }} />
            <span style={{ fontSize: 13, color: "#888", fontWeight: 500 }}>OR</span>
            <div style={{ flex: 1, height: 1, background: "#e0e0e0" }} />
          </div>

          {/* Outlined secondary button */}
          <button
            onClick={onLogin}
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
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#555"; e.currentTarget.style.background = "#f9f9f9"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#bbb"; e.currentTarget.style.background = "#fff"; }}
          >
            Sign in with a College Board student account
          </button>

          {/* Footer links */}
          <div
            style={{
              marginTop: 24,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
            }}
          >
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              style={{ fontSize: 14, color: "#3b3ff2", textDecoration: "underline", fontFamily: "inherit" }}
            >
              I&apos;m an educator
            </a>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              style={{ fontSize: 14, color: "#3b3ff2", textDecoration: "underline", fontFamily: "inherit" }}
            >
              Need help signing in?
            </a>
          </div>
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
          color: "rgba(255,255,255,0.4)",
          fontFamily: "monospace",
          pointerEvents: "none",
        }}
      >
        VSN-0.9.605 BT:2026-03-12 20:36
      </div>
    </div>
  );
}
