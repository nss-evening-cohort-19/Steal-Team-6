import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function Search({ cards, setFilteredCards }) {
  const [query, setQuery] = useState('');
  const handleChange = (e) => {
    const { value } = e.target;
    setQuery(value);
    const results = cards.filter((card) => card.title.toLowerCase().includes(value.toLowerCase()));
    setFilteredCards(results);
  };
  return (
    <>
      <input placeholder="Search Cards" value={query} onChange={handleChange} />
    </>
  );
}

Search.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
  })).isRequired,
  setFilteredCards: PropTypes.func.isRequired,
};
