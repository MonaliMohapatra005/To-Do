const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "linear-gradient(135deg, #3b0764 0%, #5b21b6 50%, #6d28d9 100%)",
        position: "relative",
      }}
    >
      <div style={{ height: "2px", background: "linear-gradient(90deg, transparent, rgba(196,181,253,0.7), transparent)" }} />

      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "1rem 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: "28px", height: "28px", borderRadius: "7px",
              background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M9 11l3 3L22 4" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span style={{ color: "#fff", fontWeight: 700, fontSize: "0.9rem" }}>TaskFlow</span>
        </div>

        {/* Links */}
        {/* <div style={{ display: "flex", gap: "1.5rem" }}>
          {[["Home", "/"], ["Add Task", "/add-task"], ["Show Tasks", "/task-list"]].map(([label, href]) => (
            <a
              key={label}
              href={href}
              style={{ color: "rgba(221,214,254,0.75)", fontSize: "0.82rem", textDecoration: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(221,214,254,0.75)")}
            >
              {label}
            </a>
          ))}
        </div> */}
        

        {/* Copyright */}
        <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.74rem", margin: 0 }}>
          © {year} TaskFlow
        </p>
      </div>
    </footer>
  );
};

export default Footer;