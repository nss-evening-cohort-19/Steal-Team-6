import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getProjects = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/projects.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const createProject = (projectObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/projects.json`, projectObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.title };
      axios.patch(`${dbUrl}/projects/${response.data.title}.json`, payload).then(() => {
        getProjects().then(resolve);
      });
    }).catch(reject);
});

const getSingleProject = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/projects/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

const deleteSingleProject = (firebaseKey, uid) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/projects/${firebaseKey}.json`)
    .then(() => {
      getProjects(uid).then((projectArray) => resolve(projectArray));
    })
    .catch((error) => reject(error));
});

const updateProject = (projectObj, uid) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/projects/${projectObj.firebaseKey}.json`, projectObj)
    .then(() => getProjects(uid).then(resolve))
    .catch((error) => reject(error));
});

export {
  getProjects,
  createProject,
  getSingleProject,
  deleteSingleProject,
  updateProject,
};
