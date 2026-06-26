// import React, { useEffect, useState } from "react";
// import { z, ZodError } from 'zod'
// import { getZodError } from "../helper/getZodError";
// import { showToast } from "../helper/showToast";
// import { useParams } from "react-router-dom";
// const ShowTask = () => {
//     const { taskid } = useParams()
//     const [apiData, setApiData] = useState()
//     const [formData, setFormData] = useState()
//     const [err, setError] = useState()

//     const taskSchema = z.object({
//         title: z.string().min(3, { message: "Title must be at least 3 character long." }),
//         description: z.string().min(3, { message: "Description must be at least 3 character long." }).max(500, { message: 'Lenght acceeded.' }),
//         status: z.enum(['Pending', 'Running', 'Completed', 'Failed'])
//     })

//     const handleInput = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value })
//     }

//     useEffect(() => {
//         const getTask = async () => {
//             const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/task/show-task/${taskid}`)
//             const responseData = await response.json()
//             setApiData(responseData)
//             setFormData(responseData.taskData)
//         }
//         getTask()
//     }, [])

//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         try {
//             const validatedData = taskSchema.parse(formData)
//             const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/task/update-task/${taskid}`,
//                 {
//                     method: "PUT",
//                     headers: { 'Content-type': 'application/json' },
//                     body: JSON.stringify(validatedData)
//                 })

//             const responseData = await response.json()
//             if (!response.ok) {
//                 throw new Error(responseData.message)
//             }
             
//             showToast('success', responseData.message)
//         } catch (error) {
//             if (error instanceof ZodError) {
//                 const getError = getZodError(error.errors)
//                 setError(getError)
//             }
//             showToast('error', error.message)
//         }
//     }

//     return (
//         <div className="pt-5">
//             <h1 className="text-2xl font-bold mb-5">Task Details</h1>
//             {apiData && apiData.status ?
//                 <form onSubmit={handleSubmit}>
//                     <div className="mb-5">
//                         <label className="block mb-2 text-sm font-medium text-gray-900 ">
//                             Title
//                         </label>
//                         <input value={formData?.title || ''} onChange={handleInput} name="title"
//                             type="text"
//                             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//                             placeholder="Task title"
//                             required
//                         />
//                         {err && err.title && <span className="text-red-500 text-sm">{err.title}</span>}
//                     </div>
//                     <div className="mb-5">
//                         <label className="block mb-2 text-sm font-medium text-gray-900 ">
//                             Description
//                         </label>
//                         <textarea value={formData?.description || ''} onChange={handleInput} name="description"
//                             rows="4"
//                             className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
//                             placeholder="Task description..."
//                         ></textarea>
//                         {err && err.description && <span className="text-red-500 text-sm">{err.description}</span>}
//                     </div>
//                     <div className="mb-5">
//                         <label className="block mb-2 text-sm font-medium text-gray-900 ">
//                             Description
//                         </label>
//                         <select onChange={handleInput} name="status" defaultValue={formData?.status || ''} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500">
//                             <option value="Pending">Pending</option>
//                             <option value="Running">Running</option>
//                             <option value="Completed">Completed</option>
//                             <option value="Failed">Failed</option>
//                         </select>
//                         {err && err.status && <span className="text-red-500 text-sm">{err.status}</span>}
//                     </div>

//                     <button
//                         type="submit"
//                         className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
//                     >
//                         Submit
//                     </button>
//                 </form>
//                 :
//                 <>Data not found</>
//             }
//         </div>
//     )
// }

// export default ShowTask

























import React, { useEffect, useState } from "react";
import { z, ZodError } from "zod";
import { getZodError } from "../helper/getZodError";
import { showToast } from "../helper/showToast";
import { useParams } from "react-router-dom";

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
};

const labelStyle = {
  display: "block",
  marginBottom: "6px",
  fontSize: "0.82rem",
  fontWeight: 600,
  color: "#6d28d9",
};

const statusColors = {
  Pending:   "#f59e0b",
  Running:   "#3b82f6",
  Completed: "#10b981",
  Failed:    "#ef4444",
};

