import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../../services/AuthContext';
import '../../../styles/EditProject.css';

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('IN_PROGRESS');
  const { token } = useAuth(); // Access token from AuthContext

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/projects/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setName(response.data.name);
        setDescription(response.data.description);
        setStatus(response.data.status);
      } catch (error) {
        console.error('Error fetching project data:', error);
      }
    };
    fetchProject();
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedProject = { name, description, status };

    try {
      await axios.put(`http://localhost:8080/api/projects/${id}`, updatedProject, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      navigate(`/projects/${id}`);
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  return (
    <div className="create">
      <h2>Edit Project</h2>
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
        <br />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProject;
