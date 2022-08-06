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
        {projects.map((project) => (
          // eslint-disable-next-line react/jsx-no-undef
          <ProjectCard key={project.firebaseKey} projectObj={project} onUpdate={getAllTheProjects} />
        ))}
      </div>

    </div>
  );
}

export default Home;
