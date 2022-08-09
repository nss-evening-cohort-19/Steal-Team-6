import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { getProjects } from '../api/projectData';
import ProjectCard from '../components/ProjectCard';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const [projects, setProjects] = useState([]);
  const { user } = useAuth();
  const getAllTheProjects = () => {
    getProjects(user.uid).then(setProjects);
  };
  useEffect(() => {
    getAllTheProjects();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="text-center my-4">
      <Link href="/project/new" passHref>
        <Button
          variant="primary"
        >Create New Project
        </Button>
      </Link>
      <div className="d-flex flex-wrap">
        {projects.map((project) => (
          <ProjectCard key={project.firebaseKey} projectObj={project} onUpdate={getAllTheProjects} />
        ))}
      </div>

    </div>
  );
}

export default Home;
