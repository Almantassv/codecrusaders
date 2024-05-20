import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useAuth } from "../../../services/useAuth";
import useFetch from "../../../services/useFetch";
import axios from "axios";
import "../../../styles/ProjectDetails.css";


import done from '../../../assets/done.png';
import in_progress from '../../../assets/in_progress.png';
import todo from '../../../assets/todo.png';

const ProjectDetails = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const { data: project, error, isPending } = useFetch(
    `http://localhost:8080/api/projects/${id}`,
    token
  );

  const [tasks, setTasks] = useState([]);
  const [tasksError, setTasksError] = useState(null);
  const [tasksIsPending, setTasksIsPending] = useState(true);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

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
      setTasks(tasks.filter(task => task.id !== selectedTaskId));
      setSelectedTaskId(null);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleClickDeleteProject = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/list');
    } catch (error) {
      console.error("Error deleting project:", error);
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
    } catch (error) {
      console.error('Error updating project status:', error);
    }
  };


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

  const [editingTask, setEditingTask] = useState(null);

  const handleEditTask = async (updatedTask) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/projects/${id}/tasks/${updatedTask.id}`,
        updatedTask,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTasks(tasks.map((task) => (task.id === updatedTask.id ? response.data : task)));
      setEditingTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Failed to update task. Please try again.');
    }
  };

  const filteredTasks = tasks.filter(task =>
    task.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const statusIcons = {
    TODO: todo,
    IN_PROGRESS: in_progress,
    DONE: done
  };

  return (
    <div className="project-details">
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
            <button className="confirm-delete-button-red" onClick={handleClickDelete}>Confirm Delete</button>
          )}

          <button onClick={() => setShowTaskBoard(!showTaskBoard)}>
            {showTaskBoard ? "Hide Task Board" : "Show Task Board"}
          </button>
          {showTaskBoard && <TaskBoard projectId={project.id} />}

          <Link to={`/projects/${project.id}/delete`}>
            <button>Delete Project</button>
          </Link>
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
