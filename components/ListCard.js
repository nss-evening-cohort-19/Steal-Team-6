import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { deleteList } from '../api/listData';

function ListCard({ listObj, onUpdate }) {
  const deleteThisList = () => {
    if (window.confirm(`Delete ${listObj.title}?`)) {
      deleteList(listObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <>
      <card style={{ width: '18rem', margin: '10px' }}>
        <div>Title: {listObj.title}</div>
        <div><p className="card-text bold"><b>List:</b> {listObj.title}</p></div>
        <Link href={`/list/${listObj.firebaseKey}`} passHref>
          <button className="btn btn-danger btn-lg copy-btn" type="button" onClick="">VIEW</button>
        </Link>
        <Link href={`/list/edit/${listObj.firebaseKey}`} passHref>
          <button className="btn btn-danger btn-lg copy-btn" type="button" onClick="">UPDATE</button>
        </Link>
        <button className="btn btn-danger btn-lg copy-btn" type="button" onClick={deleteThisList}>DELETE</button>
      </card>
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
