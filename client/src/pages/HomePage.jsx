import React, { useState } from "react";
import { z, ZodError } from 'zod'
import { getZodError } from "../helper/getZodError";
import { showToast } from "../helper/showToast";
// const HomePage = () => {

//     const [formData, setFormData] = useState()
//     const [err, setError] = useState()

//     const taskSchema = z.object({
//         title: z.string().min(3, { message: "Title must be at least 3 character long." }),
//         description: z.string().min(3, { message: "Description must be at least 3 character long." }).max(500, { message: 'Lenght acceeded.' })
//     })

//     const handleInput = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value })
//     }
 
//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         try {
//             const validatedData = taskSchema.parse(formData)
//             const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/task/create-task`,
//                 {
//                     method: "POST",
//                     headers: { 'Content-type': 'application/json' },
//                     body: JSON.stringify(validatedData)
//                 })

//             const responseData = await response.json()
//             if (!response.ok) {
//                 throw new Error(responseData.message)
//             }
//             setFormData({})
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
//             <h1 className="text-2xl font-bold mb-5">Add Task</h1>
//             <form onSubmit={handleSubmit}>
//                 <div className="mb-5">
//                     <label className="block mb-2 text-sm font-medium text-gray-900 ">
//                         Title
//                     </label>
//                     <input value={formData?.title || ''} onChange={handleInput} name="title"
//                         type="text"
//                         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//                         placeholder="Task title"
//                         required
//                     />
//                     {err && err.title && <span className="text-red-500 text-sm">{err.title}</span>}
//                 </div>
//                 <div className="mb-5">
//                     <label className="block mb-2 text-sm font-medium text-gray-900 ">
//                         Description
//                     </label>
//                     <textarea value={formData?.description || ''} onChange={handleInput} name="description"
//                         rows="4"
//                         className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
//                         placeholder="Task description..."
//                     ></textarea>
//                     {err && err.description && <span className="text-red-500 text-sm">{err.description}</span>}
//                 </div>

//                 <button
//                     type="submit"
//                     className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
//                 >
//                     Submit
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default HomePage;










// HomePage.jsx

const HomePage = () => {
  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-3xl text-center">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
          Welcome to Task Manager
        </h1>

        <p className="text-lg text-gray-600 mb-8">
          Stay organized, manage your daily tasks, and boost your productivity
          with a simple and powerful Task Manager.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-indigo-100 p-5 rounded-xl shadow">
            <div className="text-5xl mb-3">📝</div>
            <h2 className="text-xl font-bold">Add Tasks</h2>
            <p className="text-gray-600 mt-2">
              Create new tasks quickly and easily.
            </p>
          </div>

          <div className="bg-green-100 p-5 rounded-xl shadow">
            <div className="text-5xl mb-3">📋</div>
            <h2 className="text-xl font-bold">Manage Tasks</h2>
            <p className="text-gray-600 mt-2">
              View, update and organize your tasks.
            </p>
          </div>

          <div className="bg-yellow-100 p-5 rounded-xl shadow">
            <div className="text-5xl mb-3">✅</div>
            <h2 className="text-xl font-bold">Stay Productive</h2>
            <p className="text-gray-600 mt-2">
              Complete tasks on time and achieve your goals.
            </p>
          </div>
        </div>

        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition duration-300">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default HomePage;
























