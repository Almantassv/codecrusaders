import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../services/AuthContext';
import '../../../styles/ProjectList.css';
import editIcon from '../../../assets/edit.svg';
import deleteIcon from '../../../assets/delete.svg';
import axios from 'axios';

const ProjectList = ({ projects }) => {
  const { token } = useAuth(); // Access token from AuthContext

  // State to manage the confirmation modal
  const [showModal, setShowModal] = useState(false);
  const [projectIdToDelete, setProjectIdToDelete] = useState(null);

  // Function to handle deletion of project
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/projects/${projectIdToDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Optionally, you can update the project list after deletion
      // For example, you can refetch the project list data here
    } catch (error) {
      console.error('Error:', error);
    }
    // Close the modal after deletion
    setShowModal(false);
  };

  return (
    <div className="projects-container">
      <h1 className="projects-title">Projects</h1>
      <div className="project-list">
        {projects.map(project => (
          <div className="project-preview" key={project.id}>
            <Link to={`/projects/${project.id}`}>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <p>Status: {project.status}</p>
              <div className="project-details">
                <p>Total tasks: {project.totalTasks}</p>
                <p>Completed tasks: {project.completedTasks}</p>
              </div>
              {/* If you want to conditionally render edit and delete buttons based on user authentication */}
              {token && (
                <div className="project-actions">
                  <button className="action-btn">
                    <img src={editIcon} alt="Edit Icon" />
                  </button>
                  <button className="action-btn" onClick={() => { setShowModal(true); setProjectIdToDelete(project.id); }}>
                    <img src={deleteIcon} alt="Delete Icon" />
                  </button>
                </div>
              )}
            </Link>
          </div>
        ))}
      </div>
      <Link to="/create">
        <button className="new-project-btn">+ New Project</button>
      </Link>
      {/* Confirmation modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to delete this project?</p>
            <div>
              <button onClick={handleDelete}>Yes</button>
              <button onClick={() => setShowModal(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectList;