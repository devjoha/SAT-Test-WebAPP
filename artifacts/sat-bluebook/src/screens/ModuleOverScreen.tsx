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
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        gap: 18,
        padding: "40px 24px",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: 30, fontWeight: 400, color: "#3b5fc0", margin: 0 }}>
        This Module Is Over
      </h1>
      <p style={{ fontSize: 16, color: "#374151", margin: 0 }}>All your work has been saved.</p>
      <p style={{ fontSize: 16, color: "#374151", margin: 0 }}>
        You'll move on automatically in just a moment.
      </p>
      <p style={{ fontSize: 16, color: "#374151", margin: 0 }}>
        Do not refresh this page or quit the app.
      </p>
      <div style={{ marginTop: 20 }}>
        <div className="loading-spinner" />
      </div>
    </div>
  );
}
