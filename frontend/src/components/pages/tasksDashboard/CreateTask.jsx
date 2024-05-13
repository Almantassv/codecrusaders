import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../../services/useAuth';

const CreateTask = () => {
  const { id: projectId } = useParams(); // Extract project ID from URL
  const { token } = useAuth();
  const navigate = useNavigate();
  const [taskData, setTaskData] = useState({
    name: '',
    description: '',
    priority: '', // Default priority to an empty string
    status: '' // Default status to an empty string
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8080/api/projects/${projectId}/tasks`,
        taskData,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      navigate(`/projects/${projectId}`);
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Failed to create task. Please try again.');
    }
  };
  
  const handleCancel = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="create">
      <h1>Create New Task</h1>
      <form onSubmit={handleSubmit}>
        <label>Name: </label>
        <input
          type="text"
          name="name"
          value={taskData.name}
          onChange={handleChange}
          required
        />
        <label>Description: </label>
        <input
          type="text"
          name="description"
          value={taskData.description}
          onChange={handleChange}
          required
        />
        <label>Priority: </label>
        <select
          name="priority"
          value={taskData.priority}
          onChange={handleChange}
          required
        >
          <option value="">Select Priority</option>
          <option value="HIGH">High</option>
          <option value="MEDIUM">Medium</option>
          <option value="LOW">Low</option>
        </select>
        <label>Status: </label>
        <select
          name="status"
          value={taskData.status}
          onChange={handleChange}
          required
        >
          <option value="">Select Status</option>
          <option value="TODO">To Do</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="DONE">Done</option>
        </select>
        <button type="submit">Create Task</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default CreateTask;
