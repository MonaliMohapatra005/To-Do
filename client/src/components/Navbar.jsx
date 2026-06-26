import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 17) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");

    
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkClass = ({ isActive }) =>
    isActive
      ? "px-5 py-2 rounded-full bg-white text-purple-700 font-semibold text-sm shadow-md transition-all duration-300"
      : "px-5 py-2 rounded-full text-white/80 font-medium text-sm hover:text-white hover:bg-white/15 transition-all duration-300";

  return (
    <nav
      style={{
        background: scrolled
          ? "linear-gradient(135deg, #4c1d95 0%, #6d28d9 50%, #7c3aed 100%)"
          : "linear-gradient(135deg, #3b0764 0%, #5b21b6 50%, #6d28d9 100%)",
        boxShadow: scrolled ? "0 4px 30px rgba(109,40,217,0.4)" : "0 2px 15px rgba(109,40,217,0.25)",
        transition: "all 0.3s ease",
        position: "sticky",
        top: 0,
        zIndex: 50,
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 1.5rem",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <NavLink to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "9px" }}>
          <div
            style={{
              width: "34px", height: "34px", borderRadius: "9px",
              background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
              <path d="M9 11l3 3L22 4" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: "1rem", lineHeight: 1.1 }}>TaskFlow</div>
            <div style={{ color: "rgba(221,214,254,0.8)", fontSize: "0.68rem" }}>{greeting} 👋</div>
          </div>
        </NavLink>

        {/* Nav Links */}
        <div style={{ display: "flex", gap: "6px" }}>
          <NavLink to="/add-task" className={linkClass}>
            ➕ Add Task
          </NavLink>
          <NavLink to="/task-list" className={linkClass}>
            📋 Show Tasks
          </NavLink>
        </div>
      </div>
      <div style={{ height: "2px", background: "linear-gradient(90deg, transparent, rgba(196,181,253,0.6), transparent)" }} />
    </nav>
  );
};

export default Navbar;