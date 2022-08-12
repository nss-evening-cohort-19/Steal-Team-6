import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
// import { deleteSingleProject } from '../api/projectData';
import { Button } from 'react-bootstrap';
import { deleteProjectLists } from '../api/mergedData';

export default function ProjectCard({ projectObj, onUpdate }) {
  const deleteThisProject = () => {
    if (window.confirm(`Delete ${projectObj.title}?`)) {
      deleteProjectLists(projectObj.firebaseKey).then(() => onUpdate());
    }
  };
  return (
    <>
      <div className="card" style={{ width: '25rem', margin: '10px' }}>
        <h1>
          {projectObj.title}
        </h1>
        <>
          <Link href={`/project/${projectObj.firebaseKey}`} passHref>
            <Button className="btn btn-danger btn-lg copy-btn" type="button" onClick="">VIEW</Button>
          </Link>
          <Link href={`/project/edit/${projectObj.firebaseKey}`} passHref>
            <Button className="btn btn-danger btn-lg copy-btn" type="button" onClick="">UPDATE</Button>
          </Link>
          <Button className="btn btn-danger btn-lg copy-btn" type="button" onClick={deleteThisProject}>DELETE</Button>
        </>
      </div>
    </>
  );
}

ProjectCard.propTypes = {
  projectObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    title: PropTypes.string,
    date: PropTypes.string,
    public: PropTypes.bool,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
