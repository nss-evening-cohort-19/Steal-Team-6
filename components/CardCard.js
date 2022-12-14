import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Card, Button } from 'react-bootstrap';
import { deleteSingleCard } from '../api/cardData';

export default function CardCard({ cardObj, onUpdate }) {
  const deleteThisCard = () => {
    if (window.confirm(`Delete ${cardObj.title}?`)) {
      deleteSingleCard(cardObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <>
      <Card style={{ width: '18rem', margin: '10px' }}>
        <h3>CARD: {cardObj?.title}</h3>
        <Link href={`/card/${cardObj.firebaseKey}`} passHref>
          <Button className="btn btn-danger btn-lg copy-btn" type="button" onClick="">VIEW</Button>
        </Link>
        <Link href={`/card/edit/${cardObj.firebaseKey}`} passHref>
          <Button className="btn btn-danger btn-lg copy-btn" type="button" onClick="">UPDATE</Button>
        </Link>
        <Button className="btn btn-danger btn-lg copy-btn" type="button" onClick={deleteThisCard}>DELETE</Button>
      </Card>
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
