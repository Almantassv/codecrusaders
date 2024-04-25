import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from "../../../services/AuthContext";

const Create = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('IN_PROGRESS');
  const navigate = useNavigate();
  const { token } = useAuth(); // Access token from AuthContext

  const handleSubmit = async (e) => {
    e.preventDefault();
    const project = { name, description, status };
  
    try {
      const response = await axios.post('http://localhost:8080/api/projects', project, {
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
  
  return (
    <div className="create">
      <h1>Create New Project</h1>
      <form onSubmit={handleSubmit}>
        <label>Project Name *</label>
        <input
          value={name}
          type="text" 
          required 
          onChange={(e) => setName(e.target.value)}
        >
        </input>
        <label>Description</label>
        <textarea
          value={description}
          required
          onChange={(e) => setDescription(e.target.value)}
        >
        </textarea>
        <label>Status</label>
        <select
        value={status} 
        onChange={(e) => setStatus(e.target.value)}>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </select>
        <button>Create Project</button>
      </form>
    </div>
  );
}
 
export default Create;