import React from "react";
import TaskItem from "./TaskItem";

function TaskList({ title, tasks, onDelete, onToggle }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold text-gray-700 mb-3">{title}</h2>
      {tasks.length === 0 ? (
        <p className="text-gray-400 text-sm">No tasks available</p>
      ) : (
        <ul className="space-y-3">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={onDelete}
              onToggle={onToggle}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
