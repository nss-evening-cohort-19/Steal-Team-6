import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { getSingleProject } from '../../api/projectData';

export default function ViewProject() {
  const [projectDetails, setProjectDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleProject(firebaseKey).then(setProjectDetails);
  }, [firebaseKey]);

  return (
    <>
      <Head>
        <title>All Projects</title>
        <meta name="description" content="Meta description for the team page" />
      </Head>
      <div><ViewProject key={firebaseKey} cardObj={projectDetails} onUpdate={() => null} /></div>
      <div className="d-flex flex-wrap">
        {projectDetails.project?.map((obj) => (
          <ViewProject key={obj.firebaseKey} cardDetails={obj} onUpdate={() => null} />
        ))}
      </div>

    </>
  );
}
