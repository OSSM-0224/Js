import React from "react";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { setLoggedInUser, cartItems } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("log user");
    setLoggedInUser(null);
    navigate("/auth");
  };

  return (
    <nav
      style={{ backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", fontFamily: "'Montserrat', sans-serif" }}
      className="fixed top-0 left-0 w-full z-50 bg-[rgba(10,0,0,0.85)] border-b border-[#cc2222]/25"
    >
      <div className="flex justify-between items-center px-12 h-[72px] relative">

        {/* Logo */}
        <h1
          onClick={() => navigate("/")}
          className="cursor-pointer text-[26px] font-semibold tracking-[0.35em] text-white"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          LUX<span className="text-[#cc2222]">E</span>
        </h1>

        {/* Center Links */}
        <div className="absolute left-1/2 -translate-x-1/2 flex gap-12">
          {[
            { to: "/", label: "Home" },
            { to: "/cart", label: "Cart" },
            { to: "/contact", label: "Contact" },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end
              className={({ isActive }) =>
                `relative text-[11px] font-medium tracking-[0.2em] uppercase pb-1 transition-colors duration-300
                 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:bg-[#cc2222] after:transition-all after:duration-300
                 ${isActive
                   ? "text-white after:w-full"
                   : "text-white/55 hover:text-white after:w-0 hover:after:w-full"
                 }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Right */}
        <div className="flex items-center gap-7">

          {/* Cart Icon with Badge */}
          <button
            onClick={() => navigate("/cart")}
            className="relative text-white/60 hover:text-white transition-colors duration-300 bg-transparent border-none cursor-pointer"
          >
            <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>

            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#cc2222] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </button>

          <div className="w-px h-5 bg-white/10" />

          <button
            onClick={handleLogout}
            className="relative overflow-hidden text-[10px] font-semibold tracking-[0.25em] uppercase
              text-[#cc2222] border border-[#cc2222]/50 px-6 py-2.5 transition-all duration-300
              hover:text-white hover:border-[#cc2222] bg-transparent cursor-pointer group"
          >
            <span className="absolute inset-0 bg-[#cc2222] -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            <span className="relative z-10">Logout</span>
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;