import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../../services/useAuth';
import '../../../styles/CreateTask.css';

const CreateTask = () => {
  const { id: projectId } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [taskData, setTaskData] = useState({
    name: '',
    description: '',
    priority: '',
    status: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
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

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="create-task">
      <h1>Create New Task</h1>
      <form onSubmit={handleSubmit} className="create-task-form">
        <label>Name: </label>
        <input
          type="text"
          name="name"
          value={taskData.name}
          onChange={handleChange}
          required
        />
        <label>Description: </label>
        <textarea
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
        <div className="form-buttons">
          <button type="submit">Create Task</button>
          <button type="button" onClick={handleBack}>Cancel</button>
          <button onClick={handleBack} style={{ backgroundColor: '#3b256e', color: 'white', border: 'none', cursor: 'pointer', marginLeft: '151px'}}>Back to Project</button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
