import { Link } from 'react-router-dom';
import axios from 'axios';
import './ProjectList.css';
import editIcon from './edit.svg';
import deleteIcon from './delete.svg';
import { authenticate } from './utils/auth/auth';

const ProjectList = ({ projects }) => {

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
              <div className="project-actions">
                <button className="action-btn">
                <img src={editIcon} alt="Edit Icon" />
                </button>
                <button className="action-btn">
                <img src={deleteIcon} alt="Delete Icon" />
                </button>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <Link to="/create">
      <button className="new-project-btn">+ New Project</button>
      </Link>
    </div>
  );
}

export default ProjectList;