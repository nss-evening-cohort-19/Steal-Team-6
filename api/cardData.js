import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

// GET ALL CARDS
const getCards = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/card.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});
const getSingleCard = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/card/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

// CREATE CARDS
const createCards = (cardObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/card.json`, cardObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.title };
      axios.patch(`${dbUrl}/card/${response.data.title}.json`, payload)
        .then(resolve);
    }).catch(reject);
});
// DELETE CARD
const deleteSingleCard = (firebaseKey, uid) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/card/${firebaseKey}.json`)
    .then(() => {
      getCards(uid).then((cardArray) => resolve(cardArray));
    })
    .catch((error) => reject(error));
});
const deleteCards = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/card/${firebaseKey}.json`)
    .then(() => resolve('deleted'))
    .catch((error) => reject(error));
});
// UPDATE PLAYER
const updateCard = (cardObject) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/card/${cardObject.firebaseKey}.json`, cardObject)
    .then(resolve)
    .catch(reject);
});

export {
  getCards,
  createCards,
  deleteSingleCard,
  deleteCards,
  updateCard,
  getSingleCard,
};
