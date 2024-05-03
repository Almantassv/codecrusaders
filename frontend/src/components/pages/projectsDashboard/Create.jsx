import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from "../../../services/AuthContext";
import '../../../styles/Create.css';
 
const Create = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const { token } = useAuth(); // Access token from AuthContext
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const project = { name, description, priority };
 
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
 
  const handleCancel = () => {
    navigate(-1); // Navigate back to the previous page
  }
 
  return (
    <div className="create">
      <h1>Create New Project</h1>
      <form onSubmit={handleSubmit}>
        <label>Project Name: </label>
        <input
          value={name}
          type="text"
          required
          onChange={(e) => setName(e.target.value)}
        >
        </input>
        <label>Description: </label>
        <textarea
          value={description}
          required
          onChange={(e) => setDescription(e.target.value)}
        >
        </textarea>
        <button type="submit">Create Project</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
}
 
export default Create;
