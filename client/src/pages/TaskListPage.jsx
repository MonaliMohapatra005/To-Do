// import React, { useEffect, useState } from "react";
// import Badge from "../components/Badge";
// import { Link } from "react-router-dom";
// import Task from "../components/Task";
// import { showToast } from "../helper/showToast";
// const TaskListPage = () => {
//     const [referesh, setReferesh] = useState(false)
//     const [tasks, setTasks] = useState()
//     useEffect(() => {
//         setReferesh(false)
//         const getTask = async () => {
//             const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/task/get-all-task`)
//             const responseData = await response.json()
//             setTasks(responseData)
//         }
//         getTask()
//     }, [referesh])

//     const deleteTask = async (taskid) => {
//         try {
//             const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/task/delete-task/${taskid}`, {
//                 method: 'DELETE'
//             })
//             const responseData = await response.json()
//             if (!response.ok) {
//                 throw new Error(responseData.message)
//             }
//             setReferesh(true)
//             showToast('success', responseData.message)
//         } catch (error) {
//             showToast('error', error.message)
//         }
//     }

//     return (
//         <div className="pt-5">
//             <h1 className="text-2xl font-bold mb-5">My Tasks</h1>

//             {tasks && tasks.status ?
//                 tasks.taskData.length > 0 ? tasks.taskData.map((task) => <Task key={task._id} props={task} onDelete={deleteTask} />) : <>0 Task.</>
//                 :
//                 <>Loading...</>
//             }

//         </div>
//     );
// };

// export default TaskListPage;















import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { showToast } from "../helper/showToast";

const statusColors = {
  Pending:   { bg: "#fef3c7", text: "#92400e", dot: "#f59e0b" },
  Running:   { bg: "#dbeafe", text: "#1e40af", dot: "#3b82f6" },
  Completed: { bg: "#d1fae5", text: "#065f46", dot: "#10b981" },
  Failed:    { bg: "#fee2e2", text: "#991b1b", dot: "#ef4444" },
};

const TaskListPage = () => {
  const [refresh, setRefresh] = useState(false);
  const [tasks, setTasks] = useState();

  useEffect(() => {
    setRefresh(false);
    const getTask = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/task/get-all-task`);
      const responseData = await response.json();
      setTasks(responseData);
    };
    getTask();
  }, [refresh]);

  const deleteTask = async (taskid) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/task/delete-task/${taskid}`, {
        method: "DELETE",
      });
      const responseData = await response.json();
      if (!response.ok) throw new Error(responseData.message);
      setRefresh(true);
      showToast("success", responseData.message);
    } catch (error) {
      showToast("error", error.message);
    }
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 66px)",
        background: "linear-gradient(160deg, #f5f3ff 0%, #ede9fe 100%)",
        padding: "2rem 1rem",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div style={{ maxWidth: "680px", margin: "0 auto" }}>
        {/* Page header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "40px", height: "40px", borderRadius: "11px",
                background: "linear-gradient(135deg, #7c3aed, #5b21b6)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 4px 12px rgba(109,40,217,0.35)",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <rect x="9" y="3" width="6" height="4" rx="1" stroke="white" strokeWidth="2" />
                <line x1="9" y1="12" x2="15" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <line x1="9" y1="16" x2="13" y2="16" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <h1 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 700, color: "#3b0764" }}>My Tasks</h1>
              <p style={{ margin: 0, fontSize: "0.75rem", color: "#9ca3af" }}>
                {tasks?.taskData?.length ?? "..."} task{tasks?.taskData?.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          <Link
            to="/add-task"
            style={{
              display: "flex", alignItems: "center", gap: "6px",
              padding: "8px 16px", borderRadius: "10px",
              background: "linear-gradient(135deg, #7c3aed, #5b21b6)",
              color: "#fff", fontWeight: 600, fontSize: "0.82rem",
              textDecoration: "none", boxShadow: "0 4px 12px rgba(109,40,217,0.3)",
            }}
          >
            ➕ Add Task
          </Link>
        </div>

        {/* Task list */}
        {!tasks ? (
          <div style={{ textAlign: "center", padding: "3rem", color: "#9ca3af" }}>Loading...</div>
        ) : tasks.status && tasks.taskData.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {tasks.taskData.map((task) => {
              const sc = statusColors[task.status] || statusColors.Pending;
              return (
                <div
                  key={task._id}
                  style={{
                    background: "#fff",
                    borderRadius: "14px",
                    padding: "1rem 1.2rem",
                    border: "1px solid #ede9fe",
                    boxShadow: "0 2px 12px rgba(109,40,217,0.07)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "1rem",
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                      <h3 style={{ margin: 0, fontSize: "0.95rem", fontWeight: 700, color: "#3b0764", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {task.title}
                      </h3>
                      <span
                        style={{
                          flexShrink: 0,
                          display: "inline-flex", alignItems: "center", gap: "4px",
                          padding: "2px 9px", borderRadius: "999px",
                          fontSize: "0.68rem", fontWeight: 600,
                          background: sc.bg, color: sc.text,
                        }}
                      >
                        <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: sc.dot, display: "inline-block" }} />
                        {task.status}
                      </span>
                    </div>
                    <p style={{ margin: 0, fontSize: "0.8rem", color: "#6b7280", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {task.description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                    <Link
                      to={`/task/${task._id}`}
                      style={{
                        padding: "6px 12px", borderRadius: "8px",
                        background: "#f5f3ff", color: "#6d28d9",
                        fontSize: "0.78rem", fontWeight: 600,
                        textDecoration: "none", border: "1px solid #e9d5ff",
                      }}
                    >
                      ✏ Edit
                    </Link>
                    <button
                      onClick={() => deleteTask(task._id)}
                      style={{
                        padding: "6px 12px", borderRadius: "8px",
                        background: "#fef2f2", color: "#dc2626",
                        fontSize: "0.78rem", fontWeight: 600,
                        border: "1px solid #fecaca", cursor: "pointer",
                      }}
                    >
                      🗑 Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div
            style={{
              textAlign: "center", padding: "3rem",
              background: "#fff", borderRadius: "14px",
              border: "1px solid #ede9fe", color: "#9ca3af",
            }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: "8px" }}>📭</div>
            <p style={{ margin: 0, fontWeight: 600, color: "#6d28d9" }}>No tasks yet</p>
            <p style={{ margin: "4px 0 0", fontSize: "0.8rem" }}>Add your first task to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskListPage;