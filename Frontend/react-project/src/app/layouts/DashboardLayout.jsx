import React from "react";
import Navbar from "../../features/dashboard/ui/components/Navbar";
import { Group, Panel } from "react-resizable-panels";
import { Outlet } from "react-router";
import Player from "../../features/player/ui/components/Player";

const DashboardLayout = () => {
  return (
    <div className="h-screen bg-black text-white">
      <Navbar />
      <div className="h-[80%]">
        <Group className="gap-2">
          <Panel
            cla
            maxSize={"20%"}
            minSize={"15%"}
            className="bg-[#121212] p-5"
          >
            LEFT SIDE
          </Panel>
          <Panel className="bg-[#121212]p-5">
            <Outlet />
          </Panel>
          <Panel maxSize={"20%"} minSize={"15%"} className="bg-[#121212] p-5">
            Right SIDE
          </Panel>
        </Group>
      </div>
      <Player />
    </div>
  );
};

export default DashboardLayout;