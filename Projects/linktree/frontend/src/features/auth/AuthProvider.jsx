import { createContext, useContext, useState } from "react";
import { loginUser, registerUser } from "./auth.api";

const AuthContext = createContext(null);
const STORAGE_KEY = "linktree_auth_user";

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser());
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  const saveUser = (userData) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    setUser(userData);
  };

  const login = async (identifier, password) => {
    setLoading(true);
    setAuthError("");

    try {
      const data = await loginUser({ identifier, password });
      saveUser(data.user);
      return data.user;
    } catch (error) {
      const message = error.response?.data?.message || error.message || "Login failed";
      setAuthError(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (username, email, password) => {
    setLoading(true);
    setAuthError("");

    try {
      const data = await registerUser({ username, email, password });
      saveUser(data.user);
      return data.user;
    } catch (error) {
      const message = error.response?.data?.message || error.message || "Registration failed";
      setAuthError(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  const value = {
    user,
    loading,
    authError,
    isAuthenticated: Boolean(user),
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export default AuthProvider;
