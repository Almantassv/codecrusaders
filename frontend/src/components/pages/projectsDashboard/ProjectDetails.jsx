import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../services/useAuth";
import useFetch from "../../../services/useFetch";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../../styles/ProjectDetails.css";
import TaskBoard from "../tasksDashboard/TaskBoard";

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
  const [showTaskBoard, setShowTaskBoard] = useState(false);
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
  const [showModal, setShowModal] = useState(false);

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
      // Redirect to projects list or any other appropriate page after deletion
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

  const statusIcons = {
    TODO: todo,
    IN_PROGRESS: in_progress,
    DONE: done
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

  return (
    <div className="project-details">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {project && (
        <article>
          <h2>{project.name} Id: {project.id}</h2>
          <h3>Description: {project.description}</h3>
          <h3>Status: {project.status}</h3>
          <h3>Members: </h3>
          <h3>Tasks: </h3>
          {/* Search Bar */}
          <input
            type="text"
            className="task-search-bar"
            placeholder="Search tasks"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {selectedTaskId && (
            <button className="confirm-delete-button-red" onClick={handleClickDelete}>Confirm Delete</button>
          )}
          <ul className="task-list">
            {filteredTasks.map((task) => (
              <div className={`task-item task-priority-${task.priority.toLowerCase()}`} key={task.id}>
                <div className="task-header">
                  <div className="task-name">{task.name}</div>
                  <div className="task-status">
                    <img src={statusIcons[task.status]} alt={task.status} />
                  </div>
                </div>
                <div className="task-description">
                  <span className="description-label">Description:</span> {task.description}
                </div>
                <div className="task-priority">
                  <span className="priority-label">Priority:</span> {task.priority}
                </div>
                <div className="task-controls">
                  <button className="delete-task-btn" onClick={() => setSelectedTaskId(task.id)}>
                    <i className="fas fa-trash"></i> Delete
                  </button>
                  
                  {editingTask === null || editingTask.id !== task.id ? (
                    <button onClick={() => setEditingTask(task)}>Edit</button>
                  ) : (
                    <div className="edit-task-form-inline">
                      <label>Name: </label>
                      <input
                        type="text"
                        name="name"
                        value={editingTask.name}
                        onChange={(e) => setEditingTask({ ...editingTask, name: e.target.value })}
                        required
                      />
                      <label>Description: </label>
                      <textarea
                        name="description"
                        value={editingTask.description}
                        onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                        required
                      />
                      <label>Priority: </label>
                      <select
                        name="priority"
                        value={editingTask.priority}
                        onChange={(e) => setEditingTask({ ...editingTask, priority: e.target.value })}
                        required
                      >
                        <option value="HIGH">High</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="LOW">Low</option>
                      </select>
                      <label>Status: </label>
                      <select
                        name="status"
                        value={editingTask.status}
                        onChange={(e) => setEditingTask({ ...editingTask, status: e.target.value })}
                        required
                      >
                        <option value="TODO">To Do</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="DONE">Done</option>
                      </select>
                      <button onClick={() => handleEditTask(editingTask)}>Save</button>
                      <button onClick={() => setEditingTask(null)}>Cancel</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </ul>
          
          <button onClick={() => setShowTaskBoard(!showTaskBoard)}>
            {showTaskBoard ? "Hide Task Board" : "Show Task Board"}
          </button>
          {showTaskBoard && <TaskBoard projectId={project.id} />}

          <button onClick={() => setShowModal(true)}>Delete Project</button>
          <Link to={`/projects/${project.id}/edit`}>
            <button>Edit</button>
          </Link>
          <Link to={`/projects/${project.id}/create-task`}>
            <button>Create Task</button>
          </Link>
          {showModal && (
            <div className="modal">
              <div className="modal-content">
                <p>Are you sure you want to delete this project?</p>
                <div>
                  <button onClick={handleClickDeleteProject}>Yes</button>
                  <button onClick={() => setShowModal(false)}>No</button>
                </div>
              </div>
            </div>
          )}
        </article>
      )}
    </div>
  );
};

export default ProjectDetails;
