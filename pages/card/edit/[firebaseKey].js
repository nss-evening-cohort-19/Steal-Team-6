import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleCard } from '../../../api/cardData';
import CardForm from '../../../components/forms/CardForm';

export default function EditCard() {
  const [cardObj, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;
  useEffect(() => {
    getSingleCard(firebaseKey).then(setEditItem);
  }, [firebaseKey]);
  return (<CardForm obj={cardObj} />);
}
