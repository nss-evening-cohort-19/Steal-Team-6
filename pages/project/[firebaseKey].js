import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { viewProjectDetails } from '../../api/mergedData';
import ListCard from '../../components/ListCard';

function ViewProject() {
  const [projectDetails, setProjectDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    viewProjectDetails(firebaseKey).then(setProjectDetails);
  }, [firebaseKey]);

  return (
    <div style={{ width: '18rem', margin: '10px' }}>
      <div>Title: {projectDetails.title}</div>
      <h5>{projectDetails.lists?.map((list) => (
        <ListCard key={list.firebaseKey} listObj={list} />))}
      </h5>
    </div>
  );
}

export default ViewProject;
