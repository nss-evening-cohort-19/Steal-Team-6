import { getSingleProject, getProjectLists, deleteSingleProject } from './projectData';
import { getSingleList, getListCards, deleteList } from './listData';
// test //
const viewProjectDetails = (projectFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleProject(projectFirebaseKey), getProjectLists(projectFirebaseKey)])
    .then(([projectObject, projectListsArray]) => {
      resolve({ ...projectObject, lists: projectListsArray });
      console.warn(projectObject, projectListsArray);
    }).catch((error) => reject(error));
});

const viewListDetails = (listFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleList(listFirebaseKey), getListCards(listFirebaseKey)])
    .then(([listObject, listCardsArray]) => {
      resolve({ ...listObject, cards: listCardsArray });
    }).catch((error) => reject(error));
});

const deleteProjectLists = (projectId) => new Promise((resolve, reject) => {
  getProjectLists(projectId).then((listsArray) => {
    const deleteListPromises = listsArray.map((list) => deleteList(list.firebaseKey));

    Promise.all(deleteListPromises).then(() => {
      deleteSingleProject(projectId).then(resolve);
    });
  }).catch((error) => reject(error));
});

const deleteListCards = (listId) => new Promise((resolve, reject) => {
  getListCards(listId).then((cardsArray) => {
    const deleteCardPromises = cardsArray.map((card) => deleteCardPromises(card.firebaseKey));

    Promise.all(deleteCardPromises).then(() => {
      deleteList(listId).then(resolve);
    });
  }).catch((error) => reject(error));
});

export {
  viewListDetails,
  viewProjectDetails,
  deleteProjectLists,
  deleteListCards,
};
