import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useAuth } from '../../utils/context/authContext';
import { createCards, updateCard } from '../../api/cardData';

const initalState = {
  title: '',
};

function CardForm({ obj }) {
  const [formInput, setFormInput] = useState(initalState);
  const router = useRouter();
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateCard(formInput)
        .then(() => router.push(`/card/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createCards(payload).then(() => {
        router.push('/');
      });
    }
  };
  return (
    <>
      <Head>
        <title>Add Card</title>
        <meta name="description" content="Meta description for the team page" />
      </Head>
      <form onSubmit={handleSubmit}>
        <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update a' : 'Add a'} Card</h2>
        {/* Name */}
        <label htmlFor="title" className="ff">
          <input
            className="form-control"
            type="text"
            placeholder="Enter Title"
            name="title"
            value={formInput.title}
            onChange={handleChange}
            required
          />
        </label>
        <button className="btn btn-danger btn-lg copy-btn" type="submit">{obj.firebaseKey ? 'Update a' : 'Add a'} Card</button>
      </form>
    </>
  );
}

CardForm.propTypes = {
  obj: PropTypes.shape({
    title: PropTypes.string,
    firebaseKey: PropTypes.string,
    listId: PropTypes.string,
  }),
};

CardForm.defaultProps = {
  obj: initalState,
};

export default CardForm;
