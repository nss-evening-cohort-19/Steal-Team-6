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
    const { title, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [title]: value,
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
    // <form onSubmit={handleSubmit}>
    //   <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update a' : 'Add a'} List</h2>
    //   <input
    //     type="text"
    //     className="form-control"
    //     aria-label="Text input with dropdown button"
    //     name="title"
    //     value={formInput.title}
    //     onChange={handleChange}
    //     required
    //   />
    //   <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</button>
    //   <ul className="dropdown-menu dropdown-menu-end" />
    // </form>
    <>
      <Head>
        <title>Add List</title>
      </Head>
      <form onSubmit={handleSubmit}>
        <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update a' : 'Add a'} List</h2>
        {/* Name */}
        <label htmlFor="title" className="ff">
          <input
            className="form-control"
            type="text"
            id="floatingInput"
            placeholder="Enter Title"
            name="title"
            value={formInput.title}
            onChange={handleChange}
            required
          />
        </label>
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
