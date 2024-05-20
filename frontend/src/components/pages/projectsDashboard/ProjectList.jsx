import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../services/AuthContext';
import '../../../styles/ProjectList.css';
import axios from 'axios';
import SearchBar from '../SearchBar';
import Paging from '../Paging';

const ProjectList = ({ projects, projectsPage, updateProjects, reachedMaxPage }) => {
  const { token } = useAuth();

  // State to manage the confirmation modal
  const [showModal, setShowModal] = useState(false);
  const [projectIdToDelete, setProjectIdToDelete] = useState(null);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/projects/${projectIdToDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('Error:', error);
    }
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
      const incompletedTasks = project.tasks.filter(task => task.status === "TODO", "IN_PROGRESS").length;
      return { totalTasks, incompletedTasks };
    }
    return { totalTasks: 0, completedTasks: 0 };
  };

  // Function to rename status values
  const renameStatus = (originalStatus) => {
    // Define mapping of original status values to renamed values
    const statusMap = {
      'TODO': 'To Do',
      'IN_PROGRESS': 'In Progress',
      'COMPLETED': 'Completed',
      // Add more mappings as needed
    };

    // Return renamed status value if mapping exists, otherwise return the original status value
    return statusMap[originalStatus] || originalStatus;
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
      <Paging pageNum={projectsPage} update={updateProjects} reachedMaxPage={reachedMaxPage} />
      <div className="project-list">
        {projects.map(project => {
          const { totalTasks, incompletedTasks } = calculateTasks(project.id);
          return (
            <div className="project-preview" key={project.id}>
              <Link to={`/projects/${project.id}`}>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <p>Status: {renameStatus(project.status)}</p>
                <div className="project-details">
                  <p>Total tasks: {totalTasks}</p>
                  <p>Incomplete tasks: {incompletedTasks}</p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
      {/* <Link to="/create">
        <button className="new-project-btn">+ New Project</button>
      </Link> */}
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