import React, { useEffect, useState } from 'react';
// import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { getCards } from '../api/cardData';
import CardCard from '../components/CardCard';
import Search from '../components/Search';

export default function Cards() {
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const { user } = useAuth();

  const getAllCards = () => {
    getCards(user.uid).then((cardArray) => {
      setCards(cardArray);
      setFilteredCards(cardArray);
    });
  };
  useEffect(() => {
    getAllCards();
  }, [user.uid]);
  return (
    <div className="text-center my-4">
      <h1>Cards</h1>
      <div><Link passHref href="/card/new"><button className="btn btn-danger btn-lg copy-btn" type="button" onClick="" variant="primary">Add Card</button></Link></div>
      <Search cards={cards} setFilteredCards={setFilteredCards} />
      {filteredCards.map((card) => (
        <CardCard key={cards.firebaseKey} cardObj={card} onUpdate={getAllCards} />
      ))}
    </div>
  );
}
