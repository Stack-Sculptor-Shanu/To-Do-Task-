import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import Modal from "./components/Modal";
import "./index.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const API_URL = "https://to-do-backend-1peq.onrender.com/tasks";

  // Fetch tasks from JSON server
  useEffect(() => {
    axios.get(API_URL).then((res) => setTasks(res.data));
  }, []);

  // Add new task
  const addTask = async (task) => {
    const res = await axios.post(API_URL, { ...task, completed: false });
    setTasks([...tasks, res.data]);
    setIsModalOpen(false);
  };

  // Delete task
  const deleteTask = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle completion
  const toggleComplete = async (id, completed) => {
    await axios.patch(`${API_URL}/${id}`, { completed: !completed });
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !completed } : task
      )
    );
  };

  // Categorize tasks
  const today = new Date().toISOString().split("T")[0];
  const todayTasks = tasks.filter(
    (task) => task.dueDate === today && !task.completed
  );
  const upcomingTasks = tasks.filter(
    (task) => task.dueDate > today && !task.completed
  );
  const overdueTasks = tasks.filter(
    (task) => task.dueDate < today && !task.completed
  );
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">
        📝 To-Do App
      </h1>

      {/* Task Categories */}
      <div className="grid md:grid-cols-2 gap-6">
        <TaskList
          title="Today"
          tasks={todayTasks}
          onDelete={deleteTask}
          onToggle={toggleComplete}
        />
        <TaskList
          title="Upcoming"
          tasks={upcomingTasks}
          onDelete={deleteTask}
          onToggle={toggleComplete}
        />
        <TaskList
          title="Overdue"
          tasks={overdueTasks}
          onDelete={deleteTask}
          onToggle={toggleComplete}
        />
        <TaskList
          title="Completed"
          tasks={completedTasks}
          onDelete={deleteTask}
          onToggle={toggleComplete}
        />
      </div>

      {/* Add Task Button */}
      <div className="flex justify-center mt-8">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 transition"
        >
          ➕ Add Task
        </button>
      </div>

      {/* Modal with TaskForm */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <TaskForm onSave={addTask} onCancel={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}

export default App;
