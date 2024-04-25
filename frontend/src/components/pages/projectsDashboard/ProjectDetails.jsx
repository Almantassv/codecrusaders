import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../services/useAuth";
import useFetch from "../../../services/useFetch";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../../styles/ProjectDetails.css";

const ProjectDetails = () => {
  const { id } = useParams();
  const { token } = useAuth(); // Access token from AuthContext
  const { data: project, error, isPending } = useFetch(
    `http://localhost:8080/api/projects/${id}`,
    token
  );
  const navigate = useNavigate();

  // State to manage the confirmation modal
  const [showModal, setShowModal] = useState(false);

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

  return (
    <div className="project-details">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {project && (
        <article>
          <h2>Project Name: {project.name}</h2>
          <h3>Description: {project.description}</h3>
          <h3>Status: {project.status}</h3>
          <button onClick={() => setShowModal(true)}>Delete</button>
          <Link to={`/projects/${project.id}/edit`}>
            <button>Edit</button>
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