import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const linkStyle =
    "flex items-center gap-3 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition";

  const activeStyle = "bg-blue-50 text-blue-600 font-medium";

  return (
    <div className="w-64 h-screen bg-white border-r fixed flex flex-col">
      <div className="p-5 text-2xl font-bold text-gray-800 border-b">
        AdminKit
      </div>
      <nav className="flex-1 mt-4 px-3 space-y-2">
        
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? activeStyle : ""}`
          }
        >
          📊 Dashboard
        </NavLink>

        <NavLink
          to="/analytics"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? activeStyle : ""}`
          }
        >
          📈 Analytics
        </NavLink>

        <NavLink
          to="/crypto"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? activeStyle : ""}`
          }
        >
          💰 Crypto
        </NavLink>

        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? activeStyle : ""}`
          }
        >
          🧾 Orders
        </NavLink>

        <NavLink
          to="/users"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? activeStyle : ""}`
          }
        >
          👥 Users
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? activeStyle : ""}`
          }
        >
          ⚙️ Settings
        </NavLink>
      </nav>
      <div className="p-4 border-t text-sm text-gray-500">
        © 2026 AdminKit
      </div>
    </div>
  );
}