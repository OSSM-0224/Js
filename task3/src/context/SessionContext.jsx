import { createContext, useState } from "react";

export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [sessions, setSessions] = useState([]);

  const addSession = (session) => {
    setSessions((prev) => [
      ...prev,
      { ...session, id: Date.now() }
    ]);
  };

  const deleteSession = (id) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <SessionContext.Provider value={{ sessions, addSession, deleteSession }}>
      {children}
    </SessionContext.Provider>
  );
};