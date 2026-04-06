import { createContext, useContext, useState } from "react";

let Auth = createContext();

export let AuthProvider = ({ children }) => {
  const [registeredUsers, setRegisteredUsers] = useState(
    JSON.parse(localStorage.getItem("reg users")) || []
  );
  const [loggedInUser, setLoggedInUser] = useState(
    JSON.parse(localStorage.getItem("log user")) || null
  );

  return (
    <Auth.Provider
      value={{
        setRegisteredUsers,
        setLoggedInUser,
        registeredUsers,
        loggedInUser,
      }}
    >
      {children}
    </Auth.Provider>
  );
};

export let useAuth = () => useContext(Auth);