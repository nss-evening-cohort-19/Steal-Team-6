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
    let isMounted = true;
    viewProjectDetails(firebaseKey).then((response) => {
      if (isMounted) {
        viewProjectDetails(response.firebaseKey).then(setProjectDetails);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [firebaseKey, projectDetails]);

  return (
    <div style={{ width: '18rem', margin: '10px' }}>
      <title>Trello-Ish</title>
      <div>Title: {projectDetails.title}</div>
      <h1>PROJECT: {projectDetails.title}</h1>
      <Link href="/list/new" passHref>
        <Button
          variant="primary"
        >Add a List
        </Button>
      </Link>

      <h5>{projectDetails.lists?.map((list) => (
        <ListCard key={list.firebaseKey} listObj={list} onUpdate={getProjectLists} />))}
      </h5>
    </div>
  );
}

export default ViewProject;
