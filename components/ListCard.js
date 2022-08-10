import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Card, Button } from 'react-bootstrap';

import { deleteListCards } from '../api/mergedData';

function ListCard({ listObj, onUpdate }) {
  const deleteThisList = () => {
    if (window.confirm(`Delete ${listObj.title}?`)) {
      deleteListCards(listObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <>
      <Card style={{ width: '18rem', margin: '10px' }}>
        <div>Title: {listObj.title}</div>
        <Link href={`/list/${listObj.firebaseKey}`} passHref>
          <Button className="btn btn-danger btn-lg copy-btn" type="button" onClick="">VIEW</Button>
        </Link>
        <Link href={`/list/edit/${listObj.firebaseKey}`} passHref>
          <Button className="btn btn-danger btn-lg copy-btn" type="button" onClick="">UPDATE</Button>
        </Link>
        <Button className="btn btn-danger btn-lg copy-btn" type="button" onClick={deleteThisList}>DELETE</Button>
      </Card>
    </>

  );
}

ListCard.propTypes = {
  listObj: PropTypes.shape({
    title: PropTypes.string,
    date: PropTypes.string,
    comments: PropTypes.string,
    projectId: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ListCard;
