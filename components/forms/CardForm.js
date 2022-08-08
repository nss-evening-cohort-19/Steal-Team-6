import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { FloatingLabel, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createCards, updateCard } from '../../api/cardData';
import { getList } from '../../api/listData';

const initalState = {
  title: '',
};

function CardForm({ obj }) {
  const [formInput, setFormInput] = useState(initalState);
  const [lists, setLists] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getList(lists.projectId).then(setLists);
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, lists]);

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
        <input
          className="form-control"
          type="text"
          placeholder="Enter Title"
          name="title"
          value={formInput.title}
          onChange={handleChange}
          required
        />
        <FloatingLabel controlId="floatingSelect" label="Card">
          <Form.Select
            aria-label="Card"
            name="listId"
            onChange={handleChange}
            className="mb-3"
            required
          >
            <option value="">Select a List</option>
            {lists.map((list) => (
              <option
                key={list.firebaseKey}
                value={list.firebaseKey}
                selected={obj.listId === list.firebaseKey}
              >
                {list.title}
              </option>
            ))}
          </Form.Select>
        </FloatingLabel>
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
