import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useAuth } from '../../utils/context/authContext';
import { createProject, updateProject } from '../../api/projectData';

const initialState = {
  title: '',
  public: false,
};

function ProjectForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

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
      updateProject(formInput)
        .then(() => router.push(`/project/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createProject(payload).then(() => {
        router.push('/');
      });
    }
  };

  return (
    <>
      <Head>
        <title>Creat a new Project!</title>
        <meta name="description" content="Meta description for the team page" />
      </Head>
      <form onSubmit={handleSubmit}>
        <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} New Project</h2>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            name="title"
            placeholder="Enter Project Title"
            value={formInput.title}
            onChange={handleChange}
            required
          />
          <label htmlFor="floatingInput">Project Title</label>
        </div>
        <>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              checked={formInput.public}
              onChange={(e) => setFormInput((prevState) => ({
                ...prevState,
                public: e.target.checked,
              }))}
            />
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Public Project?</label>
          </div>
        </>
        <button className="btn btn-primary btn-lg copy-btn" type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Project</button>
      </form>
    </>
  );
}

ProjectForm.propTypes = {
  obj: PropTypes.shape({
    title: PropTypes.string,
    public: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }),
};

ProjectForm.defaultProps = {
  obj: initialState,
};

export default ProjectForm;
