import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
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
        <meta name="description" content="Meta description for the team page" />
      </Head>
      <div style={{ width: '18rem', margin: '10px' }}>
        <div>title: {cardDetails.title}</div>
      </div>
      <h5>{cardDetails.cards?.map((card) => (
        <CardCard key={card.firebaseKey} cardObj={card} onUpdate={() => null} />
      ))}
      </h5>
    </>
  );
}
