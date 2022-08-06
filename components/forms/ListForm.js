// import React, { useState, useEffect } from 'react';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { useAuth } from '../../utils/context/authContext';
import { createList, updateList } from '../../api/listData';
// import getProjects from '../../api/projectData';

const initialState = {
  title: '',
};

function ListForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  // const [projects, setProjects] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  // useEffect(() => {
  //   getProjects(user.uid).then(setProjects);

  //   if (obj.firebaseKey) setFormInput(obj);
  // }, [obj, user]);

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
      updateList(formInput)
        .then(() => router.push(`/list/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createList(payload).then(() => {
        router.push('/');
      });
    }
  };

  return (
    <>
      <Head>
        <title>Add List</title>
      </Head>
      <form onSubmit={handleSubmit}>
        <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update a' : 'Add a'} List</h2>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="Enter Title"
            name="title"
            value={formInput.title}
            defaultValue={formInput.title}
            onChange={handleChange}
            required
          />
          <label htmlFor="title">List Title</label>
        </div>
        <button className="btn btn-danger btn-lg copy-btn" type="submit">{obj.firebaseKey ? 'Update a' : 'Add a'} List</button>
      </form>
    </>
  );
}

ListForm.propTypes = {
  obj: PropTypes.shape({
    title: PropTypes.string,
    firebaseKey: PropTypes.string,
    projectId: PropTypes.string,
  }),
};

ListForm.defaultProps = {
  obj: initialState,
};

export default ListForm;
