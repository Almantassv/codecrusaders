import React from 'react';
import ProjectList from "./ProjectList";
import useFetch from "../../../services/useFetch";
import { useAuth } from '../../../services/AuthContext';

const Home = () => {
  const { token } = useAuth(); // Access token from AuthContext
  const { error, isPending, data: projects } = useFetch('http://localhost:8080/api/projects', token);

  return (
    <div className="home">
      { error && <div>{ error }</div> }
      { isPending && <div>Loading...</div> }
      { projects && <ProjectList projects={projects} /> }
    </div>
  );
}

export default Home;
