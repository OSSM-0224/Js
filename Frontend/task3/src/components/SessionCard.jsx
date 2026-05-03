import { useSession } from "../context/useSession";

export default function SessionCard({ session }) {
  const { deleteSession } = useSession();

  const getBgColor = () => {
    if (session.priority === "high") return "#ffeaea";
    if (session.priority === "medium") return "#fff6e5";
    return "#eafaf1";
  };

  const getBadgeColor = () => {
    if (session.priority === "high") return "#e74c3c";
    if (session.priority === "medium") return "#f39c12";
    return "#2ecc71";
  };

  return (
    <div
      style={{
        background: "white",
        padding: "16px",
        borderRadius: "14px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        borderLeft: `6px solid ${getBadgeColor()}`,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* header ka style */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3 style={{ margin: 0, color: "#2c3e50" }}>{session.topic}</h3>

        <span
          style={{
            background: getBgColor(),
            color: getBadgeColor(),
            padding: "4px 10px",
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: "bold",
            textTransform: "capitalize",
          }}
        >
          {session.priority}
        </span>
      </div>

      {/*details ka style*/}
      <div style={{ marginTop: "10px", color: "#555" }}>
        <p style={{ margin: "4px 0" }}>📘 {session.subject}</p>
        <p style={{ margin: "4px 0" }}>⏱ {session.duration} minutes</p>
        <p style={{ margin: "4px 0" }}>📅 {session.date}</p>
      </div>

      {/*button */}
      <button
        onClick={() => deleteSession(session.id)}
        style={{
          marginTop: "12px",
          padding: "8px 12px",
          border: "none",
          borderRadius: "8px",
          backgroundColor: "#ff4d4d",
          color: "white",
          cursor: "pointer",
          fontSize: "14px",
          transition: "0.3s",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#e60000")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#ff4d4d")}
      >
        Delete
      </button>
    </div>
  );
}
