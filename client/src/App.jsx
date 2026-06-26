import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import TaskListPage from './pages/TaskListPage'
import ShowTask from './pages/ShowTask'
import AddTaskPage from './pages/AddTaskPage'

const App = () => {
  return (
    <BrowserRouter>
<Routes>
  <Route path="/" element={<Layout />}>
    <Route index element={<HomePage />} />
    <Route path="add-task" element={<AddTaskPage />} />
    <Route path="task-list" element={<TaskListPage />} />
    <Route path="task/:taskid" element={<ShowTask />} />

    {/* Old Routes
    <Route path="task-list" element={<TaskListPage />} />
    <Route path="show-task/:taskid" element={<ShowTask />} />
    */}
  </Route> 
</Routes>
    </BrowserRouter>
  )
}

export default App