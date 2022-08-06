// import Link from 'next/link';
// import { useEffect, useState } from 'react/cjs/react.production.min';
// import { getCards } from '../api/cardData';
// import CardCard from '../components/CardCard';
// import { useAuth } from '../utils/context/authContext';

// export default function Cards() {
//   const [cards, setCards] = useState([]);
//   const { user } = useAuth();
//   const getAllCards = () => {
//     getCards(user.uid).then(setCards);
//   };
//   useEffect(() => {
//     getAllCards();
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [user]);
//   return (
//     <div className="text-center my-4">
//       <h1>Cards</h1>
//       <Link passHref href="/card/new"><button className="btn btn-danger btn-lg copy-btn" type="button">Add card</button></Link>
//       {cards.map((card) => (
//         <CardCard key={card.firebaseKey} cardObj={card} onUpdate={getAllCards} />
//       ))}
//     </div>
//   );
// }
