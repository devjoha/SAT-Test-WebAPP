export default function ModuleOverScreen() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#f5f5f5",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        gap: 16,
        padding: 40,
      }}
    >
      <h1 style={{ fontSize: 32, fontWeight: 400, color: "#3b5fc0", margin: 0, textAlign: "center" }}>
        This Module Is Over
      </h1>
      <p style={{ fontSize: 17, color: "#111827", margin: 0 }}>All your work has been saved.</p>
      <p style={{ fontSize: 17, color: "#111827", margin: 0 }}>You'll move on automatically in just a moment.</p>
      <p style={{ fontSize: 17, color: "#111827", margin: 0 }}>Do not refresh this page or quit the app.</p>

      {/* Spinner */}
      <div style={{ marginTop: 24 }}>
        <SpinnerDots />
      </div>
    </div>
  );
}

function SpinnerDots() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const angle = (i * 360) / 8;
        const rad = (angle * Math.PI) / 180;
        const x = 24 + 16 * Math.cos(rad);
        const y = 24 + 16 * Math.sin(rad);
        const opacity = 0.15 + (i / 8) * 0.85;
        const size = 3.5 + (i / 8) * 2;
        return (
          <circle key={i} cx={x} cy={y} r={size / 2} fill="#111827" opacity={opacity}>
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 24 24"
              to="360 24 24"
              dur="1s"
              repeatCount="indefinite"
            />
          </circle>
        );
      })}
    </svg>
  );
}
