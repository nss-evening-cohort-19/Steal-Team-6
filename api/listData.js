import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getList = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/list.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const deleteList = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/list/${firebaseKey}.json`)
    .then(() => resolve('deleted'))
    .catch((error) => reject(error));
});

const getSingleList = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/list/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const createList = (listObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/list.json`, listObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.title };
      axios.patch(`${dbUrl}/list/${response.data.title}.json`, payload)
        .then(resolve);
    }).catch(reject);
});

const updateList = (listObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/list/${listObj.firebaseKey}.json`, listObj)
    .then(resolve)
    .catch(reject);
});

export {
  getList,
  createList,
  deleteList,
  getSingleList,
  updateList,
};
