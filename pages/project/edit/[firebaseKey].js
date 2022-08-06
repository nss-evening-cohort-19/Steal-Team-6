import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleProject } from '../../../api/projectData';
import ProjectCard from '../../../components/ProjectCard';

export default function EditProject() {
  const [editProject, setEditProject] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;
  useEffect(() => {
    getSingleProject(firebaseKey).then(setEditProject);
  }, [firebaseKey]);
  return (<ProjectCard obj={editProject} />);
}
