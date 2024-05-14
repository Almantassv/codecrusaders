import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../services/useAuth";
import useFetch from "../../../services/useFetch";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../../styles/ProjectDetails.css";
import TaskBoard from "../tasksDashboard/TaskBoard";


const ProjectDetails = () => {
  const { id } = useParams();
  const { token } = useAuth(); // Access token from AuthContext
  const { data: project, error, isPending } = useFetch(
    `http://localhost:8080/api/projects/${id}`,
    token
  );
  // Tasks
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
  const [showModal, setShowModal] = useState(false);

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

  const handleClick = async () => {
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

  // const handleClick = async () => {
  //   try {
  //     // Send a request to add a deletion request for the project
  //     await axios.post(`http://localhost:8080/api/projects/${project.id}/deletion-requests`, null, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     // Optionally, you can show a message indicating that the deletion request has been sent
  //     console.log("Deletion request sent for project:", project.id);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };
   

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
          <ul className="task-list">
  {tasks.map((task) => (
    <li className="task-item" key={task.id}>
      <div className="task-name">{task.name}</div>
      <div className="task-description">Description: {task.description}</div>
      <div>Priority: {task.priority}</div>
      <div>Status: {(task.status)}</div>
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

          <button onClick={() => setShowModal(true)}>Delete Project</button>
          <Link to={`/projects/${project.id}/edit`}>
            <button>Edit</button>
          </Link>
          <Link to={`/projects/${project.id}/create-task`}>
            <button>Create Task</button>
          </Link>
          {/* Confirmation modal */}
          {showModal && (
            <div className="modal">
              <div className="modal-content">
                <p>Are you sure you want to delete this project?</p>
                <div>
                  <button onClick={handleClick}>Yes</button>
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