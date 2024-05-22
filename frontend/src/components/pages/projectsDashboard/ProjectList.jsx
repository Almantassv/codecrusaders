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
      const incompletedTasks = project.tasks.filter(task => task.status === "TODO" || task.status === "IN_PROGRESS").length;
      const completedTasks = totalTasks - incompletedTasks ; // Calculate completed tasks
      const percentageCompleted = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100; // Calculate percentage
      return { incompletedTasks, totalTasks, percentageCompleted };
    }
    return { totalTasks: 0, incompletedTasks: 0, percentageCompleted: 0 };
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

  const truncateDescription = (description) => {
    if (description.length > 200) {
      return `${description.substring(0, 200)}...`;
    }
    return description;
  };

  const getProgressColor = (completedTasks, totalTasks) => {
    if (totalTasks === 0) {
      return '#ADA0A0'; // Black color for 0/0 progress
    } else {
    const progressPercentage = (completedTasks / totalTasks) * 100;
    if (progressPercentage < 25) {
      return '#E61111'; // Red color for less than 25% progress
    } else if (progressPercentage < 50) {
      return '#F3572B'; // Orange color for less than 50% progress
    } else if (progressPercentage < 75) {
      return '#FDD346'; // Yellow color for less than 75% progress
    } else {
      return '#79C343'; // Green color for 75% or more progress
    }
  }
  };
  
  return (
    <div className="projects-container">
      <div className='projects-header'>
          <div className='align'>
        <h1 className="projects-title">Projects</h1>
        <SearchBar />
        </div>
        <div className='button-group'>
        <button className='export-btn' onClick={exportToCSV}></button>
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
                <div className='description'>{truncateDescription(project.description)}</div>
                <div className='status'>{renameStatus(project.status)}</div>
                <div className="project-details">
                  <p>Total Tasks: {totalTasks}</p>
                  <p>Incomplete: {incompletedTasks}</p>
                  <div className="progress-bar">
    <div className="progress" style={{ width: `${((totalTasks-incompletedTasks) / totalTasks) * 100}%`, backgroundColor: getProgressColor(incompletedTasks, totalTasks) }}></div>
  </div>
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