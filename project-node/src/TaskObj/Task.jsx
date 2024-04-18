// Task.js
import React from 'react';

const Task = ({ task }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', marginBottom: '10px' }}>
      <h3>Task ID: {task.id}</h3>
      <h4>Task Name: {task.name}</h4>
      <p>Description: {task.description}</p>
      <p>Priority: {task.priority}</p>
      <p>Status: {task.status}</p>
      <p>Creation Date: {formatDate(task.creationDate)}</p>
      <p>Last Updated: {formatDate(task.lastUpdated)}</p>
    </div>
  );
};

export default Task;