import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../services/AuthContext"; // Correct import for AuthContext

const DeleteProjectPage = () => {
  const { projectId } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/projects/${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/list"); // Redirect to the project list after deletion
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <div className="delete-project-page">
      <h2>Are you sure you want to delete this project?</h2>
      <button onClick={handleDelete}>Yes, Delete</button>
      <button onClick={() => navigate(-1)}>No, Go Back</button>
    </div>
  );
};

export default DeleteProjectPage;

