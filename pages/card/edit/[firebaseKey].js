import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleCard } from '../../../api/cardData';
import CardCard from '../../../components/CardCard';

export default function EditCard() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;
  useEffect(() => {
    getSingleCard(firebaseKey).then(setEditItem);
  }, [firebaseKey]);
  return (<CardCard obj={editItem} />);
}
