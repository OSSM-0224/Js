import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router";

const MainLayout = () => {
  console.log("main layout rendering...");
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="pt-20 px-6">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;