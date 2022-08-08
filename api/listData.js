import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getList = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/list.json?orderBy="projectId"&equalTo="${firebaseKey}"`)
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
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/list/${response.data.name}.json`, payload)
        .then(resolve);
    }).catch(reject);
});

const updateList = (listObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/list/${listObj.firebaseKey}.json`, listObj)
    .then(resolve)
    .catch(reject);
});

const getListCards = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/card.json?orderBy="listId"&equalTo="${firebaseKey}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

export {
  getList,
  createList,
  deleteList,
  getSingleList,
  updateList,
  getListCards,
};
