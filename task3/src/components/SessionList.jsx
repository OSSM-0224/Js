import { useSession } from "../context/useSession";
import SessionCard from "./SessionCard";

export default function SessionList() {
  const { sessions } = useSession();

  const totalDuration = sessions.reduce(
    (sum, s) => sum + Number(s.duration || 0),
    0
  );

  return (
    <div>
      {/* Header */}
      <h2 style={{
        color: "#2c3e50",
        marginBottom: "15px"
      }}>
        Total Study Time: {totalDuration} minutes ⏱️
      </h2>

      {/* Bento Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "15px"
      }}>
        {sessions.length === 0 ? (
          <p>No sessions added</p>
        ) : (
          sessions.map((session) => (
            <SessionCard key={session.id} session={session} />
          ))
        )}
      </div>
    </div>
  );
}