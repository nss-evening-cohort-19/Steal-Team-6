import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { deleteSingleCard, getSingleCard } from '../../api/cardData';

export default function CardCard({ cardObj, onUpdate }) {
  const [cardName, setCardName] = useState({});
  const deleteThisCard = () => {
    if (window.confirm(`Delete ${cardObj.title}?`)) {
      deleteSingleCard(cardObj.firebaseKey).then(() => onUpdate());
    }
  };
  useEffect(() => {
    getSingleCard(cardObj.listId).then((response) => {
      setCardName(response);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <card style={{ width: '18rem', margin: '10px' }}>
        <div>title: {cardObj.title}</div>
        <div><p className="card-text bold"><b>Team:</b> {cardName.title}</p></div>
        <Link href={`/cards/${cardObj.firebaseKey}`} passHref>
          <button className="btn btn-danger btn-lg copy-btn" type="button" onClick="">VIEW</button>
        </Link>
        <Link href={`/cards/edit/${cardObj.firebaseKey}`} passHref>
          <button className="btn btn-danger btn-lg copy-btn" type="button" onClick="">UPDATE</button>
        </Link>
        <button className="btn btn-danger btn-lg copy-btn" type="button" onClick={deleteThisCard}>DELETE</button>
      </card>
    </>
  );
}

CardCard.propTypes = {
  cardObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    title: PropTypes.string,
    date: PropTypes.string,
    listId: PropTypes.string,
    comments: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
