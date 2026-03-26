import { useForm } from "react-hook-form";
import { useSession } from "../context/useSession";

export default function SessionForm() {
  const { register, handleSubmit, reset } = useForm();
  const { addSession } = useSession();
  const today = new Date().toISOString().split("T")[0];

  const onSubmit = (data) => {
    if (!data.date) {
      data.date = today;
    }
    addSession(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "12px",
        marginBottom: "20px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
      }}
    >
      {/*topic */}
      <input
        placeholder="Topic Name"
        {...register("topic", { required: true })}
        style={inputStyle}
      />

      {/*subject */}
      <select {...register("subject")} style={inputStyle}>
        <option value="DSA">DSA</option>
        <option value="Web Dev">Web Dev</option>
        <option value="DBMS">DBMS</option>
        <option value="OS">OS</option>
        <option value="Other">Other</option>
      </select>

      {/*duration */}
      <input
        type="number"
        placeholder="Duration (min)"
        {...register("duration", { min: 1 })} 
        style={inputStyle}
      />

      {/*priroty*/}
      <select {...register("priority")} style={inputStyle}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      {/*date */}
      <input
        type="date"
        defaultValue={today} 
        {...register("date")}
        style={inputStyle}
      />

      <button style={btnStyle}>Add Session</button>
    </form>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "8px",
  border: "1px solid #ddd"
};

const btnStyle = {
  width: "100%",
  padding: "10px",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};