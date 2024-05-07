import React from 'react';

const Task = ({ task, onDeleteTask }) => {
  return (
    <li className="task-item" key={task.id}>
      <div className="task-name">{task.name}</div>
      <div className="task-description">Description: {task.description}</div>
      <div>Priority: {task.priority}</div>
      <div>Status: {task.status}</div>
      <div className="task-controls">
        <button onClick={() => onDeleteTask(task.id)}>Delete</button>
      </div>
    </li>
  );
};

export default Task;
