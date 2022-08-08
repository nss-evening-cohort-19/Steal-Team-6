import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleProject } from '../../../api/projectData';
import ProjectForm from '../../../components/forms/ProjectForm';

export default function EditProject() {
  const [projectObj, setEditProject] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;
  useEffect(() => {
    getSingleProject(firebaseKey).then(setEditProject);
  }, [firebaseKey]);
  return (<ProjectForm obj={projectObj} />);
}
