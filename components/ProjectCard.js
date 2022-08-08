import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { deleteSingleProject } from '../api/projectData';

export default function ProjectCard({ projectObj, onUpdate }) {
  const deleteThisProject = () => {
    if (window.confirm(`Delete ${projectObj.title}?`)) {
      deleteSingleProject(projectObj.firebaseKey).then(() => onUpdate());
    }
  };
  console.warn(projectObj);
  return (
    <>
      <div className="card" style={{ width: '18rem', margin: '10px' }}>
        {projectObj.title}
        <Link href={`/project/${projectObj.firebaseKey}`} passHref>
          <button className="btn btn-danger btn-lg copy-btn" type="button" onClick="">VIEW</button>
        </Link>
        <Link href={`/project/edit/${projectObj.firebaseKey}`} passHref>
          <button className="btn btn-danger btn-lg copy-btn" type="button" onClick="">UPDATE</button>
        </Link>
        <button className="btn btn-danger btn-lg copy-btn" type="button" onClick={deleteThisProject}>DELETE</button>
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
