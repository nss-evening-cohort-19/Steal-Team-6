import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { viewListDetails } from '../../api/mergedData';
import CardCard from '../../components/CardCard';
import { getListCards } from '../../api/listData';

function ViewList() {
  const [listDetails, setListDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    let isMounted = true;
    viewListDetails(firebaseKey).then((response) => {
      if (isMounted) {
        viewListDetails(response.firebaseKey).then(setListDetails);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [firebaseKey, listDetails]);

  return (
    <div style={{ width: '18rem', margin: '10px' }}>
      <title>Trello-Ish</title>
      <div>Title: {listDetails.title}</div>
      <h1>LIST: {listDetails.title}</h1>
      <Link href={`/project/${listDetails.projectId}`} passHref>
        <Button
          variant="primary"
        >Back to Project Overview
        </Button>
      </Link>
      <Link href={`/card/new/${listDetails.projectId}`} passHref>
        <Button
          variant="primary"
        >Add a Card
        </Button>
      </Link>

      <h5>{listDetails.cards?.map((card) => (
        <CardCard key={card.firebaseKey} cardObj={card} onUpdate={getListCards} />
      ))}
      </h5>
    </div>
  );
}

export default ViewList;
