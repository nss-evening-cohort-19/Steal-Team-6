import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getSingleCard } from '../../api/cardData';
import CardCard from '../../components/CardCard';

export default function ViewCard() {
  const [cardDetails, setCardDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;
  useEffect(() => {
    getSingleCard(firebaseKey).then(setCardDetails);
  }, [firebaseKey]);

  return (
    <>
      <Head>
        <title>CARDS</title>
      </Head>
      <Link href={`/list/${cardDetails.listId}`} passHref>
        <Button
          variant="primary"
        >Back to List
        </Button>
      </Link>
      <div style={{ width: '25rem', margin: '10px' }}>
        <h1>CARD: {cardDetails.title}</h1>
      </div>
      <div style={{ width: '18rem', margin: '10px' }}>
        <h3>Comments: {cardDetails.comments}</h3>
      </div>
      <h5>{cardDetails.cards?.map((card) => (
        <CardCard key={card.firebaseKey} cardObj={card} onUpdate={() => null} />
      ))}
      </h5>
    </>
  );
}
