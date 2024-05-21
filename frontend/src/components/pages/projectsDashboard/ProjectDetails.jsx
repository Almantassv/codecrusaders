import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useAuth } from "../../../services/useAuth";
import useFetch from "../../../services/useFetch";
import axios from "axios";
import "../../../styles/ProjectDetails.css";
import TaskBoard from "../tasksDashboard/TaskBoard";

const ProjectDetails = () => {
  const { id } = useParams();
  const { token, user } = useAuth(); // Assuming useAuth returns the user object with role
  const { data: project, error, isPending } = useFetch(
    `http://localhost:8080/api/projects/${id}`,
    token
  );

  const [tasks, setTasks] = useState([]);
  const [showTaskBoard, setShowTaskBoard] = useState(false);
  const [tasksError, setTasksError] = useState(null);
  const [tasksIsPending, setTasksIsPending] = useState(true);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/projects/${id}/tasks`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks(response.data);
        setTasksIsPending(false);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setTasksError("Error fetching tasks. Please try again later.");
        setTasksIsPending(false);
      }
    };

    fetchTasks();
  }, [id, token]);

  const navigate = useNavigate();

  const handleClickDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/projects/${project.id}/tasks/${selectedTaskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(tasks.filter(task => task.id !== selectedTaskId)); // Remove the deleted task from state
      setSelectedTaskId(null); // Reset selected task ID
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleProjectDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/projects/${project.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/list");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleProjectStatusChange = async (newStatus) => {
    try {
      await axios.put(
        `http://localhost:8080/api/projects/${id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Assuming the project status is updated successfully
    } catch (error) {
      console.error('Error updating project status:', error);
    }
  };

  const renameStatus = (originalStatus) => {
    const statusMap = {
      'TODO': 'To Do',
      'IN_PROGRESS': 'In Progress',
      'COMPLETED': 'Completed',
    };

    return statusMap[originalStatus] || originalStatus;
  };

  return (
    <div className="project-details">
      <button onClick={() => navigate(-1)}>Back</button>
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {project && (
        <article>
          <h2>{project.name} Id: {project.id}</h2>
          <h3>Description: {project.description}</h3>
          <h3>Status: {renameStatus(project.status)}</h3>
          <h3>Members: </h3>
          <h3>Tasks: </h3>
          <ul className="task-list">
            {tasks.map((task) => (
              <li className="task-item" key={task.id}>
                <div className="task-name">{task.name}</div>
                <div className="task-description">Description: {task.description}</div>
                <div>Priority: {task.priority}</div>
                <div>Status: {task.status}</div>
                <div className="task-controls">
                  <button onClick={() => setSelectedTaskId(task.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
          {selectedTaskId && (
            <button onClick={handleClickDelete}>Confirm Delete</button>
          )}

          <button onClick={() => setShowTaskBoard(!showTaskBoard)}>
            {showTaskBoard ? "Hide Task Board" : "Show Task Board"}
          </button>
          {showTaskBoard && <TaskBoard projectId={project.id} />}

          {user.role === "admin" && (
            <Link to={`/projects/${project.id}/delete`}>
              <button onClick={handleProjectDelete}>Delete Project</button>
            </Link>
          )}
          <Link to={`/projects/${project.id}/edit`}>
            <button>Edit Project</button>
          </Link>
          <Link to={`/projects/${project.id}/create-task`}>
            <button>Create Task</button>
          </Link>
        </article>
      )}
    </div>
  );
};

export default ProjectDetails;
