import { useState } from 'react';
import { getProjects } from '../api/projectData';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const [projects, setProjects] = useState([]);
  const { user } = useAuth();
  const getAllTheProjects = () => {
    getProjects(user.uid).then(setProjects);
  };

  return (
    <div className="text-center my-4">
      <div className="d-flex flex-wrap">
        {/* TODO: map over books here using BookCard component */}
        {projects.map((project) => (
          <ProjectCard key={project.firebaseKey} projectObj={project} onUpdate={getAllTheProjects} />
        ))}
      </div>

    </div>
  );
}

export default Home;
