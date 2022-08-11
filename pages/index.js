import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { getProjects } from '../api/projectData';
import ProjectCard from '../components/ProjectCard';
import Search from '../components/Search';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const { user } = useAuth();

  const getAllTheProjects = () => {
    getProjects(user.uid).then((projectArray) => {
      setProjects(projectArray);
      setFilteredProjects(projectArray);
    });
  };
  useEffect(() => {
    getAllTheProjects();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="text-center my-4">
      <title>Trello-Ish</title>
      <Search projects={projects} setFilteredProjects={setFilteredProjects} />
      <Link href="/project/new" passHref>
        <Button
          variant="primary"
        >Create New Project
        </Button>
      </Link>
      <div className="d-flex flex-wrap">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.firebaseKey} projectObj={project} onUpdate={getAllTheProjects} />
        ))}
      </div>
    </div>
  );
}

export default Home;
