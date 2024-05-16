import React, { useState } from 'react';
import ProjectList from "./ProjectList";
import useFetch from "../../../services/useFetch";
import { useAuth } from '../../../services/AuthContext';
import "../../../styles/Home.css";

const Home = () => {
  const { token } = useAuth(); // Access token from AuthContext
  const [projectsPage, setProjectsPage] = useState(1);

  function getProjects() {
    return useFetch(`http://localhost:8080/api/projects?page=${projectsPage}`, token);
  }

  const { error, isPending, resCode, data: projects} = getProjects();

  const handlePageSwitch = async (i) => {
    setProjectsPage(projectsPage + i);
  }

  return (
    <div className="home">
      { error && <div>{ error }</div> }
      { isPending && <div>Loading...</div> }
      { projects && <ProjectList projects={projects} projectsPage={projectsPage} updateProjects={handlePageSwitch} reachedMaxPage={resCode == 202} /> }
    </div>
  );
}

export default Home;
