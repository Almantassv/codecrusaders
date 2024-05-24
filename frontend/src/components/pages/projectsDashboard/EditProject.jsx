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
  const { token } = useAuth();

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(prevName => value);
    } else if (name === 'description') {
      setDescription(prevDescription => value);
    } else if (name === 'status') {
      setStatus(prevStatus => value);
    }
  };
  

  return (
    <div className="create">
      <h2>Edit Project</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <label>Project Name</label>
        <input
          name='name'
          value={name}
          type="text" 
          required 
          onChange={handleChange}
        />
        <label>Description</label>
        <textarea
          name='description'
          value={description}
          required
          onChange={handleChange}
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
        <button type="submit" onClick={handleSubmit}>Save Changes</button>
      </form>
    </div>
  );
};

export default EditProject;
