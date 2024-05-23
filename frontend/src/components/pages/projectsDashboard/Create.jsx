import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from "../../../services/AuthContext";
import '../../../styles/Create.css';

const Create = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { token } = useAuth(); // Access token from AuthContext

  const validateForm = () => {
    const newErrors = {};
    if (!name) {
      newErrors.name = 'Project Name is required';
    }
    if (!description) {
      newErrors.description = 'Description is required';
    }
    if (!priority) {
      newErrors.priority = 'Priority is required';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const project = { name, description, priority, status: 'IN_PROGRESS' };

    try {
      await axios.post('http://localhost:8080/api/projects', project, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      navigate('/list');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to create project. Please check your input and try again.');
    }
  }

  const handleCancel = () => {
    navigate(-1); // Navigate back to the previous page
  }

  return (
    <div className="create">
      <h1>Create New Project</h1>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Project Name: </label>
          <input
            value={name}
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>
        <div className="form-group">
          <label>Description: </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.description && <span className="error-message">{errors.description}</span>}
        </div>
        <div className="form-group">
          <label>Priority: </label>
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="">Select Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          {errors.priority && <span className="error-message">{errors.priority}</span>}
        </div>
        <button type="submit" onClick={handleSubmit}>Create Project</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
}

export default Create;
