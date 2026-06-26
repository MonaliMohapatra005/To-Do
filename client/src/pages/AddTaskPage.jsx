import React, { useState } from "react";
import { z, ZodError } from "zod";
import { getZodError } from "../helper/getZodError";
import { showToast } from "../helper/showToast";

const inputStyle = {
  width: "100%",
  padding: "10px 14px",
  border: "1.5px solid #e9d5ff",
  borderRadius: "10px",
  fontSize: "0.88rem",
  outline: "none",
  background: "#faf5ff",
  color: "#3b0764",
  boxSizing: "border-box",
  transition: "border-color 0.2s",
};

const labelStyle = {
  display: "block", 
  marginBottom: "6px",
  fontSize: "0.82rem",
  fontWeight: 600,
  color: "#6d28d9",
};

const errorStyle = {
  color: "#dc2626",
  fontSize: "0.75rem",
  marginTop: "4px",
  display: "block",
};

const AddTaskPage = () => {
  const [formData, setFormData] = useState({});
  const [err, setError] = useState();

  const taskSchema = z.object({
    title: z.string().min(3, { message: "Title must be at least 3 characters." }),
    description: z
      .string()
      .min(3, { message: "Description must be at least 3 characters." })
      .max(500, { message: "Length exceeded." }),
  });

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const validatedData = taskSchema.parse(formData);
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/task/create-task`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(validatedData),
      });
      const responseData = await response.json();
      if (!response.ok) throw new Error(responseData.message);
      setFormData({});
      showToast("success", responseData.message);
    } catch (error) {
      if (error instanceof ZodError) {
        setError(getZodError(error.errors));
      }
      showToast("error", error.message);
    }
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 66px)",
        background: "linear-gradient(160deg, #f5f3ff 0%, #ede9fe 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1rem",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "480px",
          background: "#fff",
          borderRadius: "18px",
          boxShadow: "0 8px 40px rgba(109,40,217,0.12)",
          padding: "2rem",
          border: "1px solid #ede9fe",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.75rem" }}>
          <div
            style={{
              width: "40px", height: "40px", borderRadius: "11px",
              background: "linear-gradient(135deg, #7c3aed, #5b21b6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 12px rgba(109,40,217,0.35)",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" />
              <line x1="12" y1="8" x2="12" y2="16" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <line x1="8" y1="12" x2="16" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 700, color: "#3b0764" }}>Add New Task</h1>
            <p style={{ margin: 0, fontSize: "0.75rem", color: "#9ca3af" }}>Fill in the details below</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div style={{ marginBottom: "1.2rem" }}>
            <label style={labelStyle}>Task Title</label>
            <input
              value={formData?.title || ""}
              onChange={handleInput}
              name="title"
              type="text"
              placeholder="e.g. Design landing page"
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "#7c3aed")}
              onBlur={(e) => (e.target.style.borderColor = "#e9d5ff")}
            />
            {err?.title && <span style={errorStyle}>⚠ {err.title}</span>}
          </div>

          {/* Description */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={labelStyle}>Description</label>
            <textarea
              value={formData?.description || ""}
              onChange={handleInput}
              name="description"
              rows="4"
              placeholder="Describe your task..."
              style={{ ...inputStyle, resize: "vertical" }}
              onFocus={(e) => (e.target.style.borderColor = "#7c3aed")}
              onBlur={(e) => (e.target.style.borderColor = "#e9d5ff")}
            />
            {err?.description && <span style={errorStyle}>⚠ {err.description}</span>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "11px",
              borderRadius: "10px",
              border: "none",
              background: "linear-gradient(135deg, #7c3aed, #5b21b6)",
              color: "#fff",
              fontWeight: 600,
              fontSize: "0.9rem",
              cursor: "pointer",
              boxShadow: "0 4px 14px rgba(109,40,217,0.35)",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            ✓ Create Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTaskPage;