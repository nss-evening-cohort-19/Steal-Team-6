import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function Search({ projects, setFilteredProjects }) {
  const [query, setQuery] = useState('');
  const handleChange = (e) => {
    const { value } = e.target;
    setQuery(value);
    const results = projects.filter((project) => project.title.toLowerCase().includes(value.toLowerCase()));
    setFilteredProjects(results);
  };
  return (
    <>
      <input placeholder="Search Projects" value={query} onChange={handleChange} />
    </>
  );
}

Search.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
  })).isRequired,
  setFilteredProjects: PropTypes.func.isRequired,
};
