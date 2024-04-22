import { useNavigate, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { authenticate } from "./utils/auth/auth";

const ProjectDetails = () => {
  const { id } = useParams();
  const { data: project, error, isPending } = useFetch(`http://localhost:8080/api/projects/${id}`);
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      authenticate(); // Authenticate the user before making the API request
      await axios.delete(`http://localhost:8080/api/projects/${project.id}`);
      navigate('/list');
    } catch (error) {
      console.error('Error:', error);
    }
  }
  return (
    <div className="project-details">
      { isPending && <div>Loading...</div> }
      { error && <div>{ error }</div> }
      { project && (
        <article>
          <h2>Project Name: { project.name }</h2>
          <h3>Description: { project.description }</h3>
          <h3>Status: { project.status }</h3>
          <button onClick={handleClick}>Delete</button>
          <Link to={`/projects/${project.id}/edit`}><button>Edit</button></Link>
        </article>
      )}
    </div>
  );
}
 
export default ProjectDetails;