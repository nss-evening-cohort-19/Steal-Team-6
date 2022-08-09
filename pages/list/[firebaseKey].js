import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { viewListDetails } from '../../api/mergedData';
import ListCard from '../../components/ListCard';

function ViewList() {
  const [listDetails, setListDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    viewListDetails(firebaseKey).then(setListDetails);
  }, [firebaseKey]);
  console.warn(listDetails);

  return (
    <div style={{ width: '18rem', margin: '10px' }}>
      <div>Title: {listDetails.title}</div>
      <Link href={`/card/new/${listDetails.projectId}`} passHref>
        <Button
          variant="primary"
        >Add Card
        </Button>
      </Link>

      <h5>{listDetails.cards?.map((card) => (
        <ListCard key={card.firebaseKey} listObj={card} />))}
      </h5>
    </div>
  );
}

export default ViewList;
