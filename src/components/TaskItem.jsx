import React from "react";
import { Trash2 } from "lucide-react"; // icon library (install with `npm install lucide-react`)

function TaskItem({ task, onDelete, onToggle }) {
  const priorityColors = {
    High: "text-red-500",
    Medium: "text-yellow-500",
    Low: "text-green-500",
  };

  return (
    <li className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
      {/* Left side: checkbox + details */}
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id, task.completed)}
          className="w-4 h-4 text-indigo-600 rounded"
        />
        <div>
          <h3
            className={`font-medium ${
              task.completed ? "line-through text-gray-400" : "text-gray-700"
            }`}
          >
            {task.title}
          </h3>
          <p className="text-xs text-gray-500">
            Due: {task.dueDate || "No date"}
          </p>
          <p className={`text-xs ${priorityColors[task.priority]}`}>
            Priority: {task.priority}
          </p>
        </div>
      </div>

      {/* Right side: delete button */}
      <button
        onClick={() => onDelete(task.id)}
        className="text-gray-400 hover:text-red-500 transition"
      >
        <Trash2 size={18} />
      </button>
    </li>
  );
}

export default TaskItem;
