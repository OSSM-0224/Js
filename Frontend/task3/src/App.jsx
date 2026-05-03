import SessionForm from "./components/SessionForm";
import SessionList from "./components/SessionList";

export default function App() {
  return (
    <div style={{
      backgroundColor: "#f4f7fb",
      minHeight: "100vh",
      padding: "30px"
    }}>
      <div style={{
        maxWidth: "800px",
        margin: "auto"
      }}>
        <h1 style={{
          textAlign: "center",
          marginBottom: "20px",
          color: "#2c3e50"
        }}>
          📚 Study Session Planner
        </h1>

        <SessionForm />
        <SessionList />
      </div>
    </div>
  );
}