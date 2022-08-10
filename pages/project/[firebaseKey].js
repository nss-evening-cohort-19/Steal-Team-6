import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { viewProjectDetails } from '../../api/mergedData';
import ListCard from '../../components/ListCard';
import { getProjectLists } from '../../api/projectData';

function ViewProject() {
  const [projectDetails, setProjectDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    viewProjectDetails(firebaseKey).then(setProjectDetails);
  }, [firebaseKey, projectDetails]);

  return (
    <div style={{ width: '18rem', margin: '10px' }}>
      <div>Title: {projectDetails.title}</div>
      <Link href="/list/new" passHref>
        <Button
          variant="primary"
        >Add List
        </Button>
      </Link>

      <h5>{projectDetails.lists?.map((list) => (
        <ListCard key={list.firebaseKey} listObj={list} onUpdate={getProjectLists} />))}
      </h5>
    </div>
  );
}

export default ViewProject;
