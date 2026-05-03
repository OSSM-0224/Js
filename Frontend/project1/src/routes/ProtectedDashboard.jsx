import React from "react";
import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const ProtectedDashboard = () => {
  console.log("protected rendering...");

  let { loggedInUser } = useAuth();

  if (!loggedInUser) {
    toast.error("Unauthorized user");
    return <Navigate to="/auth" />;
  }

  return <Outlet />;
};

export default ProtectedDashboard;