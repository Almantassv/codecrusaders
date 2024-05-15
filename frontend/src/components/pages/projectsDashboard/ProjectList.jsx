import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../services/AuthContext';
import '../../../styles/ProjectList.css';
import axios from 'axios';
import SearchBar from '../SearchBar';

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

  // Function to export projects to CSV
  const exportToCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," +
      projects.map(project => `${project.id},${project.name},${project.description},${project.status},${project.totalTasks},${project.completedTasks}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "projects.csv");
    document.body.appendChild(link);
    link.click();
  };

  const calculateTasks = (projectId) => {
    const project = projects.find(project => project.id === projectId);
    if (project) {
      const totalTasks = project.tasks.length;
      const completedTasks = project.tasks.filter(task => task.status === "DONE").length;
      return { totalTasks, completedTasks };
    }
    return { totalTasks: 0, completedTasks: 0 };
  };

  // Function to format project status
  const formatStatus = (status) => {
    if (status === 'IN_PROGRESS') {
      return 'In progress';
    } else if (status === 'COMPLETED') {
      return 'Completed';
    }
    return status; // Return status as is if not IN_PROGRESS or COMPLETED
  };

  return (
    <div className="projects-container">
      <div className='projects-header'>
        <h1 className="projects-title">Projects</h1>
        <SearchBar />
        <div className='button-group'>
          <button className='export-btn' onClick={exportToCSV}>Export projects to CSV</button>
          <Link to="/create">
            <button className="new-project-btn">+ New Project</button>
          </Link>
        </div>
      </div>
      <div className="project-list">
        {projects.map(project => {
          const { totalTasks, completedTasks } = calculateTasks(project.id);
          return (
            <div className="project-preview" key={project.id}>
              <Link to={`/projects/${project.id}`}>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <p>Status: {formatStatus(project.status)}</p>
                <div className="project-details">
                  <p>Total tasks: {totalTasks}</p>
                  <p>Completed tasks: {completedTasks}</p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
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
