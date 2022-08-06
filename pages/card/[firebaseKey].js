import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { getSingleCard } from '../../api/cardData';

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
        <title>Cards</title>
        <meta name="description" content="Meta description for the team page" />
      </Head>
      <div><ViewCard key={firebaseKey} cardObj={cardDetails} onUpdate={() => null} /></div>
      <div className="d-flex flex-wrap">
        {cardDetails.card?.map((obj) => (
          <ViewCard key={obj.firebaseKey} cardDetails={obj} onUpdate={() => null} />
        ))}
      </div>

    </>
  );
}