const ShowTask = () => {
  const { taskid } = useParams();
  const [apiData, setApiData] = useState();
  const [formData, setFormData] = useState();
  const [err, setError] = useState();

  const taskSchema = z.object({
    title: z.string().min(3, { message: "Title must be at least 3 characters." }),
    description: z.string().min(3, { message: "Description must be at least 3 characters." }).max(500, { message: "Length exceeded." }),
    status: z.enum(["Pending", "Running", "Completed", "Failed"]),
  });

  const handleInput = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  useEffect(() => {
    const getTask = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/task/show-task/${taskid}`);
      const responseData = await response.json();
      setApiData(responseData);
      setFormData(responseData.taskData);
    };
    getTask();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const validatedData = taskSchema.parse(formData);
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/task/update-task/${taskid}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(validatedData),
      });
      const responseData = await response.json();
      if (!response.ok) throw new Error(responseData.message);
      showToast("success", responseData.message);
    } catch (error) {
      if (error instanceof ZodError) setError(getZodError(error.errors));
      showToast("error", error.message);
    }
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 66px)",
        background: "linear-gradient(160deg, #f5f3ff 0%, #ede9fe 100%)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "2rem 1rem", fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%", maxWidth: "480px",
          background: "#fff", borderRadius: "18px",
          boxShadow: "0 8px 40px rgba(109,40,217,0.12)",
          padding: "2rem", border: "1px solid #ede9fe",
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
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 700, color: "#3b0764" }}>Edit Task</h1>
            <p style={{ margin: 0, fontSize: "0.75rem", color: "#9ca3af" }}>Update task details below</p>
          </div>
          {formData?.status && (
            <span
              style={{
                marginLeft: "auto",
                padding: "3px 10px", borderRadius: "999px",
                fontSize: "0.7rem", fontWeight: 600,
                background: statusColors[formData.status] + "22",
                color: statusColors[formData.status],
                border: `1px solid ${statusColors[formData.status]}44`,
              }}
            >
              {formData.status}
            </span>
          )}
        </div>

        {apiData && apiData.status ? (
          <form onSubmit={handleSubmit}>
            {/* Title */}
            <div style={{ marginBottom: "1.2rem" }}>
              <label style={labelStyle}>Task Title</label>
              <input
                value={formData?.title || ""}
                onChange={handleInput}
                name="title"
                type="text"
                placeholder="Task title"
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "#7c3aed")}
                onBlur={(e) => (e.target.style.borderColor = "#e9d5ff")}
              />
              {err?.title && <span style={{ color: "#dc2626", fontSize: "0.75rem", marginTop: "4px", display: "block" }}>⚠ {err.title}</span>}
            </div>

            {/* Description */}
            <div style={{ marginBottom: "1.2rem" }}>
              <label style={labelStyle}>Description</label>
              <textarea
                value={formData?.description || ""}
                onChange={handleInput}
                name="description"
                rows="4"
                placeholder="Task description..."
                style={{ ...inputStyle, resize: "vertical" }}
                onFocus={(e) => (e.target.style.borderColor = "#7c3aed")}
                onBlur={(e) => (e.target.style.borderColor = "#e9d5ff")}
              />
              {err?.description && <span style={{ color: "#dc2626", fontSize: "0.75rem", marginTop: "4px", display: "block" }}>⚠ {err.description}</span>}
            </div>

            {/* Status */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={labelStyle}>Status</label>
              <select
                onChange={handleInput}
                name="status" 
                defaultValue={formData?.status || ""}
                style={{ ...inputStyle, cursor: "pointer" }}
                onFocus={(e) => (e.target.style.borderColor = "#7c3aed")}
                onBlur={(e) => (e.target.style.borderColor = "#e9d5ff")}
              >
                <option value="Pending">⏳ Pending</option>
                <option value="Running">🔵 Running</option>
                <option value="Completed">✅ Completed</option>
                <option value="Failed">❌ Failed</option>
              </select>
              {err?.status && <span style={{ color: "#dc2626", fontSize: "0.75rem", marginTop: "4px", display: "block" }}>⚠ {err.status}</span>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              style={{
                width: "100%", padding: "11px", borderRadius: "10px",
                border: "none", background: "linear-gradient(135deg, #7c3aed, #5b21b6)",
                color: "#fff", fontWeight: 600, fontSize: "0.9rem",
                cursor: "pointer", boxShadow: "0 4px 14px rgba(109,40,217,0.35)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              ✓ Save Changes
            </button>
          </form>
        ) : (
          <div style={{ textAlign: "center", padding: "2rem", color: "#9ca3af" }}>
            <div style={{ fontSize: "2rem", marginBottom: "8px" }}>🔍</div>
            <p style={{ color: "#6d28d9", fontWeight: 600 }}>Task not found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowTask;