import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { authenticate } from "./utils/auth/auth";

const Create = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('IN_PROGRESS');
  const [error, setError] = useState(''); // Add error state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const project = { name, description, status };
    setError(''); // Clear previous error

    try {
      authenticate();
      await axios.post('http://localhost:8080/api/projects', project);
      navigate('/list'); // Navigate to the list page after successful creation
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to create project. Please check your input and try again.'); // Set error message
    }
  }

  return (
    <div className="create">
      <h1>Create New Project</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
      <form onSubmit={handleSubmit}>
        <label>Project Name *</label>
        <input
          value={name}
          type="text"
          required
          onChange={(e) => setName(e.target.value)}
        />
        <label>Description</label>
        <textarea
          value={description}
          required
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </select>
        <button type="submit">Create Project</button>
      </form>
    </div>
  );
}

export default Create;